import React, {useContext} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {BlurView} from "expo-blur";
import EditingContext, {defaultEditorState} from "../../context/EditingContext";
import CustomSlider from "../slider/CustomSlider";

const ColorTab: React.FC = () => {
    const {state, setState} = useContext(EditingContext);

    const handleChange = (key: keyof typeof state, newValue: number) => {
        setState((prevState) => ({...prevState, [key]: newValue}));
    };

    return (
        <View style={styles.wrapper}>
            <BlurView intensity={70} style={styles.container} tint="dark">
                <ScrollView contentContainerStyle={styles.slidersContainer}>
                    <CustomSlider
                        value={state.brightness}
                        minValue={-1}
                        maxValue={1}
                        onValueChange={(value) => handleChange("brightness", value)}
                        title={`Brightness`}
                        defaultValue={defaultEditorState.brightness}
                    />

                    <CustomSlider
                        value={state.contrast}
                        minValue={-1}
                        maxValue={1}
                        onValueChange={(value) => handleChange("contrast", value)}
                        title={`Contrast`}
                        defaultValue={defaultEditorState.contrast}
                    />

                    <CustomSlider
                        value={state.exposure}
                        minValue={-2}
                        maxValue={2}
                        onValueChange={(value) => handleChange("exposure", value)}
                        title={`Exposure`}
                        defaultValue={defaultEditorState.exposure}
                    />
                </ScrollView>
            </BlurView>
        </View>
    );
};

export default ColorTab;

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        bottom: 70,
        left: 0,
        right: 0,
        height: "40%",
    },
    container: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
    },
    slidersContainer: {
        paddingHorizontal: "4%",
        paddingBottom: 10,
        paddingTop: 10,
    },
});

