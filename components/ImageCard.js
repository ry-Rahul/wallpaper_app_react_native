import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { getImageSize } from "../helper/common";
import { theme } from "../constants/theme.js";
import { hp, wp } from "../helper/common.js";

const ImageCard = ({ item, index, columns }) => {
  const getImageHeight = () => {
    let { imageHeight: height, imageWidth: width } = item;
    return { height: getImageSize(height, width) };
  };
  return (
    <Pressable style={styles.container}>
      <Image
        style={[styles.image, getImageHeight()]}
        source={item?.webformatURL}
        transition={100}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.grayBG,
    borderRadius: theme.radius.md,
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: wp(0.5),
    marginHorizontal: wp(0.5),
  },
  image: {
    width: "100%",
    height: 300,
  },
});

export default ImageCard;
