import React from "react";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";

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
}) {
  return (
    <View>
      <TextInput
        style={style}
        placeholder={placeholder}
        icon={icon}
        onChangeText={onChangeText}
        value={value}
      />
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
    maxHeight: 400,
    backgroundColor: colors.white,
    borderRadius: 30,
    shadowOffset: { width: 6, height: 6 },
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowRadius: 16,
    shadowOpacity: 1,
    padding: 21,
  },
});

export default SearchInput;
