import React, { useState, useLayoutEffect } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";

import Checkbox from "../../components/registration/Checkbox";
import FormScreen from "../../components/registration/FormScreen";
import routes from "../../navigation/routes";
import TextInput from "../../components/TextInput";
import NavArrow from "../../components/nav/NavArrow";
import orientations from "../../assets/arrays/orientations";
import SelectMultiple from "../../components/registration/SelectMultiple";
import Text from "../../components/typography/Text";
import colors from "../../config/colors";

const windowHeight = Dimensions.get("window").height;

function OrientationScreen({ navigation, route }) {
  const { username, pronoun, showPronoun } = route.params;
  const [input, setInput] = useState("");
  const [orientation, setOrientation] = useState(null);
  const [viewAll, setViewAll] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const showOrientation = toggleCheckBox;

  let searchOrientations = [];
  if (input["input"] !== "") {
    searchOrientations = orientations.filter((el) =>
      el.value.includes(input["input"])
    );
  }
  if (viewAll) {
    searchOrientations = orientations.slice();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavArrow
          onPress={() =>
            navigation.navigate(routes.REGISTERPASSIONS, {
              username,
              pronoun,
              showPronoun,
              orientation,
              showOrientation,
            })
          }
        />
      ),
    });
  }, [navigation, orientation, showOrientation]);

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior="position"
        enabled
        keyboardVerticalOffset={-200}
      >
        <FormScreen
          title="My orientation is"
          page="4"
          totalPages="7"
          isActive={orientation}
          onPress={() =>
            navigation.navigate(routes.REGISTERPASSIONS, {
              username,
              pronoun,
              showPronoun,
              orientation,
              showOrientation,
            })
          }
          style={{ height: windowHeight + 25 }}
        >
          <TextInput
            value={input["input"]}
            onChangeText={(input) => setInput({ input })}
            placeholder={"Start typing"}
          />
          <View style={styles.titlesContainer}>
            <Text>Orientations</Text>
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
              group={searchOrientations}
              onSelectedValuesChange={(selectedValues) =>
                setOrientation(selectedValues.join(", "))
              }
            ></SelectMultiple>
          </ScrollView>
          <Checkbox
            rightText="Show orientation on my profile"
            isChecked={toggleCheckBox}
            onClick={() => setToggleCheckBox(!toggleCheckBox)}
          />
        </FormScreen>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  innerScrollView: {
    borderWidth: 12,
    borderColor: colors.basicGrey,
    borderBottomWidth: 24,
    minHeight: 100,
    maxHeight: 235,
  },
  titlesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default OrientationScreen;
