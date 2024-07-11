import { useNavigation } from "@react-navigation/native";
import {
  Image,
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HTRP = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{}}>
        <Image
          source={require("../../../assets/images/HTUATopBack.png")}
          style={{
            objectFit: "contain",
            width: Dimensions.get("window").width + 10,
            position: "absolute",
            top: -310,
            left: -4,
          }}
        />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../assets/images/HTUAbtn.png")}
            style={{
              height: 45,
              width: 45,
              position: "absolute",
              top: 40,
              left: 15,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 310, paddingHorizontal: 15 }}>
        <View style={{ gap: 10 }}>
          <Text style={{ fontWeight: 700, fontSize: 18 }}>
            Welcome to Fight Life
          </Text>
          <Text
            style={{ lineHeight: 22, color: "#676C75", letterSpacing: 0.8 }}
          >
            Embrace the morning sun and revitalize your body and mind with our
            'Morning Boost' routine. This energizing workout is designed to
            kickstart your metabolism, increase your energy levels, and set a
            positive tone for the day ahead.
          </Text>
        </View>
        <Image
          source={require("../../../assets/images/HTUAVid.png")}
          style={{
            width: Dimensions.get("window").width - 30,
            objectFit: "contain",
            marginTop: -175,
          }}
        />
      </View>
      <View style={{ marginTop: -150, paddingHorizontal: 15 }}>
        <View style={{ gap: 10 }}>
          <Text style={{ fontWeight: 700, fontSize: 18 }}>How to Use App</Text>
          <Text
            style={{ lineHeight: 22, color: "#676C75", letterSpacing: 0.8 }}
          >
            Embrace the morning sun and revitalize your body and mind with our
            'Morning Boost' routine. This energizing workout is designed to
            kickstart your metabolism, increase your energy levels, and set a
            positive tone for the day ahead.
          </Text>
        </View>
        <Image
          source={require("../../../assets/images/HTUAVid.png")}
          style={{
            width: Dimensions.get("window").width - 30,
            objectFit: "contain",
            marginTop: -175,
          }}
        />
      </View>
      <View style={{ marginTop: -150, paddingHorizontal: 15 }}>
        <View style={{ gap: 10 }}>
          <Text style={{ fontWeight: 700, fontSize: 18 }}>
            Meet Your Strength Coach
          </Text>
          <Text
            style={{ lineHeight: 22, color: "#676C75", letterSpacing: 0.8 }}
          >
            Embrace the morning sun and revitalize your body and mind with our
            'Morning Boost' routine. This energizing workout is designed to
            kickstart your metabolism, increase your energy levels, and set a
            positive tone for the day ahead.
          </Text>
        </View>
        <Image
          source={require("../../../assets/images/HTUAVid.png")}
          style={{
            width: Dimensions.get("window").width - 30,
            objectFit: "contain",
            marginTop: -175,
          }}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: -170,
          height: 80,
          marginBottom: 80,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../assets/images/HTUABottomBtn.png")}
            style={{
              width: Dimensions.get("window").width - 30,
              objectFit: "contain",
            }}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HTRP;
