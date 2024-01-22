import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import useDebounce from "../hooks/useDebounce";
import { useSelector } from "react-redux";
import { selectPins, setSearchQuery, setSearchResult } from "../store/slices/pinsSlice";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const fetchedPins = useSelector(selectPins);
  const dispatch = useDispatch();
  const debouncedSearchQuery = useDebounce(inputValue, 500);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchQuery));
    handleSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  const handleSearch = (query: string) => {
    if (query.length) {
      const filtered = fetchedPins.filter(({ title }) => title.toLowerCase().includes(query.toLowerCase()));
      dispatch(setSearchResult(filtered));
    } else {
      dispatch(setSearchResult([]));
    }
  };

  return <Searchbar style={styles.searchBar} placeholder="Search" value={inputValue} onChangeText={setInputValue} />;
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    width: "100%",
  },
});
