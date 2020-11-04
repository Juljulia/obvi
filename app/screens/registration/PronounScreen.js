import React, { useState, useLayoutEffect } from "react";
import { ScrollView, StyleSheet, View, Image } from "react-native";
import CheckBox from "react-native-check-box";

import FormScreen from "../../components/multiScreenForm/FormScreen";
import routes from "../../navigation/routes";
import TextInput from "../../components/TextInput";
import NavArrow from "../../components/NavArrow";
import PopUp from "../../components/PopUp";
import pronouns from "../../assets/arrays/pronouns";
import SelectMultiple from "../../components/SelectMultiple";
import colors from "../../config/colors";
import Text from "../../components/typography/Text";

function PronounScreen({ navigation, route }) {
  const { username } = route.params;
  const [input, setInput] = useState("");
  const [pronoun, setPronoun] = useState(null);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [viewAll, setViewAll] = useState(false);

  let searchPronouns = [];

  if (input["input"] !== "") {
    searchPronouns = pronouns.filter((el) => el.value.includes(input["input"]));
  }

  if (viewAll) {
    searchPronouns = pronouns.slice();
  }

  console.log(input["input"]);
  console.log(searchPronouns);

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
  }, [navigation, pronoun]);

  return (
    <FormScreen
      title="My gender      identity is"
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

      <View style={styles.titlesContainer}>
        <Text>Gender identity</Text>
        {viewAll ? (
          <Text
            style={{ textDecorationLine: "underline" }}
            onPress={() => setViewAll(false)}
          >
            Hide all
          </Text>
        ) : (
          <Text
            style={{ textDecorationLine: "underline" }}
            onPress={() => setViewAll(true)}
          >
            View all
          </Text>
        )}
      </View>
      <ScrollView style={styles.container}>
        <SelectMultiple
          group={searchPronouns}
          onSelectedValuesChange={(selectedValues) =>
            setPronoun(selectedValues.join(", "))
          }
        ></SelectMultiple>
      </ScrollView>
      <CheckBox
        rightText="Show gender identity on my profile"
        rightTextStyle={{ color: colors.text }}
        isChecked={toggleCheckBox}
        onClick={() => setToggleCheckBox(!toggleCheckBox)}
        checkedImage={<Image source={require("../../assets/check.png")} />}
        unCheckedImage={<Image source={require("../../assets/uncheck.png")} />}
      />
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  checkbox: {},
  container: {
    marginTop: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "red",
  },
  popUp: {
    position: "absolute",
    right: 60,
    top: 90,
  },
  titlesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PronounScreen;
