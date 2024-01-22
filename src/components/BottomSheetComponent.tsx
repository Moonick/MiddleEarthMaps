import React, { forwardRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

import CustomBotomSheet from "./CustomBotomSheet";
import PinComponent from "./PinComponent";
import PinsList from "./PinsList";
import SearchBar from "./SearchBar";
import { PinType } from "./types";

interface Props {
  selectedPin: PinType | null;
  nearestPins: PinType[];
  animatedPosition: SharedValue<number>;
  onPinSelection: (pin: PinType) => void;
  onCloseButtonPress: () => void;
}

const BottomSheetComponent = forwardRef<View, Props>(
  ({ selectedPin, nearestPins, animatedPosition, onPinSelection, onCloseButtonPress }, ref) => {
    return (
      <CustomBotomSheet animatedPosition={animatedPosition} ref={ref}>
        {selectedPin ? (
          <View style={styles.pinWrapper}>
            <View style={styles.closeButton}>
              <AntDesign name="close" size={24} color="#663399" onPress={onCloseButtonPress} />
            </View>
            <PinComponent {...selectedPin} />
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
