import { PinType, LocationType } from "./components/types";

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const findClosestPins = (userLocation: LocationType, pins : PinType[], maxPins: number = 15) => {
  return pins
    .map(pin => ({
      ...pin,
      distance: getDistance(userLocation.latitude, userLocation.longitude, pin.latitude, pin.longitude)
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, maxPins);
};



export { getDistance, findClosestPins };

