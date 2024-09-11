import * as React from "react";
import { Alert, Linking, Platform, Text, View, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-paper";
import ImageModal from "react-native-image-modal";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { getFontSize, getHeight, getWidth } from "../../../utils/ResponsiveFun";
import BottomTab from "../BottomTab";
import { logout } from "../../Redux/actions/AuthActions";
import { colors } from "../../constants/colors";

import moneyIcon from "../../assets/images/money.png";

import UpdateProfiles from "../../Screens/UpdateProfile";
import ChangePassword from "../../Screens/ChangePassword";
import Help from "../../Screens/Help";
import Notification from "../../Screens/Notifications";
import HTUA from "../../Screens/HTUA";

const Drawer = createDrawerNavigator();

const NavHeader = () => {
  const user = useSelector((state) => state.auth.userData);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <ImageModal
          style={styles.profileImage}
          resizeMode="cover"
          modalImageResizeMode="contain"
          source={
            user?.profile_image
              ? { uri: user.profile_image }
              : require("../../assets/images/Pimg.jpeg")
          }
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.full_name}</Text>
          <Text style={styles.userEmail} numberOfLines={1}>
            {user?.email}
          </Text>
        </View>
      </View>
    </View>
  );
};

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);

  const handleLogout = () => {
    Alert.alert("", "Do you want to logout?", [
      {
        text: "No",
        style: "cancel",
      },
      { text: "Yes", onPress: () => dispatch(logout()) },
    ]);
  };
  const howToUseAppOptions = {
    ...drawerScreenOptions,
    drawerIcon: ({ color }) => (
      <MaterialIcons name="help-outline" size={20} color={color} />
    ),
  };
  const handleDeleteAccount = () => {
    Alert.alert("", "Are you sure you want to delete your account?", [
      {
        text: "No",
        style: "cancel",
      },
      { text: "Yes", onPress: () => dispatch(logout()) },
    ]);
  };

  const handleContactSupport = () => {
    Linking.openURL("https://www.fightlife.io/contactus");
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContent}
    >
      <NavHeader />
      <Divider style={styles.divider} />
      <DrawerItemList {...props} />
      <View style={styles.bottomItems}>
        <Divider style={styles.secondaryDivider} />
        {renderSecondaryDrawerItem("Privacy Policy & Terms", "PrivacyPolicy")}

        <Divider style={styles.bottomDivider} />
        {user?.isGuestUser == true &&
          renderDrawerItem(
            "Delete Account",
            handleDeleteAccount,
            "delete",
            "#EB5757"
          )
        }
        {renderDrawerItem("Logout", handleLogout, "logout", "#EB5757")}
      </View>
    </DrawerContentScrollView>
  );
};

const renderDrawerItem = (label, onPress, iconName, color = "white") => (
  <DrawerItem
    label={label}
    labelStyle={[styles.drawerItemLabel, { color }]}
    onPress={onPress}
    icon={() => <MaterialIcons name={iconName} size={20} color={color} />}
  />
);

const renderSecondaryDrawerItem = (label, screenName) => (
  <DrawerItem
    label={label}
    labelStyle={styles.secondaryDrawerItemLabel}
    onPress={() => navigation.navigate(screenName)}
    style={styles.secondaryDrawerItem}
  />
);

