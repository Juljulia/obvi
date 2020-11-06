import React, { useState, useLayoutEffect, useEffect } from "react";
import { Image, StyleSheet, ScrollView } from "react-native";

import FormScreen from "../../components/registration/FormScreen";
import routes from "../../navigation/routes";
import NavArrow from "../../components/nav/NavArrow";
import passionsArr from "../../assets/arrays/passionsArr";
import SelectMultiplePassions from "../../components/registration/SelectMultiplePassions";
import Text from "../../components/typography/Text";

function PassionsScreen({ navigation, route }) {
  const {
    username,
    orientation,
    showOrientation,
    pronoun,
    showPronoun,
  } = route.params;
  const [passions, setPassions] = useState([]);
  const [active, setActive] = useState(false);

  const changePassions = (selectedValues) => {
    setPassions(selectedValues);

    //sets button to active och inactive
    if (passions.length) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavArrow
          onPress={() =>
            navigation.navigate(routes.REGISTERPHOTO, {
              username,
              pronoun,
              orientation,
              showOrientation,
              passions,
              showPronoun,
            })
          }
        />
      ),
    });
  }, [navigation, passions]);

  return (
    <FormScreen
      title="Passions"
      isActive={active}
      onPress={() =>
        navigation.navigate(routes.REGISTERPHOTO, {
          username,
          pronoun,
          orientation,
          showOrientation,
          passions,
          showPronoun,
        })
      }
      style={{ paddingTop: 16 }}
      pagination={require("../../assets/pagination/5.png")}
    >
      <Text style={{ paddingTop: 16, paddingBottom: 32, lineHeight: 25 }}>
        Let everyone know what you're passionate about, by adding it to your
        profile.
      </Text>
      <ScrollView
        style={{ height: "50%" }}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <SelectMultiplePassions
          group={passionsArr}
          onSelectedValuesChange={(selectedValues) =>
            changePassions(selectedValues)
          }
        ></SelectMultiplePassions>
      </ScrollView>
      <Image
        source={require("../../assets/fade.png")}
        style={{
          position: "absolute",
          bottom: -60,
          left: 20,
        }}
      ></Image>
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default PassionsScreen;
