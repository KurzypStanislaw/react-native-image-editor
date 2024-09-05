import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

type ListMenuProps = {
    isLightSelected: boolean;
    setIsLightSelected: React.Dispatch<React.SetStateAction<boolean>>;
    isColorSelected: boolean;
    setIsColorSelected: React.Dispatch<React.SetStateAction<boolean>>;
    isCropSelected: boolean;
    setIsCropSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

const BottomMenu: React.FC<ListMenuProps> = ({
                                                 isLightSelected,
                                                 setIsLightSelected,
                                                 isColorSelected,
                                                 setIsColorSelected,
                                                 isCropSelected,
                                                 setIsCropSelected,
                                             }) => {
    const handlePress = (id: string) => {
        if (id === "light") {
            setIsLightSelected(!isLightSelected);
            setIsColorSelected(false);
            setIsCropSelected(false);
        } else if (id === "color") {
            setIsLightSelected(false);
            setIsColorSelected(!isColorSelected);
            setIsCropSelected(false);
        } else if (id === "crop") {
            setIsLightSelected(false);
            setIsColorSelected(false);
            setIsCropSelected(!isCropSelected);
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
                icon={"crop"}
                mode={isCropSelected ? "contained-tonal" : "outlined"}
                testID={"crop"}
                onPress={() => handlePress("crop")}
            >
                Crop
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
