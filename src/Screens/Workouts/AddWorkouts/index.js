import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../constants/colors";
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import { GernalStyle } from "../../../constants/GernalStyle";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  getFontSize,
  getWidth,
  getHeight,
} from "../../../../utils/ResponsiveFun";
import { PlayerSvg } from "../../../assets/images";
import Seprator from "../../../Components/Seprator";
import { styles } from "./styles";
import Button from "../../../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../Redux/actions/GernalActions";
import { ApiCall } from "../../../Services/Apis";
import { fonts } from "../../../constants/fonts";
import ReactNativeCalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import TabBarComponent from "../../../Components/TabBarComponent";
import VideoComponent from "../../../Components/VideoComponent";
import { Proportions } from "lucide-react-native";

const { height, width } = Dimensions.get("screen");

const AddWorkouts = () => {
  const navigation = useNavigation();
  const [isTime, setIsTime] = useState(false);
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());

  const [program, setProgram] = useState();
  const [workout, setWorkout] = useState({});
  const [assigWorkout, setAssigWorkout] = useState({});
  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.userToken);
  const loader = useSelector((state) => state.gernal.loader);
  const [userWorkoutProgress, setUserWorkoutProgress] = useState([]);
  const [exercises, setExercises] = useState([]);
  const currentDate = new Date();
  const [customDatesStyles, setCustomDatesStyles] = useState([]);
  const [offDayVideos, setOffDayVideos] = useState([]);
  const [selectedDay,setSelectedDay] = useState();
  const [dynamicExercises,setDynamicExercises] = useState();
  const [isDynamic,setIsDynamic] = useState(true);
  const [programExercises,setProgramExercises] = useState([]);


  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    dispatch(setLoader(true));
    getSingleExcercise(selectedDate);
  };

  const calculateDayDifference = (startFromDate, selectedDate) => {
    // Convert the input dates to Date objects
    const startDate = new Date(startFromDate);
    const selected = new Date(selectedDate);
  
    // Set the time part of both dates to midnight (00:00:00) to ignore the time
    startDate.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);
  
    // Calculate the difference in time (milliseconds)
    const timeDifference = selected.getTime() - startDate.getTime();
  
    // Convert the time difference to days (1 day = 86400000 milliseconds)
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
  
    // Return the result as "Day X"
    let res = `day ${dayDifference}`;
    console.log("selectedDay", res)
    setSelectedDay(res);
  };
  const getSingleExcercise = async (selectedDate) => {
    try {
      setAssigWorkout({});
      const res = await ApiCall({
        route: `assignProgram/given-date-workouts/${
          user?.plan_id
        }&${selectedDate.toISOString()}`,
        verb: "get",
        token: token,
      });
      if (res?.status == "200") {
        console.log("workouts..", res?.response?.startDate);
        calculateDayDifference(res?.response?.startDate,selectedDate)

        setWorkout(res?.response?.Workout[0]);
        setAssigWorkout(res?.response?.Workout[0]?.innerWorkout[0]);
        setExercises(res?.response?.exercises);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        setWorkout({});
        setAssigWorkout({});
        setExercises([]);
      }
    } catch (e) {
      console.log("api get skill errorrrr -- ", e.toString());
    }
  };
  
  const getViewProgram = async () => {
    dispatch(setLoader(true));
    try {
      const res = await ApiCall({
        params: { category_name: "skill" },
        route: `program/detail_program/${user?.program_id}`,
        verb: "get",
        token: token,
      });
      if (res?.status == "200") {
        // console.log("program.../",res?.response?.detail.workouts)
        setProgram(res?.response?.detail);
      } else {
        console.log(res?.response?.message);
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };
  
 // Function to filter exercises and tasks based on combined task names
 const filterExercises = (workout, dynamic_exercises,isDynamic) => {
  let filteredExercises = [];

  workout.forEach(item => {
    if(isDynamic)
    {
      if (item.exercise_name && dynamic_exercises?.includes(item.exercise_name)) {
        filteredExercises.push(item);
      }
    }
    else{
    // Check if the item is a regular exercise and not in dynamic_exercises
    if (item.exercise_name && !dynamic_exercises?.includes(item.exercise_name)) {
      filteredExercises.push(item);
    }
  }

    // Check inside task arrays if they exist
    if (item.task.length > 0) {
      
      // Combine task exercise names using the specific join pattern "\n------\n"
      let mergedExercise = item.task.reduce((merged, ex) => {
        return merged ? `${merged}\n------\n${ex.exercise_name}` : ex.exercise_name;
      }, "");

      if (isDynamic) {
        // If the merged task names are not in dynamic_exercises, include all the task exercises
        if (dynamic_exercises?.some(dynamic => mergedExercise?.includes(dynamic))) {
          filteredExercises.push(item);
        }
      }
      else {
        // If the merged task names are not in dynamic_exercises, include all the task exercises
        if (!dynamic_exercises?.some(dynamic => mergedExercise?.includes(dynamic))) {
          filteredExercises.push(item);
        }
    }
    }
  });

  return filteredExercises;
};
  useEffect(() => {
    if (program) {
      let findWorkout = program?.workouts?.find(x => x.workoutDay == selectedDay);
      if (findWorkout) {
        let dExercises = findWorkout?.innerWorkout[0]?.dynamic_exercises;
        setProgramExercises(findWorkout?.innerWorkout[0]?.exercise)
        setDynamicExercises(dExercises);
      }
    }
  }, [program, selectedDay])

  const getInstructions = async () => {
    try {
      const res = await ApiCall({
        route: `appInstruction/all_instructions`,
        verb: "get",
        token: token,
      });
      if (res?.status == 200) {
        setOffDayVideos(
          res?.response?.data?.filter((x) => x.type == "Off Day")
        );
      } else {
        console.log(res?.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const exerciseProgress = async (selectedDate) => {
    try {
      const res = await ApiCall({
        route: `assignProgram/user_program_status/${user?.user_id}`,
        verb: "post",
        token: token,
        params: {
          givenDate: new Date(),
        },
      });

      if (res?.status == "200") {
        // console.log(
        //   "workouts progress response",
        //   res?.response?.workoutProgress,
        //   selectedDate
        // );
        setUserWorkoutProgress(res?.response?.workoutProgress);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders progress");
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setDate(date);
      dispatch(setLoader(true));
      exerciseProgress(date);
      getSingleExcercise(date);
      getInstructions();
      getViewProgram();
    }, [])
  );


  const findMaxReps = (exercise) => {
    try {
      const sets = exercise?.sets;
      if (sets) {
        const maxReps = Math.max(...sets?.map((set) => Number(set[set.parameter])));
        return maxReps;
      } else return 0;
    } catch {
      return 0;
    }
  };

  useEffect(() => {
    // Generate styles for each date in the current month
    const startOfMonth = moment(currentDate).startOf("month");
    const endOfMonth = moment(currentDate).endOf("year");
    const dates = [];

    let textColor = colors.white;
    let backgroundColor = "#393C43";

    for (
      let m = moment(startOfMonth);
      m.isBefore(endOfMonth);
      m.add(1, "days")
    ) {
      let find = userWorkoutProgress?.find(
        (x) =>
          new Date(x.workoutDate).toLocaleDateString() ==
          new Date(m.clone()).toLocaleDateString()
      );
      if (find && find.status == "assigned")
        textColor = colors.calendarAssigned;
      else if (find && find.status == "not assigned") textColor = colors.gray1;
      else if (find && find.status == "partially complete")
        textColor = colors.buttonColor;
      else if (find && find.status == "complete") textColor = colors.greenlight;
      else if (find && find.status == "missed") textColor = colors.redtime;
      else if (find && find.status == "coming soon")
        textColor = colors.calendarAssigned;
      else textColor = colors.white;

      dates.push({
        startDate: m.clone(),
        dateNameStyle: { color: textColor },
        dateNumberStyle: { color: textColor },
        dateContainerStyle: {
          backgroundColor: backgroundColor,
          borderWidth: 0,
          width: getWidth(11),
          borderRadius: 13,
        },
      });
    }

    setCustomDatesStyles(dates);
  }, [userWorkoutProgress]);

  const ExerciseTabBar = ({ }) => {
    return (
      <View style={{ borderWidth: 1, flexDirection: 'row', width: '95%', height: 35, borderRadius: 10 }}>
        <TouchableOpacity
          onPress={() => { setIsDynamic(true) }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center', borderRadius: 10,
            backgroundColor: isDynamic ? 'lightgray' : 'white'
          }}>
          <Text style={{ fontWeight: 'bold' }} >Dynamic Warm Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { setIsDynamic(false) }}
          style={{
            flex: 1, justifyContent: 'center', alignItems: 'center',
            borderRadius: 10,
            backgroundColor: isDynamic ? 'white' : 'lightgray'
          }}>
          <Text style={{ fontWeight: 'bold' }}>Workout</Text>
        </TouchableOpacity>
      </View>
    )
  }
  const RenderExercise = ({ item }) => {
    return (
      <View style={{ flex: 1, flexDirection: "row", zIndex: 1 }}>
        <View style={{ flex: 1 }}>
          <Image
            source={item.video ?
              (item.video_thumbnail ? { uri: item?.video_thumbnail } :
                require("../../../assets/images/no-thumbnail.jpg"))
              : require("../../../assets/images/no-video.jpg")}
            style={{
              width: "100%",
              height: 90,
              resizeMode: "cover",
              borderRadius: 10,
              zIndex: 1, // Ensure the image is above other elements
            }}
          />
        </View>
        <View
          style={{
            paddingLeft: 10,
            gap: 6,
            flex: 2,
            justifyContent: "center",
            alignItems: "flex-start",
            zIndex: 1, // Ensure the text is above other elements
          }}
        >
          <View style={{ flex: 3, justifyContent: "flex-end" }}>
            <Text style={{ fontWeight: "700", fontSize: 20 }}>
              {item?.exercise_name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Text>{`Reps: ${item?.sets?.length}x${findMaxReps(item)} (${item?.sets[0]?.parameter})`}</Text>
          </View>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
        >
          <Image
            source={require("../../../assets/images/exersiseplaybtn.png")}
            style={{
              width: 50,
              height: 50,
              zIndex: 1, // Ensure the play button is above other elements
            }}
          />
        </View>
      </View>
    );
  };

  const renderItem = (item, index) => (
    <TouchableOpacity
      style={{
        backgroundColor: "#F3F3F4",
        borderRadius: 25,
        width: "100%",
        marginTop: 0, // Change this to 0 if it was positive before
        marginBottom: 0, // Ensure this is 0
        padding: 10,
        borderWidth: 0, // Ensure there's no border
      }}
      onPress={() => {
        navigation.navigate("Squat", {
          exercise: item,
          workout: workout,
          task: null,
          programExercises:programExercises,
          exercises: exercises,
        });
      }}
      activeOpacity={0.8}
    >
      <RenderExercise item={item} />
    </TouchableOpacity>
  );

  const renderMergedItem = (parentitem, parentIndex) => (
    <View>
      {parentitem?.task?.map((item, index) => (
        <View key={index} style={{}}>
          <TouchableOpacity
            style={{
              backgroundColor: "#F3F3F4",
              borderRadius: 25,
              width: "100%",
              padding: 10,
              zIndex: 2,
            }}
            onPress={() => {
              navigation.navigate("Squat", {
                exercise: item,
                workout: workout,
                task: parentitem?.task,
                programExercises:programExercises,
                exercises: exercises,
                calories: assigWorkout?.calories || 0,
              });
            }}
            activeOpacity={0.8}
          >
            <RenderExercise item={item} />
          </TouchableOpacity>
          {index < parentitem?.task?.length - 1 ? (
            <View
              style={{
                left: 30,
                width: 8,
                height: 40,
                backgroundColor: colors.black,
              }}
            />
          ) : (
            <View style={{ marginBottom: 10 }} />
          )}
        </View>
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View>
        <ImageBackground
          source={require("../../../assets/images/guyback.png")}
          style={{
            width: width,
            height: height / 3.3,
            resizeMode: "cover",
            paddingBottom: 14,
            justifyContent: "flex-end",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            overflow: "hidden",
          }}
        >
          {/* Overlay with 80% black opacity */}
          <View
            style={{
              position: "absolute", // Make sure it overlays the entire background
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.)", // Black with 80% opacity
            }}
          />
          <View
            style={{
              alignItems: "center", // Center the content horizontally
              justifyContent: "center", // Center the content vertically
              marginBottom: 10,
              paddingHorizontal: 10, // Add padding if necessary
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ position: "absolute", left: 20 }} // Position the back button to the left
            >
              <Image
                source={require("../../../assets/images/Monotone3chevron3left.png")}
                style={{
                  tintColor: colors.white,
                  height: 30,
                  width: 30,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: getFontSize(3.5),
                fontFamily: "Ubuntu-Bold",
                color: colors.white,
                marginLeft: 10, // Shift title 10 pixels to the right
              }}
            >
              {program?.title}
            </Text>
          </View>
          <TabBarComponent
            activeTab={1}
            setActiveTab={(index) => {
              if (index == 0) navigation.navigate("WorkoutDetails");
              else if (index == 1) navigation.navigate("AddWorkouts");
            }}
          />
          <ReactNativeCalendarStrip
            showMonth={false}
            selectedDate={date}
            onDateSelected={handleDateChange}
            calendarAnimation={{ type: "sequence", duration: 30 }}
            customDatesStyles={customDatesStyles}
            highlightDateNameStyle={{ color: "black" }}
            highlightDateNumberStyle={{ color: "black" }}
            highlightDateContainerStyle={{
              backgroundColor: "white",
              width: getWidth(11),
              borderRadius: 13,
            }}
            style={{
              height: getHeight(8),
              paddingHorizontal: 2,
            }}
            calendarHeaderStyle={{ color: "white" }}
            iconContainer={{ flex: 0.05 }}
          />
        </ImageBackground>
      </View>
      <FlatList
        style={{ marginTop: 20, flex: 1 }}
        data={filterExercises(exercises,dynamicExercises,isDynamic)}
        initialNumToRender={5}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        ListEmptyComponent={() => (
          exercises.length > 0 ?
          <View/>
          :
          <View
            style={{
              flex: 1,
              padding: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: getFontSize(4),
                color: colors.darkGray1,
                textAlign: "center",
                fontFamily: "Ubuntu-Bold",
                marginBottom: getHeight(3),
              }}
            >
              Rest & Recovery!{"\n"}Enjoy Your Rest Day!
            </Text>
            <View
              style={{
                width: "100%",
                marginBottom: getHeight(3),
              }}
            >
              {offDayVideos?.map((item, index) => (
                <View key={index} style={{height:200}}>
              <VideoComponent
                videoUrl={item?.video}
                thumbnail={item?.video_thumbnail}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                }}
              />
              </View>
              ))}
            </View>
          </View>
        )}
        refreshing={false}
        onRefresh={() => getSingleExcercise(date)}
        ListHeaderComponent={() => (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontWeight: "700", textAlign: "center", fontSize: 20 }}
            >
              {assigWorkout?.workoutName}
            </Text>
            <Text
              style={{
                color: "gray",
                marginTop: 8,
                textAlign: "center",
                paddingHorizontal: 20,
                lineHeight: 20,
              }}
            >
              {assigWorkout?.description}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  paddingHorizontal: 30,
                  justifyContent: "center",
                }}
              ></View>
            </View>
            <ExerciseTabBar  />
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{}}>
            <View style={{ height: 200, marginTop: 20 }}>
              <Button
                onPress={() => {
                  navigation.navigate("Squat", {
                    exercise: exercises[0],
                    workout: workout,
                    task: null,
                    exercises: exercises,
                  });
                }}
                text={`Start Workout`}
                btnStyle={{
                  ...GernalStyle.btn,
                  borderRadius: 15,
                  height: 60,
                  backgroundColor: colors.orange,
                }}
                btnTextStyle={GernalStyle.btnText}
              />
            </View>
          </View>
        )}
        renderItem={({ item, index }) => {
          return item?.exercise_name
            ? renderItem(item, index)
            : renderMergedItem(item, index);
        }}
      />
    </View>
  );
};

export default AddWorkouts;
