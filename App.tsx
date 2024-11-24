import HomeScreen from "./src/screens/homeScreen/HomeScreen";
import EditingScreen from "./src/screens/editingScreen/EditingScreen";
import React from "react";
import {IconButton, PaperProvider} from "react-native-paper";
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
                        <Stack.Navigator initialRouteName="Home">
                            <Stack.Screen name="Home" component={HomeScreen}/>
                            <Stack.Screen name="Edit" component={EditingScreen}/>
                        </Stack.Navigator>
                    </EditingProvider>
                </NavigationContainer>
            </PaperProvider>
        </RootSiblingParent>
    );
}
