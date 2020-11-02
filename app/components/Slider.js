import React from "react";
import { View, StyleSheet } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

import CustomSliderMarker from "../components/CustomSliderMarker";
import Text from "./Text";
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
          marginLeft: 30,
        }}
        trackStyle={{ height: 15, borderRadius: 36 }}
        selectedStyle={{
          backgroundColor: "transparent",
          borderColor: "#F0F0F3",
          borderWidth: 1,
          overflow: "hidden",
          shadowColor: "#A0A5B9",
          shadowRadius: 9,
          shadowOpacity: 1,
        }}
        onValuesChange={onValuesChange}
        min={min}
        max={max}
        sliderLength={length}
        customMarker={(e) => {
          return <CustomSliderMarker text={e.currentValue} />;
        }}
        markerOffsetY={-20}
        values={values}
      />
      <View style={styles.timeRange}>
        <Text>{minLabel}</Text>
        <Text>{maxLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timeRange: {
    marginLeft: 30,
    width: 315,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default Slider;
