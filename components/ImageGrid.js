import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "./ImageCard";
import { getColumnCount, hp, wp } from "../helper/common.js";


const ImageGrid = ({ images }) => {
  const columns = getColumnCount();
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={columns}
        initialNumToRender={1000}
        contentContainerStyle={styles.listContainerStyle}
        renderItem={({ item, index }) => (
          <ImageCard item={item} index={index} columns={columns} />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainerStyle: {
    paddingHorizontal: wp(1),
  },
  container: {
    minHeight: 3,
    width: wp(100),
  },
});

export default ImageGrid;
