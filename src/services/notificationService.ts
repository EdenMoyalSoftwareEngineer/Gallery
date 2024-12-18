import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  
export const scheduleNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "HELLO WORLD",
    },
    trigger: {
      seconds: 60 * 10, 
      repeats: true, 
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL
    },
  });
};

