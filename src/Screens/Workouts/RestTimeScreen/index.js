import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const RestTimeScreen = ({ route }) => {
    const navigation = useNavigation();
    const {restTime} = route?.params;
    const [seconds, setSeconds] = useState(0);

    useMemo(() => {
        setSeconds(60 * restTime)
    }, [restTime])

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds > 0) {
                    return prevSeconds - 1;
                } else {
                    clearInterval(interval);
                    navigation.goBack()
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const skipRest = () => {
     navigation.goBack()
    };

    const convertTimeToMinutes = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    return (
        <View style={{ backgroundColor: "rgba(0,0,0,0.8)", flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 20 }}>
                Rest Time: {convertTimeToMinutes(seconds)}
            </Text>
            <TouchableOpacity onPress={skipRest} style={{ marginTop: 20 }}>
                <Text style={{ color: "white" }}>Skip Rest</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RestTimeScreen;
