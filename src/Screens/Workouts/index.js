import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { getFontSize, getHeight, getWidth } from '../../../utils/ResponsiveFun'
import GeneralStatusBar from '../../Components/GeneralStatusBar'
import { colors } from '../../constants/colors'
import { fonts } from '../../constants/fonts'
import WorkoutDetails from '../WorkoutDetails'
import AddWorkouts from './AddWorkouts'
import StandAlone from './StandAlone'


const Tab1 = () => <WorkoutDetails />
const Tab2 = () => <AddWorkouts />
const Tab3 = () => <StandAlone />


const initialLayout = { width: Dimensions.get('window').width }


const Workouts = ({ route }) => {
 const navigation = useNavigation()


 const [index, setIndex] = useState(0)
 const [focusedTab, setfocusedTab] = useState(0)


 const renderScene = SceneMap({
   tab1: Tab1,
   tab2: Tab2,
   tab3: Tab3,
 })


 const [routes] = useState([
   { key: 'tab1', title: 'Programs' },
   { key: 'tab3', title: 'Stand Alone' },
   { key: 'tab2', title: 'My Calendar' },
 ])


 useEffect(() => {
   if (route?.params?.data === 'tab2') {
     console.log('Setting index to 1 for "My Calendar" tab')
     setIndex(2)
   } else {
     console.log('Setting index to 0 for "S&C Programs" tab')
     setIndex(0)
   }
 }, [route,])


 console.log(route)


 return (
   <View style={{ flex: 1, backgroundColor: 'white' }}>
     <GeneralStatusBar hidden={false} translucent={true} />


     <View
       style={{
         flex: 1,
         paddingHorizontal: 10,
       }}
     >
       {/* {index === 0 && (
         <View style={styles.header}>
           <View style={styles.headerLeft}>
             <Image
               source={require('../../assets/images/workoutsgirlpic.png')}
             />
             <View style={styles.headerWords}>
               <Text style={styles.headerSubtext}>Ready for training 🏋️‍♀️</Text>
               <Text style={styles.headerText}>Start Training</Text>
             </View>
           </View>
           <TouchableOpacity>
             <Image
               source={require('../../assets/images/workoutssearch.png')}
             />
           </TouchableOpacity>
         </View>
       )} */}
         {index === 0 && (
          <View>
            <ImageBackground
              source={require("../../assets/images/guyback.png")}
              style={{
                width: Dimensions.get("screen").width,
                height: 360,
                position: "absolute",
                top: -60,
                right: 0,
                left: -10,
                resizeMode: "cover",
              }}
            >
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 60,
                  left: 20,
                  //   backgroundColor: "white",
                }}
                onPress={() => navigation.goBack()}
              >
                <Image
                  source={require("../../assets/images/workoutsbackbtn.png")}
                  style={{
                    objectFit: "fill",
                    height: 50,
                    width: 50,
                  }}
                />
              </TouchableOpacity>
            </ImageBackground>
            <View
              style={{
                borderRadius: 30,
                width: Dimensions.get("screen").width + 5,
                height: 100,
                backgroundColor: "white",
                position: "absolute",
                top: 250,
                right: 0,
                left: -12,
              }}
            />
          </View>
        )}

       {/* {index === 2 && (
         <View>
           <Image
             source={require('../../assets/images/guyback.png')}
             style={{
               width: Dimensions.get('screen').width,
               height: 360,
               position: 'absolute',
               top: -60,
               right: 0,
               left: -10,
               resizeMode: 'cover',
             }}
           />
           <View
             style={{
               borderRadius: 30,
               width: Dimensions.get('screen').width + 5,
               height: 100,
               backgroundColor: 'white',
               position: 'absolute',
               top: 250,
               right: 0,
               left: -12,
             }}
           />
         </View>
       )} */}

<TabView
          style={{
            position: "absolute",
            top: 100,
            left: 10,
            right: 10,
            bottom: 0,
          }}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          // onIndexChange={setIndex}
          onIndexChange={(i) => {
            setIndex(i); // Update the index state
            setfocusedTab(i); // Update the focusedTab state
          }}
          initialLayout={initialLayout}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              gap={0}
              indicatorStyle={{
                backgroundColor: "black",
                opacity: 0.9,
              }}
              style={{
                marginBottom: 10,
                backgroundColor: "lightgray",
                borderRadius: 15,
              }}
              renderLabel={({ route, focused, onPress }) => {
                // console.log('Clicked tab: ', route.title,props)
                //setfocusedTab(focused);
                return (
                  <View
                    key={route.key}
                    style={{
                      height: getHeight(3.5),
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        height: getHeight(5.7),
                        backgroundColor: focused ? "black" : "lightgray",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 15,
                        paddingHorizontal: 7,
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          color: focused ? "white" : "black",
                          fontFamily: fonts.Re,
                          fontSize: 15,
                          fontWeight: "600",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {route.title}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          )}
        />
     </View>
   </View>
 )
}


const styles = StyleSheet.create({
 header: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',


   paddingVertical: getHeight(2),
 },
 header1: {
   marginTop: 1,
 },
 headerLeft: {
   flexDirection: 'row',
   alignItems: 'center',
   gap: 12,
 },
 headerWords: {
   flexDirection: 'column',
   alignItems: 'flex-start',
 },
 headerSubtext: {
   fontFamily: 'Ubuntu',


   fontWeight: '500',
   fontStyle: 'normal',


   textAlign: 'center',
   color: 'gray',
 },
 headerText: {
   fontFamily: 'Ubuntu',
   fontSize: 26,
   fontWeight: '700',
   fontStyle: 'normal',


   color: 'black',
 },
 title: {
   flex: 1, // Allow the title to take up remaining space
   fontSize: getFontSize(3.2),
   fontFamily: fonts.Re,
   color: colors.white,
   marginLeft: getWidth(2),
   marginRight: getWidth(8),
   textAlign: 'center',
 },
 Btntext: {
   width: 95,
   height: 16,
   fontFamily: 'Ubuntu',
   fontSize: 14,
   fontWeight: '700',
   fontStyle: 'normal',
   lineHeight: 14,
   textAlign: 'center',
   color: '#F79300',
 },
 AnotherText: {
   width: 81,
   height: 16,
   fontFamily: fonts.URe,
   fontSize: 14,


   lineHeight: 14,
   textAlign: 'center',
   color: '#FFFFFF',
 },
 tabContent: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
 },
 tabBar: {
   backgroundColor: '#2196F3',
   margin: 14, // Customize tab bar background color
 },
 indicator: {
   backgroundColor: '#F79300', // Customize tab indicator color
 },
 label: {
   fontWeight: 'bold',
   fontSize: 14,
 },
})


export default Workouts