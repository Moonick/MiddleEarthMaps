import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card, Text as TextCard } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { Linking } from "react-native";

import { ConnectorType, PinType } from "./types";
import { getPinAddress } from "../utils";

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

  const openDirections = () => {
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
        <View style={styles.titleWapper}>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={styles.connectorsWapper}>
            <Text style={styles.connectorsTitle}>{availableConnectors.length}</Text>
            <Text style={styles.headerTitle}>{`/${connectors.length}`}</Text>
          </View>
        </View>
        <Text style={styles.headerAddress}>{pinAddress}</Text>
      </View>

      <Button style={styles.directionsButton} mode="contained" onPress={openDirections}>
        <FontAwesome5 name="directions" size={16} color="#fff" />
        Get Direcrtions
      </Button>

      <View style={styles.connectorsWrapper}></View>
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
  titleWapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    // borderColor: 'red',
    // borderWidth: 1,
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
    color: "#757575", // Grey text
  },
  directionsButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  connectorsWrapper: {},
});
