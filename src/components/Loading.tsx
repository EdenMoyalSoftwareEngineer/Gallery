import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

type Props = {
  blockView?: boolean;
};

const Loading = ({ blockView = false }: Props) => {

  const renderActivityIndicator = () => (
    <ActivityIndicator size="large" color="#007BFF" />
  );

  if (blockView)
    return (
      <View style={styles.loadingOverlay}>{renderActivityIndicator()}</View>
    );
  return renderActivityIndicator();
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
