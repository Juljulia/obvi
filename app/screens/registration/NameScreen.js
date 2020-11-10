import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import FormScreen from "../../components/registration/FormScreen";
import routes from "../../navigation/routes";
import TextInput from "../../components/TextInput";
import Text from "../../components/typography/Text";
import { screen } from "../../config/dimensions";

function NameScreen({ navigation }) {
  const [username, setUsername] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleActive = (username) => {
    if (username.username) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  };

  useEffect(() => {
    handleActive(username);
  }, [username]);

  return (
    <FormScreen
      title="My name is"
      isActive={disabled}
      onPress={() =>
        navigation.navigate(routes.REGISTERPRONOUN, { ...username })
      }
      pagination={require("../../assets/pagination/2.png")}
    >
      <TextInput
        placeholder={"Name"}
        onChangeText={(username) => setUsername({ username })}
        icon="account"
        value={username["username"]}
        style={{ marginBottom: 12 }}
        width={screen.width * 0.83}
      />
      <Text style={{ lineHeight: 25, marginBottom: 120, alignSelf: "center" }}>
        The chosen name will appear in you profile
      </Text>
    </FormScreen>
  );
}

const styles = StyleSheet.create({});

export default NameScreen;
