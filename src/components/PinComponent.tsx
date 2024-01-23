import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, DataTable } from "react-native-paper";

import { PinType } from "./types";
import { openDirections } from "../utils";
import PinHeader from "./PinHeader";
import usePinAddress from "../hooks/usePinAdress";

const PinComponent = ({ title = "", latitude, longitude, connectors }: PinType) => {
  const { pinAddress, errorMsg } = usePinAddress(latitude, longitude);
  const availableConnectors = connectors.filter((el) => el.status === "available");

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <PinHeader
          title={title}
          availableConnectors={availableConnectors.length}
          connectors={connectors.length}
          pinAddress={pinAddress}
          addressErrorMsg={errorMsg}
        />
      </View>

      <Button
        icon="directions"
        mode="contained"
        textColor="#fff"
        style={styles.button}
        onPress={() => openDirections({ longitude, latitude })}
      >
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
          <DataTable.Row key={type + index} testID="connectors-row">
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
    </View>
  );
};

export default PinComponent;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    margin: 0,
  },
  header: {
    flexDirection: "column",
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
  button: {
    marginTop: 15,
    marginBottom: 7,
    marginLeft: 7,
    marginRight: 7,
  },
  available: {
    padding: 5,
    color: "#fff",
    backgroundColor: "#6dc770",
    borderRadius: 100,
    minWidth: 90,
    textAlign: "center",
    alignItems: "center",
  },
  unavailable: {
    padding: 5,
    backgroundColor: "#f47e75",
    borderRadius: 100,
    minWidth: 90,
    textAlign: "center",
    alignItems: "center",
  },
  textStatus: {
    color: "#fff",
  },
});
