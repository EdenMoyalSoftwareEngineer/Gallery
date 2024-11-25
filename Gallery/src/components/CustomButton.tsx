import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  action: () => void;
};
const CustomButton = ({ title, action }: Props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={action}
      accessibilityLabel={title}
      accessible
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10, 
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});
