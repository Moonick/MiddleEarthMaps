import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import { setUserLocation } from "../store/slices/userLocationSlice";

const useUserLocation = () => {
  const [errorMgs, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setIsLoading(false);
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        dispatch(
          setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }),
        );
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrorMsg("Error fetching location");
      }
    })();
  }, []);

  return { errorMgs, isLoading };
};

export default useUserLocation;
