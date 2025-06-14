import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Linking,Alert } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from "@react-navigation/native";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../../Redux/actions/AuthActions";

const PopupModal = ({isVisible,toggleModal,hasCombatKettlebell}) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [redirectLink,setRedirectLink] = useState("");
  const [buttonText,setButtontext] = useState("");



  useEffect(() => {
    if (user?.isLoginWithGuestEmail === true) {
      setTitle("Upgrade to Premium");
      setDescription("You are currently using a free account. To access premium features, please create an account and upgrade.");
      setRedirectLink("http://www.fightlife.io/darustrong-1");
      setButtontext("Upgrade Account");
      return;
    }
  
    const hasCombat = user?.hasCombatKettlebell === true;
    const hasBuildDifferent = user?.hasBuildDifferent === true;
    const isCancelled = user?.isCancelled === true;
  
    if (hasCombat && hasBuildDifferent) {
      setTitle(isCancelled ? "Membership Canceled" : "Payment Failed");
      setDescription(
        isCancelled
          ? "You still have lifetime access to Combat Kettlebell 2.0 and Built Different, but your Fight Life membership was canceled. Restart now to regain access to all programs and features."
          : "You still have lifetime access to Combat Kettlebell 2.0 and Built Different, but your Fight Life membership is paused. Update your billing info to unlock all programs and features."
      );
      setRedirectLink(
        isCancelled
          ? "http://www.fightlife.io/darustrong-1"
          : "https://billing.stripe.com/p/login/14k14zg9z2St3iE4gg"
      );
      setButtontext(isCancelled ? "Restart Membership" : "Update Billing");
    } else if (hasCombat) {
      setTitle(isCancelled ? "Membership Canceled" : "Payment Failed");
      setDescription(
        isCancelled
          ? "You still have lifetime access to Combat Kettlebell 2.0, but your Fight Life membership was canceled. Restart now to regain access to all programs and features."
          : "You still have lifetime access to Combat Kettlebell 2.0, but your Fight Life membership is paused. Update your billing info to unlock all programs and features."
      );
      setRedirectLink(
        isCancelled
          ? "http://www.fightlife.io/darustrong-1"
          : "https://billing.stripe.com/p/login/14k14zg9z2St3iE4gg"
      );
      setButtontext(isCancelled ? "Restart Membership" : "Update Billing");
    } else if (hasBuildDifferent) {
      setTitle(isCancelled ? "Membership Canceled" : "Payment Failed");
      setDescription(
        isCancelled
          ? "You still have lifetime access to Built Different, but your Fight Life membership was canceled. Restart now to regain access to all programs and features."
          : "You still have lifetime access to Built Different, but your Fight Life membership is paused. Update your billing info to unlock all programs and features."
      );
      setRedirectLink(
        isCancelled
          ? "http://www.fightlife.io/darustrong-1"
          : "https://billing.stripe.com/p/login/14k14zg9z2St3iE4gg"
      );
      setButtontext(isCancelled ? "Restart Membership" : "Update Billing");
    } else {
      setTitle("Upgrade to Premium");
      setDescription("You are currently using a free account. To access premium features, please create an account and upgrade.");
      setRedirectLink("http://www.fightlife.io/darustrong-1");
      setButtontext("Upgrade Account");
    }
  }, [user]);
  

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
        <Text style={styles.modalTitle}>
          {title}
          </Text>
          <Text style={styles.modalText}>{description}</Text>

          <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={()=>{ openURL(redirectLink)}} style={styles.upgradeButton}>
              <Text style={styles.buttonText}>{buttonText}</Text>
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
