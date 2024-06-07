import React from 'react'
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {getFontSize} from '../../../../utils/ResponsiveFun'
import BackgroundImage from '../../../assets/images/aichatbot.png'
import OverlayImage from '../../../assets/images/BlackBackground.png'
import HeaderBottom from '../../../Components/HeaderBottom'
import GeneralStatusBar from '../../../Components/GeneralStatusBar'
import {styles} from './styles'

const WelcomeChatScreen = ({navigation}) => {
    return (
        <View style={{flex: 1, backgroundColor: '#000000'}}>
            <GeneralStatusBar barStyle="light-content" hidden={false} backgroundColor="#000000" />
            <HeaderBottom title={''} LeftIcon={<Ionicons size={25} color={'white'} onPress={() => navigation.goBack()} name="arrow-back" />} RightIcon={<View style={{marginRight: getFontSize(3.5)}} />} />
            <ImageBackground source={BackgroundImage} style={styles.backgroundImage} resizeMode="cover">
                <ImageBackground source={OverlayImage} style={styles.overlayImage}>
                    <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'transparent']} style={styles.gradient}>
                        <View style={styles.container}>
                            <View style={styles.headingContainer}>
                                <Text style={styles.heading}>Talk to Personal AI Fitness Coach</Text>
                            </View>
                            <Text style={styles.subheading}>Elevate your game with a personal fitness ai chatbot</Text>
                            <TouchableOpacity
                                style={styles.button}
                                activeOpacity={0.8}
                                onPress={() =>
                                    navigation.navigate('CreateChatScreen', {
                                        channelId: null,
                                        chatRoomType: null,
                                        sender: null,
                                        reciver: null
                                    })
                                }>
                                <View style={styles.buttonContent}>
                                    <Text style={styles.buttonText}>Create New Conversation</Text>
                                    <Icon name="add" size={24} color="#000000" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </ImageBackground>
        </View>
    )
}

export default WelcomeChatScreen