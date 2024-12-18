import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import GalleryScreen from "./src/screens/GalleryScreen";
import { scheduleNotification } from "./src/services/notificationService";
import { requestNotificationPermission } from "./src/services/permissionService";
import { Alert } from "react-native";

const Stack = createStackNavigator();
const App = () => {
  useEffect(() => {
    (async () => {
     try {
       const hasPermission = await requestNotificationPermission();
       if (hasPermission) {
         await scheduleNotification();
       }
     } catch (error) {
      Alert.alert('Error trying to set notifications')
     }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Gallery" component={GalleryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
