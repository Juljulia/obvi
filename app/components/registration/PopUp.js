import React, { useState } from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import colors from "../../config/colors";

import Text from "../typography/Text";

function PopUp({ text, style }) {
  const [isClosed, setIsClosed] = useState(false);

  const closePopUp = () => {
    if (!isClosed) {
      setIsClosed(true);
    }
  };

  if (isClosed) {
    return null;
  }
  return (
    <TouchableHighlight onPress={closePopUp} style={[styles.container, style]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: colors.shadow,
    shadowRadius: 6,
    shadowOpacity: 0.7,
    width: 175,
    height: 54,
    backgroundColor: colors.basicGrey,
    paddingVertical: 7,
    paddingHorizontal: 19,
    elevation: 5,
  },
  text: {
    fontSize: 12,
  },
});

export default PopUp;
