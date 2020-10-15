import { DefaultTheme } from "@react-navigation/native";
import colors from "../config/colors";

//copy all of the properties of DefaultTheme and override some of colors' properties
export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.white,
  },
};
