import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const wp = (percentage) => {
  const value = (percentage / 100) * deviceWidth;
  return Math.round(value);
};

export const hp = (percentage) => {
  const value = (percentage / 100) * deviceHeight;
  return Math.round(value);
};

export const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

export const getColumnCount = () => {
  if (deviceWidth >= 1024) {
    return 4;
  } else if (deviceWidth >= 768) {
    return 3;
  } else {
    return 2;
  }
};

export const getImageSize = (height, width) => {
  if (width > height) {
    return 250;
  } else if (width < height) {
    return 300;
  } else {
    return 250;
  }
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
