import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { LocationGeocodedAddress } from "expo-location";

type ReverseGeocodeProps = {
  latitude: number;
  longitude: number;
};

type ReverseGeocodeResult = {
  address: LocationGeocodedAddress | null;
  isLoading: boolean;
  error: string | null;
};

const useReverseGeocode = ({ latitude, longitude }: ReverseGeocodeProps): ReverseGeocodeResult => {
  const [address, setAddress] = useState<LocationGeocodedAddress | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const results = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (results.length > 0) {
          setAddress(results[0]);
        } else {
          setError("No address found for the given coordinates.");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [latitude, longitude]);

  return { address, isLoading, error };
};

export default useReverseGeocode;
