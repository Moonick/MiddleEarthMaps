import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";

import { PinType } from "./types";
import PinHeader from "./PinHeader";
import usePinAddress from "../hooks/usePinAdress";

interface PinItemProps {
  item: PinType;
  onPress: () => void;
}

const PinItem: React.FC<PinItemProps> = ({ item, onPress }) => {
  const { title = "", latitude, longitude, connectors } = item;
  const availableConnectors = connectors.filter((el) => el.status === "available");

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <PinHeader
          title={title}
          availableConnectors={availableConnectors.length}
          connectors={connectors.length}
          longitude={longitude}
          latitude={latitude}
        />
      </Card.Content>
    </Card>
  );
};

type Props = {
  list?: PinType[];
  onPinSelect: (selectedPin: PinType) => void;
};

const PinsList = ({ list = [], onPinSelect }: Props) => {
  const renderItem = useCallback(
    ({ item }: { item: PinType }) => <PinItem item={item} onPress={() => onPinSelect(item)} />,
    [onPinSelect],
  );

  return (
    <FlatList
      data={list}
      keyExtractor={(i) => i.title}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

export default PinsList;

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
  },
  card: {
    margin: 6,
    minWidth: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowOpacity: 0.1,
  },
});
