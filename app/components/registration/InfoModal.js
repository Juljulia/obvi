import React from "react";
import { Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";

import Button from "../Button";
import H2 from "../typography/H2";
import colors from "../../config/colors";
import Text from "../typography/Text";

function InfoModal({ onPress, onPressButton, visible }) {
  return (
    <Modal animationType="slide" visible={visible}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={styles.arrow}>
          <Image source={require("../../assets/arrow-up.png")} />
        </TouchableOpacity>
        <Button title="Allow location" onPressButton={onPressButton} />
        <View style={styles.description}>
          <H2 style={styles.title}>Spot the community</H2>
          <Text style={[styles.text, { lineHeight: 25 }]}>
            Your nearby location will show you friends within the community and
            their nearby whereabouts.
          </Text>
          <Text style={{ lineHeight: 25 }}>
            To see exact location check in within the app an meet up with like
            minded people.
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  arrow: {
    marginBottom: 14, //10 + 14 button has 10 marginVertical
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.basicGrey,
    paddingTop: 130,
    flex: 1,
  },
  description: {
    height: 400,
    paddingHorizontal: 34,
    marginTop: 104,
  },
  title: {
    paddingBottom: 24,
  },
  text: {
    marginBottom: 40,
  },
});

export default InfoModal;
