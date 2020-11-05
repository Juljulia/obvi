import React from "react";
import { Image, StyleSheet, View } from "react-native";
import CheckBox from "react-native-check-box";

import colors from "../../config/colors";

function Checkbox({ onClick, rightText, isChecked }) {
  return (
    <View style={styles.container}>
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
        style={{
          paddingVertical: 32,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Checkbox;
