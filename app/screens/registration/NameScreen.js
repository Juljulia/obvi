import React, { useState } from "react";
import { StyleSheet } from "react-native";

import routes from "../../navigation/routes";
import TextInput from "../../components/TextInput";
import FormScreen from "../../components/multiScreenForm/FormScreen";
import Text from "../../components/Text";
import PopUp from "../../components/PopUp";
import Screen from "../../components/Screen";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

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
      <PopUp
        text="Whatever you don't care to answer, you skip."
        style={styles.popUp}
      />
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
  popUp: {
    position: "absolute",
    right: 54,
  },
});

export default NameScreen;
