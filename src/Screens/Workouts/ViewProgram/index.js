import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
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
  const { _id } = route?.params?.passData;
  const [program, setProgram] = useState(null);
  const [data, setData] = useState(null);

  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();

  const getViewProgram = async () => {
    dispatch(setLoader(true));
    try {
      const res = await ApiCall({
        params: { category_name: "skill" },
        route: "program/detail_program/" + _id,
        verb: "get",
        token: token,
      });

      if (res?.status == "200") {
        console.log(
          "workout",
          res?.response?.detail?.workouts[0]?.innerWorkout[0]?.exercise
        );
        console.log("workout", res?.response?.detail);

        setData(res?.response?.detail);
        setProgram(res?.response?.detail?.workouts);
        dispatch(setLoader(false));
        // navigation.goBack();

        // navigation.navigate('HomeScreen');
      } else {
        dispatch(setLoader(false));

        alert(res?.response?.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };
  useEffect(() => {
    getViewProgram();
  }, []);
  return (
    <View style={{ ...GernalStyle.continer, backgroundColor: colors.primary }}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={true}
      />
      <HeaderBottom
        title={data?.title}
        TitelStyle={{
          color: "white",
          fontSize: 24,
          alignSelf: "flex-end",
          marginBottom: Platform.OS === "ios" ? 3 : 0,
          fontFamily: "Russo_One",
          fontWeight: "600",
          textAlign:"center"
        }}
        //  onPress={() => navigation.goBack()}
        LeftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name={"left"} size={30} color="#ffff" />
          </TouchableOpacity>
        }
        RightIcon={<View style={{ marginRight: getFontSize(4.5) }} />}
      />
      <Seprator
        style={{
          width: getWidth(95),
          alignSelf: "center",
          marginTop: getHeight(1),
        }}
      />
      <FlatList
        data={program}
        renderItem={({ item }) => (
          <View>
            {item?.innerWorkout?.map((item2) => (
              <View>
                <View style={{ marginLeft: getWidth(2) }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingHorizontal: getWidth(3),
                      marginBottom: getHeight(1),
                    }}
                  >
                    <Text
                      style={{
                        ...styles.chest,
                        fontSize: getFontSize(2.5),
                        marginTop: getHeight(2),
                      }}
                    >
                      {item2?.workoutName + ` (${item?.workoutDay})`}
                    </Text>
                    <Text
                      style={{
                        color: colors.graytext5,
                        fontFamily: fonts.URe,
                        fontSize: 10,
                        marginTop: getHeight(2),
                      }}
                    >
                      {item2?.exercise.length} exercises
                    </Text>
                  </View>
                  <Seprator
                    style={{
                      width: getWidth(95),
                      alignSelf: "center",
                      marginTop: getHeight(1),
                    }}
                  />

                  {item2.exercise.map((ex) => (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: getWidth(3),
                      }}
                    >
                      {ex?.video_thumbnail ? (
                        <Image
                          source={{ uri: ex?.video_thumbnail }}
                          style={styles.thumbnail}
                          resizeMode="cover"
                        ></Image>
                      ) : (
                        <View style={styles.thumbnail}>
                          <PlayerSvg height={20} width={20} />
                        </View>
                      )}
                      {/* {console.log('ex',ex)} */}
                      <View style={{ marginLeft: getWidth(2) }}>
                        <Text style={styles.heading}>
                          {ex?.exercise_name}
                        </Text>
                        <Text
                          style={{ ...styles.total, marginTop: getHeight(0.6) }}
                        >
                          {ex?.description}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}
      />
    </View>
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
