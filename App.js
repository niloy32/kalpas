import React from 'react';
import {StyleSheet} from 'react-native';
import Login from './screens/LoginScreen.js';
import Home from './screens/Home.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
const App = () => {
  const Stack = createNativeStackNavigator();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const checkLocalStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      if (value !== null) {
        const parseValue = JSON.parse(value);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } catch (e) {
      console.log('error app', e);
    }
  };
  React.useEffect(() => {
    checkLocalStorage();
  }, [AsyncStorage]);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
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
