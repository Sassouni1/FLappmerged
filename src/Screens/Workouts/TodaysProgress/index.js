import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import {
  getFontSize,
  getHeight,
  getWidth,
} from '../../../../utils/ResponsiveFun';
import {Divider} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import Feather from 'react-native-vector-icons/Feather';
import {GernalStyle} from '../../../constants/GernalStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import validator from '../../../../utils/validation/validator';
import {styles} from './styles';
import Button from '../../../Components/Button';
import {useDispatch} from 'react-redux';
import Header from '../../../Components/Header';
import {useSelector} from 'react-redux';
import {setLoader} from '../../../Redux/actions/GernalActions';
import {ApiCall} from '../../../Services/Apis';
validator;
const TodaysProgress = ({navigation, route}) => {
  const [select, setSelect] = useState(0);
  const [select1, setSelect1] = useState(0);
  const [select2, setSelect2] = useState(0);
  const {
    workoutId,
    exerciseId,
    warmup_objId,
    cooldown_objId,
    tasksId,
    datta,
    data,
    file,
    Dataa,
    submitted_requirements,
    exerciseName,
    description,
  } = route?.params;
  const user = useSelector(state => state.auth.userData);
  const token = useSelector(state => state.auth.userToken);
  const loader = useSelector(state => state.gernal.loader);
  const [task, setTask] = useState([]);
 

 
  

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />

      <Header
        title={'Task Detail'}
        LeftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              style={{alignSelf: 'center', marginRight: getWidth(20)}}
              name={'arrow-back'}
              size={25}
              color={'#182d4a'}
            />
          </TouchableOpacity>
        }
      />

      <Divider style={styles.headerDivider} />
      <ScrollView>
        <View style={styles.main}>
          <View style={{height: getHeight(7), width: getWidth(80)}}>
            <Text
              style={{
                fontSize: 15,
                lineHeight: 15,
                marginLeft: getWidth(26),
                width: getWidth(80),
                margin: 15,
                color: '#182d4a',
                fontFamily: 'Ubuntu-Bold',
              }}>
              Submitted successfully
            </Text>
          </View>
          <View style={{}}>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 15,
                marginLeft: getWidth(5),
                color: '#182d4a',
                fontFamily: 'Ubuntu-Bold',
              }}>
              Today’s progress
            </Text>

            {select == 1 ? (
              <TouchableOpacity
                onPress={() => {
                  setSelect(0);
                }}>
                <View style={styles.comments}>
                  <AntDesign name={'caretdown'} size={10} color={'#182d4a'} />
                  <Text
                    style={{
                      color: '#182d4a',
                      fontFamily: 'Ubuntu-Bold',
                      fontSize: 12,
                      marginLeft: 7,
                    }}>
                    A - Warm-up session |
                  </Text>
                  <View
                    style={{
                      height: 13,
                      backgroundColor: '#182d4a',
                      width: 13,
                      borderRadius: 13,
                      marginLeft: getWidth(1.5),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AntDesign name={'check'} size={8} color={'#FFFFFF'} />
                  </View>
                  <Text
                    style={{
                      color: '#182d4a',
                      fontFamily: 'Ubuntu-Bold',
                      fontSize: 12,
                      marginLeft: 3,
                    }}>
                    Completed
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setSelect(1);
                }}>
                <View style={styles.comments}>
                  <AntDesign name={'caretright'} size={10} color={'#182d4a'} />
                  <Text
                    style={{
                      color: '#182d4a',
                      fontFamily: 'Ubuntu-Bold',
                      fontSize: 12,
                      marginLeft: 7,
                    }}>
                    A - Warm-up session
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            <View style={{height: getHeight(2)}}></View>
            {select == 1 ? (
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={datta}
                  ListHeaderComponent={() => (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Ubuntu-Bold',
                            fontSize: 12,
                            lineHeight: 15,
                            marginLeft: getWidth(10),
                            color: '#182d4a',
                          }}>
                          Sets
                        </Text>
                        <Text
                          style={{
                            marginLeft: getWidth(28),
                            fontFamily: 'Ubuntu-Bold',
                            fontSize: 12,
                            lineHeight: 15,
                            color: '#182d4a',
                          }}>
                          Reps
                        </Text>
                        <Text
                          style={{
                            marginLeft: getWidth(28),
                            fontFamily: 'Ubuntu-Bold',
                            fontSize: 12,
                            lineHeight: 15,
                            color: '#182d4a',
                          }}>
                          Lb
                        </Text>
                      </View>
                    </View>
                  )}
                  renderItem={({item, index}) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: getHeight(1.5),
                        width: getWidth(100),

                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Ubuntu-Bold',
                          fontSize: 12,
                          lineHeight: 15,
                          color: '#182d4a',
                        }}>
                        {index + 1}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Ubuntu-Bold',
                          fontSize: 12,
                          lineHeight: 15,
                          color: '#182d4a',
                        }}>
                        {item.reps}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Ubuntu-Bold',
                          fontSize: 12,
                          lineHeight: 15,
                          color: '#182d4a',
                        }}>
                        {item.lebs}
                      </Text>
                      {/* {Dataa?.specifications.map((item)=><Text style={styles.label}>{item}</Text>)}
            {Dataa?.specifications.map((item)=><Text style={styles.label}>{item}</Text>)} */}
                      {/* <View
              style={{
                height: 26,
                backgroundColor: '#182d4a',
                width: 26,
                borderRadius: 13,
                marginRight: getWidth(1),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign name={'check'} size={15} color={'#FFFFFF'} />
            </View> */}
                    </View>
                  )}
                  ListEmptyComponent={() =>
                    loader ? null : (
                      <View>
                        <Image
                          style={{...styles.img, marginTop: getHeight(5)}}
                          source={require('../../../assets/images/empty.png')}
                        />
                      </View>
                    )
                  }
                />
              </View>
            ) : (
              <View></View>
            )}
            <Text
              style={{
                fontSize: 12,
                lineHeight: 15,
                marginLeft: getWidth(5),
                color: '#182d4a',
                marginTop: getHeight(5),
                fontFamily: 'Ubuntu-Bold',
              }}>
              Submitted Detail
            </Text>

            {select1 == 1 ? (
              <TouchableOpacity
                onPress={() => {
                  setSelect1(0);
                }}>
                <View style={styles.comments}>
                  <AntDesign name={'caretdown'} size={10} color={'#182d4a'} />
                  <Text
                    style={{
                      color: '#182d4a',
                      fontFamily: 'Ubuntu-Bold',
                      fontSize: 12,
                      marginLeft: 7,
                    }}>
                    A - Warm-up session |
                  </Text>
                  <View
                    style={{
                      height: 13,
                      backgroundColor: '#182d4a',
                      width: 13,
                      borderRadius: 13,
                      marginLeft: getWidth(1.5),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AntDesign name={'check'} size={8} color={'#FFFFFF'} />
                  </View>
                  <Text
                    style={{
                      color: '#182d4a',
                      fontFamily: 'Ubuntu-Bold',
                      fontSize: 12,
                      marginLeft: 3,
                    }}>
                    Completed
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setSelect1(1);
                }}>
                <View style={styles.comments}>
                  <AntDesign name={'caretright'} size={10} color={'#182d4a'} />
                  <Text
                    style={{
                      color: '#182d4a',
                      fontFamily: 'Ubuntu-Bold',
                      fontSize: 12,
                      marginLeft: 7,
                    }}>
                    A - Warm-up session
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            <View style={{height: getHeight(2)}}></View>
            {select1 == 1 ? (
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={Dataa}
                  ListEmptyComponent={() =>
                    loader ? null : (
                      <View>
                        <Image
                          style={{...styles.img, marginTop: getHeight(5)}}
                          source={require('../../../assets/images/empty.png')}
                        />
                      </View>
                    )
                  }
                  ListHeaderComponent={() => (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Ubuntu-Bold',
                            fontSize: 12,
                            lineHeight: 15,
                            marginLeft: getWidth(10),
                            color: '#182d4a',
                          }}>
                          Sets
                        </Text>
                        <Text
                          style={{
                            marginLeft: getWidth(28),
                            fontFamily: 'Ubuntu-Bold',
                            fontSize: 12,
                            lineHeight: 15,
                            color: '#182d4a',
                          }}>
                          Reps
                        </Text>
                        <Text
                          style={{
                            marginLeft: getWidth(28),
                            fontFamily: 'Ubuntu-Bold',
                            fontSize: 12,
                            lineHeight: 15,
                            color: '#182d4a',
                          }}>
                          Lb
                        </Text>
                      </View>
                    </View>
                  )}
                  renderItem={({item, index}) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: getHeight(1.5),
                        width: getWidth(94),

                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Ubuntu-Bold',
                          fontSize: 12,
                          lineHeight: 15,
                          color: '#182d4a',
                        }}>
                        {index + 1}
                      </Text>
                      {/* {data?.map((item)=> */}
                      <Text
                        style={{
                          fontFamily: 'Ubuntu-Bold',
                          fontSize: 12,
                          lineHeight: 15,
                          color: '#182d4a',
                        }}>
                        {item.reps}
                      </Text>
                      {/* )} */}

                      <Text
                        style={{
                          fontFamily: 'Ubuntu-Bold',
                          fontSize: 12,
                          lineHeight: 15,
                          color: '#182d4a',
                        }}>
                        {item.lebs}
                      </Text>
                      {/* {Dataa?.specifications.map((item)=><Text style={styles.label}>{item}</Text>)}
            {Dataa?.specifications.map((item)=><Text style={styles.label}>{item}</Text>)} */}
                      {/* <View
              style={{
                height: 26,
                backgroundColor: '#182d4a',
                width: 26,
                borderRadius: 13,
                marginRight: getWidth(1),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign name={'check'} size={15} color={'#FFFFFF'} />
            </View> */}
                    </View>
                  )}

                />
              </View>
            ) : (
              <View></View>
            )}

            <View>
              <Text
                style={{
                  ...styles.WorkOutDays,
                  marginTop: getHeight(2),
                  marginLeft: getWidth(5),
                }}>
                Comments
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  fontFamily: 'Ubuntu-Regular',
                  marginLeft: getWidth(5),
                  lineHeight: 14,
                  color: '#182d4a',
                }}>
                This is the comment added by the user at the end of a task.
                Lorem ipsum dolor sit amet, consectetur adipiscing eli. Integer
                magna felis.
              </Text>
            </View>

            <View>
              <Text
                style={{
                  ...styles.WorkOutDays,
                  marginTop: getHeight(2),
                  marginLeft: getWidth(5),
                }}>
                Attachments
              </Text>
            </View>
            <View>
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{marginTop: getHeight(2.8)}}
                horizontal={true}
                data={Dataa}
                ListEmptyComponent={() =>
                  loader ? null : (
                    <View>
                      <Image
                        style={{...styles.img, marginTop: getHeight(5)}}
                        source={require('../../../assets/images/empty.png')}
                      />
                    </View>
                  )
                }
                ListFooterComponent={() => (
                  <View style={{width: getWidth(1)}} />
                )}
                renderItem={({item, index}) => (
                  <View>
                    <Image
                      resizeMode="stretch"
                      numberOfLines={1}
                      style={styles.image}
                      source={
                        file?.image
                          ? {uri: file?.image}
                          : require('../../../assets/images/Profile.png')
                      }
                    />
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </View>
        <View style={{marginTop: getHeight(5)}}></View>
        <Button
          onPress={() =>
            navigation.navigate('WarmSession', {
              workoutId,
              exerciseId,
              warmup_objId,cooldown_objId,
              exerciseName,
              description,
              planId: user?.planId[user?.planId.length - 1],
            })
          }
          text="Go to next task"
          btnStyle={{
            ...GernalStyle.btn,
          }}
          btnTextStyle={GernalStyle.btnText}
        />
        <View style={styles.footer}></View>
      </ScrollView>
    </View>
  );
};
export default TodaysProgress;
