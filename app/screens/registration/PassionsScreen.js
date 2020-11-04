import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";

import FormScreen from "../../components/multiScreenForm/FormScreen";
import routes from "../../navigation/routes";
import NavArrow from "../../components/nav/NavArrow";
import passionsArr from "../../assets/arrays/passionsArr";
import SelectMultiplePassions from "../../components/SelectMultiplePassions";

function PassionsScreen({ navigation, route }) {
  const { username, orientation, pronoun } = route.params;
  const [passions, setPassions] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavArrow
          onPress={() =>
            navigation.navigate(routes.REGISTERPHOTO, {
              username,
              pronoun,
              orientation,
              passions,
            })
          }
        />
      ),
    });
  }, [navigation, passions]);

  return (
    <FormScreen
      title="Passions"
      page="5"
      totalPages="7"
      isActive={passions}
      onPress={() =>
        navigation.navigate(routes.REGISTERPHOTO, {
          username,
          pronoun,
          orientation,
          passions,
        })
      }
    >
      <ScrollView contentContainerStyle={styles.passionsContainer}>
        <SelectMultiplePassions
          group={passionsArr}
          onSelectedValuesChange={(selectedValues) =>
            setPassions(selectedValues)
          }
        ></SelectMultiplePassions>
      </ScrollView>
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
  passionsContainer: {
    flex: 1,
    display: "flex",
  },
});

export default PassionsScreen;
