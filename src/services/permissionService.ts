import * as Notifications from "expo-notifications";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const requestCameraPermission = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
        Alert.alert(
            "Permission Denied",
            "Camera permission is required to use this feature. Please enable it in settings."
        );
        return false;
    }
    return true;
};

export const requestNotificationPermission = async (): Promise<boolean> => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
        Alert.alert(
            "Permission Denied",
            "Notification permission is required to receive alerts. Please enable it in settings."
        );
        return false;
    }
    return true;
};
