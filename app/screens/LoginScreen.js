import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import * as firebase from "firebase";

import colors from "../config/colors";
import Screen from "../components/Screen";
import Button from "../components/Button";
import H2 from "../components/typography/H2";
import Text from "../components/typography/Text";

import {
  AppForm as Form,
  AppFormField as FormField,
  ErrorMessage,
  SubmitButton,
} from "../components/forms";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const [loginFailed, setLoginFailed] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [eye, setEye] = useState("eye");

  useEffect(() => {
    if (showPassword) {
      setEye("eye");
    } else {
      setEye("eye-off");
    }
  }, [showPassword]);

  const handleSubmit = (userInfo) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(() => {
        setLoginFailed(false);
        console.log("User signed in!");
      })
      .catch((error) => {
        setLoginFailed(true);
        console.error(error);
      });
  };

  return (
    <Screen style={styles.container}>
      <H2 style={{ paddingTop: 16 }}>Sign in</H2>
      <Image
        source={require("../assets/logo-small.png")}
        style={styles.logo}
      ></Image>
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <View>
          <ErrorMessage
            error="Invalid email and/or password."
            visible={loginFailed}
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="account"
            name="email"
            keyboardType="email-address"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            rightIcon={eye}
            placeholder="Password"
            secureTextEntry={showPassword}
            textContentType="password"
            onPress={() => setShowPassword(!showPassword)}
          />
          <Text style={{ paddingBottom: 40 }}>Forgot your password?</Text>
          <View style={styles.toggle}>
            <Text>Remember sign in details</Text>
            <Image source={require("../assets/toggle.png")}></Image>
          </View>
        </View>

        <View>
          <SubmitButton title="Sign in" style={{ width: 280 }} />
          <Button
            title="Don't you have an account? Sign up!"
            onPress={() => navigation.navigate("Register")}
            style={styles.navButton}
            textStyle={styles.navButtonText}
          ></Button>
        </View>
      </Form>
      <Text style={{ color: colors.mediumGrey, lineHeight: 25 }}>
        Register for Promoter account? <Text style={styles.span}>Sign up</Text>
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  navButton: {
    backgroundColor: colors.basicGrey,
    width: 280,
    shadowColor: colors.shadow,
  },
  navButtonText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: "500",
  },
  span: {
    textDecorationLine: "underline",
    color: "#1152FD",
    lineHeight: 25,
  },
  toggle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default LoginScreen;
