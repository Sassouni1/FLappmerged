import React, {useState, useRef} from 'react';
import {
  Text,
  Animated,
  Image,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {GernalStyle} from '../../../constants/GernalStyle';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../Components/Header';
import {validateFields} from '../../../../utils/validation/validate-fields';
import {styles} from './styles';
import {getFontSize, getHeight, getWidth} from '../../../../utils/ResponsiveFun';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import {SceneMap, TabView} from 'react-native-tab-view';
import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import {Divider} from 'react-native-paper';
import Comments from '../../../Components/Comments';
import WorkoutWeek from '../../../Components/WorkoutWeek';
import {useSelector} from 'react-redux';
const GroupDayWorkOuts = ({navigation}) => {
  const user = useSelector(state => state.auth.userData);
  const [index, setIndex] = useState(0);
  const [select, setSelect] = useState(0);
  const [routes] = React.useState([
    {key: 'WorkoutWeek', title: 'Workouts'},
    {key: 'Comments', title: 'Comments'},
  ]);
  const renderScene = SceneMap({
    WorkoutWeek: WorkoutWeek,
    Comments: Comments,
  });
  const renderTabBar = props => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={
                props?.navigationState?.index == i
                  ? route.key == 'WorkoutWeek'
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

  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />
      <Header
        title={' David Warne - tuesday workout'}
        LeftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              style={{alignSelf: 'center', marginRight: getWidth(2)}}
              name={'arrow-back'}
              size={25}
              color={'#182d4a'}
            />
          </TouchableOpacity>
        }
      />
      <Divider style={styles.headerDivider} />
  <ScrollView>
     
      <LinearGradient
        colors={['#FFFFFF','#F5F5F5','#F5F5F5','#F5F5F5','#F5F5F5','#F5F5F5','#F5F5F5', '#FFFFFF']}
        style={styles.main}>
              <View>
        <Text
          style={styles.WorkOutDays}>
          Workout description
        </Text>
      </View>
      <View>
        <Text
          style={styles.Description}>
          This is the program description added as workout details. Lorem ipsum dolor sit amet consectetur. Ut interdum aliquet suspendisse at eget tempor. Tristique ut pulvinar purus etiam tincidunt pellentesque commodo.
        </Text>
      </View>
          <Text style={{color:'#182d4a', fontFamily:'Ubuntu-Bold',fontSize:12, marginLeft:7}}>Exercises</Text>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('WarmUpSession')}>
          <View style={styles.listItem}>
            <View style={styles.alignView}>
              <View style={styles.circle}>
                <AntDesign name={'check'} size={15} color={'#FFFFFF'} />
              </View>
              <Text style={styles.title}>A - Warm-up session</Text>
            </View>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              size={25}
              color={'#182d4a'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('WarmUpSession')}>
          <View style={styles.listItem}>
            <View style={styles.alignView}>
              <View style={{...styles.circle, backgroundColor: '#E1DBE5'}}>
                <AntDesign name={'check'} size={15} color={'#FFFFFF'} />
              </View>
              <Text style={styles.title}>B - Bench press</Text>
            </View>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              size={25}
              color={'#182d4a'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('WarmUpSession')}>
          <View style={styles.listItem}>
            <View style={styles.alignView}>
              <View style={{...styles.circle, backgroundColor: '#E1DBE5'}}>
                <AntDesign name={'check'} size={15} color={'#FFFFFF'} />
              </View>
              <Text style={styles.title}>C - Shoulder stretch</Text>
            </View>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              size={25}
              color={'#182d4a'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('WarmUpSession')}>
          <View style={styles.listItem}>
            <View style={styles.alignView}>
              <View style={{...styles.circle, backgroundColor: '#E1DBE5'}}>
                <AntDesign name={'check'} size={15} color={'#FFFFFF'} />
              </View>
              <Text style={styles.title}>D - Chest stretch</Text>
            </View>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              size={25}
              color={'#182d4a'}
            />
          </View>
        </TouchableOpacity>
        {select==1 ?(   <TouchableOpacity    
        onPress={() => {
               setSelect(0);
            }}>
        <View style={styles.comments}>
        <AntDesign
              name={'caretdown'}
              size={10}
              color={'#182d4a'}
            />
        <Text 
        style={{color:'#182d4a', fontFamily:'Ubuntu-Bold',fontSize:12, marginLeft:7}}>
          Comments
          </Text>
        </View>
        </TouchableOpacity>):(
                  <TouchableOpacity       onPress={() => {
                    setSelect(1);
                 }}>
                  <View style={styles.comments}>
                  <AntDesign
                        name={'caretright'}
                        size={10}
                        color={'#182d4a'}
                      />
                  <Text 
                  style={{color:'#182d4a', fontFamily:'Ubuntu-Bold',fontSize:12, marginLeft:7}}>
                    Comments
                    </Text>
                  </View>
                  </TouchableOpacity>
        )}
     

        </LinearGradient>
        {select==1? (<View style={styles.commentsBox}>
        <View style={{justifyContent:'flex-start',flexDirection:'row',marginLeft:10,marginTop:10}}>
          {/* <Image
          style={{width:40,height:40,borderRadius:25}}
             source={require('../../../assets/images/Profile.png')}
                 /> */}
                 <View style={{marginLeft:7}}>
             <Text style={{fontFamily:'Ubuntu-Bold',color:'#182d4a',fontSize:12}}>John Doe<Text style={{fontFamily:'Ubuntu-SemiBold', color:'#182d4a',fontSize:10}}> (Trainer)</Text></Text>
             <Text style={{fontFamily:'Ubuntu-SemiBold', color:'#182d4a',fontSize:10}}>24 Nov, 2022 | 12:00 PM</Text>
          </View>
          
      </View>
      
      <Text style={{color:'#182d4a',marginLeft:10,marginTop:5,width:getWidth(87),textAlign:'left',fontFamily:'Ubuntu-Regular',fontSize:12}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing eli. Integer magna felis volutpat vitae, elit ullamcorper en. Eu velit odio nulla tincidunt. Vel porta et nunc aenean risus vivamus fermentum quis integer. In leo imperdiet velit, eget tempor id non ornare.
        </Text>
      <Image
          style={{margin:10,height:getHeight(11),width:getWidth(27),borderRadius:15}}
             source={require('../../../assets/images/addequip.png')}
                 />
                  <View style={{justifyContent:'flex-start',flexDirection:'row',marginLeft:10,marginTop:10}}>
          {/* <Image
          style={{width:40,height:40,borderRadius:25}}
             source={require('../../../assets/images/Profile.png')}
                 /> */}
                 <View style={{marginLeft:7}}>
             <Text style={{fontFamily:'Ubuntu-Bold',color:'#182d4a',fontSize:12}}>You</Text>
             <Text style={{fontFamily:'Ubuntu-SemiBold', color:'#182d4a',fontSize:10}}>24 Nov, 2022 | 12:00 PM</Text>
          </View>
          
      </View>
      
      <Text style={{color:'#182d4a',marginLeft:10,marginTop:5,width:getWidth(87),textAlign:'left',fontFamily:'Ubuntu-Regular',fontSize:12,marginBottom:10}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing eli. Integer magna felis volutpat vitae, elit ullamcorper en. Eu velit odio nulla tincidunt. Vel porta et nunc aenean risus vivamus fermentum quis integer. In leo imperdiet velit, eget tempor id non ornare.
        </Text>
        <View style={{...styles.commentsBox,width:getWidth(87)}}>
        <TextInput
              mode="outlined"
              label="Email address"
              theme={{roundness: 15}}
              outlineColor="#BDC3C4"
              placeholder='Write comment...'
              activeUnderlineColor="#182d4a"
              activeOutlineColor="#BDC3C4"
              style={{height: getHeight(5),
                width: getWidth(80),
                backgroundColor: 'white',
                color: '#182d4a',
                alignSelf: 'center',
                }}
            />
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',margin:10}}>
            <Entypo
            style={{margin:3}}
              name={'camera'}
              size={16}
              color={'#182d4a'}
            />
              <Text style={{color:'#182d4a',fontFamily:'Ubuntu-Regular'}}>Attach video/image</Text>
            </View>
            <View style={{height:getHeight(6),width:getWidth(12),backgroundColor:'#7D5098',justifyContent:'center',alignItems:'center',borderRadius:15,margin:5}}>
            <Ionicons

              name={'send'}
              size={19}
              color={'#FFFFFF'}
            />
            </View>
            </View>
        </View>
        <View style={styles.footer}>
          <Text style={{color:'#182d4a',fontSize:10,fontFamily:'Ubuntu-Bold',fontSize:10}}>Expand comments</Text>
          <Entypo
              name={'menu'}
              size={11}
              color={'#182d4a'}
            />
        </View>
        </View>):(<View></View>)}
        
       <View style={styles.footer}></View>
      </ScrollView>
    </View>
    
  );
};

export default GroupDayWorkOuts;
