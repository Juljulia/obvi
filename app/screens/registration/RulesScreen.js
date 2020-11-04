import React from "react";
import { StyleSheet } from "react-native";

import Button from "../../components/Button";
import FormScreen from "../../components/registration/FormScreen";
import useAuth from "../../auth/useAuth";
import routes from "../../navigation/routes";
import Text from "../../components/typography/Text";

function RulesScreen({ navigation }) {
  const { logOut } = useAuth();
  return (
    <FormScreen
      title="Welcome to Obvi"
      page="1"
      totalPages="7"
      onPress={() => navigation.navigate(routes.REGISTERNAME)}
      isActive={true}
    >
      <Text>Please follow these house rules</Text>
      <Button title="Log out" onPress={() => logOut()} />
    </FormScreen>
  );
}

const styles = StyleSheet.create({});

export default RulesScreen;
