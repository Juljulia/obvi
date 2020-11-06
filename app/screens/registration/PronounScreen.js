import React, { useState, useLayoutEffect } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
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

const windowHeight = Dimensions.get("window").height;

function PronounScreen({ navigation, route }) {
  const { username } = route.params;
  const [input, setInput] = useState("");
  const [pronoun, setPronoun] = useState(null);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [viewAll, setViewAll] = useState(false);

  const showPronoun = toggleCheckBox;

  let searchPronouns = [];

  if (input["input"] !== "") {
    searchPronouns = pronouns.filter((el) => el.value.includes(input["input"]));
  }

  if (viewAll) {
    searchPronouns = pronouns.slice();
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
        />
      ),
    });
  }, [navigation, pronoun, showPronoun]);

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior="position"
        enabled
        keyboardVerticalOffset={-150}
      >
        <FormScreen
          title="My gender      identity is"
          pagination={require("../../assets/pagination/3.png")}
          isActive={pronoun}
          onPress={() =>
            navigation.navigate(routes.REGISTERORIENTATION, {
              username,
              pronoun,
              showPronoun,
            })
          }
          style={{
            height: windowHeight - 120,
            paddingTop: 60,
          }}
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

          <ScrollView style={styles.innerScrollView}>
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
  innerScrollView: {
    borderWidth: 12,
    borderColor: colors.basicGrey,
    borderBottomWidth: 24,
    maxHeight: 235,
  },
  popUp: {
    position: "absolute",
    right: 40,
    top: -60,
  },
  titlesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PronounScreen;
