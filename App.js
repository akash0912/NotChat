/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AuthContext from './src/context/Authentication';
import MyStack from './src/navigation/mainNavigator';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Chat, OverlayProvider } from 'stream-chat-react-native';
import { StreamChat } from 'stream-chat';
import { GestureHandlerRootView } from "react-native-gesture-handler";


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const client = StreamChat.getInstance('r79xt77x5r64');
  const [userId, setUserId] = useState()
  useEffect(() => {
    const client = StreamChat.getInstance('r79xt77x5r64');

    return async () => {
      await client.disconnectUser();

    }
  }, [])
  // const { bottom } = SafeAreaProvider();

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={{userId: userId, setUserId:setUserId}} >

      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>

          <OverlayProvider>
            <Chat client={client}>

              <StatusBar barStyle={'light-content'} />
              <MyStack />
            </Chat>

          </OverlayProvider>
        </GestureHandlerRootView>

      </NavigationContainer>
      </AuthContext.Provider>

    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
