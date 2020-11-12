import React from "react";
import { Image, Platform, StyleSheet, View } from "react-native";

import Button from "../components/Button";
import Text from "../components/typography/Text";
import colors from "../config/colors";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
        ></Image>
        <Text style={styles.tagline}>Obvi</Text>
        <Text style={styles.text}>
          Obvi is a place where information and people gather within the
          LGBTQIA+ community in Gothenburg.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Sign in"
          onPress={() => navigation.navigate(routes.LOGIN)}
          style={{ width: 280 }}
        />
        <Button
          title="Sign up"
          color="primary"
          onPress={() => navigation.navigate(routes.REGISTER)}
          style={{ width: 280 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.basicGrey,
  },
  buttonContainer: {
    width: "100%",
  },
  logo: {
    width: 212,
    height: 212,
  },
  logoContainer: {
    alignItems: "center",
    paddingHorizontal: 70,
    paddingBottom: 80,
  },
  tagline: {
    fontSize: 24,
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "Inter_400Regular",
    paddingBottom: 32,
    color: "#4B545A",
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 25,
    paddingHorizontal: 5,
  },
});

export default WelcomeScreen;
