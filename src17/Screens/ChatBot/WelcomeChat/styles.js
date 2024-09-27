import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1
    },
    overlayImage: {
        flex: 1
    },
    gradient: {
        flex: 1
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 60
    },
    heading: {
        fontFamily: 'Work Sans',
        fontWeight: 'bold',
        fontSize: 36,
        lineHeight: 44,
        letterSpacing: 0,
        color: '#FFFFFF',
        marginBottom: 12,
        textAlign: 'center'
    },
    subheading: {
        fontFamily: 'Work Sans',
        fontSize: 16,
        lineHeight: 28,
        letterSpacing: -0.003,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 22,
        maxWidth: 301
    },
    button: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        paddingHorizontal: 32,
        paddingVertical: 20,
        width: 330,
        alignItems: 'center'
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Work Sans',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: -0.004,
        color: '#000000',
        marginRight: 8
    }
})