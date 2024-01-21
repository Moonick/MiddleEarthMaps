import React, { ReactNode, forwardRef, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

interface Props {
  title?: string;
  children: ReactNode;
}

const CustomBotomSheet = forwardRef<BottomSheet, Props>(({ title = "", children }, ref) => {
  const snapPoints = useMemo(() => ["20%", "25%", "50%", "90%"], []);

  return (
    <BottomSheet ref={ref} index={0} snapPoints={snapPoints}>
      <View style={styles.contentContainer}>
        <Text>{title}</Text>
        {children}
      </View>
    </BottomSheet>
  );
});

export default CustomBotomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 0,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
