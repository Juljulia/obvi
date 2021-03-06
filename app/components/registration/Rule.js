import React from "react";
import { Image, View, StyleSheet } from "react-native";

import H2 from "../../components/typography/H2";
import Text from "../../components/typography/Text";
import { screen } from "../../config/dimensions";

function Rule({ title, text }) {
  return (
    <View style={{ marginTop: 37 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={require("../../assets/rules-check.png")}></Image>
        <H2 style={{ paddingLeft: 24 }}>{title}</H2>
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    lineHeight: 25,
    paddingTop: 8,
    paddingLeft: 4,
    paddingRight: screen.width > 400 ? 40 : 0,
  },
});

export default Rule;
