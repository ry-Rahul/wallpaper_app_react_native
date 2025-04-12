import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ActivityIndicator,
  ScrollViewBase,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { theme } from "../../constants/theme.js";
import { hp, wp } from "../../helper/common.js";
import { ScrollView } from "react-native";
import Categories from "../../components/Categories.js";
import { apiCall } from "../../api/index.js";
import ImageGrid from "../../components/ImageGrid.js";
import { debounce } from "lodash";
import FilterModal from "../../components/FilterModal.js";
import { useRouter } from "expo-router";

var page = 1;

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState("");
  const searchInputRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [images, setImages] = useState([]);
  const [filters, setFilters] = useState(null);
  const [isEndReached, setIsEndReached] = useState(false);
  const modelRef = useRef(null);
  const scrollRef = useRef(null);
  const router = useRouter();

  const handleApplyFilters = () => {
    if (filters) {
      page = 1;
      setImages([]);
      let params = {
        page,
        ...filters,
      };
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchImages(params, false);
    }
    closeFilterModal();
  };

  const handleResetFilters = () => {
    if (filters) {
      page = 1;
      setFilters(null);
      setImages([]);
      let params = {
        page,
      };
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchImages(params, false);
    }

    closeFilterModal();
  };

  const handleChangeCategory = (cat) => {
    setActiveCategory(cat);
    clearSearch();
    setImages([]);
    page = 1;
    let params = { page, ...filters };
    if (cat) {
      params.category = cat;
    }
    fetchImages(params, false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (params = { page: 1 }, append = true) => {
    console.log("===============", params);

    let res = await apiCall(params);
    if (res.success && res?.data?.hits) {
      setImages(append ? [...images, ...res.data.hits] : [...res.data.hits]);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (text.length > 2) {
      page = 1;
      setImages([]);
      setActiveCategory(null);
      fetchImages({ page, q: text, ...filters }, false);
    }
    if (text === "") {
      searchInputRef?.current?.clear();
      page = 1;
      setImages([]);
      setActiveCategory(null);
      fetchImages({ page, ...filters }, false);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  const clearSearch = () => {
    setSearch("");
    searchInputRef?.current?.clear();
  };

  const openFilterModal = () => {
    modelRef?.current?.present();
  };

  const closeFilterModal = () => {
    modelRef?.current?.close();
  };

  const handleRemoveFilter = (key) => {
    let newFilters = { ...filters };
    delete newFilters[key];
    setFilters({ ...newFilters });
    setImages([]);
    let params = { page, ...newFilters };
    if (activeCategory) params.category = activeCategory;
    if (search) params.q = search;
    fetchImages(params, false);
  };

  const handleScroll = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrolloffset = event.nativeEvent.contentOffset.y;
    const bottomPosition = contentHeight - scrollViewHeight;
    if (scrolloffset >= bottomPosition - 1) {
      if (!isEndReached) {
        setIsEndReached(true);
        page++;
        let params = {
          page,
          ...filters,
        };
        if (activeCategory) params.category = activeCategory;
        if (search) params.q = search;
        fetchImages(params, true);
      }
    } else if (isEndReached) {
      setIsEndReached(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => scrollRef?.current?.scrollTo({ y: 0, animated: true })}
        >
          <Text style={styles.title}>Wallpaper Daily</Text>
        </Pressable>
        <Pressable onPress={openFilterModal}>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.colors.neutral(0.7)}
          />
        </Pressable>
      </View>

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={5}
        ref={scrollRef}
        contentContainerStyle={{ gap: 15 }}
      >
        <View style={styles.searchbar}>
          <View style={styles.searchIcon}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.neutral(0.4)}
            />
          </View>
          <TextInput
            placeholder="Search wallpapers ..."
            style={styles.searchInput}
            placeholderTextColor={theme.colors.neutral(0.4)}
            // value={search}
            onChangeText={handleTextDebounce}
            ref={searchInputRef}
          />
          {search && (
            <Pressable
              style={styles.closeIcon}
              onPress={() => handleSearch("")}
            >
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}
              />
            </Pressable>
          )}
        </View>

        <View style={styles.categories}>
          <Categories
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        {filters && (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filter}
            >
              {Object.keys(filters).map((key, index) => {
                return (
                  <View key={index} style={styles.filterItem}>
                    {key === "colors" ? (
                      <View
                        style={[
                          styles.colorFilter,
                          { backgroundColor: filters[key] },
                        ]}
                      />
                    ) : (
                      <Text style={styles.filterText}>{filters[key]}</Text>
                    )}

                    <Pressable
                      style={styles.removeFilter}
                      onPress={() => handleRemoveFilter(key)}
                    >
                      <Ionicons
                        name="close"
                        size={14}
                        color={theme.colors.neutral(0.9)}
                      />
                    </Pressable>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}

        <View>
          {images.length > 0 ? (
            <ImageGrid images={images} router={router} />
          ) : (
            <Text>No images found</Text>
          )}
        </View>

        <View
          style={{ marginBottom: 70, marginTop: images.length > 0 ? 10 : 70 }}
        >
          <ActivityIndicator size="large" />
        </View>
      </ScrollView>

      <FilterModal
        ref={modelRef}
        filters={filters}
        setFilters={setFilters}
        onClose={closeFilterModal}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.9),
  },
  searchbar: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.lg,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  },
  filter: {
    paddingHorizontal: wp(4),
    gap: 10,
  },
  filterItem: {
    backgroundColor: theme.colors.grayBG,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.radius.XS,
    padding: 5,
    gap: 10,
    paddingHorizontal: 10,
  },
  filterText: {
    fontSize: hp(1.6),
  },
  removeFilter: {
    padding: 3,
    borderRadius: 7,
    backgroundColor: theme.colors.neutral(0.2),
  },
  colorFilter: {
    width: wp(8),
    height: wp(5),
    borderRadius: 7,
    backgroundColor: theme.colors.neutral(0.2),
  },
});

export default HomeScreen;
