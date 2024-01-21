import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import TabNavigation from './src/navigation/TabNavigation';
import useFetchPins from './src/hooks/useFetchPins';
import useUserLocation from './src/hooks/useUserLocation';
import { store } from './src/store/store';

const App: React.FC = () => {
  const { loading: loadingPins, error: errorPins } = useFetchPins();
  const { isLoading: loadingLocation, errorMgs: errorLocation } = useUserLocation();

  if (loadingPins || loadingLocation) {
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#7b2fc2" />
    </View>
  }

  if (errorPins || errorLocation) {
    return <Text>Error: {errorPins || errorLocation}</Text>;
  }

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

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

});