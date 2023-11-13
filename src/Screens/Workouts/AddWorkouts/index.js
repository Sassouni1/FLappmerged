// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   ScrollView,
//   ImageBackground,
//   Image,
// } from "react-native";
// //import { ScrollView } from 'react-native-gesture-handler';
// import {
//   getHeight,
//   getWidth,
//   getFontSize,
// } from "../../../../utils/ResponsiveFun";
// import { colors } from "../../../constants/colors";
// import Seprator from "../../../Components/Seprator";
// import { fonts } from "../../../constants/fonts";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { useNavigation } from "@react-navigation/native";
// import GeneralStatusBar from "../../../Components/GeneralStatusBar";
// import {
//   AgreeIcon,
//   DelIcon,
//   IconWhite,
//   RemoveIcon,
// } from "../../../../assets/Images";
// import { styles } from "./styles";
// import { useDispatch, useSelector } from "react-redux";
// import { ApiCall } from "../../../Services/Apis";
// import { setLoader } from "../../../Redux/actions/GernalActions";
// import CalendarStrip from "react-native-calendar-strip";
// import AntDesign from "react-native-vector-icons/AntDesign";
// import Button from "../../../Components/Button";
// import { GernalStyle } from "../../../constants/GernalStyle";
// import { PlayerSvg } from "../../../assets/images";

// const AddWorkouts = ({ data }) => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const token = useSelector((state) => state.auth.userToken);
//   const user = useSelector((state) => state.auth.userData);
// const loader=useSelector((state)=>state.gernal.loader)

//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const [assigWorkout, setAssigWorkout] = useState([]);

//   const planId = user?.plan_id;

//   const currentDate = new Date().toISOString();

//   const handleDateChange = (selectedDate) => {
//     setSelectedDate(selectedDate);
// dispatch(setLoader(true))
//     getSingleExcercise(selectedDate);
//   };

//   const getSingleExcercise = async (selectedDate) => {
//     try {
//       const res = await ApiCall({
//         params: { category_name: "skill" },
//         route: `assignProgram/given-date-workouts/${planId}&${selectedDate.toISOString()}`,
//         verb: "get",
//         token: token,
//       });
//       console.log("assignProgram started", res);
//       if (res?.status == "200") {
//         setAssigWorkout(res?.response?.Workout[0]);

//         dispatch(setLoader(false));
//       } else {
//         dispatch(setLoader(false));
//         setAssigWorkout([]);
//         console.log("errorrrr in calenders");
//         // alert(res?.response?.message, [
//         //   { text: "OK", onPress: () => console.log("OK Pressed") },
//         // ]);
//       }
//     } catch (e) {
//       console.log("api get skill error -- ", e.toString());
//     }
//   };
//   const getUnit = (set) => {
//     console.log('set',set)
//     if (set.weight) {
//       return `${set.weight} kg`;
//     } else if (set.seconds) {
//       return `${set.seconds} seconds`;
//     } else if (set.distance) {
//       return `${set.distance} meters`;
//     }else if (set.reps) {
//       return `${set.reps} reps ${set.lebs} lebs`;
//     } else {
//       return "N/A"; // You can change this to a default value if needed
//     }
//   };
//   useEffect(() => {
//     dispatch(setLoader(true));
//     getSingleExcercise(selectedDate);
//   }, []);

//   return (
//     <View style={{ flex: 1 }}>
//       <CalendarStrip
//         showMonth={false}
//         selectedDate={currentDate}
//         onDateSelected={handleDateChange}
//         calendarAnimation={{ type: "sequence", duration: 30 }}
//         daySelectionAnimation={{
//           type: "border",
//           duration: 200,
//           borderWidth: 1,
//           borderHighlightColor: colors.buttonColor,
//         }}
//         iconLeft={require("../../../assets/images/leftp.png")}
//         highlightDateNumberStyle={{ color: colors.buttonColor }}
//         highlightDateNameStyle={{ color: colors.buttonColor }}
//         iconRight={require("../../../assets/images/rightp.png")}
//         style={{
//           height: getHeight(8),
//           marginTop: getHeight(1),
//           paddingHorizontal: 5,
//         }}
//         // calendarHeaderStyle={{color: colors.white}}
//         calendarColor={colors.primary}
//         dateNumberStyle={{ color: colors.white }}
//         dateNameStyle={{ color: colors.white }}
//         iconContainer={{ flex: 0.1 }}
//       />
// <FlatList
//         data={assigWorkout?.innerWorkout}
//         showsHorizontalScrollIndicator={false}
//         showsVerticalScrollIndicator={false}
//         ListFooterComponent={() => (
//           <View style={{ height: getHeight(10) }}></View>
//         )}
//         ListEmptyComponent={() => (
//           <View
//             style={{
//               justifyContent: "center",
//               alignItems: "center",
//               height: getHeight(50),
//             }}
//           >
//             {loader?null:<Text style={{ fontSize: getFontSize(2), color: colors.graytext5 }}>
//               No workout found on selected date
//             </Text>}
//           </View>
//         )}
//         refreshing={false}
//         onRefresh={() => getSingleExcercise(selectedDate)}
//         renderItem={({ item }) => {
//           return (

