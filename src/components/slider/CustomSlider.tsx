import React, {useState} from "react";
import { Slider } from '@miblanchard/react-native-slider';
import {StyleSheet, View, Text} from "react-native";


type Props = {
    initialValue: number;
    minValue: number;
    maxValue: number;
    onValueChange: (value: number) => void;
    title: string;
}

const CustomSlider : React.FC<Props> = (props) => {
    const [sliderValue, setSliderValue] = useState<number>(props.initialValue);



    return(
        <View>
            <Text style={styles.sliderTitle}>{props.title}</Text>
            <Slider
                value={sliderValue}
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
        // fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: 'white',
    },
    sliderWrapper: {
        width: '100%',
        justifyContent: 'center'
    }
});

export default CustomSlider;