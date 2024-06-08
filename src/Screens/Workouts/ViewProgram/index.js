import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
  ScrollView,
  Dimensions,
  Video,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../../Components/Header";
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import { GernalStyle } from "../../../constants/GernalStyle";
import { colors } from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import {
  getHeight,
  getFontSize,
  getWidth,
} from "../../../../utils/ResponsiveFun";
import { fonts } from "../../../constants/fonts";
import Seprator from "../../../Components/Seprator";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../Redux/actions/GernalActions";
import { ApiCall } from "../../../Services/Apis";
import AntDesign from "react-native-vector-icons/AntDesign";
import HeaderBottom from "../../../Components/HeaderBottom";
import { PlayerSvg } from "../../../assets/images";

const ViewProgram = ({ route }) => {
  const navigation = useNavigation();
  // const { _id } = route?.params?.passData
  const url = route?.params?.url;
  // console.log('Url from view screen', url)
  // console.log('from view programs', _id)
  const [program, setProgram] = useState(null);
  const [data, setData] = useState(null);

  // const token = useSelector((state) => state.auth.userToken)
  const dispatch = useDispatch();

  // const getViewProgram = async () => {
  //   dispatch(setLoader(true));
  //   try {
  //     const res = await ApiCall({
  //       params: { category_name: "skill" },
  //       route: url + _id,
  //       verb: "get",
  //       token: token,
  //     });

  //     if (res?.status == "200") {
  //       console.log(
  //         "workout",
  //         res?.response?.detail?.workouts[0]?.innerWorkout[0]?.exercise
  //       );
  //       console.log("workout", res?.response?.detail);

  //       setData(res?.response?.detail);
  //       setProgram(res?.response?.detail?.workouts);
  //       dispatch(setLoader(false));
  //       // navigation.goBack();

  //       // navigation.navigate('HomeScreen');
  //     } else {
  //       dispatch(setLoader(false));

  //       alert(res?.response?.message, [
  //         { text: "OK", onPress: () => console.log("OK Pressed") },
  //       ]);
  //     }
  //   } catch (e) {
  //     console.log("api get skill error -- ", e.toString());
  //   }
  // };

  // useEffect(() => {
  //   getViewProgram();
  // }, []);

  return (
    <ScrollView
      style={{
        position: "relative",
      }}
    >
      <Image
        source={require("../../../assets/images/workoutdetailsback.png")}
        style={{
          objectFit: "fill",
          position: "absolute",
          top: 0,
          height: 320,
          width: Dimensions.get("screen").width,
          borderRadius: 30,
        }}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 60,
          left: 20,
        }}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../../../assets/images/workoutsbackbtn.png")}
          style={{
            objectFit: "fill",
            height: 50,
            width: 50,
          }}
        />
      </TouchableOpacity>

      <View
        style={{
          width: Dimensions.get("screen").width,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 160,
          gap: 10,
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderRadius: 8,
            borderColor: "white",
            padding: 8,
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Image
            source={require("../../../assets/images/workoutsrunningicon.png")}
            style={{
              height: 20,
              width: 20,
            }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 12,
            }}
          >
            HEAVY HITTER BOXING
          </Text>
        </View>
        <Text
          style={{
            fontSize: 26,
            color: "white",
            fontWeight: "700",
            marginTop: 4,
          }}
        >
          About
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginTop: 6,
          }}
        >
          <Image
            source={require("../../../assets/images/redfire.png")}
            style={{
              height: 20,
              width: 20,
            }}
          />
          <Text
            style={{
              color: "white",
            }}
          >
            12 Week Program
          </Text>
        </View>
      </View>
      <View
        style={{
          width: Dimensions.get("screen").width,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginTop: 70,
          gap: 10,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 6,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: 22,
            }}
          >
            Description
          </Text>
          <Text
            style={{
              color: "#7d7d7d",
              lineHeight: 20,
            }}
          >
            Embrace the morning sun and revitalize your body and mind with our
            'Morning Boost' routine. This energizing workout is designed to
            kickstart your metabolism, increase your energy levels, and set a
            positive tone for the day ahead.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 6,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: 22,
            }}
          >
            Video
          </Text>
          <Image
            source={require("../../../assets/images/workoutsvideo.png")}
            style={{
              width: Dimensions.get("screen").width - 38,
              objectFit: "contain",
              marginTop: -200,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 6,
            marginTop: -180,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: 22,
            }}
          >
            Benefits
          </Text>
          <Text
            style={{
              color: "#7d7d7d",
              lineHeight: 20,
            }}
          >
            There are many benefits of doing morning activities, here are the
            most important:
          </Text>
        </View>
        <View
          style={{
            marginTop: -20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("WorkoutExercise")}>
            <Image
              source={require("../../../assets/images/workoutsdetailsbtn1.png")}
              style={{
                width: Dimensions.get("screen").width - 30,
                objectFit: "scale-down",
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: -100,
            marginBottom: 100,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../../assets/images/workoutsdetailsbtn2.png")}
              style={{
                width: Dimensions.get("screen").width - 30,
                objectFit: "scale-down",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  workt: {
    color: colors.white,
    fontFamily: fonts.UBo,
    fontSize: getFontSize(2.5),
  },
  thumbnail: {
    backgroundColor: colors.white,
    justifyContent: "center",
    height: 65,
    width: 85,
    borderRadius: 10,
    alignItems: "center",
    marginTop: getFontSize(1),
    marginBottom: getFontSize(1),
  },
  startwork: {
    width: getWidth(66),
    height: getHeight(7.5),
    backgroundColor: colors.greenlight,
    borderRadius: 5,
    position: "absolute",
    bottom: getHeight(3),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  isTimeCon: {
    height: getHeight(10),
    width: getWidth(100),
    paddingHorizontal: getWidth(3),
    flexDirection: "row",
    alignItems: "center",
    marginTop: getHeight(3),
    marginBottom: getHeight(2),
  },
  sep: {
    width: getWidth(95),
    alignSelf: "center",
    marginTop: getHeight(2),
  },
  spacebet: {
    paddingHorizontal: getWidth(3),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: getHeight(3),
  },
  chest: {
    color: colors.white,
    fontSize: getFontSize(2.8),
    fontFamily: fonts.Re,
  },
  total: {
    //   fontSize: getFontSize(1.5),
    fontSize: getFontSize(1.3),

    color: colors.graytext5,
    fontFamily: fonts.Re,
    width: getWidth(70),
  },
  heading: {
    fontSize: getFontSize(2.2),
    color: colors.white,
    fontFamily: fonts.UBo,
  },
  conImg: {
    paddingHorizontal: getWidth(3),
    flexDirection: "row",
    alignItems: "center",
    marginTop: getHeight(1.5),
  },
});
export default ViewProgram;
