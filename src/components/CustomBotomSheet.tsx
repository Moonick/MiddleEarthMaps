import React, { ReactNode, forwardRef, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { SharedValue } from "react-native-reanimated";

interface Props {
  title?: string;
  animatedPosition: SharedValue<number>;
  children: ReactNode;
}

const CustomBotomSheet = forwardRef<BottomSheet, Props>(({ title = "", animatedPosition, children }, ref) => {
  const snapPoints = useMemo(() => [100, 200, 300, 500, 600], []);

  return (
    <BottomSheet
      ref={ref}
      index={0}
      style={styles.shadow}
      backgroundStyle={{ backgroundColor: "#F8F8F8" }}
      snapPoints={snapPoints}
      animatedPosition={animatedPosition}
    >
      <View style={styles.contentContainer}>
        <Text>{title}</Text>
        {children}
      </View>
    </BottomSheet>
  );
});

export default CustomBotomSheet;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "#F8F8F8",
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 0,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
