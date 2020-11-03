import React from "react";
import { StyleSheet, Image, View } from "react-native";

import Text from "../components/typography/Text";

function MessageBubble({ text, style }) {
  return (
    <View style={style}>
      <Image source={require("../assets/shout-out.png")} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    shadowOffset: { width: 3.74, height: 3.74 },
    shadowColor: "#BECDE2",
    shadowRadius: 8,
    shadowOpacity: 1,
    position: "absolute",
    top: 60,
    left: 55,
  },
});

export default MessageBubble;
