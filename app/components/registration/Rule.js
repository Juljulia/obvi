import React from "react";
import { Image, View, StyleSheet, Dimensions } from "react-native";

import H2 from "../../components/typography/H2";
import Text from "../../components/typography/Text";

function Rule({ title, text }) {
  const width = Dimensions.get("window").width;

  return (
    <View style={{ marginTop: 37 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={require("../../assets/rules-check.png")}></Image>
        <H2 style={{ paddingLeft: 24 }}>{title}</H2>
      </View>
      <Text
        style={{
          lineHeight: 25,
          paddingTop: 8,
          paddingLeft: 4,
          paddingRight: width > 400 ? 40 : 0,
        }}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Rule;
