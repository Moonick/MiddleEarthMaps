import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, DataTable } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";

import { PinType } from "./types";
import { openDirections } from "../utils";
import PinHeader from "./PinHeader";
import usePinAddress from "../hooks/usePinAdress";

const Pin = ({ title = "", latitude, longitude, connectors }: PinType) => {
  const { pinAddress, errorMsg } = usePinAddress(latitude, longitude);
  const availableConnectors = connectors.filter((el) => el.status === "available");

  return (
    <>
      <View style={styles.header}>
        <PinHeader
          title={title}
          availableConnectors={availableConnectors.length}
          connectors={connectors.length}
          pinAddress={pinAddress}
          addressErrorMsg={errorMsg}
        />
      </View>

      <Button style={styles.directionsButton} mode="contained" onPress={() => openDirections({ longitude, latitude })}>
        <FontAwesome5 name="directions" size={16} color="#fff" />
        Get Direcrtions
      </Button>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Type</DataTable.Title>
          <DataTable.Title>Power</DataTable.Title>
          <DataTable.Title>Price</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
        </DataTable.Header>

        {connectors.map(({ type, status }, index) => (
          <DataTable.Row key={type + index}>
            <DataTable.Cell>{type}</DataTable.Cell>
            <DataTable.Cell>100.0 kW</DataTable.Cell>
            <DataTable.Cell>$0.62/kWh</DataTable.Cell>
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
