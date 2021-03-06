import React from "react";
import { StyleSheet } from "react-native";
import { SelectMultipleGroupButton } from "react-native-selectmultiple-button";

import colors from "../../config/colors";

function SelectMultiple({ group, onSelectedValuesChange }) {
  return (
    <SelectMultipleGroupButton
      buttonViewStyle={{
        borderRadius: 20,
        alignItems: "flex-start",
        height: 44,
        paddingLeft: 40,
        width: "95%",
        marginVertical: 8,
        shadowColor: colors.shadow,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1, //drop shadow offset
        shadowRadius: 4, // blur radius
        elevation: 2,
      }}
      highLightStyle={{
        //not selected
        borderColor: colors.basicGrey,
        backgroundColor: colors.basicGrey,
        textColor: colors.text,

        //selected
        borderTintColor: colors.primary,
        backgroundTintColor: colors.primary,
        textTintColor: colors.white,
      }}
      textStyle={{
        fontSize: 12,
      }}
      group={group}
      onSelectedValuesChange={onSelectedValuesChange}
    ></SelectMultipleGroupButton>
  );
}

export default SelectMultiple;
