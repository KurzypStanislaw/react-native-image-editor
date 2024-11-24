import React from "react";
import {StyleSheet, View} from "react-native";
import {Button} from "react-native-paper";

type ListMenuProps = {
    isLightSelected: boolean;
    setIsLightSelected: React.Dispatch<React.SetStateAction<boolean>>;
    isColorSelected: boolean;
    setIsColorSelected: React.Dispatch<React.SetStateAction<boolean>>;
    isDetailSelected: boolean;
    setIsDetailSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

const BottomMenu: React.FC<ListMenuProps> = ({
                                                 isLightSelected,
                                                 setIsLightSelected,
                                                 isColorSelected,
                                                 setIsColorSelected,
                                                 isDetailSelected,
                                                 setIsDetailSelected,
                                             }) => {
    const handlePress = (id: string) => {
        if (id === "light") {
            setIsLightSelected(!isLightSelected);
            setIsColorSelected(false);
            setIsDetailSelected(false);
        } else if (id === "color") {
            setIsLightSelected(false);
            setIsColorSelected(!isColorSelected);
            setIsDetailSelected(false);
        } else if (id === "detail") {
            setIsLightSelected(false);
            setIsColorSelected(false);
            setIsDetailSelected(!isDetailSelected);
        }
    };

    return (
        <View style={styles.container}>
            <Button
                icon={"weather-sunny"}
                mode={isLightSelected ? "contained-tonal" : "outlined"}
                testID={"light"}
                onPress={() => handlePress("light")}
            >
                Light
            </Button>
            <Button
                icon={"format-color-fill"}
                mode={isColorSelected ? "contained-tonal" : "outlined"}
                testID={"color"}
                onPress={() => handlePress("color")}
            >
                Color
            </Button>
            <Button
                icon={"details"}
                mode={isDetailSelected ? "contained-tonal" : "outlined"}
                testID={"detail"}
                onPress={() => handlePress("detail")}
            >
                Detail
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "white",
        height: 50,
    },
});

export default BottomMenu;
