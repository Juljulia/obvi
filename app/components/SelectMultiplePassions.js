import React from "react";
import { View, StyleSheet } from "react-native";
import { SelectMultipleGroupButton } from "react-native-selectmultiple-button";

import colors from "../config/colors";

function SelectMultiplePassions({ group, onSelectedValuesChange }) {
  return (
    <SelectMultipleGroupButton
      buttonViewStyle={{
        margin: 8,
        borderRadius: 16,
        padding: 4,
        maxWidth: 150,
        alignItems: "center",
        shadowColor: "#bdcde1",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1, //drop shadow offset
        shadowRadius: 4, // blur radius
        elevation: 2,
      }}
      highLightStyle={{
        //not selected
        borderColor: colors.light,
        backgroundColor: colors.light,
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

export default SelectMultiplePassions;
