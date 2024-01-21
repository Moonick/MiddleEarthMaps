import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  onFindMePress: () => void;
}

const FindMeButton: React.FC<Props> = ({ onFindMePress }) => {
  return (
    <View style={styles.findMeButton}>
      <MaterialCommunityIcons name="crosshairs-gps" size={24} color="#663399" onPress={onFindMePress} />
    </View>
  );
};

export default FindMeButton;

const styles = StyleSheet.create({
  findMeButton: {
    position: "absolute",
    backgroundColor: "#fff",
    top: 300,
    right: 20,
    padding: 10,
    borderRadius: 100,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
  },
});
