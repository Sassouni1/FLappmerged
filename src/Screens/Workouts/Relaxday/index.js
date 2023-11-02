import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  Image,
  View,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';
import Header from '../../../Components/Header';
import {styles} from './styles';
import {
  getFontSize,
  getHeight,
  getWidth,
} from '../../../../utils/ResponsiveFun';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import { format } from "date-fns";
import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import {Divider} from 'react-native-paper';
import validator from '../../../../utils/validation/validator';
import {useSelector} from 'react-redux';
import {setLoader} from '../../../Redux/actions/GernalActions';
import {ApiCall} from '../../../Services/Apis';
const RelaxDay = ({navigation, route}) => {
  validator;
  const inputRefs = {task_comments: useRef(null)};

  const user = useSelector(state => state.auth.userData);
  const token = useSelector(state => state.auth.userToken);
  const loader = useSelector(state => state.gernal.loader);
  const [task_comments, setTask_comments] = useState([]);
  const formData = new FormData();
  formData.append('task_comments', task_comments)
  const [state, setState] = useState({
    task_commentsError:'',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    
 
  }, []);
  const changeHandler = (type, value) => setState({...state, [type]: value});
  return (
    <View style={styles.head}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />
      <Header
        title={'Relax Day'}
        LeftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              style={styles.backerrow}
              name={'arrow-back'}
              size={25}
              color={'#182d4a'}
            />
          </TouchableOpacity>
        }
      />
      <Divider style={styles.headerDivider} />
      <ScrollView>
         
         <Image
         resizeMode='contain'
          style={{width:getWidth(60),height:getHeight(30),alignSelf:'center',marginTop:getHeight(15)}}
             source={require('../../../assets/images/rlexDay.jpeg')}
                 />
                 <Text style={{alignSelf:'center',fontFamily: 'Ubuntu-Bold',width:getWidth(75),marginTop:getHeight(5),color:'#182d4a',textAlign:'center',lineHeight:'19'}}>Relaxation helps us feel healthier, not just physically but mentally too</Text>
          <View style={styles.footer}></View>
        
      </ScrollView>
    </View>
  );
};

export default RelaxDay;
