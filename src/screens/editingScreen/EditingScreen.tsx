import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import CustomSlider from "../../components/slider/CustomSlider";



const EditingScreen: React.FC = () => {

    const [selectedImage, setSelectedImage] = useState<string>();

    const [sliderValue, setSliderValue] = React.useState(0.2); // Initialize with default value

    const handleChange = ( value: number ) => {
        console.log( value );
    };

    return (
        <View style={styles.container}>

            <ScrollView style={styles.sliderWrapper}>
                <View style={styles.sliderWrapper}>
                    <CustomSlider initialValue={0} minValue={-100} maxValue={100} onValueChange={handleChange} title={"slider1"}/>
                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2b3349',
        padding: 20,
    },
    textWhite: {
        color: '#ffffff',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        marginTop: 20,
    },
    slider: {
        width: '80%',
        marginTop: 40,
    },
    valueText: {
        color: '#ffffff',
        fontSize: 18,
        marginTop: 20,
    },
    sliderWrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: 100,
        height: '50%',
        // justifyContent: 'center'

    }
});

export default EditingScreen;
