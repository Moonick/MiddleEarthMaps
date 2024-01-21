import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import useDebounce from "../hooks/useDebounce";
import { PinType } from "./types";

type Props = {
  initialPins: PinType[];
  getResults: any
};

const SearchBar = ({ initialPins, getResults }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    handleSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    const filtered = initialPins.filter(({ title }) => title.toLowerCase().includes(query.toLowerCase()));

    getResults(filtered);
  };
  
  return <Searchbar style={styles.searchBar} placeholder="Search" value={searchQuery} onChangeText={setSearchQuery} />;
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    width: "100%",
  },
});
