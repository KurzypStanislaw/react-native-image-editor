import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextComponent, ScrollView} from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';



const EditingScreen: React.FC = () => {

    const [selectedImage, setSelectedImage] = useState<string>();

    const [sliderValue, setSliderValue] = React.useState(0.2); // Initialize with default value

    return (
        <View style={styles.container}>

            <ScrollView>
                <View style={styles.sliderWrapper}>
                    <Text>Saturation</Text>
                    <Slider
                        // animateTransitions={true}
                        trackClickable={true}
                        // debugTouchArea
                        startFromZero={true}
                        minimumValue={-100}
                        maximumValue={100}
                        value={sliderValue}
                        onValueChange={(val) => setSliderValue(val[0])} // Update sliderValue on change
                    />

                </View>

                <View style={styles.sliderWrapper}>
                    <Text>Temperature</Text>
                    <Slider
                        // animateTransitions={true}
                        trackClickable={true}
                        // debugTouchArea
                        startFromZero={true}
                        minimumValue={-100}
                        maximumValue={100}
                        value={sliderValue}
                        onValueChange={(val) => setSliderValue(val[0])} // Update sliderValue on change
                    />
                </View>

                <View style={styles.sliderWrapper}>
                    <Text>Tint</Text>
                    <Slider
                        // animateTransitions={true}
                        trackClickable={true}
                        // debugTouchArea
                        startFromZero={true}
                        minimumValue={-100}
                        maximumValue={100}
                        value={sliderValue}
                        onValueChange={(val) => setSliderValue(val[0])} // Update sliderValue on change
                    />
                </View>

                <View style={styles.sliderWrapper}>
                    <Text>Vibrance</Text>
                    <Slider
                        // animateTransitions={true}
                        trackClickable={true}
                        // debugTouchArea
                        startFromZero={true}
                        minimumValue={-100}
                        maximumValue={100}
                        value={sliderValue}
                        onValueChange={(val) => setSliderValue(val[0])} // Update sliderValue on change
                    />
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
        width: '100%',
        height: '50%',
        justifyContent: 'center'

    }
});

export default EditingScreen;
