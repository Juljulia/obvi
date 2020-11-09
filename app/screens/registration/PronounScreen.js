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
  const [toggleCheckBox, setToggleCheckBox] = useState(true);
  const [viewAll, setViewAll] = useState(false);
  const screenWidth = Dimensions.get("window").width;

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
          style={{
            minHeight: windowHeight - 120,
            paddingHorizontal: screenWidth > 400 ? 18 : 17,
            paddingBottom: 44,
          }}
          headingStyle={{ width: screenWidth * 0.7 }}
        >
          <TextInput
            value={input["input"]}
            onChangeText={(input) => setInput({ input })}
            placeholder={"Start typing"}
            width={screenWidth * 0.83}
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
