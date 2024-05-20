import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { setLoader } from "../../Redux/actions/GernalActions";
import { useDispatch, useSelector } from "react-redux";
import { ApiCall } from "../../Services/Apis";
import HeaderBottom from "../../Components/HeaderBottom";
import Entypo from "react-native-vector-icons/Entypo";
import WelcomeScreens from '../WelcomeScreens';

const Achievements = () => {
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.userToken);
  const loader = useSelector((state) => state.gernal.loader);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [dataWeight, setDataWeight] = useState([]);
  const [dataMessages, setDataMessages] = useState([]);

  const [showAll, setShowAll] = useState(false);
  const topItems = showAll ? data : data.slice(0, 3);

  const [showAllWeight, setShowAllWeight] = useState(false);
  const topItemsWeight = showAllWeight ? dataWeight : dataWeight.slice(0, 3);

  const [showAllMessages, setShowAllMessages] = useState(false);
  const topItemsMessages = showAllMessages ? dataMessages : dataMessages.slice(0, 3);

  const getConsistentUser = async () => {
    try {
      const res = await ApiCall({
        route: "assignProgram/maxComplete",
        verb: "get",
        token: token,
      });
      if (res?.status == "200") {
        setData(res?.response?.maxComplete);
        setDataWeight(res?.response?.maxWeight);
        setDataMessages(res?.response?.maxMessages);
        dispatch(setLoader(false));
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
  };

  const handleRefresh = () => {
    dispatch(setLoader(true));
    getConsistentUser();
  };

  useFocusEffect(
    React.useCallback(() => {
      handleRefresh();
    }, [])
  );

  const handleNavigateToNewPage = () => {
    navigation.navigate('WelcomeScreens');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leader Board</Text>
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>
              <Text style={styles.tabTextOutline}>Achievements</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.contentBackground} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => navigation.navigate("WelcomeScreens")}>
          <Text>Navigate</Text>
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Most Consistent User</Text>
          <View style={styles.sectionBackground}>
            <View style={styles.userList}>
              {topItems.map((item, index) => (
         <View key={index} style={styles.userItem}>
  <View>
    
    {item?.userImage && item?.userImage !== "" ? (
      <Image
        source={{ uri: item?.userImage }}
        style={styles.userAvatar}
        resizeMode="cover"
      />
    ) : (
      <Image
        source={require("../../assets/images/Pimg.jpeg")}
        style={styles.userAvatar}
        resizeMode="cover"
      />
    )}
  </View>
  <View>
  <View style={{
 borderWidth:1,
 borderColor: 'black',
 borderRadius: 8,
 paddingVertical: 4,
 paddingHorizontal: 8,
 justifyContent: 'center',
 alignItems: 'center',
width: 50
  }}>
      <Text style={styles.userRank}>#{index + 1}</Text>
    </View>
    <Text style={styles.userName}>{item.username}</Text>
    <Text style={styles.userDays}>{item?.totalCompletedExercises} consecutive Days</Text>
  </View>
</View>
              ))}
            </View>
            <TouchableOpacity onPress={() => setShowAll(!showAll)} style={styles.seeAllButton}>
              <Text style={styles.seeAllButtonText}>{showAll ? 'See Less' : 'See All'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Heaviest Squat</Text>
          <View style={styles.sectionBackground}>
            <View style={styles.userList}>
              {topItemsWeight.map((item, index) => (
                <View key={index} style={styles.userItem}>
                <View>
                  
                  <Image
                    source={
                      item?.userImage && item?.userImage !== ""
                        ? { uri: item?.userImage }
                        : require("../../assets/images/Pimg.jpeg")
                    }
                    style={styles.userAvatar}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.userInfo}>
                <View>
                    <Text style={styles.userRank}>#{index + 1}</Text>
                  </View>
                  <Text style={styles.userName}>{item.username}</Text>
                  <Text style={styles.userDays}>{item?.totalCompletedExercises} consecutive Days</Text>
                </View>
              </View>
              ))}
            </View>
            <TouchableOpacity onPress={() => setShowAllWeight(!showAllWeight)} style={styles.seeAllButton}>
              <Text style={styles.seeAllButtonText}>{showAllWeight ? 'See Less' : 'See All'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Most Messages Received</Text>
          <View style={styles.sectionBackground}>
            <View style={styles.userList}>
              {topItemsMessages.map((item, index) => (
                <View key={index} style={styles.userItem}>
                  <Text style={styles.userRank}>#{index + 1}</Text>
                  {item?.userImage && item?.userImage != "" ? (
                    <Image
                      source={{ uri: item?.userImage }}
                      style={styles.userAvatar}
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      source={require("../../assets/images/Pimg.jpeg")}
                      style={styles.userAvatar}
                      resizeMode="cover"
                    />
                  )}
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{item.username}</Text>
                    <Text style={styles.userDays}>{item?.totalMessages} Messages</Text>
                  </View>
                </View>
              ))}
            </View>
            <TouchableOpacity onPress={() => setShowAllMessages(!showAllMessages)} style={styles.seeAllButton}>
              <Text style={styles.seeAllButtonText}>{showAllMessages ? 'See Less' : 'See All'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 2,
    borderColor: '#FF8000',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tabTextOutline: {
    color: '#FF8000',
  },
  contentBackground: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginTop: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111214',
    textAlign: 'center',
  },
  sectionBackground: {
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
  },
  userList: {
    marginBottom: 10,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
  },
  userRank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'column',
   
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    paddingTop: 10,
  },
  userDays: {
    fontSize: 14,
    color: '#676C75',
  },
  seeAllButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  seeAllButtonText: {
    fontSize: 14,
    color: '#676C75',
    },

});

export default Achievements;
