import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'

import {colors} from '../../../constants/colors'
import {getFontSize, getHeight, getWidth} from '../../../../utils/ResponsiveFun'
import {fonts} from '../../../constants/fonts'

const ChatsCard = ({item, index}) => {
    return (
        <View style={[styles.container, {marginTop: index == 0 ? getHeight(0.4) : getHeight(2)}]}>
            <View style={[styles.leftIconWrpper, {backgroundColor: item.colors ? item.colors : colors.orange}]}>{item.iconUrl && <Image source={item.iconUrl} style={styles.leftIcon} />}</View>
            <View style={styles.contentContainr}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Image source={require('../../../assets/images/right.png')} style={styles.rightIcon} />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <Image source={require('../../../assets/images/teamIcon.png')} style={styles.bottomIcon} />
                        <Text style={styles.description}>{item.subText}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: getWidth(2)}}>
                        <Image source={require('../../../assets/images/chatBubble.png')} style={styles.bottomIcon} />
                        <Text style={styles.description}>
                            {item.msgCount}
                            {' Total'}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: getWidth(91.2),
        height: getHeight(13.3),
        backgroundColor: colors.greyLight,
        paddingHorizontal: getWidth(2),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: getWidth(8),
        alignSelf: 'center'
    },

    leftIconWrpper: {
        backgroundColor: colors.orange,
        height: getHeight(8),
        width: getHeight(8),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: getWidth(6)
    },
    leftIcon: {
        height: getWidth(6),
        width: getWidth(6)
    },
    contentContainr: {
        width: getWidth(66),
        paddingLeft: getWidth(2),
        maxWidth: getWidth(66)
    },

    rightIcon: {
        height: getWidth(4),
        width: getWidth(8),
        alignSelf: 'flex-end'
    },
    bottomIcon: {
        height: getWidth(5),
        width: getWidth(5)
    },
    titleText: {
        color: colors.black,
        fontSize: getFontSize(2.5),
        fontFamily: fonts.WB,
        textAlign: 'left',
        alignSelf: 'flex-start'
    },
    description: {
        fontSize: getFontSize(2),
        fontFamily: fonts.WM,
        color: colors.greyText,
        paddingLeft: 2
    }
})

export default ChatsCard