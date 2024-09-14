import React, {useContext, useState} from "react";
import { Slider } from '@miblanchard/react-native-slider';
import {StyleSheet, View, Text} from "react-native";
import {Button} from "react-native-paper";

type Props = {
    value: number;
    minValue: number;
    maxValue: number;
    onValueChange: (value: number) => void;
    title: string;
    defaultValue: number;
}

const CustomSlider : React.FC<Props> = (props) => {

    const handleReset =  () => {
        props.onValueChange(props.defaultValue); // set outer state
    }

    return(
        <View>
            <View style={styles.sliderHeader}>
                <Text style={styles.sliderTitle}>{props.title}</Text>
                { props.defaultValue !== props.value && <Button onPress={handleReset} icon={"restart"} mode={'text'} textColor={"white"}>{null}</Button>}
            </View>
            <Slider
                step={0.01}
                value={props.value}
                minimumValue={props.minValue}
                maximumValue={props.maxValue}
                onValueChange={(val) => props.onValueChange(val[0])}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2b3349',
        padding: 20,
        paddingTop: 5,
    },

    sliderTitle: {
        fontSize: 12,
        fontFamily: 'Roboto',
        color: 'white',
    },
    sliderWrapper: {
        width: '100%',
        justifyContent: 'center'
    },
    sliderHeader: {
        height: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default CustomSlider;