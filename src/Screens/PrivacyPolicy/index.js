import { View, Text } from 'react-native'
import React from 'react'
import { colors } from '../../../constants/colors'
import { fonts } from '../../../constants/fonts'
import { GernalStyle } from '../../../constants/GernalStyle'
const Messages = () => {
  return (
    <View style={{...GernalStyle.container,backgroundColor:colors.homeColor,justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize:15,color:colors.white,fontFamily:fonts.URe}}>Coming Soon</Text>
    </View>
  )
}

export default Messages