import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { HomeScreenNavigationProp } from "../types/navigation";

type Props = {
  navigation: HomeScreenNavigationProp;
};
const HomeScreen = ({ navigation }: Props) => {
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        // do something
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open gallery.");
      console.error(error);
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Camera permission is required to use this feature."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        quality: 1,
      });

      if (!result.canceled && result.assets) {
        const uri = result.assets[0].uri;
        console.log('uri', uri)
        // await saveImageToStorage(uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take a photo.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <CustomButton title={"Pick Image from Gallery"} action={pickImage} />
        <CustomButton title={"Take a Photo"} action={takePhoto} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f0",
  },
});
