import React from "react";
import { StyleSheet } from "react-native";
import Animated, { SharedValue, interpolate, useAnimatedStyle } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  animatedPosition: SharedValue<number>;
  onFindMePress: () => void;
}

const FindMeButton: React.FC<Props> = ({ animatedPosition, onFindMePress }) => {
  const animatedButtonStyle = useAnimatedStyle(() => {
    const translateY = interpolate(animatedPosition.value, [100, 600], [-700, -180]);

    return {
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.View testID="button-wrapper-test-id" style={[styles.findMeButton, animatedButtonStyle]}>
      <MaterialCommunityIcons testID="button-test-id" name="crosshairs-gps" size={24} color="#663399" onPress={onFindMePress}/>
    </Animated.View>
  );
};

export default FindMeButton;

const styles = StyleSheet.create({
  findMeButton: {
    position: "absolute",
    backgroundColor: "#fff",
    bottom: 0,
    right: 20,
    width: 45,
    height: 45, 
    padding: 10,
    borderRadius: 100,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    zIndex: 1000,
  },
});
