import React, { forwardRef, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";

import CustomBotomSheet from "./CustomBotomSheet";
import PinComponent from "./PinComponent";
import PinsList from "./PinsList";
import { PinType } from "./types";
import { findClosestPins } from "../utils";
import { useSelector } from "react-redux";
import { selectPins, selectPinsIds } from "../store/slices/pinsSlice";
import { selectUserLocation } from "../store/slices/userLocationSlice";

interface Props {
  selectedPin: PinType | null;
  animatedPosition: SharedValue<number>;
  onPinSelection: (pin: PinType) => void;
  onCloseButtonPress: () => void;
}

const BottomSheetComponent = forwardRef<BottomSheet, Props>(
  ({ selectedPin, animatedPosition, onPinSelection, onCloseButtonPress }, ref) => {
    const location = useSelector(selectUserLocation);
    const fetchedPins = useSelector(selectPins);
    const allPinIds = useSelector(selectPinsIds);
    const nearestPins = useMemo(() => {
      if (location && allPinIds.length) {
        return findClosestPins(location, fetchedPins, allPinIds);
      }
      return [];
    }, [location, allPinIds]);

    return (
      <CustomBotomSheet animatedPosition={animatedPosition} ref={ref}>
        {selectedPin ? (
          <>
            <View style={styles.pinWrapper}>
              <View style={styles.closeButton}>
                <AntDesign name="close" size={24} color="#663399" onPress={onCloseButtonPress} />
              </View>
              <PinComponent {...selectedPin} />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.textBold}>Nearest locations</Text>
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
