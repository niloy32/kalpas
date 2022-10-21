import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
} from 'react-native';

const HomeScreen = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: '50%',
  },
  text: {
    fontSize: 20,
  },
});
export default HomeScreen;
