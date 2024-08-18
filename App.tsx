import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from "./src/screens/homeScreen/HomeScreen";
import EditingScreen from "./src/screens/editingScreen/EditingScreen";
import React from "react";
import {PaperProvider} from "react-native-paper";

export default function App() {
  return (
      <PaperProvider>
        <EditingScreen/>
      </PaperProvider>
      // <HomeScreen/>
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
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
