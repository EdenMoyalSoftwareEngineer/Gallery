import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { usePaginatedImages } from "../hooks/usePaginatedImages";
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("window");

const GalleryScreen: React.FC = () => {
  const { images, loading, hasMore, loadMore } = usePaginatedImages();

  const renderImage: ListRenderItem<string> | null | undefined = ({ item }) => (
    <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderImage}
        onEndReached={hasMore ? loadMore : null}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <Loading /> : null}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.noImagesText}>No images to display</Text>
          ) : (
            <></>
          )
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
