import React, { useState, useLayoutEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import colors from "../../config/colors";
import Checkbox from "../../components/registration/Checkbox";
import FormScreen from "../../components/registration/FormScreen";
import routes from "../../navigation/routes";
import TextInput from "../../components/TextInput";
import NavArrow from "../../components/nav/NavArrow";
import PopUp from "../../components/registration/PopUp";
import pronouns from "../../assets/arrays/pronouns";
import SelectMultiple from "../../components/registration/SelectMultiple";
import Text from "../../components/typography/Text";
import { screen } from "../../config/dimensions";

function PronounScreen({ navigation, route }) {
  const { username } = route.params;
  const [input, setInput] = useState("");
  const [pronoun, setPronoun] = useState(null);
  const [toggleCheckBox, setToggleCheckBox] = useState(true);
  const [viewAll, setViewAll] = useState(false);

  const showPronoun = toggleCheckBox;
  let searchPronouns = [];

  /** Search result */
  if (input["input"] !== "") {
    searchPronouns = pronouns.filter((el) => el.value.includes(input["input"]));
  }

  if (viewAll) {
    searchPronouns = pronouns.slice();
  }

  if (pronoun === "") {
    setPronoun(null);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavArrow
          onPress={() =>
            navigation.navigate(routes.REGISTERORIENTATION, {
              username,
              pronoun,
              showPronoun,
            })
          }
          style={{ marginTop: 50 }}
        />
      ),
    });
  }, [navigation, pronoun, showPronoun]);

  return (
    <ScrollView style={styles.scrollView}>
      <KeyboardAvoidingView
        behavior="position"
        enabled
        keyboardVerticalOffset={-100}
      >
        <FormScreen
          title="My gender identity is"
          pagination={require("../../assets/pagination/3.png")}
          isActive={pronoun}
          onPress={() =>
            navigation.navigate(routes.REGISTERORIENTATION, {
              username,
              pronoun,
              showPronoun,
            })
          }
          style={styles.formScreen}
          headingStyle={{ width: screen.width * 0.7 }}
        >
          <TextInput
            value={input["input"]}
            onChangeText={(input) => setInput({ input }) + setViewAll(false)}
            placeholder={"Start typing"}
            width={screen.width * 0.83}
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

          <ScrollView style={styles.innerScrollView} nestedScrollEnabled>
            <SelectMultiple
              group={searchPronouns}
              onSelectedValuesChange={(selectedValues) =>
                setPronoun(selectedValues.join(", "))
              }
            ></SelectMultiple>
          </ScrollView>
          <Checkbox
            rightText="Show gender identity on my profile"
            isChecked={toggleCheckBox}
            onClick={() => setToggleCheckBox(!toggleCheckBox)}
          />
        </FormScreen>
      </KeyboardAvoidingView>
      <PopUp
        text="Whatever you don't care to answer, you skip."
        style={styles.popUp}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  checked: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 3,
  },
  formScreen: {
    minHeight: screen.height - 120,
    paddingHorizontal: screen.width > 400 ? 18 : 17,
    paddingBottom: 44,
    paddingTop: Platform.OS === "android" ? 50 : 100,
  },
  innerScrollView: {
    borderWidth: 12,
    borderColor: colors.basicGrey,
    borderBottomWidth: 24,
    height: 215,
  },
  popUp: {
    position: "absolute",
    right: 60,
    top: 30,
  },
  scrollView: {
    backgroundColor: colors.basicGrey,
  },
  titlesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PronounScreen;
