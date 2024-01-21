import React, { forwardRef, useCallback, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

interface Props {
  title: string;
  children: React.FC;
}

type Ref = BottomSheet;

const CustomBotomSheet = forwardRef<Props, Ref>(({ title = "", children }, ref) => {
  const snapPoints = useMemo(() => ["15%", "50%", "90%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheet ref={ref} index={0} snapPoints={snapPoints} onChange={handleSheetChanges}>
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
    padding: 15,
  },
});
