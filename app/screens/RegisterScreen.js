import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import * as firebase from "firebase";
import "firebase/firestore";

import Screen from "../components/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  sexualOrientation: Yup.string().label("sexualOrientation"),
});

const categories = [
  {
    label: "Annedal",
    value: 1,
  },
  {
    label: "Askim",
    value: 2,
  },
  {
    label: "Billdal",
    value: 3,
  },
  {
    label: "Guldheden",
    value: 4,
  },
  {
    label: "Högsbohöjd",
    value: 5,
  },
  {
    label: "Järnbrott",
    value: 6,
  },
  {
    label: "Krokslätt",
    value: 7,
  },
  {
    label: "Landala",
    value: 8,
  },
  {
    label: "Majorna",
    value: 9,
  },
];

function RegisterScreen() {
  const [error, setError] = useState();
  const db = firebase.firestore();

  const handleSubmit = async (userInfo) => {
    try {
      const userAuth = await firebase
        .auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password);

      const user = {
        username: userInfo.username,
        sexualOrientation: userInfo.sexualOrientation,
        icon: "",
        district: userInfo.district,
        email: userAuth.user.email,
        uid: userAuth.user.uid,
      };

      db.collection("users")
        .doc(userAuth.user.uid)
        .set(user)
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });

      console.log("User account created & signed in!");
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
          username: "",
          email: "",
          password: "",
          sexualOrientation: "",
          district: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={error} visible={error} />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="account"
          name="username"
          placeholder="Username"
          textContentType="username"
        />
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
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="heart"
          name="sexualOrientation"
          placeholder="sexual orientation (optional)"
          textContentType="none"
        />
        <Picker items={categories} name="district" placeholder="District" />
        <SubmitButton title="Register" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default RegisterScreen;
