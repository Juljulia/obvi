import React, { useState, useLayoutEffect } from "react";
import { StyleSheet } from "react-native";

import FormScreen from "../../components/multiScreenForm/FormScreen";
import routes from "../../navigation/routes";
import TextInput from "../../components/TextInput";
import NavArrow from "../../components/NavArrow";
import orientations from "../../assets/arrays/orientations";
import SelectMultiple from "../../components/SelectMultiple";

function OrientationScreen({ navigation, route }) {
  const { username, pronoun } = route.params;
  const [input, setInput] = useState("");
  const [orientation, setOrientation] = useState(null);

  let searchOrientations = [];
  searchOrientations = orientations.filter((el) =>
    el.value.includes(input["input"])
  );
  searchOrientations = searchOrientations.slice(0, 3);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavArrow
          onPress={() =>
            navigation.navigate(routes.REGISTERPASSIONS, {
              username,
              pronoun,
              orientation,
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
      isActive={orientation}
      onPress={() =>
        navigation.navigate(routes.REGISTERPASSIONS, {
          username,
          pronoun,
          orientation,
        })
      }
    >
      <TextInput
        value={input["input"]}
        onChangeText={(input) => setInput({ input })}
        placeholder={"Start typing"}
      />
      <SelectMultiple
        group={searchOrientations}
        // singleTap={(valueTap) => console.log(pronoun)}
        onSelectedValuesChange={(selectedValues) =>
          setOrientation(selectedValues.join(", "))
        }
      ></SelectMultiple>
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default OrientationScreen;
