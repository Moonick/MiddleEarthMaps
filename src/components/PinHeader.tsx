import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  availableConnectors: number;
  connectors: number;
  pinAddress: string;
  addressErrorMsg: string;
}

const PinHeader: React.FC<Props> = ({ title, availableConnectors, connectors, pinAddress, addressErrorMsg }) => {
  return (
    <>
      <View style={styles.titleWapper}>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.connectorsWapper}>
          <Text style={availableConnectors ? styles.connectorsTitle : styles.connectorsEmpyTitle}>
            {availableConnectors}
          </Text>
          <Text style={styles.headerTitle}>{`/${connectors}`}</Text>
        </View>
      </View>
      <Text style={styles.headerAddress}>{pinAddress || addressErrorMsg}</Text>
    </>
  );
};

export default PinHeader;

const styles = StyleSheet.create({
  titleWapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  connectorsWapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  connectorsEmpyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
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
});
