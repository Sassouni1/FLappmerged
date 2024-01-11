import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { GernalStyle } from "../../constants/GernalStyle";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import HeaderBottom from "../../Components/HeaderBottom";
import GeneralStatusBar from "../../Components/GeneralStatusBar";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getWidth, getFontSize, getHeight } from "../../../utils/ResponsiveFun";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import validator from "../../../utils/validation/validator";
import { validateFields } from "../../../utils/validation/validate-fields";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../Redux/actions/GernalActions";
import { ApiCall } from "../../Services/Apis";
import toast from "react-native-simple-toast";
import { getSingleUser } from "../../Redux/actions/AuthActions";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Button from "../../Components/Button";
import {
  captureImage,
  chooseImageGallery,
} from "../../../utils/ImageAndCamera";
import ImagePickerModal from "../../Components/ImagePickerModal";
import ImagePicker from "react-native-image-crop-picker";
import ImageModal from "react-native-image-modal";
import { TextInput } from "react-native-paper";

const UpdateProfiles = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.userToken);
  const [pickerModalVisibile, setPickerModalVisibile] = useState(false);
  const [imageCrop, setImageCrop] = useState("");
  const [imageSave, setImageSave] = useState(null);

  const handleImagePress = () => {
    setPickerModalVisibile(true);
  };



// image upload
  const uploadFromCamera = async () => {
    const res = await captureImage();
    if (res.status == false) {
      toast.show(res.error);
      return;
    }
    const imageObject = {
      uri: res?.data?.uri,
      type: res?.data?.type,
      name: res?.data?.name,
    };
    dispatch(setLoader(true));
    setPickerModalVisibile(false);
    setTimeout(function () {
      cropimage(imageObject?.uri);
      dispatch(setLoader(false));
    }, 3000);
  };
  const uploadFromGallry = async () => {
    const res = await chooseImageGallery("", 1, false);
    if (res.status == false) {
      toast.show(res.error);
      return;
    }
    const imageObject = {
      uri: res?.data?.uri,
      type: res?.data?.type,
      name: res?.data?.name,
    };
    dispatch(setLoader(true));
    setTimeout(function () {
      cropimage(imageObject?.uri);
      dispatch(setLoader(false));
    }, 3000);
    setPickerModalVisibile(false);
  };

  const cropimage = (uri) => {
    ImagePicker.openCropper({
      path: Platform.OS === "android" ? "file://" + uri : uri,
    }).then((image) => {
      const MyObject = {
        uri: image?.path,
        type: image?.mime,
        name: "profileImage" + user?._id,
      };
      setPickerModalVisibile(false);
      setImageCrop(MyObject);
      setImageSave(MyObject?.uri);
    });
  };


