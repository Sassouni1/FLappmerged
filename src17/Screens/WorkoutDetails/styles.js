import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { getFontSize,getHeight,getWidth } from '../../../utils/ResponsiveFun';




export const styles = StyleSheet.create({
    donebtn: {
      height: getHeight(6),
      borderRadius: 5,
      width: getWidth(25),
      backgroundColor: colors.bluebtn,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: getHeight(1),
    },
    container: {
      //flex: 1,
      backgroundColor: '#333333',
      // marginBottom: getHeight(7),
    },
    list: {
      marginLeft: 4,
      marginRight: 15,
   
    },
  
    image: {
      marginLeft: getFontSize(1),
      width: getWidth(95),
      height: getHeight(21), // Adjust the height as needed
      resizeMode: 'cover',
      marginTop: getHeight(1.5),
      borderRadius:10,
      shadowOpacity:0.5,
    },
    calendarContainer: {
      marginTop: 20, // Adjust the margin as needed
      width: '80%', // Adjust the calendar container width as needed
      backgroundColor: 'white', // Customize calendar container background color
      borderRadius: 5,
      elevation: 4, // Add shadow or elevation as desired
    },
    modalContainer: {
      backgroundColor: 'white', // Customize modal background color
      borderRadius: 5,
      padding: 20,
    },
    closeButton: {
      // justifyContent:"flex-start",
      alignItems: 'flex-start',
    },
    modalContainer1: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      width: 300,
      alignItems: "center",
    },
    modalButton: {
      backgroundColor: "green",
      padding: 10,
      borderRadius: 5,
      margin: 10,
    },
    cancelButton: {
      backgroundColor: "red",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });