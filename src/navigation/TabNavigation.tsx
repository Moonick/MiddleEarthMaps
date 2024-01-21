import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import MapScreen from "../screens/MapScreen";

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
