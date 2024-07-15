import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../constants/colors";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
    getFontSize,
    getWidth,
    getHeight,
} from "../../../../utils/ResponsiveFun";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../Redux/actions/GernalActions";
import { ApiCall } from "../../../Services/Apis";
import ReactNativeCalendarStrip from "react-native-calendar-strip";
import moment from 'moment';
import Button from "../../../Components/Button";
import { GernalStyle } from "../../../constants/GernalStyle";



const ProgramWorkoutExcercise = ({ program, programId }) => {
    const navigation = useNavigation();
    const [isTime, setIsTime] = useState(false);
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date());

    const [assigWorkout, setAssigWorkout] = useState([]);
    const user = useSelector((state) => state.auth.userData);
    const token = useSelector((state) => state.auth.userToken);
    const loader = useSelector((state) => state.gernal.loader);
    const [weekDataProgress, setWeekDataProgress] = useState({});
    const [exercises, setExercises] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(0);

    useFocusEffect(
        React.useCallback(() => {
            dispatch(setLoader(true));
            getSingleExcercise(date,selectedIndex);
        }, [date])
    );

    const handleDateChange = (selectedDate,index) => {
        setDate(selectedDate);
        setSelectedIndex(index);
    };

    const getSingleExcercise = async (selectedDate,index) => {
        console.log("program..", program?.workouts[0].innerWorkout[0]);
        setAssigWorkout(program?.workouts[selectedIndex]?.innerWorkout[0]);
        setExercises(program?.workouts[selectedIndex]?.innerWorkout[0]?.exercise);
        dispatch(setLoader(false));
    };


    const currentDate = moment();
    const numDays = program?.workouts?.length || 7; // Number of specific days like day1, day2, etc.

    // Generate specific dates
    const specificDates = Array.from({ length: numDays }, (_, i) => moment(currentDate).add(i, 'days'));

    return (
        <View style={{ flex: 1, marginTop: getFontSize(1) }} >
            <View style={styles.container}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {specificDates.map((date, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.dateContainer,{backgroundColor:selectedIndex == index ? 'white' : '#54565c'}]}
                            onPress={() => handleDateChange(date,index)}
                        >
                            <Text style={selectedIndex == index ? styles.dateTextActive : styles.dateText}>{date.format('DD')}</Text>
                            <Text style={selectedIndex == index ? styles.dateTextActive : styles.dateText}>{date.format('ddd')}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                style={{ marginTop: 35 }}
                data={exercises}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: getFontSize(5),
                        }}
                    >
                        <Text
                            style={{
                                fontSize: getFontSize(2),
                                color: colors.black,
                                marginTop: getHeight(1)}}>
                            No workout found on selected date
                        </Text>
                    </View>
                )}
                refreshing={false}
                onRefresh={() => getSingleExcercise(date,selectedIndex)}
                ListHeaderComponent={() => (
                    <View style={{
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Text style={{ fontWeight: "700", fontSize: 20 }}>
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
                            >
                                <Image
                                    source={require("../../../assets/images/workoutsclockicon.png")}
                                    style={{
                                        height: 20,
                                        width: 20,
                                    }}
                                />
                                <Text
                                    style={{
                                        fontWeight: "700",
                                        fontSize: 16,
                                        textAlign: "center",
                                    }}
                                >
                                    {`${assigWorkout?.workoutLength || 0} Min`}
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: "400",
                                        fontSize: 14,
                                        textAlign: "center",
                                    }}
                                >
                                    Time
                                </Text>
                            </View>
                            <View
                                style={{
                                    height: 110,
                                    width: 1.5,
                                    backgroundColor: "lightgray",
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 10,
                                    paddingHorizontal: 30,
                                    justifyContent: "center",
                                }}
                            >
                                <Image
                                    source={require("../../../assets/images/workoutsfireicon.png")}
                                    style={{
                                        height: 18,
                                        width: 18,
                                        objectFit: "contain",
                                    }}
                                />
                                <Text
                                    style={{
                                        fontWeight: "700",
                                        fontSize: 16,
                                        textAlign: "center",
                                    }}
                                >
                                    {`${assigWorkout?.calories || 0} Cal`}
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: "400",
                                        fontSize: 14,
                                        textAlign: "center",
                                    }}
                                >
                                    Calorie
                                </Text>
                            </View>
                            <View
                                style={{
                                    height: 110,
                                    width: 1.5,
                                    backgroundColor: "lightgray",
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 10,
                                    paddingHorizontal: 30,
                                    justifyContent: "center",
                                }}
                            >
                                <Image
                                    source={require("../../../assets/images/workoutsweightsicon.png")}
                                    style={{
                                        height: 20,
                                        width: 20,
                                        objectFit: "contain",
                                    }}
                                />
                                <Text
                                    style={{
                                        fontWeight: "700",
                                        fontSize: 16,
                                        textAlign: "center",
                                    }}
                                >
                                    {assigWorkout?.focus}
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: "400",
                                        fontSize: 14,
                                        textAlign: "center",
                                    }}
                                >
                                    Focus
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
                ListFooterComponent={() => (
                    <View style={{}}>
                        <View style={{ height: 200,marginTop:20 }}>
                            <Button
                                // onPress={() => navigation.navigate("ProgramWorkout", { workoutData: route?.params?.passData, programId: _id })}
                                onPress={() =>{}
                                    // navigation.navigate("Squat", {
                                    //     program:program,
                                    //     workoutId: "66642342de69c0b3aaa8511f",
                                    // })
                                }
                                text={`Start Workout`}
                                btnStyle={{
                                    ...GernalStyle.btn,
                                    borderRadius: 15,
                                    height: 60,
                                    backgroundColor: colors.orange,
                                }}
                                btnTextStyle={GernalStyle.btnText}
                            />
                            <Button
                                onPress={() => navigation.goBack()}
                                text="Add Additional Workout"
                                btnStyle={{
                                    ...GernalStyle.btn,
                                    borderRadius: 15,
                                    height: 45,
                                    backgroundColor: colors.greentick,
                                    marginTop: 20
                                }}
                                btnTextStyle={GernalStyle.btnText}
                            />
                        </View>
                        {/* <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() =>
                                navigation.navigate("Squat", {
                                    workoutId: "66642342de69c0b3aaa8511f",
                                })
                            }
                        >
                            <Image
                                source={require("../../../assets/images/startworkoutsbtn.png")}
                                style={{
                                    objectFit: "contain",
                                    width: Dimensions.get("screen").width - 24,
                                    marginTop: -30,
                                }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8}>
                            <Image
                                source={require("../../../assets/images/exercisebtn2.png")}
                                style={{
                                    objectFit: "contain",
                                    width: Dimensions.get("screen").width - 18,
                                    marginTop: -90,
                                }}
                            />
                        </TouchableOpacity> */}
                    </View>
                )}
                renderItem={({ item,index }) => {
                    return (
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#F3F3F4",
                                borderRadius: 25,
                                width: "100%",
                                alignItems: "center",
                                marginTop: 10,
                                flexDirection: "row",
                                padding: 10,
                            }}
                            onPress={()=>{
                                navigation.navigate("Squat", {
                                    exercise:item,
                                })
                            }}
                            activeOpacity={0.8}
                        >
                            <Image
                                source={{uri:item?.video_thumbnail}}
                                style={{
                                    width: 90,
                                    height: 90,
                                }}
                            />
                            <Image
                                source={require("../../../assets/images/exersiseplaybtn.png")}
                                style={{
                                    width: 50,
                                    height: 50,
                                    position: "absolute",
                                    right: 20,
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: "column",
                                    gap: 6,
                                    marginLeft: 15,
                                    alignItems: "flex-start",
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#676C75",
                                    }}
                                >
                                    {`Exercise ${index+1}` }
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: "700",
                                        width:120,
                                        fontSize: 20,
                                    }}
                                >
                                   {item?.exercise_name}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 4,
                                    }}
                                >
                                    <Image
                                        source={require("../../../assets/images/workoutsclockicon.png")}
                                        style={{ height: 20, width: 20 }}
                                    />
                                    <Text>5:30</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

export default ProgramWorkoutExcercise;

const styles = StyleSheet.create({
    container: {
        height: 60, // Adjust height as needed
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateContainer: {
        marginHorizontal: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems:'center',
        backgroundColor: '#54565c',
        borderRadius: 10,
    },
    dateText: {
        color: 'white',
        fontWeight: 'bold',
    },
    dateTextActive: {
        color: 'black',
        fontWeight: 'bold',
    },
});