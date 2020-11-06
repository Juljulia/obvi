import React from "react";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import TextInput from "../components/TextInput";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import colors from "../config/colors";

function SearchInput({
  results,
  keyExtractor,
  onChangeText,
  value,
  placeholder,
  icon,
  closeList,
  showResults,
  renderItem,
  style,
  onPress,
  inputWidth = 315,
  inputHeight = 70,
  ...otherProps
}) {
  return (
    <View {...otherProps}>
      <TouchableWithoutFeedback onPress={onPress}>
        <TextInput
          style={style}
          placeholder={placeholder}
          icon={icon}
          onChangeText={onChangeText}
          value={value}
          width={inputWidth}
          height={inputHeight}
        />
      </TouchableWithoutFeedback>
      {!closeList && (
        <View style={styles.resultsList}>
          {!showResults ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={results}
              keyExtractor={keyExtractor}
              ItemSeparatorComponent={ListItemSeparator}
              renderItem={renderItem}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  resultsList: {
    maxHeight: 300,
    backgroundColor: colors.white,
    borderRadius: 30,
    shadowOffset: { width: 6, height: 6 },
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowRadius: 16,
    shadowOpacity: 1,
    padding: 21,
    zIndex: 2,
  },
});

export default SearchInput;
