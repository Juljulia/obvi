import React, { useState, useLayoutEffect } from "react";
import { Image, StyleSheet, ScrollView, Dimensions } from "react-native";

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
  const [passions, setPassions] = useState(null);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

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
          style={{ marginTop: 50 }}
        />
      ),
    });
  }, [navigation, passions]);

  return (
    <FormScreen
      title="Passions"
      isActive={passions}
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
      style={{ paddingTop: 50, paddingHorizontal: screenWidth > 400 ? 30 : 15 }}
      pagination={require("../../assets/pagination/5.png")}
    >
      <Text style={{ paddingTop: 12, paddingBottom: 26, lineHeight: 25 }}>
        Let everyone know what you're passionate about, by adding it to your
        profile.
      </Text>
      <ScrollView
        style={{
          height: screenHeight > 800 ? screenHeight * 0.5 : screenHeight * 0.45,
        }}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        <SelectMultiplePassions
          group={passionsArr}
          onSelectedValuesChange={(selectedValues) =>
            setPassions(selectedValues.join(", "))
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
