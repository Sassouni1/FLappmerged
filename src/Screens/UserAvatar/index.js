import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const generateBackgroundColor = (username) => {
  if(username){
  // Generate a hash from the username
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Convert the hash to an RGB color
  const color = `rgb(${(hash & 0xff0000) >> 16}, ${(hash & 0x00ff00) >> 8}, ${hash & 0x0000ff})`;
  return color;
}
else{
  return 'red';
}
};

const UserAvatar = ({ username, width = 100, height = 100 }) => {
  const backgroundColor = generateBackgroundColor(username);
  const initials = username?.slice(0, 2).toUpperCase();

  return (
    <View
      style={[
        styles.avatar,
        { width, height, backgroundColor, borderRadius: Math.min(width, height) / 3 },
      ]}
    >
      <Text style={[styles.initials, { fontSize: Math.min(width, height) / 2 }]}>
        {initials}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserAvatar;
