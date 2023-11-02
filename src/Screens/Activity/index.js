import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';

import {colors} from '../../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo'
import {getHeight, getWidth, getFontSize} from '../../../utils/ResponsiveFun';
import {
  AgreeIcon,
  AngelLeft,
  AngelRight,
  CalenderSvg,
  DelIcon,
  Ellipse,
  GraphActivity,
  IconWhite,
  RemoveIcon,
} from '../../assets/images';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import GeneralStatusBar from '../../Components/GeneralStatusBar';
import HeaderBottom from '../../Components/HeaderBottom';



const Activity = () => {
  const navigation=useNavigation()
  

  const DayCon = ({
    backgroundColor,
    color,
    colorDay,
    icon,
    dayName,
    dayDate,
  }) => {
    return (
      <View style={[styles.dayconn, {backgroundColor: backgroundColor}]}>
        <Text style={[styles.dayText, {color: color}]}>{dayName}</Text>
        <Text style={[styles.datetexxt, {color: colorDay}]}>{dayDate}</Text>
        {icon}
      </View>
    );
  };
  return (
    <View style={styles.contaner}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="rgba(51, 51, 51, 1)"
        translucent={true}
      />
      <HeaderBottom
        title={<Text style={{textAlign:'center'}}>Hello!{`\n`}<Text style={{fontSize:12}}>Here’s how you’re going.</Text></Text>}
     
        LeftIcon={
          <Entypo size={30} style={{alignSelf:'flex-start'}} color={'white'} onPress={()=>navigation.openDrawer()} name='menu'/>
        }
        RightIcon={<View/>}
      />
    
        <Text
          style={styles.progress}>
          Your Progress
        </Text>

        <View
          style={styles.textconn}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <DayCon
              backgroundColor={colors.timeCon}
              dayDate={'27'}
              dayName={'Sat'}
              colorDay={colors.buttonColor}
              color={colors.buttonColor}
              icon={
                <RemoveIcon
                  height={20}
                  width={20}
                  style={{marginTop: getHeight(0.5)}}
                />
              }
            />
            <DayCon
              backgroundColor={colors.timeCon}
              dayDate={'28'}
              dayName={'Fri'}
              colorDay={colors.greenlight}
              color={colors.greenlight}
              icon={
                <AgreeIcon
                  height={20}
                  width={20}
                  style={{marginTop: getHeight(0.5)}}
                />
              }
            />
            <DayCon
              backgroundColor={colors.timeCon}
              dayDate={'29'}
              dayName={'Sun'}
              colorDay={colors.redtime}
              color={colors.redtime}
              icon={
                <DelIcon
                  height={20}
                  width={20}
                  style={{marginTop: getHeight(0.5)}}
                />
              }
            />
            <DayCon
              backgroundColor={colors.blackOp}
              dayDate={'30'}
              dayName={'Mon'}
              colorDay={colors.white}
              color={colors.white}
              icon={
                <IconWhite
                  height={20}
                  width={20}
                  style={{marginTop: getHeight(0.5)}}
                />
              }
            />
            <DayCon
              backgroundColor={colors.timeCon}
              dayDate={'1'}
              dayName={'Tue'}
              colorDay={colors.white}
              color={colors.white}
              icon={
                <IconWhite
                  height={20}
                  width={20}
                  style={{marginTop: getHeight(0.5)}}
                />
              }
            />
            <DayCon
              backgroundColor={colors.timeCon}
              dayDate={'2'}
              dayName={'Wed'}
              colorDay={colors.white}
              color={colors.white}
              icon={
                <IconWhite
                  height={20}
                  width={20}
                  style={{marginTop: getHeight(0.5)}}
                />
              }
            />
            <DayCon
              backgroundColor={colors.timeCon}
              dayDate={'3'}
              dayName={'Thu'}
              colorDay={colors.white}
              color={colors.white}
              icon={
                <IconWhite
                  height={20}
                  width={20}
                  style={{marginTop: getHeight(0.5)}}
                />
              }
            />
          </ScrollView>
        </View>
        <View style={{justifyContent: 'center',marginVertical:getHeight(2), alignItems: 'center'}}>
          <Ellipse height={getHeight(21)} width={getWidth(58)} />
          <Text
            style={styles.fourtyper}>
            40%
          </Text>
          <Text
            style={styles.todayt}>
            Today’s progress
          </Text>
        </View>
        <View
          style={styles.spaceBet}>
          <Text
            style={styles.activty}>
            Activity
          </Text>
          <View style={styles.activityCon}>
            <AngelLeft height={15} width={15} />
            <CalenderSvg
              height={15}
              width={15}
              style={{marginLeft: getWidth(2)}}
            />
            <Text
              style={styles.textDay}>
              21 - 28 Apr, 2023
            </Text>
            <AngelRight
              height={15}
              width={15}
              style={{marginLeft: getWidth(1)}}
            />
          </View>
        </View>
        <View
          style={styles.graphCon}>
          <GraphActivity
            height={getHeight(30)}
            width={getWidth(100)}
            style={{alignSelf: 'center'}}
          />
        </View>

    </View>
  );
};

export default Activity;
