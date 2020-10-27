import React, { useState, useLayoutEffect } from "react";
import { StyleSheet } from "react-native";

import FormScreen from "../../components/multiScreenForm/FormScreen";
import routes from "../../navigation/routes";
import TextInput from "../../components/TextInput";
import NavArrow from "../../components/NavArrow";

function OrientationScreen({ navigation, route }) {
  const { username, pronoun } = route.params;
  const [orientation, setOrientation] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavArrow
          onPress={() =>
            navigation.navigate(routes.REGISTERPASSIONS, {
              username,
              pronoun,
              ...orientation,
            })
          }
        />
      ),
    });
  }, [navigation]);

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
