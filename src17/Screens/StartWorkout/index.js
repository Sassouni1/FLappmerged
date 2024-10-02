import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import DigitalTimer from "../../Components/DigitalTimer";
import { colors } from "../../constants/colors";
import GeneralStatusBar from "../../Components/GeneralStatusBar";
import Entypo from "react-native-vector-icons/Entypo";
import { getHeight, getFontSize, getWidth } from "../../../utils/ResponsiveFun";
import { useNavigation } from "@react-navigation/native";
import Seprator from "../../Components/Seprator";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../Redux/actions/GernalActions";
import { ApiCall } from "../../Services/Apis";
import { PlayerSvg } from "../../assets/images";
import { fonts } from "../../constants/fonts";
import AntDesign from "react-native-vector-icons/AntDesign";

const StartWorkout = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.userToken);
  const user = useSelector((state) => state.auth.userData);
  const loader = useSelector((state) => state.gernal.loader);

  const planId = user?.plan_id;
  const customSeparator = {
    // marginLeft: getWidth(5),
    width: getWidth(90),
  };

  const workoutId = route?.params?.workoutId;
  const [data, setData] = useState([]);
  const [id, setId] = useState("");

  const getUnit = (set) => {
    if (set.weight) {
      return `${set.weight} kg`;
    } else if (set.seconds) {
      return `${set.seconds} seconds`;
    } else if (set.distance) {
      return `${set.distance} miles`;
    } else if (set.yards) {
      return `${set.yards} yards`;
    }  else if (set.meters) {
      return `${set.meters} meters`;
    } else if (set.parameter == 'lbs') {
      return `${set.lbs ? set.lbs : 0} lbs`;
    } else if (set.parameter =='reps') {
      return `${set.reps} reps`;
    } else {
      return "N/A"; // You can change this to a default value if needed
    }
  };

  const SingleExcercise = async () => {
    dispatch(setLoader(true));

    try {
      const res = await ApiCall({
        params: {
          workout_objId: workoutId,
        },
        route: `assignProgram/view_workout/${planId}`,
        verb: "post",
        token: token,
      });

      if (res?.status == "200") {
        console.log("single___-workout", res?.response?.Workout);
        console.log(
          "single___-innerworkout",
          res?.response?.Workout?.innerWorkout
        );
        setData(res?.response?.Workout);
        setId(res?.response);
        // setAssigWorkout(res?.response?.Workout);
        // setData(res?.response?.detail)

        dispatch(setLoader(false));
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
    SingleExcercise();
  }, []);
  return (
    <View style={styles.container}>
      {/* Set the background color of the status bar */}
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#000"
        translucent={true}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo
            name={"cross"}
            size={45}
            color={colors.primary}
            //style={{ marginLeft: getWidth(2) }}
          />
        </TouchableOpacity>
        <DigitalTimer />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        <FlatList
          data={data?.innerWorkout}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            <View style={{ height: getHeight(10) }}></View>
          )}
          ListEmptyComponent={() => (
            <>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: getFontSize(55),
                }}
              >
                {loader ? null : (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <AntDesign
                      size={getFontSize(8)}
                      color={"white"}
                      name="exclamationcircleo"
                    />
                    <Text
                      style={{
                        fontSize: getFontSize(2),
                        color: colors.graytext5,
                        marginTop: getHeight(1),
                      }}
                    >
                      No workout found on selected date
                    </Text>
                  </View>
                )}
              </View>

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: getFontSize(55),
                }}
              >
                {loader ? null : (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <AntDesign
                      size={getFontSize(8)}
                      color={"white"}
                      name="exclamationcircleo"
                    />
                    <Text
                      style={{
                        fontSize: getFontSize(2),
                        color: colors.graytext5,
                        marginTop: getHeight(1),
                      }}
                    >
                      No workout found on selected date
                    </Text>
                  </View>
                )}
              </View>
            </>
          )}
          refreshing={false}
          onRefresh={() => SingleExcercise}
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
                    onPress={() => {
                      if (ex?.complete == "true") {
                        navigation.navigate("SubmittedWorkouts", {
                          workoutId: data?._id,
                          innerWorkoutId: item?._id,
                          exerciseId: ex?._id,
                        });
                      } else {
                        navigation.navigate("CompleteWorkout", {
                          workoutId: data?._id,
                          innerWorkoutId: item?._id,
                          exerciseId: ex?._id,
                          calories: item?.calories,
                          given_sets: ex?.sets
                        });
                      }
                    }}
                  >
                    {ex?.task?.length > 0
                      ? ex?.task.map((ex, index) => (
                          <View
                            key={index}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginLeft: getWidth(3),
                              marginTop: index == 0 ? getHeight(2) : null,
                            }}
                          >
                            {ex?.video_thumbnail ? (
                              <View>
                                {index == 0 ? null : (
                                  <View style={{ alignItems: "center" }}>
                                    <View
                                      style={{
                                        height: getHeight(2),
                                        width: getWidth(2),
                                        backgroundColor: "white",
                                      }}
                                    ></View>
                                  </View>
                                )}
                                <Image
                                  source={{ uri: ex?.video_thumbnail }}
                                  style={styles.thumbnail}
                                  resizeMode="cover"
                                ></Image>
                              </View>
                            ) : (
                              <View>
                                {index == 0 ? null : (
                                  <View style={{ alignItems: "center" }}>
                                    <View
                                      style={{
                                        height: getHeight(2),
                                        width: getWidth(2),
                                        backgroundColor: "white",
                                      }}
                                    ></View>
                                  </View>
                                )}
                                <View style={styles.thumbnail}>
                                  <PlayerSvg height={20} width={20} />
                                </View>
                              </View>
                            )}

                            <View
                              style={{
                                marginLeft: getWidth(2),
                                marginTop: index == 0 ? null : getHeight(2),
                              }}
                            >
                              <Text style={styles.heading}>
                                {ex?.exercise_name}
                              </Text>

                              <View
                                style={{
                                  flexDirection: "row",
                                  marginTop: getFontSize(0.5),
                                }}
                              >
                                <Text
                                  numberOfLines={1}
                                  style={{ width: getWidth(60) }}
                                >
                                  <Text
                                    style={{
                                      ...styles.total,
                                      fontSize: getFontSize(1.5),
                                    }}
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
                                </Text>
                              </View>
                              {ex?.complete == "true" ? (
                                <View>
                                  <Image
                                    resizeMode="contain"
                                    source={require("../../assets/images/completed.png")}
                                    style={{
                                      height: getFontSize(2),
                                      width: getWidth(30),
                                      marginTop: getFontSize(0.2),
                                    }}
                                  />
                                </View>
                              ) : null}
                            </View>
                          </View>
                        ))
                      : null}
                    {ex?.exercise_name && (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginLeft: getWidth(3),
                          marginTop: getHeight(2),
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
                        <View style={{ marginLeft: getWidth(2) }}>
                          <Text style={styles.heading}>
                            {ex?.exercise_name}
                          </Text>

                          <View
                            style={{
                              flexDirection: "row",
                              marginTop: getFontSize(0.5),
                            }}
                          >
                            <Text
                              numberOfLines={1}
                              style={{ width: getWidth(60) }}
                            >
                              <Text
                                style={{
                                  ...styles.total,
                                  fontSize: getFontSize(1.5),
                                }}
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
                            </Text>
                          </View>
                          {ex?.complete == "true" ? (
                            <View>
                              <Image
                                resizeMode="contain"
                                source={require("../../assets/images/completed.png")}
                                style={{
                                  height: getFontSize(2),
                                  width: getWidth(30),
                                  marginTop: getFontSize(0.2),
                                }}
                              />
                            </View>
                          ) : null}
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default StartWorkout;
