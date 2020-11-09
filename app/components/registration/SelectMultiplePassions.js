import React from "react";
import { SelectMultipleGroupButton } from "react-native-selectmultiple-button";

import colors from "../../config/colors";

function SelectMultiplePassions({ group, onSelectedValuesChange }) {
  return (
    <SelectMultipleGroupButton
      containerViewStyle={{
        justifyContent: "space-around",
        paddingRight: 5,
      }}
      buttonViewStyle={{
        borderRadius: 16,
        elevation: 2,
        marginVertical: 4,
        padding: 4,
        shadowColor: colors.shadow,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1, //drop shadow offset
        shadowRadius: 4, // blur radius
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
      onSelectedValuesChange={onSelectedValuesChange}
    ></SelectMultipleGroupButton>
  );
}

export default SelectMultiplePassions;
