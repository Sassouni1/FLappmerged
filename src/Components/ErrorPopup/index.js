import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Linking } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/actions/AuthActions";

const PopupModal = ({isVisible,toggleModal}) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Modal isVisible={isVisible}>
        <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Upgrade to Premium</Text>
          <Text style={styles.modalText}>You are currently using a free account. To access premium features, please create an account and upgrade.</Text>
          
          <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:14,marginBottom:15}}>To subscribe please visit:</Text>
          <Text style={{fontSize:14, color:'blue'}}>FightLife.io</Text>
          </View>

          <View style={styles.buttonContainer}>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    flex: 1,
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
