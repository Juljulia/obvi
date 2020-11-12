import React from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";

import H2 from "./typography/H2";
import Text from "./typography/Text";

function FriendsScroll({ style, friends, title }) {
  return (
    <View style={style}>
      <H2>{title}</H2>
      <ScrollView horizontal style={{ paddingTop: 16, paddingBottom: 16 }}>
        {friends.map((friend, key) => (
          <Image source={friend.image} key={key} style={styles.avatar} />
        ))}
      </ScrollView>
      <Text
        style={{
          textDecorationLine: "underline",
          paddingBottom: Platform.OS === "ios" ? 32 : 16,
        }}
      >
        View all
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    marginHorizontal: 4,
    width: 78,
    height: 78,
  },
});

export default FriendsScroll;
