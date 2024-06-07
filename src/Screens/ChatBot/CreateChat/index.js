import React, {useEffect, useState, useRef} from 'react'
import {View, Text, ImageBackground, Image} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {getFontSize, getHeight, getWidth} from '../../../../utils/ResponsiveFun'
import OverlayImage from '../../../assets/images/BlackBackground.png'
import HeaderBottom from '../../../Components/HeaderBottom'
import GeneralStatusBar from '../../../Components/GeneralStatusBar'
import {colors} from '../../../constants/colors'
import {styles} from './styles'
import * as Progress from 'react-native-progress'

const CreateChatScreen = ({navigation}) => {
    const [progress, setProgress] = useState(0.1)
    const intervalIdRef = useRef(null)
    useEffect(() => {
        intervalIdRef.current = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 1) {
                    clearInterval(intervalIdRef.current)
                    return prevProgress
                }
                return prevProgress + 0.2
            })
        }, 1000)

        return () => {
            clearInterval(intervalIdRef.current)
            setProgress(0)
        }
    }, [])
    useEffect(() => {
        if (progress > 1) {
            navigation.navigate('ChatScreen')
        }
    }, [progress])

    return (
        <View style={{flex: 1, backgroundColor: '#feb532'}}>
            <GeneralStatusBar barStyle="light-content" hidden={false} backgroundColor="#feb532" />
            <HeaderBottom title={''} RightIcon={<View style={{marginRight: getFontSize(3.5)}} />} />
            <ImageBackground source={require('../../../assets/images/fitnessAi.png')} style={styles.backgroundImage} resizeMode="cover">
                <ImageBackground source={OverlayImage} style={styles.overlayImage}>
                    <LinearGradient colors={['rgba(0, 0, 0, 0.0)', 'transparent']} style={styles.gradient}>
                        <View style={styles.container}>
                            <Image source={require('../../../assets/images/healthPlus.png')} style={{width: getWidth(10), height: getWidth(10), marginBottom: getHeight(6.5)}} />
                            <View style={styles.headingContainer}>
                                <Text style={styles.heading}>Creating AI Chat...</Text>
                            </View>
                            <Text style={styles.subheading}>Please wait while we create your chat.</Text>
                            <Progress.Bar progress={progress} color={colors.white} width={getWidth(60)} height={getWidth(2)} animated={true} style={styles.progressContainer} unfilledColor={'tranparent'} borderRadius={10} />
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </ImageBackground>
        </View>
    )
}

export default CreateChatScreen