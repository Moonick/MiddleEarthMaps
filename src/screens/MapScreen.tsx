import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";

import { PinType } from "../components/types";
import FindMeButton from "../components/FindMeButton";
import MapComponent from "../components/MapComponent";
import BottomSheetComponent from "../components/BottomSheetComponent";

import { findClosestPins, isPinInRegion } from "../utils";
import { selectUserLocation } from "../store/slices/userLocationSlice";
import { selectPins } from "../store/slices/pinsSlice";

const ZOOM_THRESHOLD = 20;

const MapScreen = () => {
  const [visiblePins, setVisiblePins] = useState<PinType[]>([]);
  const [nearestPins, setNearestPins] = useState<PinType[]>([]);
  const [selectedPin, setSelectedPin] = useState<PinType | null>(null);
  const [showPins, setShowPins] = useState<boolean>(false);
  const location = useSelector(selectUserLocation);
  const fetchedPins = useSelector(selectPins);

  const mapRef = useRef(null);
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (location && fetchedPins.length) {
      const closestPins = findClosestPins(location, fetchedPins);
      setNearestPins(closestPins);
    }
  }, [location, fetchedPins]);

  const onRegionChangeComplete = (newRegion: any) => {
    const visiblePins = fetchedPins.filter((pin: PinType) => isPinInRegion(pin, newRegion));
    setVisiblePins(visiblePins);
    setShowPins(newRegion.latitudeDelta < ZOOM_THRESHOLD);
  };

  const onPinSelection = (pin: PinType) => {
    setSelectedPin(pin);
    bottomSheetRef?.current?.collapse();
    mapRef.current?.animateToRegion(
      {
        latitude: pin.latitude,
        longitude: pin.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      300,
    );
  };

  const onFindMePress = () => {
    if (location && mapRef.current) {
      bottomSheetRef?.current?.collapse();
      setSelectedPin(null);
      mapRef.current?.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        300,
      );
    }
  };

  const onCloseButtonPress = () => {
    setSelectedPin(null);
    bottomSheetRef?.current?.collapse();
  };

  return (
    <View style={styles.container}>
      <MapComponent
        ref={mapRef}
        showPins={showPins}
        visiblePins={visiblePins}
        userLocation={location}
        onPinSelection={onPinSelection}
        onRegionChangeComplete={onRegionChangeComplete}
      />
      <FindMeButton onFindMePress={onFindMePress} />
      <BottomSheetComponent
        ref={bottomSheetRef}
        selectedPin={selectedPin}
        nearestPins={nearestPins}
        onPinSelection={onPinSelection}
        onCloseButtonPress={onCloseButtonPress}
      />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  error: {
    width: "100%",
    height: "100%",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pinWrapper: {
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 10,
    zIndex: 1000,
  },
  textBold: {
    fontSize: 18,
    fontWeight: "600",
  },
});
