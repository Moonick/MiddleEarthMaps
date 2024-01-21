import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import TabNavigation from "./src/navigation/TabNavigation";
import { store } from "./src/store/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <TabNavigation />
        </GestureHandlerRootView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;