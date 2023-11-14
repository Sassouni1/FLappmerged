import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { getHeight,getFontSize,getWidth } from '../../../utils/ResponsiveFun';
import WorkoutDetails from '../WorkoutDetails';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useState} from 'react';
import AddWorkouts from './AddWorkouts';
import { GernalStyle } from '../../constants/GernalStyle';
import GeneralStatusBar from '../../Components/GeneralStatusBar';


const Tab1 = () => <WorkoutDetails />;
const Tab2 = () => <AddWorkouts  />;

const initialLayout = {width: Dimensions.get('window').width};

const Workouts = ({route}) => {
  const navigation = useNavigation();
console.log('route?.params?.data',route?.params?.data);
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const [index, setIndex] = useState(0);
  const [focusedTab, setfocusedTab] = useState(0);

  const [routes] = useState([
    {key: 'tab1', title: 'S&C Programs'},
    {key: 'tab2', title: 'My Calender'},
  ]);

  const renderScene = SceneMap({
    tab1: Tab1,
    tab2: Tab2,
  });
  useEffect(() => {
    if (route?.params?.data === 'tab2') {
      console.log('Setting index to 1 for "My Calendar" tab');
      setIndex(1);
    } else {
      console.log('Setting index to 0 for "S&C Programs" tab');
      setIndex(0);
    }
  }, [route?.params?.data]);

  return (
    <View style={{  flex: 1,
      backgroundColor: colors.primary,}}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={true}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={()=>  {navigation.openDrawer()}}>
          <FontAwesome name="bars" size={25} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>DaruStrong</Text>
      </View>

      <View
        style={{
          flex: 1,
        }}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          // onIndexChange={setIndex}
          onIndexChange={(i) => {
            setIndex(i); // Update the index state
            setfocusedTab(i); // Update the focusedTab state
          }}
          initialLayout={initialLayout}
          renderTabBar={props => (
            <TabBar
              {...props}
              gap={9}
              indicatorStyle={{
                backgroundColor: colors.buttonColor,
                paddingHorizontal: getWidth(3),
                width: getWidth(43),
              }}
              style={{
                backgroundColor: colors.primary,
                shadowColor: '#333333',
                // marginHorizontal: 25,
                marginLeft: getWidth(2),
                marginRight: getWidth(0),
                marginTop: 7,
              }}
              pressColor="#333333"
              pressOpacity={1.0}
              renderLabel={({route,focused}) => {
                //setfocusedTab(focused);
                return (
                  <View
                    key={route.key}
                    style={{
                      height: getHeight(5),
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      width: getWidth(100),
                    }}>
                    <View
                      style={{
                        width: getWidth(45),
                        height: getHeight(7.3),
                        backgroundColor:
                          focused
                            ? colors.buttonColorOp10
                            : colors.primary,
                        justifyContent: 'center',
                        alignItems: 'center',

                        // marginBottom: getHeight(1.8),
                        paddingTop: getHeight(0.4),
                        marginRight: 32,
                      }}>
                      <Text
                        style={{
                          color:
                            focused 
                              ? colors.buttonColor
                              : colors.textColor,
                          fontFamily: fonts.Re,
                          fontSize: 15,
                        }}>
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
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getWidth(3),
    paddingVertical: getHeight(2),
  },
  header1: {
    marginTop: 1,
  },
  title: {
    flex: 1, // Allow the title to take up remaining space
    fontSize: getFontSize(3.2),
    fontFamily: fonts.Re,
    color: colors.white,
    marginLeft: getWidth(2),
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
});

export default Workouts;
