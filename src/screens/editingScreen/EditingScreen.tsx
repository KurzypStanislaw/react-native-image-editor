import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import CustomSlider from "../../components/slider/CustomSlider";
import {Button} from "react-native-paper";



const EditingScreen: React.FC = () => {

    const [selectedImage, setSelectedImage] = useState<string>();

    const [sliderValue, setSliderValue] = React.useState(0.2); // Initialize with default value

    const handleChange = ( value: number ) => {
        console.log( value );
    };

    return (
        <View style={styles.container}>

            <View style={{height:'50%'}}>
            </View>

            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.sliderWrapper}>
                    <CustomSlider initialValue={0} minValue={-100} maxValue={100} onValueChange={handleChange} title={"slider1"}/>
                </View>

                    <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
                        Press me
                    </Button>

            </ScrollView>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#2b3347',
        width:'100%',
        height:'100%',
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
    scrollViewContainer: {
        flex: 1,
        width:'100%',
        backgroundColor: '#4e5b7c',
        paddingHorizontal: 20,
        height: '50%',
        alignSelf: 'flex-end',
    },
    sliderWrapper: {
      width: '100%',
    }
});

export default EditingScreen;
