import React from 'react';
import {Text, View, TouchableOpacity, Image,FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getFontSize, getHeight, getWidth} from '../../../../utils/ResponsiveFun';
import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import {Divider} from 'react-native-paper';
import {styles} from './styles';
import Header from '../../../Components/Header';
import {useSelector} from 'react-redux';
const GroupsName = ({navigation}) => {
    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
      
      ];
      const DATA1 = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
      ];
  const user = useSelector(state => state.auth.userData);
  return (
    <View style={styles.contaner}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />
      <Header
        title={'Group name'}
        RightIcon={
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Text
              style={styles.userImage}>
              4 members
            </Text>
          </TouchableOpacity>
        }
      />
      <Divider style={styles.headerDivider} />
      <LinearGradient
        colors={['#F5F5F5', '#F5F5F5', '#FFFFFF']}
        style={styles.main}>
            <View>
            <FlatList
        data={DATA}
        ListFooterComponent={()=>(<View style={{height:getHeight(1)}}></View>)}
        ListHeaderComponent={()=>(<View style={{}}>

            <Text style={{color:'#182d4a',fontFamily:'Ubuntu-Bold',fontSize:12,marginLeft:getWidth(6),marginTop:getWidth(2)}}>Your progress</Text>
        </View>)}
        renderItem={()=>(
        <TouchableOpacity
            activeOpacity={1}
            style={styles.listItem}
            onPress={() => navigation.navigate('SelectedGroup')}>
  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
              <Image
              style={{height:20,width:20,borderRadius:20}}
                source={
                  // user?.profileImage
                  //   ? {uri: user?.profileImage}
                  //   : 
                    require('../../../assets/images/Profile.png')
                }
              />
            <Text style={styles.itemTitle}>John Doe</Text>
            </View>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              size={25}
              color={'#182d4a'}
            />
            
          </TouchableOpacity>)}
        keyExtractor={item => item.id}
      />
      </View>
      <View>
            <FlatList
        data={DATA1}
        ListFooterComponent={()=>(<View style={{height:getHeight(2)}}></View>)}
        ListHeaderComponent={()=>(<View style={{}}>

            <Text style={{color:'#182d4a',fontFamily:'Ubuntu-Bold',fontSize:12,marginLeft:getWidth(6),marginTop:getWidth(2)}}>Other members</Text>
        </View>)}
        renderItem={()=>(
        <TouchableOpacity
            activeOpacity={1}
            style={styles.listItem}
            onPress={() => navigation.navigate('SelectedGroup')}>
  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
              <Image
              style={{height:20,width:20,borderRadius:20}}
                source={
                  // user?.profileImage
                  //   ? {uri: user?.profileImage}
                  //   : 
                    require('../../../assets/images/Profile.png')
                }
              />
            <Text style={styles.itemTitle}>David Warne</Text>
            </View>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              size={25}
              color={'#182d4a'}
            />
            
          </TouchableOpacity>)}
        keyExtractor={item => item.id}
      />
      </View>
     
      </LinearGradient>
    </View>
  );
};
export default GroupsName;