//                 <View style={{ marginLeft: getWidth(2) }}>
//                   <View
//                     style={{
//                       flexDirection: "row",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                       paddingHorizontal: getWidth(3),
//                       marginBottom: getHeight(1),
//                       marginTop:getHeight(1.8)
//                     }}
//                   >
//                     <Text
//                       style={{
//                         ...styles.chest,
//                         fontSize: getFontSize(2.5),
//                         marginTop: getHeight(0.5),
//                       }}
//                     >
//                       {item?.workoutName}
//                     </Text>
//                     <Text
//                       style={{
//                         color: colors.graytext5,
//                         fontFamily: fonts.URe,
//                         fontSize: 10,
//                       }}
//                     >
//                       {item?.exercise.length} exercises
//                     </Text>
//                   </View>
//                   <Seprator
//                     style={{
//                       width: getWidth(95),
//                       alignSelf: "center",
//                       marginTop: getHeight(1),
//                     }}
//                   />

//                   {item.exercise.map((ex) => (
//                     <TouchableOpacity
//                       onPress={() =>
//                         navigation.navigate("WorkoutSet", {
//                           workoutId: assigWorkout?._id,
//                           innerWorkoutId: item?._id,
//                           exerciseId: ex?._id,
//                         })
//                       }
//                       style={{
//                         flexDirection: "row",
//                         alignItems: "center",
//                         marginLeft: getWidth(3),
//                         marginTop:getHeight(2)
//                       }}
//                     >
//                       {/* {console.log("ex===:",ex)} */}
//                       {/* <Image
//                         style={{
//                           height: 80,
//                           width: 80,
//                           borderRadius: 5,
//                           marginTop: getHeight(1),
//                         }}
//                         source={require("../../../assets/images/wheelStrech.png")}
//                       /> */}
//                        <View style={styles.thumbnail}>
//                       <PlayerSvg height={30} width={30} />
//                     </View>
//                       {/* {console.log('ex',ex)} */}
//                       <View style={{ marginLeft: getWidth(2) }}>
//                         <Text style={styles.heading}>{ex?.exercise_name}</Text>

//                         <View style={{flexDirection:"row",marginTop:getFontSize(0.5)}}>
//                     <Text style={{ ...styles.total, fontSize: getFontSize(1.5) }}>
//                       {ex?.no_of_sets} sets
//                     </Text>

//                     {ex?.sets.map((set, index) => (
//                       <Text
//                         style={{
//                           // ...styles.text,
//                           fontSize: getFontSize(1.5),
//                           color: colors.graytext5,
//                         }}
//                         key={index}
//                       >
//                         {` `}|{` `}{getUnit(set)}
//                       </Text>
//                     ))}
//                     </View>
//                       </View>
//                     </TouchableOpacity>
//                   ))}
//                 </View>

//           );
//         }}
//       />
//       {assigWorkout?.innerWorkout&&assigWorkout?.innerWorkout.length>0?<Button
//         text={"Start workout"}
//         onPress={() =>
//           navigation.navigate("StartWorkout", {
//             workoutId: assigWorkout?._id,
//           })
//         }
//         btnStyle={{
//          ...GernalStyle.btn,
//           width: getWidth(60),
//           backgroundColor: colors.greenlight,
//           position: "absolute",
//           bottom: getHeight(2),
//         }}
//         btnTextStyle={GernalStyle.btnText}
//       />:null }
//     </View>
//   );
// };

// export default AddWorkouts;

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../constants/colors";
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import { GernalStyle } from "../../../constants/GernalStyle";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  getFontSize,
  getWidth,
  getHeight,
} from "../../../../utils/ResponsiveFun";
import {
  AngelDown,
  StrechSvg,
  CrunchSvg,
  RopeSvg,
  IconWhite,
  AngelUp,
  PlayerSvg,
} from "../../../assets/images";
import Seprator from "../../../Components/Seprator";
import { styles } from "./styles";
import Button from "../../../Components/Button";
import Header from "../../../Components/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../Redux/actions/GernalActions";
import { ApiCall } from "../../../Services/Apis";
import { fonts } from "../../../constants/fonts";
import ReactNativeCalendarStrip from "react-native-calendar-strip";
import HeaderBottom from "../../../Components/HeaderBottom";
import Toast from "react-native-simple-toast";

