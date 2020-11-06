import React from "react";
import { Image, StyleSheet, View } from "react-native";
import CheckBox from "react-native-check-box";

import colors from "../../config/colors";
import Text from "../../components/typography/Text";

function Checkbox({ onClick, rightText, isChecked }) {
  return (
    <View style={styles.container}>
      <CheckBox
        isChecked={isChecked}
        onClick={onClick}
        checkedImage={
          <Image
            source={require("../../assets/check.png")}
            style={styles.checked}
          />
        }
        unCheckedImage={<Image source={require("../../assets/uncheck.png")} />}
        style={{
          paddingTop: 22,
          paddingBottom: 22,
        }}
      />
      <Text style={{ fontSize: 14, paddingLeft: 4 }}>{rightText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    shadowColor: colors.shadow,
    shadowRadius: 50,
    shadowOpacity: 1,
    borderColor: colors.white,
    borderWidth: 0.8,
    shadowOffset: { width: -20, height: 10 },
  },
});

export default Checkbox;
