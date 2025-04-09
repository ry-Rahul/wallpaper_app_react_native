import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { data } from "../constants/data";
import { FlatList } from "react-native";
import { hp, wp } from "../helper/common";
import { theme } from "../constants/theme";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";

const Categories = ({ activeCategory, handleChangeCategory }) => {
  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.flatlistContainer}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      data={data.categories}
      renderItem={({ item, index }) => (
        <CategoryItem
          title={item}
          index={index}
          isActive={activeCategory === item}
          handleChangeCategory={handleChangeCategory}
        />
      )}
    />
  );
};

const CategoryItem = ({ title, index, isActive, handleChangeCategory }) => {
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)
        .duration(1000)
        .springify()
        .damping(14)}
    >
      <Pressable
        style={[styles.category, isActive && styles.activeCategory]}
        onPress={() => handleChangeCategory(isActive ? null : title)}
      >
        <Text style={[styles.categoryTitle, isActive && styles.activeTitle]}>
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingHorizontal: wp(4),
    gap: 8,
  },
  category: {
    padding: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: "white",
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },
  categoryTitle: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.medium,
  },
  activeCategory: {
    backgroundColor: theme.colors.neutral(0.8),
    color: theme.colors.white,
  },
  activeTitle: {
    color: theme.colors.white,
  },
});

export default Categories;
