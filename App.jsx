/* eslint-disable react/style-prop-object */
import 'text-encoding-polyfill';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { loadAsync } from 'expo-font';
import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { initWallet, wallet } from './mint';
import MainNav from './nav/MainNav';
import { store } from './store';
import { initDatabase } from './utils/database';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await initWallet();
        await initDatabase();
        await loadAsync({
          "Montserrat-Regular": require("./assets/Montserrat-Regular.ttf"),
          "Montserrat-Bold": require("./assets/Montserrat-Bold.ttf"),
          "Satoshi-Symbol": require("./assets/Satoshi-Symbol.ttf"),
      });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <Provider store={store}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <MainNav />
        </NavigationContainer>
      </Provider>
    </View>
  );
};

export default App;
