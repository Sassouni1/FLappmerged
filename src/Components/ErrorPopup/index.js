import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Linking,Alert } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/actions/AuthActions";

const PopupModal = ({isVisible,toggleModal}) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const openURL = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <View style={styles.container}>
      <Modal isVisible={isVisible}>
        <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Upgrade to Premium</Text>
          <Text style={styles.modalText}>You are currently using a free account. To access premium features, please create an account and upgrade.</Text>
          

          <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={()=>{ openURL("https://www.fightlife.io/darustrong-1")}} style={styles.upgradeButton}>
              <Text style={styles.buttonText}>Upgrade Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{toggleModal(); navigate.navigate("Exercises")}} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={()=>dispatch(logout())}><Text style={{fontSize:14,marginTop:10, color:'blue'}}>Logout</Text></TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight:'bold',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  upgradeButton: {
    backgroundColor: "#256CD0",
    padding: 10,
    borderRadius: 5,
    marginBottom:5,
    marginRight: 10,
  },
  subscribeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default PopupModal;
