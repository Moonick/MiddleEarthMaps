import React, { forwardRef, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

import CustomBotomSheet from "./CustomBotomSheet";
import PinComponent from "./PinComponent";
import PinsList from "./PinsList";
import SearchBar from "./SearchBar";
import { PinType } from "./types";
import { findClosestPins } from "../utils";
import { useSelector } from "react-redux";
import { selectPins, selectSearchQuery, selectSearchResult } from "../store/slices/pinsSlice";
import { selectUserLocation } from "../store/slices/userLocationSlice";

interface Props {
  selectedPin: PinType;
  animatedPosition: SharedValue<number>;
  onPinSelection: (pin: PinType) => void;
  onCloseButtonPress: () => void;
}

const BottomSheetComponent = forwardRef<View, Props>(
  ({ selectedPin, animatedPosition, onPinSelection, onCloseButtonPress }, ref) => {
    const location = useSelector(selectUserLocation);
    const fetchedPins = useSelector(selectPins);
    const searchResultPins = useSelector(selectSearchResult);
    const searchQuery = useSelector(selectSearchQuery);

    const nearestPins = useMemo(() => {
      if (location && fetchedPins.length) {
        return findClosestPins(location, fetchedPins);
      }
      return [];
    }, [location, fetchedPins]);

    const renderPinView = () => (
      <View style={styles.pinWrapper}>
        <View style={styles.closeButton}>
          <AntDesign name="close" size={24} color="#663399" onPress={onCloseButtonPress} />
        </View>
        <PinComponent {...selectedPin} />
      </View>
    );

    const renderSearchResults = () => (
      <>
        {searchQuery.length > 0 &&
          (searchResultPins.length > 0 ? (
            <PinsList list={searchResultPins} onPinSelect={onPinSelection} />
          ) : (
            <Text>No search results</Text>
          ))}
      </>
    );

    const renderNearestPins = () => (
      <>
        {!searchQuery.length && (
          <>
            <Text style={styles.textBold}>Nearest locations</Text>
            <PinsList list={nearestPins} onPinSelect={onPinSelection} />
          </>
        )}
      </>
    );

    return (
      <CustomBotomSheet animatedPosition={animatedPosition} ref={ref}>
        {selectedPin ? (
          renderPinView()
        ) : (
          <>
            {/* <SearchBar /> */}
            {renderSearchResults()}
            {renderNearestPins()}
          </>
        )}
      </CustomBotomSheet>
    );
  },
);

export default BottomSheetComponent;

const styles = StyleSheet.create({
  pinWrapper: {
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: -25,
    right: -10,
    padding: 10,
    zIndex: 1000,
  },
  textBold: {
    fontSize: 18,
    fontWeight: "600",
  },
});
