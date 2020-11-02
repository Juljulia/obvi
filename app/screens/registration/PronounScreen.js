import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, Text } from "react-native";

import FormScreen from "../../components/multiScreenForm/FormScreen";
import routes from "../../navigation/routes";
import TextInput from "../../components/TextInput";
import NavArrow from "../../components/NavArrow";
import PopUp from "../../components/PopUp";
import pronouns from "../../assets/arrays/pronouns";
import SelectMultiple from "../../components/SelectMultiple";

function PronounScreen({ navigation, route }) {
  const { username } = route.params;
  const [input, setInput] = useState("");
  const [pronoun, setPronoun] = useState(null);

  let searchPronouns = [];
  searchPronouns = pronouns.filter((el) => el.value.includes(input["input"]));
  // searchPronouns = searchPronouns.slice(0, 3);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavArrow
          onPress={() =>
            navigation.navigate(routes.REGISTERORIENTATION, {
              username,
              pronoun,
            })
          }
        />
      ),
    });
  }, [navigation]);

  return (
    <FormScreen
      title="My pronoun is"
      page="3"
      totalPages="7"
      isActive={pronoun}
      onPress={() =>
        navigation.navigate(routes.REGISTERORIENTATION, {
          username,
          pronoun,
        })
      }
    >
      <PopUp
        text="Whatever you don't care to answer, you skip."
        style={styles.popUp}
      />
      <TextInput
        value={input["input"]}
        onChangeText={(input) => setInput({ input })}
        placeholder={"Start typing"}
      />
      <Text>Pronouns</Text>
      <SelectMultiple
        group={searchPronouns}
        // singleTap={(valueTap) => console.log(pronoun)}
        onSelectedValuesChange={(selectedValues) =>
          setPronoun(selectedValues.join(", "))
        }
      ></SelectMultiple>
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  popUp: {
    position: "absolute",
    right: 60,
    top: 90,
  },
});

export default PronounScreen;
