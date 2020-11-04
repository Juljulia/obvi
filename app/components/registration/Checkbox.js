import React from "react";
import { Image, StyleSheet } from "react-native";
import CheckBox from "react-native-check-box";

import colors from "../../config/colors";

function Checkbox({ onClick, rightText, isChecked }) {
  return (
    <CheckBox
      rightText={rightText}
      rightTextStyle={{ color: colors.text }}
      isChecked={isChecked}
      onClick={onClick}
      checkedImage={
        <Image
          source={require("../../assets/check.png")}
          style={styles.checked}
        />
      }
      unCheckedImage={<Image source={require("../../assets/uncheck.png")} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Checkbox;
