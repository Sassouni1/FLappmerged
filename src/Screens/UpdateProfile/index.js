import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { GernalStyle } from "../../constants/GernalStyle";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import HeaderBottom from "../../Components/HeaderBottom";
import GeneralStatusBar from "../../Components/GeneralStatusBar";
import { useNavigation } from "@react-navigation/native";
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
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import {
  captureImage,
  chooseImageGallery,
  requestCameraPermission,
  requestExternalWritePermission,
} from "../../../utils/ImageAndCamera";
import { BASE_URL, IMAGE_URL } from "../../Services/Constants";
import ImagePickerModal from "../../Components/ImagePickerModal";
import ImagePicker from "react-native-image-crop-picker";
import ImageModal from "react-native-image-modal";
import axios from "axios";

const UpdateProfiles = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.userData);
  console.log("User upppp", user);
  const token = useSelector((state) => state.auth.userToken);
  const [imageToUpload, setImageToUpload] = useState("");
  const [pickerModalVisibile, setPickerModalVisibile] = useState(false);

  const [imageObject, setImageObject] = useState();
  const [imageSave, setImageSave] = useState(null);

  const handleImagePress = () => {
    setPickerModalVisibile(true);
  };

  const uploadFromCamera = async () => {
    const res = await captureImage();
    // console.log('ress___',res[0])
    setImageSave(res?.data?.uri);

    console.log("___img", res?.data?.uri);

    if (res.status == false) {
      toast.show(res.error);
      return;
    }
    const imageObject = {
      uri: res?.data?.uri,
      type: res?.data?.type,
      name: res?.data?.name,
    };
    setImageObject(imageObject);
    setPickerModalVisibile(false);
  };
  const uploadFromGallry = async () => {
    const res = await chooseImageGallery("", 1, false);
    setImageSave(res?.data?.uri);
    console.log("___img", res?.data?.uri);
    if (res.status == false) {
      toast.show(res.error);
      return;
    }
    const imageObject = {
      uri: res?.data?.uri,
      type: res?.data?.type,
      name: res?.data?.name,
    };
    setImageObject(imageObject);
    setPickerModalVisibile(false);
  };

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
        formData.append("profile_image", imageObject);
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
        } else {
          console.log("error", res.response);
          dispatch(setLoader(false));

          alert(res?.response?.message, [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
      } catch (e) {
        console.log("profile update error -- ", e.toString());
      }
    } else {
      setState({ ...state, emailError, weightError, heightError });
    }
  };

  // const updateProfile = async () => {
  //   const { fullname, weight, height } = state;
  //   const fullnameError = await validator("fullname", fullname);
  //   const weightError = await validator("weight", weight);
  //   const heightError = await validator("height", height);

  //   if (!fullnameError && !weightError && !heightError) {
  //     dispatch(setLoader(true));
  //     try {
  //       console.log("imagesss");
  //       const formData = new FormData();
  //       formData.append("full_name", fullname);
  //       formData.append("height", height);
  //       formData.append("weight", weight);
  //       formData.append("profile_image", imageObject);
  //       console.log('Form Data',formData)

  //       const res = await axios.put(`${BASE_URL}/user/update_user`, formData, {
  //         headers: {
  //           Authorization: `x-sh-auth ${token}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });
  //       if (res?.status == "200") {
  //         navigation.goBack();
  //         dispatch(getSingleUser(token));
  //         toast.show(res?.response?.message);
  //         dispatch(setLoader(false));
  //       } else {
  //         toast.show(res?.response);
  //         alert(res?.response?.message, [
  //           { text: "OK", onPress: () => console.log("OK Pressed") },
  //         ]);
  //       }
  //     } catch (e) {
  //       console.log("Saga error:", e);
  //     } finally {
  //       dispatch(setLoader(false));
  //     }
  //   } else {
  //     setState({ ...state, emailError, weightError, heightError });
  //   }
  // };

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
      {/* <HeaderBottom
        heading={"Profile Settings"}
        onPress={() => {
          navigation.openDrawer();
        }}
      /> */}
      <HeaderBottom
        title={"Profile Settings"}
        LeftIcon={
          <Ionicons
            name={"arrow-back"}
            size={25}
            color={"#ffff"}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        }
        RightIcon={<View />}
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
          <Image
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
            source={
              imageSave
                ? { uri: imageSave }
                : user?.profile_image
                ? { uri: user?.profile_image }
                : require("../../assets/images/user.png")
            }
          />
          {/* <ImageModal
            resizeMode="cover"
            modalImageResizeMode="contain"
            style={{ ...styles.userProfile, marginTop: 0 }}
            source={
              imageSave
                ? { uri: imageSave }
                : user?.profile_image
                ? { uri: IMAGE_URL + user?.profile_image }
                : require("../../assets/images/user.png")
            }
          /> */}

          {/* <ProfileImg height={getHeight(14)} width={getWidth(30)} /> */}
          {/* <TouchableOpacity style={styles.editbtn}> */}
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
          {/* </TouchableOpacity> */}
        </View>
        <Text style={styles.username}>{user?.full_name}</Text>
        <Text style={styles.useremail}>{user?.email}</Text>

        <TextInput
          mode="outlined"
          placeholder="Full name"
          placeholderTextColor={colors.graytext4}
          label={<Text style={GernalStyle.inputLabelStyle}>Full Name</Text>}
          theme={{ roundness: 15 }}
          style={{ ...GernalStyle.textinput, marginTop: getHeight(4.5) }}
          ref={inputRefs.fullname}
          value={state.fullname}
          returnKeyType={"send"}
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
          editable={false}
          placeholder={user?.email}
          placeholderTextColor={colors.white}
          style={{
            ...GernalStyle.textinput,
            backgroundColor: colors.gray3,
            marginTop: getHeight(1.3),
          }}
        />
        <TextInput
          placeholder="Weight"
          placeholderTextColor={colors.graytext4}
          style={{ ...GernalStyle.textinput, marginTop: getHeight(1.3) }}
          ref={inputRefs.weight}
          value={state.weight}
          returnKeyType={"send"}
          keyboardType={"default"}
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
          placeholder="Height"
          placeholderTextColor={colors.graytext4}
          style={{ ...GernalStyle.textinput, marginTop: getHeight(1.3) }}
          ref={inputRefs.height}
          value={state.height}
          returnKeyType={"send"}
          keyboardType={"default"}
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
      {/* <AppButton
        onPress={profileSetting}
        buttonText={"Update"}
        style={{ marginBottom: getHeight(4) }}
      /> */}
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
