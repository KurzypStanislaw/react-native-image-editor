import React, { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import EditingContext from "../../context/EditingContext";
import CustomSlider from "../slider/CustomSlider";
import {defaultEditorState} from "../../context/EditingContext";

const ColorTab: React.FC = () => {
    const { state, setState } = useContext(EditingContext);

    const handleChange = (key: keyof typeof state, newValue: number) => {
        setState((prevState) => ({ ...prevState, [key]: newValue }));
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.slidersContainer}>
                <CustomSlider
                    value={state.temperature}
                    minValue={-10000}
                    maxValue={30000}
                    onValueChange={(value) => handleChange("temperature", value)}
                    title={`Temperature`}
                    defaultValue={defaultEditorState.temperature}
                />

                <CustomSlider
                    value={state.saturation}
                    minValue={-1}
                    maxValue={1}
                    onValueChange={(value) => handleChange("saturation", value)}
                    title={`Saturation`}
                    defaultValue={defaultEditorState.saturation}
                />

                <CustomSlider
                    value={state.hue}
                    minValue={0}
                    maxValue={6.3}
                    onValueChange={(value) => handleChange("hue", value)}
                    title={`Hue`}
                    defaultValue={defaultEditorState.hue}
                />

                <CustomSlider
                    value={state.sepia}
                    minValue={-5}
                    maxValue={5}
                    onValueChange={(value) => handleChange("sepia", value)}
                    title={`Sepia`}
                    defaultValue={defaultEditorState.sepia}
                />

                <CustomSlider
                    value={state.negative}
                    minValue={-2}
                    maxValue={2}
                    onValueChange={(value) => handleChange("negative", value)}
                    title={`Negative`}
                    defaultValue={defaultEditorState.negative}
                />

            </ScrollView>
        </View>
    );
};

export default ColorTab;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 50,
        left: 0,
        right: 0,
        height: "25%",
        backgroundColor: '#123456',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    slidersContainer: {
        paddingHorizontal: "4%",
        paddingBottom: 10,
        paddingTop: 10,
    },
});
