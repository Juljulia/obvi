import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import * as firebase from "firebase";

import Screen from "../components/Screen";
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

function LoginScreen(props) {
  const [loginFailed, setLoginFailed] = useState(false);

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
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid email and/or password."
          visible={loginFailed}
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
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
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default LoginScreen;
