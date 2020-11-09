import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

import FormScreen from "../../components/registration/FormScreen";
import H2 from "../../components/typography/H2";
import routes from "../../navigation/routes";
import Rule from "../../components/registration/Rule";
import Text from "../../components/typography/Text";

function RulesScreen({ navigation }) {
  return (
    <FormScreen
      onPress={() => navigation.navigate(routes.REGISTERNAME)}
      isActive={true}
      style={{
        paddingTop: 0,
        paddingBottom: 140,
      }}
      pagination={require("../../assets/pagination/1.png")}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={{}}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: 52, height: 52, marginTop: 10 }}
            source={require("../../assets/logo-small.png")}
          />
          <H2 style={{ paddingTop: 20 }}>Welcome to Obvi</H2>
          <Text style={{ paddingTop: 16 }}>
            Please follow these house rules
          </Text>
        </View>
        <View style={{}}>
          <Rule
            title="Be yourself."
            text="This platform is created to house you as you are."
          />
          <Rule title="Be safe." text="Report bad or inappropriate behavior." />
          <Rule
            title="Play nice."
            text="Respect each other and embrace your differences. "
          />
          <Rule
            title="Be proactive."
            text="Share your whereabouts and your knowledge within this beautiful comunity."
          />
        </View>
      </ScrollView>
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 40,
  },
});

export default RulesScreen;
