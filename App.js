import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DeviceList from './components/DeviceList'
import DeviceControl from './components/DeviceControl';
import { NavigationContainer } from '@react-navigation/native';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import NavigationMenu from './components/Navigation'


export default function App() {


  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
  };
  
  console.log("App started")
  return (
    <PaperProvider theme={theme}>
    <NavigationContainer>
      <NavigationMenu></NavigationMenu>

  </NavigationContainer>
  </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
