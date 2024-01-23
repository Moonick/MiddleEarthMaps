import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";

import MapScreen from "../screens/MapScreen";
import MyChargerScreen from "../screens/MyChargerScreen";
import AccountScreen from "../screens/AccountScreen";

import useFetchPins from "../hooks/useFetchPins";
import useUserLocation from "../hooks/useUserLocation";

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => {
  const { loading: loadingPins, error: errorPins } = useFetchPins();
  const { isLoading: loadingLocation, errorMgs: errorLocation } = useUserLocation();

  if (loadingPins || loadingLocation) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#663399" />
      </View>
    );
  }

  if (errorPins || errorLocation) {
    return (
      <View style={styles.loader}>
        <Text>Error: {errorPins || errorLocation}</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#663399",
      }}
    >
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
        name="MyCharger"
        component={MyChargerScreen}
        options={{
          headerShown: false,
          tabBarLabel: "My Charger",
          tabBarIcon: () => <Entypo name="home" size={24} color="#663399" />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Account",
          tabBarIcon: () => <MaterialIcons name="account-circle" size={24} color="#663399" />,
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
