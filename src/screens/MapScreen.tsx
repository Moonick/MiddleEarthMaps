import React, { useEffect, useRef, useState } from "react";
import {useSelector} from "react-redux";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import { PinType } from "../components/types";
import CustomMarker from "../components/CustomMarker";
import CustomBotomSheet from "../components/CustomBotomSheet";
import SearchBar from "../components/SearchBar";
import PinsList from "../components/PinsList";
import Pin from "../components/Pin";
import useUserLocation from "../hooks/useUserLocation";
import useFetchPins from "../hooks/useFetchPins";
import { findClosestPins } from "../utils";
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

  useEffect(() => {
    if (location && fetchedPins.length) {
      const closestPins = findClosestPins(location, fetchedPins);
      setNearestPins(closestPins);
    }
  }, [location, fetchedPins]);

  const isPinInRegion = (pin: PinType, region: any) => {
    const latDeltaHalf = region.latitudeDelta / 2;
    const lonDeltaHalf = region.longitudeDelta / 2;

    const regionTop = region.latitude + latDeltaHalf;
    const regionBottom = region.latitude - latDeltaHalf;
    const regionLeft = region.longitude - lonDeltaHalf;
    const regionRight = region.longitude + lonDeltaHalf;

    return (
      pin.latitude <= regionTop &&
      pin.latitude >= regionBottom &&
      pin.longitude >= regionLeft &&
      pin.longitude <= regionRight
    );
  };

  const onRegionChangeComplete = (newRegion: any) => {
    const visiblePins = fetchedPins.filter((pin) => isPinInRegion(pin, newRegion));
    setVisiblePins(visiblePins);
    setShowPins(newRegion.latitudeDelta < ZOOM_THRESHOLD);
  };

  const onPinSelection = (pin: PinType) => {
    setSelectedPin(pin);
    mapRef.current?.animateToRegion(
      {
        latitude: pin.latitude,
        longitude: pin.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      1000,
    );
  };

  const onFindMePress = () => {
    if (location && mapRef.current) {
      mapRef.current?.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000,
      );
    }
  };

  const onCloseButtonPress = () => {
    onFindMePress();
    setSelectedPin(null);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={location}
        showsUserLocation={true}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {showPins &&
          visiblePins.map((pin) => <CustomMarker key={pin._id} {...pin} onSelect={() => onPinSelection(pin)} />)}
      </MapView>
      <View style={styles.findMeButton}>
        <MaterialCommunityIcons name="crosshairs-gps" size={24} color="#663399" onPress={onFindMePress} />
      </View>
      <CustomBotomSheet>
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
            <Text>Nearest</Text>
            <PinsList list={nearestPins} onPinSelect={onPinSelection} />
          </>
        )}
      </CustomBotomSheet>
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
  findMeButton: {
    position: "absolute",
    backgroundColor: "#fff",
    bottom: 150,
    right: 20,
    padding: 10,
    borderRadius: 100,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
  },
  pinWrapper: {
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 10,
    zIndex: 1000
  },
});
