import React, {useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  FlatList,
  Text,
  View,

  TouchableOpacity,
} from 'react-native';
import Image from 'react-native-image-modal';

import {TextInput} from 'react-native-paper';
import {ApiCall} from '../../../Services/Apis';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';
import Button from '../../../Components/Button';
import {validateFields} from '../../../../utils/validation/validate-fields';
import {styles} from './styles';
import {
  getFontSize,
  getHeight,
  getWidth,
} from '../../../../utils/ResponsiveFun';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import validator from '../../../../utils/validation/validator';
import {GernalStyle} from '../../../constants/GernalStyle';
import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import {Divider} from 'react-native-paper';
import {setLoader} from '../../../Redux/actions/GernalActions';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../../Components/Header';
import ImageCropPicker from 'react-native-image-crop-picker';
import SimpleToast from 'react-native-simple-toast';
import { BASE_URL } from '../../../Services/Constants';
validator;
const AddNewEquipments = ({route}) => {
  const {getAllEquipment} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const inputRefs = {
    Comments: useRef(null),
    equipmentName: useRef(null),
    specifications: useRef(null),
  };
  const [category, setCategory] = useState([]);

  const [errors, setErrors] = useState({});
  const [file, setFile] = useState([]);
  const changeHandler = (type, value) => setState({...state, [type]: value});
  const [specifications, setspecifications] = useState([]);
  const user = useSelector(state => state.auth.userData);

  const token = useSelector(state => state.auth.userToken);
  const [state, setState] = useState({
    fileError: '',
    category: '',
    categoryError: '',
    issue: '',
    IssueError: '',
    equipmentName: '',
    equipmentNameError: '',
    specifications: '',
    specificationsError: '',
  });

  const save = async () => {
    const {equipmentName, category} = state;
    const equipmentNameError = await validator('equipmentName', equipmentName);
    const categoryError = await validator('category', category);
    const specificationsError = await validator(
      'specifications',
      specifications,
    );
    const fileError = await validator('file', file);
    if (
      !equipmentNameError &&
      !categoryError &&
      !fileError &&
      !specificationsError
    ) {
      dispatch(setLoader(true));

      const formData = new FormData();
      file?.map(item => formData.append('images', item));
      formData.append('category', category);
      specifications.length==1?specifications.map(item =>{formData.append('specifications', item);formData.append('specifications', item)}):specifications.map(item => formData.append('specifications', item))
      formData.append('equipmentName', equipmentName);
  
      fetch(BASE_URL + '/equipment/addEquipment', {
        method: 'POST',
        body: formData,
    
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => { SimpleToast.show(res?.response?.message);
          getAllEquipment();
        navigation.goBack();
        dispatch(setLoader(false));})
        .then((result) => console.log("result",result))
        .catch((error) => console.error("catch",error));



    } else {
      dispatch(setLoader(false));
      setState({
        ...state,
        equipmentNameError,
        categoryError,
        fileError,
        specificationsError,
      });
      // alert(
      //   res?.response?.message ? res?.response?.message : res?.response?.error,
      // );
    }
  };
  const Addspecification = async () => {
    setspecifications([...specifications, '']);
  };
  const UploadFile = async () => {
    const options = {
      mediaTypes: 'Images',
      quality: 0.5,
      allowsEditing: true,
      aspect: [4, 3],
    };
    const response = await ImageCropPicker.openPicker(options);

    if (!response.cancelled) {
      let fileObj1 = {
        uri:response?.path,
        name: response?.filename,
        type: response?.mime,
        size:response?.size
      };
      setFile([fileObj1, ...file]);
      setState({...state, fileError: ''});
      setErrors({...errors, file: ''});
    }
  };

  const getCategorys = async () => {
    try {
      const res = await ApiCall({
        route: `category/getCategoryOnUserSide/${user?.coachId?._id}`,
        token: token,
        verb: 'get',
      });
      if (res?.status == '200') {
        const arr=[]
        res?.response.map((item)=>arr.push(item?.category_Name))
        setCategory(arr);
        dispatch(setLoader(false));
      } else {
        console.log('error', res.response);
        dispatch(setLoader(false));
      }
    } catch (e) {
      console.log('saga get language error -- ', e.toString());
    }
  };

 

  useEffect(() => {
    getCategorys();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />
      <Header
        title={' Add new equipment'}
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
      <KeyboardAwareScrollView>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{marginTop: getHeight(2.8)}}
            horizontal={true}
            data={file}
            ListHeaderComponent={() => (
              <TouchableOpacity onPress={() => UploadFile()}>
                <View style={styles.image}>
                  <Feather
                    style={{alignSelf: 'center'}}
                    name={'image'}
                    size={25}
                    color={'#7D5098'}
                  />
                  <Text style={styles.text}>Add an image</Text>
                </View>
              </TouchableOpacity>
            )}
            ListFooterComponent={() => <View style={{width: getWidth(4)}} />}
            renderItem={({item, index}) => (
              <View>
                <Image
                  resizeMode="contain"
                  numberOfLines={1}
                  style={styles.image}
                  source={item}
                />
                <Entypo
                  name={'cross'}
                  size={25}
                  color={'#EB5757'}
                  style={styles.icon1}
                  onPress={() => {
                    setFile(file.filter(a => a != item));
                  }}
                />
              </View>
            )}
            keyExtractor={item => item.id}
          />
          
            <View style={{marginBottom: getHeight(2), marginTop: getHeight(2)}}>
 
              <TextInput
                mode="outlined"
                // label="Equipment name"
              label={<Text style={GernalStyle.inputLabelStyle}>Equipment name</Text>} 

                theme={{roundness: 15}}
                outlineColor="#BDC3C4"
              activeUnderlineColor="#182d4a"
              activeOutlineColor="#182d4a"
                ref={inputRefs.equipmentName}
                value={state.equipmentName}
                style={GernalStyle.input}
                returnKeyType={'next'}
                keyboardType="default"
                blurOnSubmit={false}
                onFocus={() => setState({...state, equipmentNameError: ''})}
                onBlur={() =>
                  validateFields(state.equipmentName, 'equipmentName', error =>
                    setState({...state, equipmentNameError: error}),
                  )
                }
                onSubmitEditing={() =>
                  inputRefs['category'].current.focus()
                }
                onChangeText={equipmentName =>
                  changeHandler('equipmentName', equipmentName)
                }
              />
             {state.equipmentNameError&&<Text style={{...GernalStyle.InputError,marginLeft:25}}>{state.equipmentNameError}</Text>}
            </View>
       
          <SelectDropdown
            data={category}
            defaultValue={state.category}
            onSelect={(category, index) => {
              setState({...state, category: category, IssueError: ''});
            }}
            defaultButtonText={'Category of equipment'}
            buttonTextAfterSelection={(category, index) => {
              return category;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={{
              ...GernalStyle.input,
              borderWidth: 1,
              borderRadius: 15,
              borderColor: '#BDC3C4',
            }}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#BDC3C4'}
                  size={14}
                />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
             {state.categoryError&&<Text style={{...GernalStyle.InputError,marginLeft:25}}>{state.categoryError}</Text>}

   
        <View style={{marginBottom: getHeight(1), marginTop: getHeight(3.5)}}>
          <Text style={styles.heading}>Specifications of equipment</Text>
        </View>
    
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={specifications}
            ListFooterComponent={() => (
              <View
                style={{marginLeft: getWidth(5), marginBottom: getHeight(10)}}>
                <TouchableOpacity onPress={() => Addspecification()}>
                  <Text
                    style={{
                      color: '#182d4a',
                      fontSize: 12,
                      fontFamily: 'Ubuntu-Bold',
                    }}>
                    + Add specification
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            renderItem={({item, index}) => (
              <View style={{marginBottom: getHeight(2)}}>
                <TextInput
                  mode="outlined"
                  // label={`Specification ${index + 1}`}
              label={<Text style={GernalStyle.inputLabelStyle}>{`Specification ${index + 1}`}</Text>} 

                  theme={{roundness: 15}}
                  outlineColor="#BDC3C4"
                  activeUnderlineColor="#182d4a"
                  activeOutlineColor="#182d4a"
                  // ref={inputRefs.category}
                  value={item}
                 
                  onSubmitEditing={() => save()}
                  onChangeText={e => {
                    specifications[index] = e;
                    setspecifications([...specifications]);
                  }}
                  style={GernalStyle.input}
                  returnKeyType={'next'}
                  keyboardType="default"
                  blurOnSubmit={false}
                  right={
                    <TextInput.Icon
                      name={() => (
                        <Entypo

                        name={'cross'}
                        size={25}
                        color={'#182d4a15'}
                        style={{alignSelf:'center',marginTop:7}}
                       onPress={() => {
                        setspecifications(specifications.filter(a => a != item));
            }}
                      />
                      )}
                    />
                  }
                />
              </View>
            )}
            keyExtractor={item1 => item1.id}
          />
        </KeyboardAwareScrollView>

        <View
          style={{
            width: getWidth(100),
            paddingHorizontal: getWidth(5),
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: getHeight(5),
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Equipments')}>
            <Text onPress={() => navigation.goBack()} style={styles.skip}>
              Cancel
            </Text>
          </TouchableOpacity>

          <Button
            onPress={() => save()}
            text="Add & save"
            btnStyle={{...GernalStyle.btn, width: getWidth(30)}}
            btnTextStyle={GernalStyle.btnText}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddNewEquipments;
