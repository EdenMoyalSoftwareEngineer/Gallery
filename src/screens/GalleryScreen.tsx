import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Loading from "../components/Loading";
import { usePaginatedImages } from "../hooks/usePaginatedImages";

const { width, height } = Dimensions.get("window");

const GalleryScreen: React.FC = () => {
  const { images, loading, error, hasMore, loadMore } = usePaginatedImages();

  const renderImage: ListRenderItem<string> | null | undefined = ({ item }) => (
    <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
  );

  const renderEmptyList = () => {
    if (loading) return <></>;
    if (error)
      return (
        <Text style={styles.errorText}>
          {error}
        </Text>
      );
    return <Text style={styles.noImagesText}>No images to display</Text>;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item}
        renderItem={renderImage}
        onEndReached={hasMore ? loadMore : null}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <Loading /> : null}
        ListEmptyComponent={renderEmptyList()}
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
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
