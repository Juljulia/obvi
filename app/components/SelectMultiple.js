import React from "react";
import { View, StyleSheet } from "react-native";
import { SelectMultipleGroupButton } from "react-native-selectmultiple-button";

import colors from "../config/colors";

function SelectMultiple({ group, onSelectedValuesChange }) {
  return (
    <SelectMultipleGroupButton
      buttonViewStyle={{
        margin: 5,
        borderRadius: 20,
        alignItems: "flex-start",
        height: 44,
        paddingLeft: 40,
        width: "70%",
        marginVertical: 10,
      }}
      highLightStyle={{
        //not selected
        borderColor: colors.medium,
        backgroundColor: colors.white,
        textColor: colors.medium,

        //selected
        borderTintColor: colors.primary,
        backgroundTintColor: colors.primary,
        textTintColor: colors.white,
      }}
      textStyle={{
        fontSize: 12,
      }}
      group={group}
      // singleTap={(valueTap) => console.log(pronoun)}
      onSelectedValuesChange={onSelectedValuesChange}
    ></SelectMultipleGroupButton>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SelectMultiple;
