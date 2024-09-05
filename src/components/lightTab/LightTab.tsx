import React, { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import EditingContext from "../../context/EditingContext";
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
                    initialValue={state.brightness}
                    minValue={0}
                    maxValue={5}
                    onValueChange={(value) => handleChange("brightness", value)}
                    title={`Brightness`}
                />

                <CustomSlider
                    initialValue={state.contrast}
                    minValue={-10}
                    maxValue={10}
                    onValueChange={(value) => handleChange("contrast", value)}
                    title={`Contrast`}
                />

                <CustomSlider
                    initialValue={state.exposure}
                    minValue={-1}
                    maxValue={1}
                    onValueChange={(value) => handleChange("exposure", value)}
                    title={`Exposure`}
                />

                <CustomSlider
                    initialValue={state.sharpen}
                    minValue={0}
                    maxValue={15}
                    onValueChange={(value) => handleChange("sharpen", value)}
                    title={`Sharpen`}
                />

                <CustomSlider
                    initialValue={state.blur}
                    minValue={0}
                    maxValue={30}
                    onValueChange={(value) => handleChange("blur", value)}
                    title={`Blur`}
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
