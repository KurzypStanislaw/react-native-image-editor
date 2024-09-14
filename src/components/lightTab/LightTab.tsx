import React, { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import EditingContext, {defaultEditorState} from "../../context/EditingContext";
import CustomSlider from "../slider/CustomSlider";

const ColorTab: React.FC = () => {
    const { state, setState } = useContext(EditingContext);

    const handleChange = (key: keyof typeof state, newValue: number) => {
        setState((prevState) => ({ ...prevState, [key]: newValue }));
    };

    return (
        <View style={styles.container}>
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

                <CustomSlider
                    value={state.sharpen}
                    minValue={0}
                    maxValue={0.1}
                    onValueChange={(value) => handleChange("sharpen", value)}
                    title={`Sharpen`}
                    defaultValue={defaultEditorState.sharpen}
                />

                <CustomSlider
                    value={state.blur}
                    minValue={0}
                    maxValue={30}
                    onValueChange={(value) => handleChange("blur", value)}
                    title={`Blur`}
                    defaultValue={defaultEditorState.blur}
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
