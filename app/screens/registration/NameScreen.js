import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import routes from "../../navigation/routes";
import TextInput from "../../components/TextInput";
import FormScreen from "../../components/multiScreenForm/FormScreen";
import Text from "../../components/Text";
import {
  AppFormField as FormField,
  AppForm as Form,
} from "../../components/forms";

function NameScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [button, setButton] = useState("light");
  const [text, setText] = useState("medium");

  // setButton("primary") + setText("white")

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  //contional onPress ?
  return (
    <FormScreen
      title="My name is"
      onPress={() =>
        navigation.navigate(routes.REGISTERPRONOUN, { ...username })
      }
      page="2"
      totalPages="7"
      color={button}
      textColor={text}
    >
      <TextInput
        placeholder={"Name"}
        onChangeText={(username) => setUsername({ username })}
        icon="account-outline"
        value={username["username"]}
      />
      {/* <Form
        initialValues={{
          name: "",
        }}
        validationSchema={validationSchema}
      >
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="account-outline"
          name="name"
          placeholder="Name"
          onChangeText={() => setButton("primary") + setText("white")}
          value={username["username"]}
        />
      </Form> */}
      <Text>The choosen name will appear in you profile</Text>
    </FormScreen>
  );
}

const styles = StyleSheet.create({});

export default NameScreen;
