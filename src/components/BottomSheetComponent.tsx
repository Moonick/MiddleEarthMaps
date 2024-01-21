import React, { forwardRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomBotomSheet from "./CustomBotomSheet";
import Pin from "./PinComponent";
import PinsList from "./PinsList";
import { PinType } from "./types";
import SearchBar from "./SearchBar";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  selectedPin: PinType | null;
  nearestPins: PinType[];
  onPinSelection: (pin: PinType) => void;
  onCloseButtonPress: () => void;
}

const BottomSheetComponent = forwardRef<View, Props>(
  ({ selectedPin, nearestPins, onPinSelection, onCloseButtonPress }, ref) => {
    return (
      <CustomBotomSheet ref={ref}>
        {selectedPin ? (
          <View style={styles.pinWrapper}>
            <View style={styles.closeButton}>
              <AntDesign name="close" size={24} color="#663399" onPress={onCloseButtonPress} />
            </View>
            <Pin {...selectedPin} />
          </View>
        ) : (
          <>
            <SearchBar initialPins={nearestPins} getResults={() => {}} />
            <Text style={styles.textBold}>Nearest</Text>
            <PinsList list={nearestPins} onPinSelect={onPinSelection} />
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
