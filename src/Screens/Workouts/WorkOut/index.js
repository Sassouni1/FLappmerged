import * as React from 'react';
import {
  TouchableOpacity,
  Animated,
  Image,
  View,
} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {getWidth} from '../../../../utils/ResponsiveFun';
import {Divider} from 'react-native-paper';
import {styles} from './styles';
import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import Header from '../../../Components/Header';
import UpComing from '../../../Components/Upcoming';
import Past from '../../../Components/Past';
import {useSelector} from 'react-redux';
const WorkOut = ({navigation}) => {
  const user = useSelector(state => state.auth.userData);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'UpComing', title: 'Upcoming'},
    {key: 'Past', title: 'Past'},
  ]);
  const renderScene = SceneMap({
    UpComing: UpComing,
    Past: Past,
  });
  const renderTabBar = props => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={
                props?.navigationState?.index == i
                  ? route.key == 'UpComing'
                    ? styles.tabItem
                    : {
                        ...styles.tabItem,
                      }
                  : styles.unselect
              }
              onPress={() => setIndex(i)}>
              <Animated.Text
                style={
                  props?.navigationState?.index == i
                    ? styles.selectedTabText
                    : styles.TabTex
                }>
                {route.title}
              </Animated.Text>
              {props?.navigationState?.index == i ? (
                <View style={styles.animatedview} />
              ) : (
                <View style={styles.animatedview2} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />
      <Header
        title={'Workouts'}
        RightIcon={
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              style={styles.userImage}
              
              source={
                user?.profileImage
                  ? {uri: user?.profileImage}
                  : 
                  require('../../../assets/images/Profile.png')
              }
            />
          </TouchableOpacity>
        }
      />
      <Divider style={styles.headerDivider} />

      <View style={styles.contaner}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          initialLayout={{width: getWidth(100)}}
        />
      </View>
    </View>
  );
};

export default WorkOut;
