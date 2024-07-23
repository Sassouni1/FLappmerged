import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  Keyboard,
  Image,
  Alert
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getFontSize, getHeight } from "../../../utils/ResponsiveFun";
import { setLoader } from "../../Redux/actions/GernalActions";
import { ApiCall } from "../../Services/Apis";
import toast from "react-native-simple-toast";
import { getSingleUser } from "../../Redux/actions/AuthActions";
import ImagePickerModal from "../../Components/ImagePickerModal";
import ImagePicker from "react-native-image-crop-picker";
import ImageModal from "react-native-image-modal";
import Button from "../../Components/Button";
import {
  captureImage,
  chooseImageGallery,
} from "../../../utils/ImageAndCamera";

const UpdateProfiles = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();

  const [pickerModalVisibile, setPickerModalVisibile] = useState(false);
  const [imageCrop, setImageCrop] = useState("");
  const [imageSave, setImageSave] = useState(null);
  const [fullname, setFullname] = useState(user?.full_name);
  const [fullnameError, setFullnameError] = useState("");
  const [weight, setWeight] = useState(user?.weight);
  const [weightError, setWeightError] = useState("");
  const [height, setHeight] = useState(user?.height);
  const [heightError, setHeightError] = useState("");

  const inputRefs = {
    fullname: useRef(null),
    weight: useRef(null),
    height: useRef(null),
  };

  useFocusEffect(
    React.useCallback(() => {
      setFullname(user?.full_name);
      setWeight(user?.weight);
      setHeight(user?.height);
      setFullnameError("");
      setWeightError("");
      setHeightError("");
    }, [user])
  );

  const handleImagePress = () => {
    setPickerModalVisibile(true);
  };

  const uploadFromCamera = async () => {
    const res = await captureImage();
    if (res.status === false) {
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
    if (res.status === false) {
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

  const validateFields = (value, type) => {
    console.log("value",value)
    if (!value || value?.toString()?.trim() === "") {
      return `${type} is required.`;
    }
    if (type === "weight" || type === "height") {
      if (isNaN(value)) {
        return `${type} must be a number.`;
      }
    }
    return "";
  };

  const profileSetting = async () => {
    const fullnameValidationError = validateFields(fullname, "Fullname");
    const weightValidationError = validateFields(weight, "Weight");
    const heightValidationError = validateFields(height, "Height");

    if (
      !fullnameValidationError &&
      !weightValidationError &&
      !heightValidationError
    ) {
      dispatch(setLoader(true));
      try {
        const formData = new FormData();
        formData.append("full_name", fullname);
        formData.append("height", height);
        formData.append("weight", weight);
        formData.append("profile_image", imageCrop);

        const res = await ApiCall({
          params: formData,
          route: "user/update_user",
          token: token,
          verb: "put",
        });

        if (res?.status === "200") {
          navigation.goBack();
          dispatch(getSingleUser(token));
          toast.show(res?.response?.message);
          dispatch(setLoader(false));
          Keyboard.dismiss();
        } else {
          dispatch(setLoader(false));
          Alert.alert('Awesome!','Profile update successful');
        }
      } catch (e) {
        console.log("profile update error -- ", e.toString());
      }
    } else {
      setFullnameError(fullnameValidationError);
      setWeightError(weightValidationError);
      setHeightError(heightValidationError);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Image
            source={require("../../assets/images/Monotone3chevron3left.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile Setup</Text>
      </View>

      {/* Profile Image Container */}
      <View style={styles.profileContainer}>
        <ImageModal
          style={styles.profileImage}
          resizeMode={"cover"}
          modalImageResizeMode="contain"
          source={
            imageSave
              ? { uri: imageSave }
              : user?.profile_image
              ? { uri: user?.profile_image }
              : require("../../assets/images/redo.png")
          }
        />
        <TouchableOpacity
          onPress={() => handleImagePress()}
          style={styles.editIconContainer}
        >
          <Image
            source={require("../../assets/images/EditButton.png")}
            style={styles.editIcon}
          />
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <View style={styles.inputFieldsContainer}>
          <View style={styles.inputFieldContainer}>
            <Text style={styles.inputLabel}>Name</Text>
            <View
              style={[
                styles.inputField,
                fullnameError && styles.inputFieldError,
              ]}
            >
              <Image
                source={require("../../assets/images/Monotone-user.png")}
                style={styles.icon}
              />
              <TextInput
                style={styles.inputText}
                value={fullname}
                onChangeText={setFullname}
                placeholder="Full Name"
                placeholderTextColor="#393C43"
                onFocus={() => setFullnameError("")}
                onBlur={() =>
                  setFullnameError(validateFields(fullname, "Fullname"))
                }
                returnKeyType={"done"}
                keyboardType={"default"}
                ref={inputRefs.fullname}
                onSubmitEditing={() => inputRefs?.weight?.current?.focus()}
                blurOnSubmit={false}
              />
              <Pressable onPress={() => setFullname("")}>
                <Image
                  source={require("../../assets/images/pencil.png")}
                  style={styles.icon}
                />
              </Pressable>
            </View>
            {fullnameError && (
              <Text style={styles.errorText}>{fullnameError}</Text>
            )}
          </View>

          <View style={styles.inputFieldContainer}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputField}>
              <Image
                source={require("../../assets/images/Monotone-email.png")}
                style={styles.icon}
              />
              <TextInput
                style={styles.inputText}
                value={user?.email}
                placeholder="Email Address"
                placeholderTextColor="#393C43"
                editable={false}
              />
            </View>
          </View>

          <View style={styles.inputFieldContainer}>
            <Text style={styles.inputLabel}>Current Weight</Text>
            <View
              style={[styles.inputField, weightError && styles.inputFieldError]}
            >
              <Image
                source={require("../../assets/images/Monotone-user.png")}
                style={styles.icon}
              />
              <TextInput
                style={styles.inputText}
                value={weight?.toString()}
                onChangeText={setWeight}
                placeholder="Weight"
                placeholderTextColor="#393C43"
                keyboardType={"numeric"}
                onFocus={() => setWeightError("")}
                onBlur={() => setWeightError(validateFields(weight, "Weight"))}
                returnKeyType={"done"}
                ref={inputRefs.weight}
                onSubmitEditing={() => inputRefs?.height?.current?.focus()}
                blurOnSubmit={false}
              />
            </View>
            {weightError && <Text style={styles.errorText}>{weightError}</Text>}
          </View>

          <View style={styles.inputFieldContainer}>
            <Text style={styles.inputLabel}>Height</Text>
            <View
              style={[styles.inputField, heightError && styles.inputFieldError]}
            >
              <Image
                source={require("../../assets/images/Monotone-user.png")}
                style={styles.icon}
              />
              <TextInput
                style={styles.inputText}
                value={height?.toString()}
                onChangeText={setHeight}
                placeholder="Height"
                placeholderTextColor="#393C43"
                keyboardType={"numeric"}
                onFocus={() => setHeightError("")}
                onBlur={() => setHeightError(validateFields(height, "Height"))}
                returnKeyType={"done"}
                ref={inputRefs.height}
                onSubmitEditing={profileSetting}
                blurOnSubmit={false}
              />
            </View>
            {heightError && <Text style={styles.errorText}>{heightError}</Text>}
          </View>
        </View>
      </KeyboardAwareScrollView>

      <Pressable style={styles.primaryButton} onPress={profileSetting}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>Continue</Text>
          <Image
            source={require("../../assets/images/Monotone-user.png")}
            style={styles.icon}
          />
        </View>
      </Pressable>

      <View style={styles.homeIndicator} />
      <ImagePickerModal
        visible={pickerModalVisibile}
        hideVisible={() => setPickerModalVisibile(!pickerModalVisibile)}
        galleryImage={() => uploadFromGallry()}
        cameraImage={() => uploadFromCamera("image")}
        onBackdropPress={() => setPickerModalVisibile(false)}
        onSwipeComplete={() => setPickerModalVisibile(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#111214",
    height: 204,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    position: "relative",
  },
  backBtn: {
    position: "absolute",
    left: 20,
  },
  headerText: {
    fontFamily: "Work Sans",
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 21,
    textAlign: "left",
    marginRight: 130,
    letterSpacing: -0.004,
    color: "#FFFFFF",
  },
  profileContainer: {
    position: "absolute",
    top: 200, // Adjust the top value to place it correctly
    left: "50%",
    transform: [{ translateX: -48 }, { translateY: -48 }], // Adjust according to your needs
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 30,
    borderColor: "#FFFFFF",
    borderWidth: 4,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  editIcon: {
    marginTop: 26,
    width: 45,
    height: 45,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 24,
  },
  inputFieldsContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    gap: 10,
  },
  inputFieldContainer: {
    marginBottom: 16,
    gap: 10,
  },
  inputLabel: {
    fontFamily: "Work Sans",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.002,
    color: "#111214",
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 10,
    width: "100%",
    height: 56,
    backgroundColor: "#F3F3F4",
    borderRadius: 19,
  },
  inputFieldError: {
    borderColor: "#FF6347",
    borderWidth: 1,
  },
  inputText: {
    fontFamily: "Work Sans",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 1,
    color: "#393C43",
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  errorText: {
    fontFamily: "Work Sans",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.002,
    color: "#e54f5d",
    marginTop: 4,
  },
  primaryButton: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: "91%",
    height: 56,
    backgroundColor: "#111214",
    borderRadius: 19,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    fontFamily: "Work Sans",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.003,
    color: "#FFFFFF",
  },
  homeIndicator: {
    height: 34,
  },
});

export default UpdateProfiles;
