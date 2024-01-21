import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import MapScreen from "../screens/MapScreen";
import useFetchPins from "../hooks/useFetchPins";
import useUserLocation from "../hooks/useUserLocation";

const HomeScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Home Screen</Text>
  </View>
);

const SettingsScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Settings Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => {
  const { loading: loadingPins, error: errorPins } = useFetchPins();
  const { isLoading: loadingLocation, errorMgs: errorLocation } = useUserLocation();

  if (loadingPins || loadingLocation) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#7b2fc2" />
      </View>
    );
  }

  if (errorPins || errorLocation) {
    return <View style={styles.loader}><Text>Error: {errorPins || errorLocation}</Text></View>;
  }

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Explore"
        component={MapScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Find",
          tabBarIcon: () => <AntDesign name="find" size={24} color="#663399" />,
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: () => <Entypo name="home" size={24} color="#663399" />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Settings",
          tabBarIcon: () => <Ionicons name="settings-sharp" size={24} color="#663399" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});