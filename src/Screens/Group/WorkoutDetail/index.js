import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
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
import {GernalStyle} from '../../../constants/GernalStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import Button from '../../../Components/Button';
import Header from '../../../Components/Header';

const WorkoutDetail = ({navigation}) => {
  const [select, setSelect] = useState(0);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />

      <Header
        title={'David Warne - Fast-paced walk...'}
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
        <View style={styles.main}>
          <View style={{marginTop: getHeight(2.5)}}>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 15,

                color: '#182d4a',
                fontFamily: 'Ubuntu-Bold',
              }}>
              How to perform this excercise?
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                fontFamily: 'Ubuntu-Regular',
                lineHeight: 14,
                color: '#182d4a',
                marginTop: getHeight(1),
              }}>
              Here is a video to properly perform this excercise.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: getHeight(2.3),
              }}>
              <Ionicons name={'logo-youtube'} size={30} color={'#182d4a'} />
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 17,
                  fontFamily: 'Ubuntu-Bold',
                  marginLeft: getWidth(2),
                  color: '#182d4a',
                }}>
                View video guideline.
              </Text>
            </View>
            <View>
              <Text style={styles.WorkOutDays}>Description</Text>
            </View>
            <View>
              <Text style={styles.Description}>
                This is the program description added as workout details. Lorem
                ipsum dolor sit amet consectetur. Ut interdum aliquet
                suspendisse at eget tempor. Tristique ut pulvinar purus etiam
                tincidunt pellentesque commodo.
              </Text>
            </View>

            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Ubuntu-Bold',
                lineHeight: 15,

                color: '#182d4a',
                marginTop: getHeight(2.3),
              }}>
              Record sets
            </Text>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 15,
                fontFamily: 'Ubuntu-Regular',
                fontWeight: '400',
                color: '#182d4a',
                marginTop: getHeight(1),
                width: getWidth(90),
              }}>
              Save your excercise progress so that your coach can view and
              recommend next excercises accordingly.
            </Text>
          </View>

          <View style={{marginTop: getHeight(3.5)}}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontFamily: 'Ubuntu-Bold',
                  fontSize: 12,
                  lineHeight: 15,
                  color: '#182d4a',
                }}>
                Sets
              </Text>
              <Text
                style={{
                  marginLeft: getWidth(10),
                  fontFamily: 'Ubuntu-Bold',
                  fontSize: 12,
                  lineHeight: 15,
                  color: '#182d4a',
                }}>
                Reps
              </Text>
              <Text
                style={{
                  marginLeft: getWidth(25),
                  fontFamily: 'Ubuntu-Bold',
                  fontSize: 12,
                  lineHeight: 15,
                  color: '#182d4a',
                }}>
                Lb
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: getHeight(1.5),
                width: getWidth(90),

                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Ubuntu-Bold',
                  fontSize: 12,
                  lineHeight: 15,
                  color: '#182d4a',
                }}>
                1
              </Text>
              <View
                style={{
                  borderRadius: 15,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: '#E1DBE5',
                  width: getWidth(32),
                  height: getHeight(5),
                }}>
                <Text
                  style={{
                    color: '#182d4a',
                    fontFamily: 'Ubuntu-Regular',
                    fontSize: 12,
                    fontWeight: '400',
                    lineHeight: 15,
                  }}>
                  12
                </Text>
              </View>
              <TextInput
                mode="outlined"
                label=""
                theme={{roundness: 15}}
                outlineColor="#E1DBE5"
                activeUnderlineColor="#ffff"
                activeOutlineColor="#E1DBE5"
                style={{
                  borderRadius: 15,
                  borderWidth: 1,
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  borderColor: '#E1DBE5',
                  // width: getWidth(32),
                  // height: getHeight(5),
                  width: getWidth(32),
                  height: getHeight(5),
                  backgroundColor: 'white',
                  // padding: 0,
                  // margin: 0,
                }}
              />
              <View
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
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: getHeight(1.5),
                width: getWidth(90),

                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Ubuntu-Bold',
                  fontSize: 12,
                  lineHeight: 15,
                  color: '#182d4a',
                }}>
                2
              </Text>
              <View
                style={{
                  borderRadius: 15,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: '#E1DBE5',
                  width: getWidth(32),
                  height: getHeight(5),
                }}>
                <Text
                  style={{
                    color: '#182d4a',
                    fontFamily: 'Ubuntu-Regular',
                    fontSize: 12,
                    fontWeight: '400',
                    lineHeight: 15,
                  }}>
                  8
                </Text>
              </View>
              <TextInput
                mode="outlined"
                label=""
                theme={{roundness: 15}}
                outlineColor="#E1DBE5"
                activeUnderlineColor="#ffff"
                activeOutlineColor="#E1DBE5"
                style={{
                  borderRadius: 15,
                  borderWidth: 1,
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  borderColor: '#E1DBE5',
                  // width: getWidth(32),
                  // height: getHeight(5),
                  width: getWidth(32),
                  height: getHeight(5),
                  backgroundColor: 'white',
                  // padding: 0,
                  // margin: 0,
                }}
              />
              <View
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
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: getHeight(1.5),
                width: getWidth(90),

                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Ubuntu-Bold',
                  fontSize: 12,
                  lineHeight: 15,
                  color: '#182d4a',
                }}>
                3
              </Text>
              <View
                style={{
                  borderRadius: 15,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: '#E1DBE5',
                  width: getWidth(32),
                  height: getHeight(5),
                }}>
                <Text
                  style={{
                    color: '#182d4a',
                    fontFamily: 'Ubuntu-Regular',
                    fontSize: 12,
                    fontWeight: '400',
                    lineHeight: 15,
                  }}>
                  6
                </Text>
              </View>
              <TextInput
                mode="outlined"
                label=""
                theme={{roundness: 15}}
                outlineColor="#E1DBE5"
                activeUnderlineColor="#ffff"
                activeOutlineColor="#E1DBE5"
                style={{
                  borderRadius: 15,
                  borderWidth: 1,
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  borderColor: '#E1DBE5',
                  // width: getWidth(32),
                  // height: getHeight(5),
                  width: getWidth(32),
                  height: getHeight(5),
                  backgroundColor: 'white',
                }}
              />
              <View
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
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: getHeight(5),
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                borderColor: '#182d4a20',
                justifyContent: 'center',
                borderWidth: 1,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#182d4a50',
                  fontSize: 24,
                  fontWeight: '700',
                  fontFamily: 'Ubuntu-Bold',
                  lineHeight: 27,
                }}>
                -
              </Text>
            </View>

            <Text
              style={{
                color: '#182d4a',
                fontSize: 12,
                fontWeight: '700',
                fontFamily: 'Ubuntu-Bold',
                lineHeight: 15,
                width: getWidth(10),
                marginLeft: getWidth(4),
                alignSelf: 'center',
              }}>
              Sets
            </Text>

            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                borderColor: '#182d4a',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
              }}>
              <Text
                style={{
                  color: '#182d4a',
                  fontSize: 24,
                  fontWeight: '700',
                  fontFamily: 'Ubuntu-Bold',
                  lineHeight: 27,
                }}>
                +
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            ...styles.WorkOutDays,
            marginLeft: 15,
            marginTop: getHeight(2),
          }}>
          Submit your workout
        </Text>
        <View
          style={{
            height: getHeight(5.5),
            width: getWidth(93),
            backgroundColor: '#182d4a10',
            borderRadius: 15,
            alignSelf: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: getWidth(88),
              height: getHeight(5),
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text style={{color: '#182d4a', fontFamily: 'Ubuntu-Regular'}}>
              Attach video/image
            </Text>
            <Entypo name={'camera'} size={16} color={'#182d4a'} />
          </View>
        </View>
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
                Comments
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
                Comments
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {select == 1 ? (
          <View style={styles.commentsBox}>
            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                marginLeft: 10,
                marginTop: 10,
              }}>
              {/* <Image
                style={{width: 40, height: 40, borderRadius: 25}}
                source={require('../../../assets/images/Profile.png')}
              /> */}
              <View style={{marginLeft: 7}}>
                <Text
                  style={{
                    fontFamily: 'Ubuntu-Bold',
                    color: '#182d4a',
                    fontSize: 12,
                  }}>
                  John Doe
                  <Text
                    style={{
                      fontFamily: 'Ubuntu-SemiBold',
                      color: '#182d4a',
                      fontSize: 10,
                    }}>
                    {' '}
                    (Trainer)
                  </Text>
                </Text>
                <Text
                  style={{
                    fontFamily: 'Ubuntu-SemiBold',
                    color: '#182d4a',
                    fontSize: 10,
                  }}>
                  24 Nov, 2022 | 12:00 PM
                </Text>
              </View>
            </View>

            <Text
              style={{
                color: '#182d4a',
                marginLeft: 10,
                marginTop: 4,
                width: getWidth(87),
                textAlign: 'left',
                fontFamily: 'Ubuntu-Regular',
                fontSize: 12,
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing eli. Integer
              magna felis volutpat vitae, elit ullamcorper en. Eu velit odio
              nulla tincidunt. Vel porta et nunc aenean risus vivamus fermentum
              quis integer. In leo imperdiet velit, eget tempor id non ornare.
            </Text>
            <Image
              style={{
                margin: 10,
                height: getHeight(11),
                width: getWidth(27),
                borderRadius: 15,
              }}
              source={require('../../../assets/images/addequip.png')}
            />
            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                marginLeft: 10,
                marginTop: 12,
              }}>
              {/* <Image
                style={{width: 40, height: 40, borderRadius: 25}}
                source={require('../../../assets/images/Profile.png')}
              /> */}
              <View style={{marginLeft: 7}}>
                <Text
                  style={{
                    fontFamily: 'Ubuntu-Bold',
                    color: '#182d4a',
                    fontSize: 12,
                  }}>
                  You
                </Text>
                <Text
                  style={{
                    fontFamily: 'Ubuntu-SemiBold',
                    color: '#182d4a',
                    fontSize: 10,
                  }}>
                  24 Nov, 2022 | 12:00 PM
                </Text>
              </View>
            </View>

            <Text
              style={{
                color: '#182d4a',
                marginLeft: 10,
                marginTop: 5,
                width: getWidth(87),
                textAlign: 'left',
                fontFamily: 'Ubuntu-Regular',
                fontSize: 12,
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing eli. Integer
              magna felis volutpat vitae, elit ullamcorper en. Eu velit odio
              nulla tincidunt. Vel porta et nunc aenean risus vivamus fermentum
              quis integer. In leo imperdiet velit, eget tempor id non ornare.
            </Text>
            <View style={{...styles.commentsBox, width: getWidth(87)}}>
              <TextInput
                mode="outlined"
                // label="Email address"
              label={<Text style={GernalStyle.inputLabelStyle}>Email address</Text>} 

                theme={{roundness: 15}}
                placeholder="Write comment..."
                style={{
                  height: getHeight(5),
                  width: getWidth(80),
                  backgroundColor: 'white',
                  color: '#182d4a',
                  alignSelf: 'center',
                }}
              />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', margin: 10}}>
                  <Entypo
                    style={{margin: 3}}
                    name={'camera'}
                    size={16}
                    color={'#182d4a'}
                  />
                  <Text
                    style={{color: '#182d4a', fontFamily: 'Ubuntu-Regular'}}>
                    Attach video/image
                  </Text>
                </View>
                <View
                  style={{
                    height: getHeight(6),
                    width: getWidth(12),
                    backgroundColor: '#7D5098',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                    margin: 5,
                  }}>
                  <Ionicons name={'send'} size={16} color={'#FFFFFF'} />
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              <Text
                style={{
                  color: '#182d4a',
                  fontSize: 10,
                  fontFamily: 'Ubuntu-Bold',
                  fontSize: 10,
                }}>
                Expand comments
              </Text>
              <Entypo name={'menu'} size={11} color={'#182d4a'} />
            </View>
          </View>
        ) : (
          <View></View>
        )}

        <View style={styles.footer}></View>
        <Button
          onPress={() => navigation.navigate('WorkoutDetail1')}
          text="complete"
          btnStyle={{
            ...GernalStyle.btn,

            bottom: getHeight(5),
          }}
          btnTextStyle={GernalStyle.btnText}
        />
      </ScrollView>
    </View>
  );
};

export default WorkoutDetail;
