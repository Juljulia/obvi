import React from "react";
import { View, StyleSheet } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

import CustomSliderMarker from "./CustomSliderMarker";
import Text from "./typography/Text";
import colors from "../config/colors";

function Slider({
  onValuesChange,
  values,
  min = 1,
  max = 13,
  length = 315,
  minLabel = "0h",
  maxLabel = "12h",
}) {
  return (
    <View>
      <MultiSlider
        containerStyle={{
          height: 96,
          justifyContent: "flex-end",
          shadowColor: colors.shadow,
          shadowOffset: {
            width: 3.74,
            height: 3.74,
          },
          shadowOpacity: 1,
          shadowRadius: 6,
        }}
        trackStyle={{
          height: 15,
          borderRadius: 36,
          backgroundColor: colors.primary,
        }}
        selectedStyle={{
          backgroundColor: "transparent",
          borderColor: "#F0F0F3",
          borderWidth: 1,
          overflow: "hidden",
          shadowColor: colors.shadow,
          shadowRadius: 2,
          shadowOpacity: 1,
          shadowOffset: {
            width: 2,
            height: 2,
          },
        }}
        onValuesChange={onValuesChange}
        min={min}
        max={max}
        sliderLength={length}
        customMarker={(e) => {
          return <CustomSliderMarker text={e.currentValue} />;
        }}
        markerOffsetY={-20}
        markerOffsetX={5}
        values={values}
      />
      <View style={styles.timeRange}>
        <Text style={styles.timeRangeText}>{minLabel}</Text>
        <Text style={styles.timeRangeText}>{maxLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timeRange: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  timeRangeText: {
    color: colors.text,
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
});

export default Slider;
