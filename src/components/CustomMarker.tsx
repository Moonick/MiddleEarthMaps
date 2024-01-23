import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Marker } from "react-native-maps";
import { PinType } from "./types";

import RechargeIcon from "../assets/svg/recharge.svg";

type Props = PinType & {
  onSelect: () => void;
};

const CustomMarker = ({ latitude, longitude, connectors, onSelect }: Props) => {
  const availableConnectors = connectors.filter((el) => el.status === "available");

  return (
    <Marker testID="custom-marker-test-id" coordinate={{ latitude: latitude, longitude: longitude }} onPress={onSelect}>
      <View style={styles.bubble}>
        <RechargeIcon width={24} height={24} />
        <Text style={styles.name}>{`${availableConnectors.length}/${connectors.length}`}</Text>
      </View>
      <View style={styles.tail} />
    </Marker>
  );
};

export default CustomMarker;

const styles = StyleSheet.create({
  bubble: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flex: 1,
    backgroundColor: "#b8a4cb",
    borderRadius: 10,
    padding: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.3,
  },
  tail: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 0,
    borderLeftWidth: 8,
    borderTopColor: "#b8a4cb",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    alignSelf: "center",
    marginTop: -1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
