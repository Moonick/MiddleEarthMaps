import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Text as TextCard } from "react-native-paper";

import { ConnectorType, PinType } from "./types";
import { getPinAddress } from "../utils";

const Pin = ({ title = "", latitude, longitude, connectors }: PinType) => {
  const [pinAddress, setPinAddress] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      if (latitude && longitude) {
        const address = await getPinAddress(latitude, longitude);
        setPinAddress(address);
      }
    };
    fetchAddress();
  }, [latitude, longitude]);
  const availableConnectors = connectors.filter((el) => el.status === "available");

  const renderConnector = ({ type, status }: ConnectorType, index: number) => {
    return (
      <Card.Content key={type + index}>
        <TextCard variant="bodyMedium">{`Type: ${type}`}</TextCard>
        <TextCard variant="bodyMedium">{`Status: ${status}`}</TextCard>
      </Card.Content>
    );
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerAddress}>{pinAddress}</Text>
      </View>
      <Text> {connectors.map(renderConnector)}</Text>
    </>
  );
};

export default Pin;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ffffff",
    flexDirection: "column",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    padding: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerAddress: {
    fontSize: 14,
    color: "#757575", // Grey text
  },
  desc: {},
  directionsBtn: {},
  connectorsWrapper: {},
});
