import React from "react";
import { Modal, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

function UploadScreen({ onDone, visible = false }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <LottieView
          autoPlay
          loop={false}
          onAnimationFinish={onDone}
          source={require("../assets/animations/done.json")}
          style={styles.animation}
        />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  animation: {
    width: 150,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default UploadScreen;
