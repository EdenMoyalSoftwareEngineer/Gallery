import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { getImages } from "../services/storageService";

const IMAGES_PER_PAGE = 2;

export const usePaginatedImages = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = useCallback(async (pageNumber: number) => {
    try {
      setLoading(true);
      const storedImages = await getImages();
      const startIndex = (pageNumber - 1) * IMAGES_PER_PAGE;
      const newImages = storedImages.slice(startIndex, startIndex + IMAGES_PER_PAGE);

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

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { images, loading, hasMore, loadMore };
};
