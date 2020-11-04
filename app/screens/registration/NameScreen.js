import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import FormScreen from "../../components/registration/FormScreen";
import routes from "../../navigation/routes";
import TextInput from "../../components/TextInput";
import Text from "../../components/typography/Text";

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
      isActive={disabled}
      onPress={() =>
        navigation.navigate(routes.REGISTERPRONOUN, { ...username })
      }
      page="2"
      title="My name is"
      totalPages="7"
    >
      <TextInput
        placeholder={"Name"}
        onChangeText={(username) => setUsername({ username })}
        icon="account"
        value={username["username"]}
      />
      <Text style={{ lineHeight: 25, marginBottom: 16 }}>
        The chosen name will appear in you profile
      </Text>
    </FormScreen>
  );
}

const styles = StyleSheet.create({});

export default NameScreen;
