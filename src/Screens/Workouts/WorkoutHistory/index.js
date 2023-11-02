import {View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList} from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../../constants/colors';
import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import { GernalStyle } from '../../../constants/GernalStyle';
import {useNavigation} from '@react-navigation/native'; 
import Feather from 'react-native-vector-icons/Feather';
import { getFontSize,getWidth,getHeight } from '../../../../utils/ResponsiveFun';
import {
  AngelDown,
  StrechSvg,
  CrunchSvg,
  RopeSvg,
  IconWhite,
  AngelUp,
} from '../../../assets/images';
import Seprator from '../../../Components/Seprator';
import { styles } from './styles';
import Button from '../../../Components/Button';


const WorkoutHistory = () => {
  const navigation = useNavigation();
  const [isTime, setIsTime] = useState(false);

  const dataArr = [
    {
      headingtext: 'Wheel Stretch',
      subTitle: '3 mins | 1 set | 15 reps',
      img: <StrechSvg height={getHeight(11)} width={getWidth(22)} />,
    },
    {
      headingtext: 'Full Crunches',
      subTitle: '5 mins | 2 sets | 25 reps',
      img: <CrunchSvg height={getHeight(11)} width={getWidth(22)} />,
    },
  ];
  const dataArr2 = [
    {
      headingtext: 'Battle rope',
      subTitle: '5 mins | 2 sets | 30 reps',
      img: <RopeSvg height={getHeight(11)} width={getWidth(22)} />,
    },
    {
      headingtext: 'Full Crunches',
      subTitle: '5 mins | 2 sets | 25 reps',
      img: <CrunchSvg height={getHeight(11)} width={getWidth(22)} />,
    },
  ];
  const DayCon = ({
    backgroundColor,
    color,
    colorDay,
    icon,
    dayName,
    dayDate,
    style
  }) => {
    return (
      <View style={[styles.dayconn, {backgroundColor: backgroundColor}]}>
        <Text style={[styles.dayText, {color: color}]}>{dayName}</Text>
        <Text style={[styles.datetexxt, {color: colorDay},style]}>{dayDate}</Text>
        {icon}
        {/* <RemoveIcon height={20} width={20} style={{marginTop:getHeight(.5)}}/> */}
      </View>
    );
  };
  return (
    <View style={{...GernalStyle.container, backgroundColor: colors.homeColor}}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={true}
      />
      <View style={GernalStyle.headerCon}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginLeft: getWidth(1)}}>
          <Feather
            name="chevron-left"
            size={getFontSize(5)}
            color={colors.gray3}
          />
        </TouchableOpacity>

        <Text style={GernalStyle.headertext}>Fri, Aug 1st</Text>
        <TouchableOpacity onPress={()=>setIsTime(!isTime)}>
            {isTime?<AngelUp height={15} width={15} style={{marginLeft: getWidth(3)}} />:<AngelDown height={15} width={15} style={{marginLeft: getWidth(3)}} />}
        

        </TouchableOpacity>
      </View>
      <ScrollView style={{marginBottom:getHeight(2)}} showsVerticalScrollIndicator={false} >
{
    isTime&&<View style={styles.isTimeCon}>
        <DayCon
              backgroundColor={colors.blackDark}
              dayDate={'1'}
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
              backgroundColor={colors.blackDarkOp}
              dayDate={'2'}
              dayName={'Tue'}
              colorDay={colors.white}
              color={colors.white}
              style={{marginTop:getHeight(2)}}
             
            />
            <DayCon
              backgroundColor={colors.blackDarkOp}
              dayDate={'3'}
              dayName={'Wed'}
              colorDay={colors.white}
              color={colors.white}
              style={{marginTop:getHeight(2)}}
             
            />
            <DayCon
              backgroundColor={colors.blackDarkOp}
              dayDate={'4'}
              dayName={'Thu'}
              colorDay={colors.white}
              color={colors.white}
              style={{marginTop:getHeight(2)}}
             
            />
            <DayCon
              backgroundColor={colors.blackDarkOp}
              dayDate={'5'}
              dayName={'Fri'}
              colorDay={colors.white}
              color={colors.white}
              style={{marginTop:getHeight(2)}}
             
            />
            <DayCon
              backgroundColor={colors.blackDarkOp}
              dayDate={'6'}
              dayName={'Sat'}
              colorDay={colors.white}
              color={colors.white}
              style={{marginTop:getHeight(2)}}
             

            />
            <DayCon
              backgroundColor={colors.blackDarkOp}
              dayDate={'7'}
              dayName={'Sun'}
              colorDay={colors.white}
              color={colors.white}
              style={{marginTop:getHeight(2)}}
             
            />
    </View>
}
      <View style={styles.spacebet}>
        <Text style={styles.chest}>Chest & Shoulders</Text>
        <Text style={styles.total}>9 total exercises</Text>
      </View>
      <Seprator
        style={{
          width: getWidth(95),
          alignSelf: 'center',
          marginTop: getHeight(1),
        }}
      />
      <View style={styles.spacebet}>
        <Text style={{...styles.chest, fontSize: getFontSize(2.6)}}>
          Superset
        </Text>
        <Text style={styles.total}>4 rounds | 2 exercises</Text>
      </View>
      {dataArr.map(item => {
     
        return (
          <TouchableOpacity
          onPress={()=>navigation.navigate('StartWorkout')}
            style={styles.conImg}>
            {item.img}
     
            <View style={{marginLeft: getWidth(2)}}>
              <Text
                style={styles.heading}>
                {item.headingtext}
              </Text>
              <Text style={{...styles.total, marginTop: getHeight(0.6)}}>
                {item.subTitle}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
      <Seprator
        style={styles.sep}
      />
      <View style={{...styles.spacebet,marginTop:getHeight(2)}}>
        <Text style={{...styles.chest, fontSize: getFontSize(2.6)}}>
          Superset
        </Text>
        <Text style={styles.total}>4 rounds | 2 exercises</Text>
      </View>
      {dataArr2.map(item => {

        return (
          <TouchableOpacity
          onPress={()=>navigation.navigate('StartWorkout')}
            style={{...styles.conImg,paddingHorizontal:getWidth(0)}}>
            {item.img}
     
            <View style={{marginLeft: getWidth(2)}}>
              <Text
                style={styles.heading}>
                {item.headingtext}
              </Text>
              <Text style={{...styles.total, marginTop: getHeight(0.6)}}>
                {item.subTitle}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
      <View style={{...styles.spacebet,marginTop:getHeight(2)}}>
        <Text style={{...styles.chest, fontSize: getFontSize(2.6)}}>
          Superset
        </Text>
        <Text style={styles.total}>4 rounds | 2 exercises</Text>
      </View>
      <Seprator
        style={styles.sep}
      />
      <FlatList
      data={dataArr2}
      ListFooterComponent={()=><View style={{height:getHeight(8)}}></View>}
      renderItem={({item})=>{
        return(
          <TouchableOpacity 
          onPress={()=>navigation.navigate('StartWorkout')}
            style={{...styles.conImg,paddingHorizontal:getWidth(0)}}>
            {item.img}
     
            <View style={{marginLeft: getWidth(2)}}>
              <Text
                style={styles.heading}>
                {item.headingtext}
              </Text>
              <Text style={{...styles.total, marginTop: getHeight(0.6)}}>
                {item.subTitle}
              </Text>
            </View>
          </TouchableOpacity>
        )
      }}
      />
    
      </ScrollView>
      <Button
      onPress={()=>navigation.navigate('StartWorkout')}
      buttonText={'Start workout'}
      style={{width:getWidth(60),backgroundColor:colors.greenlight,position:'absolute',bottom:getHeight(2)}}
      />
      
    </View>
  );
};

export default WorkoutHistory;
