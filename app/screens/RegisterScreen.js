import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import * as firebase from "firebase";

import Screen from "../components/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  const [error, setError] = useState();

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
      <Form
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={error} visible={error} />

        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
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
        <SubmitButton title="Register" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default RegisterScreen;
