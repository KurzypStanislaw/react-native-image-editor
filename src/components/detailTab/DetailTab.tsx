import React, { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import EditingContext, { defaultEditorState } from "../../context/EditingContext";
import CustomSlider from "../slider/CustomSlider";

const DetailTab: React.FC = () => {
    const { state, setState } = useContext(EditingContext);

    const handleChange = (key: keyof typeof state, newValue: number) => {
        setState((prevState) => ({ ...prevState, [key]: newValue }));
    };

    return (
        <View style={styles.wrapper}>
            <BlurView intensity={70} style={styles.container} tint="dark">
                <ScrollView contentContainerStyle={styles.slidersContainer}>
                    <CustomSlider
                        value={state.sharpen}
                        minValue={0}
                        maxValue={0.1}
                        onValueChange={(value) => handleChange("sharpen", value)}
                        title={`Sharpen`}
                        defaultValue={defaultEditorState.sharpen}
                    />
                    <CustomSlider
                        value={state.grain}
                        minValue={-1}
                        maxValue={1}
                        onValueChange={(value) => handleChange("grain", value)}
                        title={`Grain`}
                        defaultValue={defaultEditorState.grain}
                    />
                    <CustomSlider
                        value={state.blur}
                        minValue={-1}
                        maxValue={1}
                        onValueChange={(value) => handleChange("blur", value)}
                        title={`Blur`}
                        defaultValue={defaultEditorState.blur}
                    />
                </ScrollView>
            </BlurView>
        </View>
    );
};

export default DetailTab;

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
