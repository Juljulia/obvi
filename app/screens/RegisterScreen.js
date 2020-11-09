import React, { useState, useEffect } from "react";
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
  SubmitButton,
  ErrorMessage,
} from "../components/forms";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

function RegisterScreen({ navigation }) {
  const [error, setError] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const [showVerifiedPassword, setShowVerifiedPassword] = useState(false);
  const [eye, setEye] = useState("eye");
  const [eyeVerify, setEyeVerify] = useState("eye");

  useEffect(() => {
    if (showPassword) {
      setEye("eye");
    } else {
      setEye("eye-off");
    }
  }, [showPassword]);

  useEffect(() => {
    if (showVerifiedPassword) {
      setEyeVerify("eye");
    } else {
      setEyeVerify("eye-off");
    }
  }, [showVerifiedPassword]);

  const handleSubmit = async (userInfo) => {
    try {
      const userAuth = await firebase
        .auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("That email address is already in use!");
      }
      if (error.code === "auth/invalid-email") {
        setError("That email address is invalid!");
      }
      console.error(error);
    }
  };

  return (
    <Screen style={styles.container}>
      <H2 style={{ paddingBottom: 8 }}>Sign up</H2>
      <Image
        source={require("../assets/logo-small.png")}
        style={styles.logo}
      ></Image>
      <Form
        initialValues={{
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <View>
          <ErrorMessage error={error} visible={error} />

          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="account"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            rightIcon={eye}
            name="password"
            placeholder="Password"
            secureTextEntry={showPassword}
            textContentType="password"
            onPress={() => setShowPassword(!showPassword)}
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            rightIcon={eyeVerify}
            name="passwordConfirmation"
            placeholder="Verify password"
            secureTextEntry={showPassword}
            textContentType="password"
            onPress={() => setShowVerifiedPassword(!showVerifiedPassword)}
          />
          <View style={styles.toggle}>
            <Text style={{}}>Remember sign in details</Text>
            <Image source={require("../assets/toggle.png")}></Image>
          </View>
        </View>

        <View>
          <SubmitButton title="Sign up" style={{ width: 280 }} />
          <Button
            title="Already have an account? Sign in!"
            onPress={() => navigation.navigate("Login")}
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
  logo: {},
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
  toggle: {
    paddingTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  span: {
    textDecorationLine: "underline",
    color: "#1152FD",
    lineHeight: 25,
  },
});

export default RegisterScreen;
