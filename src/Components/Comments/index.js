import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
const Comments = ({navigation}) => {
  const user = useSelector(state => state.auth.userData);
  const [index, setIndex] = React.useState(0);

  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <LinearGradient
        colors={['#F5F5F5', '#F5F5F5', '#FFFFFF']}
        style={styles.main}>
      <View style={{justifyContent:'flex-start',flexDirection:'row',margin:10}}>
          <Image
          style={{width:50,height:50,borderRadius:25}}
             source={require('../../assets/images/Profile.png')}
                 />
                 <View>
<Text style={{fontFamily:'Ubuntu-Bold',color:'#182d4a'}}>Trainer</Text>
<Text style={{fontFamily:'Ubuntu-SemiBold', color:'#182d4a'}}>John Doe</Text>
          </View>
          
      </View>
      <Text style={{color:'#182d4a',margin:10,textAlign:'justify',fontFamily:'Ubuntu-Regular'}}>Lorem ipsum dolor sit amet, consectetur adipiscing eli. Integer magna felis volutpat vitae, elit ullamcorper en. Eu velit odio nulla tincidunt. Vel porta et nunc aenean risus vivamus fermentum quis integer. In leo imperdiet velit, eget tempor id non ornare.</Text>
      <Image
          style={{margin:10}}
             source={require('../../assets/images/Profile.png')}
                 />
      </LinearGradient>
    </View>
  );
};

export default Comments;
