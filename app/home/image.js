import { View, Text, Button, Image, Platform } from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { wp } from "../../helper/common";
import { StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { theme } from "../../constants/theme";

const ImageScreen = () => {
  const [status, setStatus] = useState("");
  const router = useRouter();
  const item = useLocalSearchParams();
  let uri = item?.webformatURL;

  const onLoad = () => {
    setStatus("");
  };

  const getSize = () => {
    const aspectRatio = item?.imageWidth / item?.imageHeight;
    const maxWidth = Platform.OS == "web" ? wp(50) : wp(92);
    let calculatedHeight = maxWidth / aspectRatio;
    let calculatedWidth = maxWidth;

    if (aspectRatio < 1) {
      calculatedWidth = calculatedHeight * aspectRatio;
    }
    return {
      width: calculatedWidth,
      height: calculatedHeight,
    };
  };
  return (
    <BlurView intensity={100} tint="dark" style={styles.container}>
      <View style={getSize()}>
        <Image
          transition={100}
          source={{ uri }}
          style={[styles.image, getSize()]}
          contentFit="contain"
          onLoad={onLoad}
        />
      </View>
      <Button title="Go Back" onPress={() => router.back()} />
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(4),
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  image: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    backgroundColor: "rgba(255,255, 255, 0.1)",
    borderColor: "rgba(255,255,255,0.1)",
  },
});

export default ImageScreen;
