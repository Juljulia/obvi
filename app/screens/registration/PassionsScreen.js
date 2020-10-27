import React, { useState } from "react";
import { StyleSheet } from "react-native";

import FormScreen from "../../components/multiScreenForm/FormScreen";
import routes from "../../navigation/routes";
import TextInput from "../../components/TextInput";

function PassionsScreen({ navigation, route }) {
  const { username, orientation, pronoun } = route.params;
  const [passions, setPassions] = useState("");

  return (
    <FormScreen
      title="Passions"
      page="5"
      totalPages="7"
      onPress={() =>
        navigation.navigate(routes.REGISTERPHOTO, {
          username,
          pronoun,
          orientation,
          ...passions,
        })
      }
    >
      <TextInput
        value={passions["passions"]}
        onChangeText={(passions) => setPassions({ passions })}
        placeholder={"Start typing"}
      />
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default PassionsScreen;
