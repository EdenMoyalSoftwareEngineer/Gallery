import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getImages } from "../services/storageService";

const { width, height } = Dimensions.get("window");
const IMAGES_PER_PAGE = 2;

const GalleryScreen: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = useCallback(async (pageNumber: number) => {
    try {
      setLoading(true);
      const storedImages = await getImages();
      const startIndex = (pageNumber - 1) * IMAGES_PER_PAGE;
      const endIndex = startIndex + IMAGES_PER_PAGE;
      const newImages = storedImages.slice(startIndex, endIndex);
      if (newImages.length === 0) {
        setHasMore(false);
      } else {
        setImages((prevImages) => [...prevImages, ...newImages]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch images.");
      console.error("Fetch Images Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages(page);
  }, [fetchImages, page]);

  const loadMoreImages = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderImage = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderImage}
        onEndReached={loadMoreImages}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#007BFF" /> : null
        }
        ListEmptyComponent={
          !loading?(
            <Text style={styles.noImagesText}>No images to display</Text>
          ):<></>
        }
      />
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: width,
    height: height / 2,
  },
  noImagesText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
});
