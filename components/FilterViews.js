import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { hp } from "../helper/common";
import { theme } from "../constants/theme";

const FilterViews = ({ title, content }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View>{content}</View>
    </View>
  );
};

export const CommonFilterRow = ({ title, content }) => {
  return (
    <View>
      <Text>{title}</Text>
      <View>{content}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: hp(2.4),
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.neutral(0.8),
  },
});

export default FilterViews;
