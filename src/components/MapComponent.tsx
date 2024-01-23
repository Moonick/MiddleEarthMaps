import React, { forwardRef } from "react";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import CustomMarker from "./CustomMarker";
import { LocationType, PinType } from "./types";

interface Props {
  showPins: boolean;
  visiblePins: PinType[];
  userLocation: LocationType;
  onPinSelection: (pin: PinType) => void;
  onRegionChangeComplete: (newRegion: any) => void;
}

const MapComponent = forwardRef<MapView, Props>(
  ({ showPins, visiblePins, userLocation, onPinSelection, onRegionChangeComplete }, ref) => {
    return (
      <MapView
        ref={ref}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={userLocation as Region}
        showsUserLocation={true}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {showPins &&
          visiblePins.map((pin) => <CustomMarker key={pin._id} {...pin} onSelect={() => onPinSelection(pin)} />)}
      </MapView>
    );
  },
);

export default MapComponent;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
