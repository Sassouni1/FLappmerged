// Library Imports
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

// Local Imports
import { getHeight } from "../../../utils/ResponsiveFun";

// KeyboardAvoidWrapper Component
export default CKeyBoardAvoidWrapper = ({ children, containerStyle, contentContainerStyle }) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={(Platform.OS == "ios") === "ios" ? getHeight(1) : null}
      style={[{ flex: 1 }, containerStyle]}
      behavior={Platform.OS == "ios" ? "padding" : null}
    >
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        bounces={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
