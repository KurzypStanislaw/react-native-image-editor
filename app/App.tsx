import HomeScreen from "./src/screens/homeScreen/HomeScreen";
import EditingScreen from "./src/screens/editingScreen/EditingScreen";
import React from "react";
import {PaperProvider} from "react-native-paper";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from "./src/types/types";
import {EditingProvider} from "./src/context/EditingContext";
import {RootSiblingParent} from 'react-native-root-siblings';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <RootSiblingParent>
            <PaperProvider>
                <NavigationContainer>
                    <EditingProvider>
                        <Stack.Navigator
                            initialRouteName="Home"
                            screenOptions={{
                                headerStyle: {
                                    backgroundColor: '#333131',
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                            }}>
                            <Stack.Screen
                                name="Home"
                                component={HomeScreen}
                                options={{
                                    title: "react-native-image-editor",
                                }}
                            />
                            <Stack.Screen
                                name="Edit"
                                component={EditingScreen}
                            />
                        </Stack.Navigator>
                    </EditingProvider>
                </NavigationContainer>
            </PaperProvider>
        </RootSiblingParent>
    );
}
