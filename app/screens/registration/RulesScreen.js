import React from "react";
import { Image, StyleSheet, View } from "react-native";

import Button from "../../components/Button";
import FormScreen from "../../components/registration/FormScreen";
import H2 from "../../components/typography/H2";
import useAuth from "../../auth/useAuth";
import routes from "../../navigation/routes";
import Rule from "../../components/registration/Rule";
import Text from "../../components/typography/Text";

function RulesScreen({ navigation }) {
  const { logOut } = useAuth();
  return (
    <FormScreen
      onPress={() => navigation.navigate(routes.REGISTERNAME)}
      isActive={true}
      style={{ paddingTop: 0, flex: 1 }}
      pagination={require("../../assets/pagination/1.png")}
    >
      <View style={{ alignItems: "center" }}>
        <Image source={require("../../assets/logo-small.png")}></Image>
        <H2 style={{ paddingTop: 16 }}>Welcome to Obvi</H2>
        <Text style={{ paddingTop: 16, paddingBottom: 40 }}>
          Please follow these house rules
        </Text>
      </View>
      <View style={{ paddingHorizontal: 8 }}>
        <Rule
          title="Be yourself."
          text="This platform is created to house you as you are"
        ></Rule>
        <Rule
          title="Be safe."
          text="Report bad or inappropriate behavior."
        ></Rule>
        <Rule
          title="Play nice."
          text="Respect each other and embrace your differences. "
        ></Rule>
        <Rule
          title="Be proactive."
          text="Share your whereabouts and your knowledge within this beautiful comunity."
        ></Rule>
      </View>
      {/* <Button title="Log out" onPress={() => logOut()} /> */}
    </FormScreen>
  );
}

const styles = StyleSheet.create({});

export default RulesScreen;
