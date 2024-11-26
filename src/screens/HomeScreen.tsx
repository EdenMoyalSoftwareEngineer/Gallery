import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { saveImage } from "../services/storageService";
import { HomeScreenNavigationProp } from "../types/navigation";
import { requestCameraPermission } from "../services/permissionService";

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const saveImageToStorage = useCallback(async (uri: string) => {
    try {
      setIsLoading(true);
      await saveImage(uri); 
      Alert.alert("Success", "Image saved successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to save image.");
      console.error("Save Image Error:", error);
    } finally {
      setIsLoading(false); 
    }
  }, []); 
  

  const pickImage = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 1,
      });

      if (!result.canceled && result.assets) {
        const uri = result.assets[0].uri;
        await saveImageToStorage(uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open gallery.");
      console.error("Gallery Error:", error);
    }
  }, [saveImageToStorage]);

  const takePhoto = useCallback(async () => {
    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) return;
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets) {
        const uri = result.assets[0].uri;
        await saveImageToStorage(uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take a photo.");
      console.error("Camera Error:", error);
    }
  }, [requestCameraPermission, saveImageToStorage]);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>
      )}
      <View>
        <CustomButton title="Pick Image from Gallery" action={pickImage} />
        <CustomButton title="Take a Photo" action={takePhoto} />
        <CustomButton title="Go To Gallery" action={()=>navigation.navigate('Gallery')} />
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
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, 
  },
});
