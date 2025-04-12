import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { capitalize, hp } from "../helper/common";
import { theme } from "../constants/theme";

const FilterViews = ({ title, content }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View>{content}</View>
    </View>
  );
};

export const CommonFilterRow = ({ data, filterName, filters, setFilters }) => {
  const onselect = (item) => {
    setFilters({ ...filters, [filterName]: item });
  };
  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item, index) => {
          let isActive = filters && filters[filterName] == item;
          let backgroundColor = isActive ? theme.colors.neutral(0.7) : "white";
          let color = isActive ? "white" : theme.colors.neutral(0.8);
          return (
            <Pressable
              onPress={() => onselect(item)}
              key={item}
              style={[styles.outlinedButton, { backgroundColor }]}
            >
              <Text style={[styles.outlinedButtonText, { color }]}>
                {capitalize(item)}
              </Text>
            </Pressable>
          );
        })}
    </View>
  );
};
export const ColourFilter = ({ data, filterName, filters, setFilters }) => {
  const onselect = (item) => {
    setFilters({ ...filters, [filterName]: item });
  };
  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item, index) => {
          let isActive = filters && filters[filterName] == item;
          let borderColour = isActive ? theme.colors.neutral(0.7) : "white";
          return (
            <Pressable onPress={() => onselect(item)} key={item}>
              <View
                style={[styles.colourWrapper, { borderColor: borderColour }]}
              >
                <View style={[styles.color, { backgroundColor: item }]} />
              </View>
            </Pressable>
          );
        })}
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
  flexRowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  outlinedButton: {
    padding: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    borderRadius: theme.radius.sm,
    borderCurve: "continuous",
  },
  outlinedButtonText: {},
  colourWrapper: {
    padding: 3,
    borderRadius: theme.radius.XS,
    borderWidth: 1,
  },
  color: {
    width: 40,
    height: 30,
    borderRadius: theme.radius.XS,
  },
});

export default FilterViews;
