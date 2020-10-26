import React, { useState } from "react";
import { StyleSheet } from "react-native";

import FormScreen from "../../components/multiScreenForm/FormScreen";
import routes from "../../navigation/routes";
import TextInput from "../../components/TextInput";

function OrientationScreen({ navigation, route }) {
  const { username, pronoun } = route.params;
  const [orientation, setOrientation] = useState("");

  return (
    <FormScreen
      title="My orientation is"
      page="4"
      totalPages="7"
      onPress={() =>
        navigation.navigate(routes.REGISTERPASSIONS, {
          username,
          pronoun,
          ...orientation,
        })
      }
    >
      <TextInput
        value={orientation["orientation"]}
        onChangeText={(orientation) => setOrientation({ orientation })}
        placeholder={"Start typing"}
      />
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default OrientationScreen;
