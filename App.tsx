import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from "./src/screens/homeScreen/HomeScreen";
import EditingScreen from "./src/screens/editingScreen/EditingScreen";
import React from "react";
import {PaperProvider} from "react-native-paper";
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {RootStackParamList} from "./src/types/types";
import {EditingProvider} from "./src/context/EditingContext";


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
      <PaperProvider>
          <NavigationContainer>
              <EditingProvider>
                  <Stack.Navigator initialRouteName="Home">
                      <Stack.Screen name="Home" component={HomeScreen} />
                      <Stack.Screen name="Edit" component={EditingScreen} />
                  </Stack.Navigator>
              </EditingProvider>
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
