import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { GernalStyle } from "../../constants/GernalStyle";
import { colors } from "../../constants/colors";
import Header from "../../Components/Header";
import GeneralStatusBar from "../../Components/GeneralStatusBar";
import { getFontSize, getHeight, getWidth } from "../../../utils/ResponsiveFun";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../../Components/Button";
import { useNavigation } from "@react-navigation/native";
import validator from "../../../utils/validation/validator";
import { validateFields } from "../../../utils/validation/validate-fields";
import { styles } from "./styles";
import { ApiCall } from "../../Services/Apis";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../Redux/actions/GernalActions";
import Ionicons from "react-native-vector-icons/Ionicons";
import HeaderBottom from "../../Components/HeaderBottom";
import SimpleToast from "react-native-simple-toast";
import { useFocusEffect } from "@react-navigation/native";
import { TextInput } from "react-native-paper";

const ContactUs = () => {
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();
  const inputRefs = {
    fullname: useRef(null),
    question: useRef(null),
    email: useRef(null),
  };
  const [state, setState] = useState({
    email: "",
    emailError: "",
    fullname: "",
    fullnameError: "",
    question: "",
    questionError: "",
  });
  useFocusEffect(
    React.useCallback(() => {
      setState({
        email: "",
        emailError: "",
        fullname: "",
        fullnameError: "",
        question: "",
        questionError: "",
      });
    }, [])
  );

  const openDrawer = () => {
    navigation.openDrawer(); // Open the drawer
  };
  const changeHandler = (type, value) => setState({ ...state, [type]: value });
  const ContectToUser = async () => {
    const { email, fullname, question } = state;
    const emailError = await validator("email", email);

    const fullnameError = await validator("fullname", fullname);
    const questionError = await validator("question", question);

    if (!emailError && !fullnameError && !questionError) {
      dispatch(setLoader(true));
      try {
        const res = await ApiCall({
          params: { full_name: fullname, email: email, description: question },
          route: "contact/contact_us",
          verb: "post",
          token: token,
        });

        if (res?.status == "200") {
          console.log("res,", res);

          dispatch(setLoader(false));
          SimpleToast.show('A member of our support staff will respond as soon as possible.');
          navigation.goBack();
          setState({
            email: "",
            emailError: "",
            fullname: "",
            fullnameError: "",
            question: "",
            questionError: "",
          });
          // navigation.navigate('HomeScreen');
        } else {
          console.log("error", res.response);
          dispatch(setLoader(false));

          alert(res?.response?.message, [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
      } catch (e) {
        console.log("api get skill error -- ", e.toString());
      }
    } else {
      setState({ ...state, emailError, fullnameError, questionError });
    }
  };
  useEffect(() => {
    setState({
      email: "",
      emailError: "",
      fullname: "",
      fullnameError: "",
      question: "",
      questionError: "",
    });
  }, []);

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
        title={"Contact us"}
        LeftIcon={
          <Ionicons
            style={{ alignSelf: "center", marginRight: getWidth(2) }}
            name={"arrow-back"}
            size={25}
            color={"#ffff"}
            onPress={() => navigation.goBack()}
          />
        }
        RightIcon={<View style={{marginLeft:getFontSize(4)}}/>}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: getFontSize(3) }}></View>
        <TextInput
          mode="outlined"
          label={<Text style={GernalStyle.inputLabelStyle}>Full name</Text>}
          theme={{ roundness: getFontSize(0.5) }}
          outlineColor="#BDC3C4"
          activeUnderlineColor="#BDC3C4"
          activeOutlineColor="#BDC3C4"
          style={GernalStyle.input}
          ref={inputRefs.fullname}
          value={state.fullname}
          returnKeyType={"send"}
          textColor="white"
          onFocus={() => setState({ ...state, fullnameError: "" })}
          onBlur={() =>
            validateFields(state.fullname, "fullname", (error) =>
              setState({ ...state, fullnameError: error })
            )
          }
          onSubmitEditing={() => inputRefs?.email?.current?.focus()}
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
          label={<Text style={GernalStyle.inputLabelStyle}>Email address</Text>}
          theme={{ roundness: getFontSize(0.5) }}
          outlineColor="#BDC3C4"
          activeUnderlineColor="#BDC3C4"
          activeOutlineColor="#BDC3C4"
          textColor="white"
          style={{...GernalStyle.input,marginTop:getHeight(1)}}
          ref={inputRefs.email}
          returnKeyType={"next"}
          onChangeText={(email) => changeHandler("email", email.trim())}
          value={state.email}
          keyboardType="email-address"
          onFocus={() => setState({ ...state, emailError: "" })}
          onBlur={() =>
            validateFields(state.email, "email", (error) =>
              setState({ ...state, emailError: error })
            )
          }
          onSubmitEditing={() => {
            inputRefs.question.current?.focus();
          }}
          blurOnSubmit={false}
        />
        {state.emailError && (
          <Text
            style={[
              GernalStyle.InputError,
              { width: getWidth(90), alignSelf: "center" },
            ]}
          >
            {state.emailError}
          </Text>
        )}
        {/* <TextInput
          placeholder="Password"
          placeholderTextColor={colors.graytext4}
          style={{...GernalStyle.textinput, marginTop: getHeight(1.5)}}
          ref={inputRefs.password}
          value={state.password}
          returnKeyType={'send'}
          keyboardType={'default'}
          onFocus={() => setState({...state, passwordError: ''})}
          onBlur={() =>
            validateFields(state.password, 'password', error =>
              setState({...state, passwordError: error}),
            )
          }
          onSubmitEditing={() => inputRefs?.question?.current?.focus()}
          onChangeText={password =>
            changeHandler('password', password.trim())
          }
          blurOnSubmit={false}
        />
        {state.passwordError && (
          <Text
            style={[
              GernalStyle.inputError,
              {width: getWidth(90), alignSelf: 'center'},
            ]}>
            {state.passwordError}
          </Text>
        )} */}
        <TextInput
          textAlignVertical="top"
          multiline
          numberOfLines={3}
          mode="outlined"
          label={<Text style={{...GernalStyle.inputLabelStyle}}>Write your question/concern/feedback</Text>}
          theme={{ roundness: getFontSize(0.5) }}
          outlineColor="#BDC3C4"
          activeUnderlineColor="#BDC3C4"
          activeOutlineColor="#BDC3C4"
          textColor="white"
          style={{...GernalStyle.input,marginTop: getHeight(1),height:getHeight(15)}}
          ref={inputRefs.question}
          value={state.question}
          returnKeyType={"send"}
          keyboardType={"default"}
          onFocus={() => setState({ ...state, questionError: "" })}
          onBlur={() =>
            validateFields(state.question, "question", (error) =>
              setState({ ...state, questionError: error })
            )
          }
          onSubmitEditing={() => ContectToUser()}
          onChangeText={(question) => changeHandler("question", question)}
          blurOnSubmit={false}
        />
        {state.questionError && (
          <Text
            style={[
              GernalStyle.InputError,
              { width: getWidth(90), alignSelf: "center" },
            ]}
          >
            {state.questionError}
          </Text>
        )}
        {/* <Text style={styles.textcontect}>
          A member of our support staff will respond as soon as possible.
        </Text> */}
      </KeyboardAwareScrollView>
      {/* <Button
        text={'Submit'}
        btnStyle={{position: 'absolute', bottom: getHeight(4),width:getWidth(90),height:getHeight(6),justifyContent:"center",alignItems:"center",margin:getFontSize(2)}}
        onPress={()=>ContectToUser()}
      /> */}
      <Button
        onPress={() => ContectToUser()}
        text="Submit"
        btnStyle={{
          ...GernalStyle.btn,
          backgroundColor: colors.buttonColor,
          // marginBottom:getFontSize(10)
          position: "absolute",
          bottom: getHeight(5),
        }}
        btnTextStyle={GernalStyle.btnText}
      />
    </View>
  );
};

export default ContactUs;
