import React, { useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Text as TextCard } from "react-native-paper";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { ConnectorType, PinType } from "./types";

type Props = {
  list: PinType[];
  onPinSelect: (selectedPin: PinType | null) => void;
};

const PinsList = ({ list, onPinSelect }: Props) => {
  const renderConnector = ({ type, status }: ConnectorType, index: number) => {
    return (
      <Card.Content key={type + index}>
        <TextCard variant="bodyMedium">{`Type: ${type}`}</TextCard>
        <TextCard variant="bodyMedium">{`Status: ${status}`}</TextCard>
      </Card.Content>
    );
  };
  const renderItem = useCallback(({ index, item }: { index: number; item: PinType }) => {
    const { title = "", latitude, longitude, connectors } = item;
    const availableConnectors = connectors.filter((el) => el.status === "available");

    return (
      <Card key={`${index}-${title}`} style={styles.card} onPress={() => onPinSelect(item)}>
        <Card.Content>
          <TextCard variant="titleMedium">{title}</TextCard>
          <TextCard variant="bodyMedium">{`Available ${availableConnectors.length}/${connectors.length}`}</TextCard>
          <TextCard variant="bodyMedium">{`Latitude: ${latitude}`}</TextCard>
          <TextCard variant="bodyMedium">{`Longitude: ${longitude}`}</TextCard>
          <TextCard variant="titleMedium">Connectors</TextCard>
          {connectors.map(renderConnector)}
        </Card.Content>
      </Card>
    );
  }, []);

  return (
    <BottomSheetFlatList
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
    flex: 1,
    alignItems: "center",
  },
  card: {
    margin: 6,
    minWidth: "100%",
    backgroundColor: "#eee",
  },
});
