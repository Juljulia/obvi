import React, { useState, useLayoutEffect } from "react";
import {
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
import { screen } from "../../config/dimensions";

function OrientationScreen({ navigation, route }) {
  const { username, pronoun, showPronoun } = route.params;
  const [input, setInput] = useState("");
  const [orientation, setOrientation] = useState(null);
  const [viewAll, setViewAll] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(true);
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
          style={{ marginTop: 50 }}
        />
      ),
    });
  }, [navigation, orientation, showOrientation]);

  return (
    <ScrollView style={styles.scrollView}>
      <KeyboardAvoidingView
        behavior="position"
        enabled
        keyboardVerticalOffset={-100}
      >
        <FormScreen
          title="My orientation is"
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
          style={{
            minHeight: screen.height - 120,
            paddingHorizontal: screen.width > 400 ? 18 : 17,
            paddingBottom: 44,
          }}
          pagination={require("../../assets/pagination/4.png")}
        >
          <TextInput
            value={input["input"]}
            onChangeText={(input) => setInput({ input })}
            placeholder={"Start typing"}
            width={screen.width * 0.83}
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
          <ScrollView style={styles.innerScrollView} nestedScrollEnabled>
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
    height: 215,
  },
  scrollView: {
    backgroundColor: colors.basicGrey,
  },
  titlesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default OrientationScreen;
