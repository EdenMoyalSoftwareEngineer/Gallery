import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const Loading = () => {
  return (
    <View style={styles.loadingOverlay}>
      <ActivityIndicator size="large" color="#007BFF" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
