import React, { useState } from "react";
import { StyleSheet } from "react-native";

import routes from "../../navigation/routes";
import TextInput from "../../components/TextInput";
import FormScreen from "../../components/multiScreenForm/FormScreen";
import Text from "../../components/Text";

function NameScreen({ navigation }) {
  const [username, setUsername] = useState("");

  return (
    <FormScreen
      title="My name is"
      onPress={() =>
        navigation.navigate(routes.REGISTERPRONOUN, { ...username })
      }
      page="2"
      totalPages="7"
    >
      <TextInput
        placeholder={"Name"}
        onChangeText={(username) => setUsername({ username })}
        icon="account-outline"
        value={username["username"]}
      />
      <Text>The choosen name will appear in you profile</Text>
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default NameScreen;
