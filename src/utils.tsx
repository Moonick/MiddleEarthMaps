import { PinType, LocationType } from "./components/types";
import * as Location from "expo-location";
import { Linking } from "react-native";

export const isPinInRegion = (pin: PinType, region: any): boolean => {
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

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

export const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

export const findClosestPins = (userLocation: LocationType, pins: PinType[], maxPins: number = 15) => {
  return pins
    .map((pin) => ({
      ...pin,
      distance: getDistance(userLocation.latitude, userLocation.longitude, pin.latitude, pin.longitude),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, maxPins);
};

export const getPinAddress = async (latitude: number, longitude: number) => {
  try {
    const results = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (results.length > 0) {
      const firstResult = results[0];
      const addressParts = [firstResult.street, firstResult.city, firstResult.region, firstResult.country];
      const address = addressParts.filter((part) => part != null).join(", ");

      return address.length > 0 ? address : "Address details not available";
    } else {
      return "Address not found";
    }
  } catch (error) {
    console.error(error);
    return "Error fetching address";
  }
};

export const openDirections = ({ latitude, longitude }: { latitude: number, longitude: number }) => {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open this URL: " + url);
      }
    })
    .catch((err) => console.error("An error occurred", err));
};