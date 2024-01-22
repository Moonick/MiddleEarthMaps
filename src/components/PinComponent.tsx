import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, DataTable } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";

import { PinType } from "./types";
import { getPinAddress, openDirections } from "../utils";

const Pin = ({ title = "", latitude, longitude, connectors }: PinType) => {
  const [pinAddress, setPinAddress] = useState("");
  const availableConnectors = connectors.filter((el) => el.status === "available");

  useEffect(() => {
    const fetchAddress = async () => {
      if (latitude && longitude) {
        const address = await getPinAddress(latitude, longitude);
        setPinAddress(address);
      }
    };
    fetchAddress();
  }, [latitude, longitude]);

  return (
    <>
      <View style={styles.header}>
        <View style={styles.titleWapper}>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={styles.connectorsWapper}>
            <Text style={styles.connectorsTitle}>{availableConnectors.length}</Text>
            <Text style={styles.headerTitle}>{`/${connectors.length}`}</Text>
          </View>
        </View>
        <Text style={styles.headerAddress}>{pinAddress}</Text>
      </View>

      <Button style={styles.directionsButton} mode="contained" onPress={() => openDirections({ longitude, latitude })}>
        <FontAwesome5 name="directions" size={16} color="#fff" />
        Get Direcrtions
      </Button>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Type</DataTable.Title>
          <DataTable.Title>Longitude</DataTable.Title>
          <DataTable.Title>Latitude</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
        </DataTable.Header>

        {connectors.map(({ type, status }, index) => (
          <DataTable.Row key={type + index}>
            <DataTable.Cell>{type}</DataTable.Cell>
            <DataTable.Cell>{longitude}</DataTable.Cell>
            <DataTable.Cell>{latitude}</DataTable.Cell>
            <DataTable.Cell>
              <View style={status === "available" ? styles.available : styles.unavailable}>
                <Text style={styles.textStatus}>{status}</Text>
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
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
  titleWapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  connectorsWapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  connectorsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4caf50",
  },
  headerAddress: {
    fontSize: 14,
    color: "#757575",
  },
  directionsButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  available: {
    padding: 7,
    color: "#fff",
    backgroundColor: "#6dc770",
    borderRadius: 100,
    minWidth: 100,
    textAlign: "center",
    alignItems: "center",
  },
  unavailable: {
    padding: 7,
    backgroundColor: "#f47e75", // Example color for unavailable
    borderRadius: 100,
    minWidth: 100,
    textAlign: "center",
    alignItems: "center",
  },
  textStatus: {
    color: "#fff",
  },
});