// api call
  const inputRefs = {
    fullname: useRef(null),
    weight: useRef(null),
    height: useRef(null),
  };
  const [state, setState] = useState({
    fullname: user?.full_name,
    fullnameError: "",
    weight: user?.weight,
    weightError: "",
    height: user?.height,
    heightError: "",
  });

  useFocusEffect(
    React.useCallback(() => {
      setState({
        fullname: user?.full_name,
        fullnameError: "",
        weight: user?.weight,
        weightError: "",
        height: user?.height,
        heightError: "",
      });
    }, [user])
  );

  const dispatch = useDispatch();
  const changeHandler = (type, value) => setState({ ...state, [type]: value });

  const profileSetting = async () => {
    const { fullname, weight, height } = state;
    const fullnameError = await validator("fullname", fullname);
    const weightError = await validator("weight", weight);
    const heightError = await validator("height", height);

    if (!fullnameError && !weightError && !heightError) {
      dispatch(setLoader(true));
      try {
        const formData = new FormData();
        formData.append("full_name", fullname);
        formData.append("height", height);
        formData.append("weight", weight);
        formData.append("profile_image", imageCrop);
        console.log("Form Data", formData);

        const res = await ApiCall({
          params: formData,
          route: "user/update_user",
          token: token,
          verb: "put",
        });
        console.log("started");
        if (res?.status == "200") {
          navigation.goBack();
          dispatch(getSingleUser(token));
          toast.show(res?.response?.message);
          dispatch(setLoader(false));
          Keyboard.dismiss();
        } else {
          console.log("error of api", res);
          dispatch(setLoader(false));

          alert(res?.response?.message, [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
      } catch (e) {
        console.log("profile update error -- ", e.toString());
      }
    } else {
      setState({ ...state, fullnameError, weightError, heightError });
    }
  };

  return (
    <View
      style={{ ...GernalStyle.continer, backgroundColor: colors.homeColor }}
    >
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={true}
      />
      <HeaderBottom
        title={"Profile Settings"}
        LeftIcon={
          <Ionicons
            name={"arrow-back"}
            size={25}
            color={"#ffff"}
            onPress={() => {
              navigation.goBack();
            }}
          />
        }
        RightIcon={<View style={{ marginRight: getFontSize(2.5) }} />}
      />
      <ImagePickerModal
        visible={pickerModalVisibile}
        hideVisible={() => setPickerModalVisibile(!pickerModalVisibile)}
        galleryImage={() => uploadFromGallry()}
        cameraImage={() => uploadFromCamera("image")}
        onBackdropPress={() => setPickerModalVisibile(false)}
        onSwipeComplete={() => setPickerModalVisibile(false)}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: getHeight(2), alignSelf: "center" }}>
          <ImageModal
            style={{
              width: 140,
              height: 130,
              marginTop: getHeight(3),
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
            resizeMode={"cover"}
            modalImageResizeMode="contain"
            source={
              imageSave
                ? { uri: imageSave }
                : user?.profile_image
                ? { uri: user?.profile_image }
                : require("../../assets/images/Pimg.jpeg")
            }
          />
          <TouchableOpacity
            onPress={() => handleImagePress()}
            style={{
              position: "absolute",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              bottom: 0,
              height: 30,
              width: 30,
              right: 0,
              backgroundColor: "white",
              borderTopLeftRadius: 60,
            }}
          >
            <MaterialIcons name={"edit"} size={24} color={"#182d4a"} />
          </TouchableOpacity>
        </View>
        <Text style={styles.username}>{user?.full_name}</Text>
        <Text style={styles.useremail}>{user?.email}</Text>

        <TextInput
          mode="outlined"
          label={<Text style={GernalStyle.inputLabelStyle}>Full name</Text>}
          theme={{ roundness: getFontSize(0.5) }}
          outlineColor="#BDC3C4"
          activeUnderlineColor="#BDC3C4"
          activeOutlineColor="#BDC3C4"
          textColor="white"
          style={{ ...GernalStyle.input, marginTop: getHeight(2) }}
          ref={inputRefs.fullname}
          value={state.fullname}
          returnKeyType={"done"}
          keyboardType={"default"}
          onFocus={() => setState({ ...state, fullnameError: "" })}
          onBlur={() =>
            validateFields(state.fullname, "fullname", (error) =>
              setState({ ...state, fullnameError: error })
            )
          }
          onSubmitEditing={() => inputRefs?.weight?.current?.focus()}
          onChangeText={(fullname) => changeHandler("fullname", fullname)}
          blurOnSubmit={false}
        />
        {state.fullnameError && (
          <Text
            style={[
              GernalStyle.InputError,
              { width: getWidth(90), alignSelf: "center" },
            ]}
          >
            {state.fullnameError}
          </Text>
        )}
        <TextInput
          mode="outlined"
          editable={false}
          label={<Text style={GernalStyle.inputLabelStyle}>{user?.email}</Text>}
          theme={{ roundness: getFontSize(0.5) }}
          outlineColor="#BDC3C4"
          activeUnderlineColor="#BDC3C4"
          activeOutlineColor="#BDC3C4"
          textColor="white"
          style={{ ...GernalStyle.input, marginTop: getHeight(2) }}
        />
        <TextInput
          mode="outlined"
          label={<Text style={GernalStyle.inputLabelStyle}>Weight</Text>}
          theme={{ roundness: getFontSize(0.5) }}
          outlineColor="#BDC3C4"
          activeUnderlineColor="#BDC3C4"
          activeOutlineColor="#BDC3C4"
          textColor="white"
          style={{ ...GernalStyle.input, marginTop: getHeight(2) }}
          ref={inputRefs.weight}
          value={state.weight.toString()}
          returnKeyType={"done"}
          keyboardType={"numeric"}
          onFocus={() => setState({ ...state, weightError: "" })}
          onBlur={() =>
            validateFields(state.weight, "weight", (error) =>
              setState({ ...state, weightError: error })
            )
          }
          onSubmitEditing={() => inputRefs?.height?.current?.focus()}
          onChangeText={(weight) => changeHandler("weight", weight)}
          blurOnSubmit={false}
        />
        {state.weightError && (
          <Text
            style={[
              GernalStyle.InputError,
              { width: getWidth(90), alignSelf: "center" },
            ]}
          >
            {state.weightError}
          </Text>
        )}
        <TextInput
          mode="outlined"
          label={<Text style={GernalStyle.inputLabelStyle}>Height</Text>}
          theme={{ roundness: getFontSize(0.5) }}
          outlineColor="#BDC3C4"
          activeUnderlineColor="#BDC3C4"
          activeOutlineColor="#BDC3C4"
          textColor="white"
          style={{
            ...GernalStyle.input,
            marginTop: getHeight(2),
            marginBottom: getFontSize(2),
          }}
          ref={inputRefs.height}
          value={state.height.toString()}
          returnKeyType={"done"}
          keyboardType={"numeric"}
          onFocus={() => setState({ ...state, heightError: "" })}
          onBlur={() =>
            validateFields(state.height, "height", (error) =>
              setState({ ...state, heightError: error })
            )
          }
          onSubmitEditing={() => profileSetting()}
          onChangeText={(height) => changeHandler("height", height)}
          blurOnSubmit={false}
        />
        {state.heightError && (
          <Text
            style={[
              GernalStyle.InputError,
              { width: getWidth(90), alignSelf: "center" },
            ]}
          >
            {state.heightError}
          </Text>
        )}
      </KeyboardAwareScrollView>
      <View
        style={{
          marginTop: Platform.OS === "ios" ? getFontSize(0) : getFontSize(15),
        }}
      >
        <Button
          onPress={profileSetting}
          text="Update profile"
          btnStyle={{
            ...GernalStyle.btn,
            backgroundColor: colors.buttonColor,
            position: "absolute",
            bottom: getHeight(5),
          }}
          btnTextStyle={GernalStyle.btnText}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  username: {
    fontSize: getFontSize(2.2),
    color: colors.white,
    fontFamily: fonts.UBo,
    marginTop: getHeight(1.5),
    marginRight: getWidth(1),
    alignSelf: "center",
  },
  useremail: {
    fontSize: getFontSize(1.8),
    color: colors.white,
    fontFamily: fonts.URe,
    marginTop: getHeight(0.5),
    marginRight: getWidth(1),
    alignSelf: "center",
  },
  editbtn: {
    height: getHeight(3.5),
    width: getWidth(7),
    borderRadius: 5,
    backgroundColor: colors.homeColor,
    position: "absolute",
    bottom: getHeight(-1),
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default UpdateProfiles;
