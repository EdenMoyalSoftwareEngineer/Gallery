import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'images';

export const saveImage = async (uri: string) => {
    const storedImages = await AsyncStorage.getItem(STORAGE_KEY);
    const images = storedImages ? JSON.parse(storedImages) : [];
    images.push(uri);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(images));
};

export const getImages = async () => {
    const storedImages = await AsyncStorage.getItem(STORAGE_KEY);
    return storedImages ? JSON.parse(storedImages) : [];
};