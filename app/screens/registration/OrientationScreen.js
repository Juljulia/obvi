import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

import FormScreen from "../../components/multiScreenForm/FormScreen";
import routes from "../../navigation/routes";
import TextInput from "../../components/TextInput";
import NavArrow from "../../components/NavArrow";
import orientations from "../../assets/arrays/orientations";
import SelectMultiple from "../../components/SelectMultiple";
import Text from "../../components/typography/Text";
import { ScrollView } from "react-native-gesture-handler";

function OrientationScreen({ navigation, route }) {
  const { username, pronoun } = route.params;
  const [input, setInput] = useState("");
  const [orientation, setOrientation] = useState(null);
  const [viewAll, setViewAll] = useState(false);

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
              orientation,
            })
          }
        />
      ),
    });
  }, [navigation, orientation]);

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
      <ScrollView>
        <SelectMultiple
          group={searchOrientations}
          // singleTap={(valueTap) => console.log(pronoun)}
          onSelectedValuesChange={(selectedValues) =>
            setOrientation(selectedValues.join(", "))
          }
        ></SelectMultiple>
      </ScrollView>
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
  titlesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default OrientationScreen;
