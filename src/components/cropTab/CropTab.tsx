import React, { useContext } from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import EditingContext from "../../context/EditingContext";

const ColorTab: React.FC = () => {
    const { state, setState } = useContext(EditingContext);

    const handleChange = (key: keyof typeof state, newValue: number) => {
        setState((prevState) => ({ ...prevState, [key]: newValue }));
    };

    return (
        <View style={styles.container}>
            <Text> the cropping later with use of some Library. Currently the dimensions are:
            width: {state.width},
            height: {state.height}
            </Text>
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
