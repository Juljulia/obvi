import React from "react";
import { StyleSheet, Image, View } from "react-native";

import Text from "../components/typography/Text";

function MessageBubble({ text, style, width = 380 }) {
  return (
    <View style={[styles.container, { width, height: 127 }, style]}>
      <Image
        style={{ width }}
        source={require("../assets/shout-out.png")}
        resizeMode="stretch"
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    shadowOffset: { width: 3.74, height: 3.74 },
    shadowColor: "#BECDE2",
    shadowRadius: 8,
    shadowOpacity: 1,
    position: "absolute",
    top: 20,
    left: 50,
    width: "80%",
  },
});

export default MessageBubble;
