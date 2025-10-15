import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import BootSplash from 'react-native-bootsplash';
import { initializeApp } from './src/utils/secureStorage';

export default function App() {
  const [token, setToken] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await initializeApp();
      setToken(storedToken);
      await BootSplash.hide({ fade: true });
      setIsReady(true);
    };
    loadToken();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="tomato" />
        <Text>Loading Secure Token...</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text style={styles.tokenText}>
          Secure Token: {token}
        </Text>
        <AppNavigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenText: {
    textAlign: 'center',
    fontSize: 12,
    color: 'gray',
    // marginBottom: 10,
  },
});
