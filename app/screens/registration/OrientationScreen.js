import React, { useState, useLayoutEffect } from "react";
import { StyleSheet } from "react-native";

import FormScreen from "../../components/multiScreenForm/FormScreen";
import routes from "../../navigation/routes";
import TextInput from "../../components/TextInput";
import NavArrow from "../../components/NavArrow";
import SelectMultiple from "../../components/SelectMultiple";

function OrientationScreen({ navigation, route }) {
  const { username, pronoun } = route.params;
  const [input, setInput] = useState("");
  const [orientation, setOrientation] = useState("");

  const orientations = [
    { value: "Allosexual" },
    { value: "Gay" },
    { value: "Queer" },
    { value: "Homosexual" },
    { value: "Coming out" },
    { value: "Heterosexual" },
  ];

  let searchOrientations = [];

  if (searchOrientations.length <= 3) {
    searchOrientations = orientations.filter((el) =>
      el.value.includes(input["input"])
    );
  }
  console.log(orientation);

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
