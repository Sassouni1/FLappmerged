import * as React from 'react'
import {Text, View} from 'react-native'
import {styles} from './style'

const HeaderChatBot = ({containerStyle, title, LeftIcon, RightIcon, titelStyle}) => {
    return (
        <View style={[styles.headerview, containerStyle]}>
            {LeftIcon}
            <Text style={[styles.headerTitle, titelStyle]}>{title}</Text>
            {RightIcon}
        </View>
    )
}
export default HeaderChatBot