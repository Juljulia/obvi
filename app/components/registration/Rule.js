import React from "react";
import { Image, View, StyleSheet } from "react-native";

import H2 from "../../components/typography/H2";
import Text from "../../components/typography/Text";

function Rule({ title, text }) {
  return (
    <View style={{ paddingBottom: 32 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={require("../../assets/rules-check.png")}></Image>
        <H2 style={{ paddingLeft: 24 }}>{title}</H2>
      </View>
      <Text style={{ lineHeight: 25, paddingTop: 8, paddingLeft: 4 }}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Rule;
