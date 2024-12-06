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
                mode="contained"
                testID={"light"}
                onPress={() => handlePress("light")}
                contentStyle={{backgroundColor: isLightSelected ? "#7244c8" : "#cebce1"}}
                textColor={isLightSelected ? "#ffffff" : "#4c2897"}
            >
                Light
            </Button>
            <Button
                icon={"format-color-fill"}
                mode="contained"
                testID={"color"}
                onPress={() => handlePress("color")}
                contentStyle={{backgroundColor: isColorSelected ? "#7244c8" : "#cebce1"}}
                labelStyle={{
                    color: isColorSelected ? "#ffffff" : "#4c2897",
                }}
            >
                Color
            </Button>
            <Button
                icon="details"
                mode="contained"
                testID="detail"
                onPress={() => handlePress("detail")}
                contentStyle={{backgroundColor: isDetailSelected ? "#7244c8" : "#cebce1"}}
                labelStyle={{
                    color: isDetailSelected ? "#ffffff" : "#4c2897",
                }}
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
        backgroundColor: "#333131",
        height: 70,
        borderRadius: 10,
        borderTopLeftRadius: 10,
        color: '#FFFFFF'
    },
});

export default BottomMenu;
