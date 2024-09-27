import { View, Text } from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors'
import { getWidth } from '../../../utils/ResponsiveFun'


const Seprator = ({style}) => {
  return (
    <View style={[{height:1,backgroundColor:colors.secondary,width:getWidth(100)},style]}>
      
    </View>
  )
}

export default Seprator