import { Platform, StyleSheet } from "react-native";
import { getFontSize, getHeight, getWidth } from "../../../utils/ResponsiveFun";

export const styles = StyleSheet.create({
  headerview: {
    marginTop: getHeight(0.5),
    // height: getHeight(4.5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "flex-end",
  },

  headerTitle: {
    color: "white",
    fontSize: 24,
    alignSelf: "flex-end",
    marginBottom: Platform.OS === "ios" ? 3 : 0,
    fontFamily: "Russo_One",
    fontWeight: "600",
    width: getWidth(62),
  },
});