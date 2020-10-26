import React, { useState } from "react";
import { StyleSheet } from "react-native";

import FormScreen from "../../components/multiScreenForm/FormScreen";
import routes from "../../navigation/routes";
import TextInput from "../../components/TextInput";

function PronounScreen({ navigation, route }) {
  const { username } = route.params;
  const [pronoun, setPronoun] = useState("");

  return (
    <FormScreen
      title="My pronoun is"
      page="3"
      totalPages="7"
      onPress={() =>
        navigation.navigate(routes.REGISTERORIENTATION, {
          username,
          ...pronoun,
        })
      }
    >
      <TextInput
        value={pronoun["pronoun"]}
        onChangeText={(pronoun) => setPronoun({ pronoun })}
        placeholder={"Start typing"}
      />
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default PronounScreen;