const AddWorkouts = () => {
  const navigation = useNavigation();
  const [isTime, setIsTime] = useState(false);
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [assigWorkout, setAssigWorkout] = useState([]);
  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.userToken);
  const loader = useSelector((state) => state.gernal.loader);
  console.log('user plaid',user)

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    dispatch(setLoader(true));
    getSingleExcercise(selectedDate);
  };
  const getUnit = (set) => {
    if (set.weight) {
      return `${set.weight} kg`;
    } else if (set.seconds) {
      return `${set.seconds} seconds`;
    } else if (set.distance) {
      return `${set.distance} meters`;
    } else if (set.reps) {
      return `${set.reps} reps ${set.lebs} lebs`;
    } else {
      return "N/A"; // You can change this to a default value if needed
    }
  };
  const getSingleExcercise = async (selectedDate) => {
    try {
      const res = await ApiCall({
        route: `assignProgram/given-date-workouts/${
          user?.plan_id
        }&${selectedDate.toISOString()}`,
        verb: "get",
        token: token,
      });
      console.log("respone of add workouts", res);
      if (res?.status == "200") {
        setAssigWorkout(res?.response?.Workout[0]);
        console.log("workouts details", res?.response?.Workout[0].progress);

        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        setAssigWorkout([]);
        console.log("errorrrr in calenders");
        // Alert.alert(res?.response?.message, [
        //   { text: "OK", onPress: () => console.log("OK Pressed") },
        // ]);
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };

  useEffect(() => {
    dispatch(setLoader(true));
    getSingleExcercise(date);
  }, []);
  let highlightDateNumberStyle;

  if (assigWorkout?.progress >= 99.5) {
    highlightDateNumberStyle = { color: colors.greenlight };
  } else if (assigWorkout?.progress > 0) {
    highlightDateNumberStyle = { color: colors.buttonColor };
  } else if (assigWorkout?.progress <= 0) {
    highlightDateNumberStyle = { color: colors.redtime };
  } else {
    highlightDateNumberStyle = { color: colors.gray1 };
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.homeColor,
        marginTop: getFontSize(2),
      }}
    >
      {/* <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={true}
      /> */}

      <HeaderBottom
        title={moment(date).format("dd, MMM Do")}
        RightIcon={
          <TouchableOpacity
            style={{ marginLeft: getWidth(3), alignSelf: "center" }}
            onPress={() => setIsTime(!isTime)}
          >
            {isTime ? (
              <AngelUp height={15} width={15} />
            ) : (
              <AngelDown height={15} width={15} />
            )}
          </TouchableOpacity>
        }
        // LeftIcon={
        //   <TouchableOpacity
        //     style={{ alignSelf: "center", marginRight: getWidth(4) }}
        //     onPress={() => navigation.openDrawer()}
        //   >
        //     <FontAwesome name="bars" size={25} color={colors.white} />
        //   </TouchableOpacity>
        // }
        LeftIcon={<View />}
      />

      {isTime && (
        <ReactNativeCalendarStrip
          showMonth={false}
          selectedDate={date}
          onDateSelected={handleDateChange}
          calendarAnimation={{ type: "sequence", duration: 30 }}
          daySelectionAnimation={{
            type: "border",
            duration: 200,
            borderWidth: 2,
            borderHighlightColor:
              assigWorkout?.progress == 100
                ? { color: colors.greenlight }
                : assigWorkout?.progress < 100 && assigWorkout?.progress > 0
                ? { color: colors.buttonColor }
                : assigWorkout?.progress == 0
                ? { color: colors.redtime }
                : { color: colors.gray1 },
          }}
          iconLeft={require("../../../assets/images/leftp.png")}
          highlightDateNumberStyle={
            assigWorkout?.progress == 100
              ? { color: colors.greenlight }
              : assigWorkout?.progress < 100 && assigWorkout?.progress > 0
              ? { color: colors.buttonColor }
              : assigWorkout?.progress == 0
              ? { color: colors.redtime }
              : { color: colors.gray1 }
          }
          highlightDateNameStyle={
            assigWorkout?.progress == 100
              ? { color: colors.greenlight }
              : assigWorkout?.progress < 100 && assigWorkout?.progress > 0
              ? { color: colors.buttonColor }
              : assigWorkout?.progress == 0
              ? { color: colors.redtime }
              : { color: colors.gray1 }
          }
          iconRight={require("../../../assets/images/rightp.png")}
          style={{
            height: getHeight(8),
            marginTop: getHeight(1),
            paddingHorizontal: 5,
          }}
          // calendarHeaderStyle={{color: colors.white}}
          calendarColor={colors.primary}
          dateNumberStyle={{ color: colors.white }}
          dateNameStyle={{ color: colors.white }}
        //  iconContainer={{ flex: 0.1 }}
          iconContainer={({ date, iconStyle }) => {
            return (
              <View style={{ flex: 0.1 }}>
                {assigWorkout?.innerWorkout[0].progress === 100 && (
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={20}
                    color={colors.greenlight}
                    style={iconStyle}
                  />
                )}
              </View>
            );
          }}
        />
      )}

      <FlatList
        data={assigWorkout?.innerWorkout}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <View style={{ height: getHeight(10) }}></View>
        )}
        ListEmptyComponent={() => (
          <>
            {isTime ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: getFontSize(65),
                }}
              >
                {loader ? null : (
                  <Text
                    style={{
                      fontSize: getFontSize(2),
                      color: colors.graytext5,
                    }}
                  >
                    No workout found on selected date
                  </Text>
                )}
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: getFontSize(85),
                }}
              >
                {loader ? null : (
                  <Text
                    style={{
                      fontSize: getFontSize(2),
                      color: colors.graytext5,
                    }}
                  >
                    No workout found on selected date
                  </Text>
                )}
              </View>
            )}
          </>
        )}
        refreshing={false}
        onRefresh={() => getSingleExcercise(date)}
        renderItem={({ item }) => {
          return (
            <View style={{ marginLeft: getWidth(2) }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: getWidth(3),
                  marginBottom: getHeight(1),
                  marginTop: getHeight(1.8),
                }}
              >
                <Text
                  style={{
                    ...styles.chest,
                    fontSize: getFontSize(2.5),
                    marginTop: getHeight(0.5),
                  }}
                >
                  {item?.workoutName}
                </Text>
                <Text
                  style={{
                    color: colors.graytext5,
                    fontFamily: fonts.URe,
                    fontSize: 10,
                  }}
                >
                  {item?.exercise.length} exercises
                </Text>
              </View>
              <Seprator
                style={{
                  width: getWidth(95),
                  alignSelf: "center",
                  marginTop: getHeight(1),
                }}
              />

              {item.exercise.map((ex) => (
                <TouchableOpacity
                  // onPress={() =>
                  //   navigation.navigate("WorkoutSet", {
                  //     workoutId: assigWorkout?._id,
                  //     innerWorkoutId: item?._id,
                  //     exerciseId: ex?._id,
                  //   })
                  // }
                  onPress={() => {
                    if (ex?.complete == "true") {
                      Toast.show("You have already completed this exercise.");
                    } else {
                      navigation.navigate("WorkoutSet", {
                        workoutId: assigWorkout?._id,
                        innerWorkoutId: item?._id,
                        exerciseId: ex?._id,
                      });
                    }
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: getWidth(3),
                    marginTop: getHeight(2),
                  }}
                >
                  <View style={styles.thumbnail}>
                    <PlayerSvg height={30} width={30} />
                  </View>
                  {/* {console.log('ex',ex)} */}
                  <View style={{ marginLeft: getWidth(2) }}>
                    <Text style={styles.heading}>{ex?.exercise_name}</Text>

                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: getFontSize(0.5),
                      }}
                    >
                      <Text
                        style={{ ...styles.total, fontSize: getFontSize(1.5) }}
                      >
                        {ex?.no_of_sets} sets
                      </Text>
                      {ex?.sets.map((set, index) => (
                        <Text
                          style={{
                            ...styles.text,
                            fontSize: getFontSize(1.5),
                            color: colors.graytext5,
                          }}
                          key={index}
                        >
                          {` `}|{` `}
                          {getUnit(set)}
                        </Text>
                      ))}
                    </View>
                    {ex?.complete == "true" ? (
                      <View>
                        <Image
                          resizeMode="contain"
                          source={require("../../../assets/images/completed.png")}
                          style={{
                            height: getFontSize(2),
                            width: getWidth(30),
                            marginTop: getFontSize(0.2),
                          }}
                        />
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          );
        }}
      />
      {assigWorkout?.innerWorkout &&
      assigWorkout?.innerWorkout.length > 0 &&
      assigWorkout?.progress !== 100 ? (
        <Button
          text={"Start workout"}
          onPress={() =>
            navigation.navigate("StartWorkout", {
              workoutId: assigWorkout?._id,
            })
          }
          btnStyle={{
            ...GernalStyle.btn,
            width: getWidth(60),
            backgroundColor: colors.greenlight,
            position: "absolute",
            bottom: getHeight(2),
          }}
          btnTextStyle={GernalStyle.btnText}
        />
      ) : null}
    </View>
  );
};

export default AddWorkouts;