const MyDrawer = () => {
  const dispatch = useDispatch();

  const handleBilling = () => {
    Linking.openURL("https://billing.stripe.com/p/login/dR68wAbVE4nOb4Y5kk");
  };

  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={drawerScreenOptions}
    >
      <Drawer.Screen name="Home" component={BottomTab} options={homeOptions} />
      <Drawer.Screen
        name="Profile & Weight Goals"
        component={UpdateProfiles}
        options={profileOptions}
      />
      <Drawer.Screen
        name="How to Use App"
        component={HTUA}
        options={{
          drawerLabel: "How to Use App",
          drawerIcon: ({ color }) => (
            <Ionicons name="help-circle-outline" size={20} color={color} />
          ),
          ...drawerScreenOptions,
        }}
      />
      <Drawer.Screen
        name="Become an Affiliate"
        component={() => null}
        options={affiliateOptions}
        listeners={{
          drawerItemPress: (e) => {
            e.preventDefault();
            Linking.openURL(
              "http://www.fightlife.io/member1720966880869/2fbb29de64a"
            );
          },
        }}
      />
      <Drawer.Screen
        name="Change Password"
        component={ChangePassword}
        options={passwordOptions}
      />
      <Drawer.Screen
        name="Billing"
        component={() => null}
        options={{
          ...drawerScreenOptions,
          drawerIcon: ({ color }) => (
            <MaterialIcons name="credit-card" size={20} color={color} />
          ),
        }}
        listeners={{
          drawerItemPress: (e) => {
            e.preventDefault();
            handleBilling();
          },
        }}
      />
      <Drawer.Screen
        name="Contact Support"
        component={() => null} // Remove the Help component and set to null
        options={helpOptions}
        listeners={{
          drawerItemPress: (e) => {
            e.preventDefault();
            Linking.openURL("https://www.fightlife.io/contactus"); // Open website URL
          },
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notification}
        options={notificationOptions}
      />
    </Drawer.Navigator>
  );
};

const drawerScreenOptions = {
  headerShown: false,
  drawerInactiveTintColor: "white",
  drawerActiveTintColor: "#333333",
  drawerActiveBackgroundColor: "white",
  drawerLabelStyle: {
    fontFamily: "Ubuntu-Medium",
    fontSize: getFontSize(1.7),
  },
};

const homeOptions = {
  ...drawerScreenOptions,
  drawerIcon: ({ color }) => <Fontisto name="home" size={20} color={color} />,
};

const affiliateOptions = {
  ...drawerScreenOptions,
  drawerIcon: ({ color }) => (
    <Image source={moneyIcon} style={{ width: 20, height: 20 }} />
  ),
};

const profileOptions = {
  ...drawerScreenOptions,
  drawerIcon: ({ color }) => (
    <FontAwesome6 name="user-gear" size={20} color={color} />
  ),
};

const passwordOptions = {
  ...drawerScreenOptions,
  drawerIcon: ({ color }) => (
    <MaterialIcons name="lock-reset" size={20} color={color} />
  ),
};

const helpOptions = {
  ...drawerScreenOptions,
  drawerIcon: ({ color }) => (
    <Ionicons name="information-circle" size={20} color={color} />
  ),
};

const notificationOptions = {
  ...drawerScreenOptions,
  drawerIcon: ({ color }) => (
    <MaterialCommunityIcons name="bell-ring-outline" size={20} color={color} />
  ),
};

const styles = {
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    height: getHeight(12),
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
  },
  profileImage: {
    width: getWidth(9.5),
    height: getHeight(5.5),
    borderRadius: 10,
    marginLeft: getWidth(3),
    marginTop: getHeight(3),
  },
  userInfo: {
    marginLeft: getWidth(3),
  },
  userName: {
    fontFamily: "Ubuntu-Bold",
    color: "white",
    marginBottom: getFontSize(0.5),
    width: getWidth(50),
    fontSize: getFontSize(2),
    marginTop: getWidth(5),
  },
  userEmail: {
    color: "white",
    width: "60%",
    fontSize: getFontSize(1.5),
    fontFamily: "Ubuntu-Regular",
  },
  drawerContent: {
    flex: 1,
    backgroundColor: "#0B0B0D",
  },
  divider: {
    height: 2,
    backgroundColor: "#333333",
    borderRadius: 10,
    marginBottom: getHeight(1),
    width: "93%",
    alignSelf: "center",
  },
  bottomItems: {
    marginTop: getHeight(2),
  },
  drawerItemLabel: {
    fontFamily: "Ubuntu-Medium",
    fontSize: getFontSize(1.7),
  },
  secondaryDrawerItemLabel: {
    fontFamily: "Ubuntu-Regular",
    fontSize: getFontSize(1.5),
    color: "#7B7A7A",
  },
  secondaryDrawerItem: {
    marginVertical: 0,
  },
  secondaryDivider: {
    height: 1,
    backgroundColor: "#333333",
    marginVertical: getHeight(1),
  },
  bottomDivider: {
    height: 1,
    backgroundColor: "#333333",
    marginVertical: getHeight(1),
  },
};

export default MyDrawer;
