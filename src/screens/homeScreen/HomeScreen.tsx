import React, {useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { Slider } from '@miblanchard/react-native-slider';



const HomeScreen: React.FC = () => {

    const [selectedImage, setSelectedImage] = useState<string>();

    const handlePress = () => {
        pickImageAsync();
    };

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };
    const [sliderValue, setSliderValue] = React.useState(0.2); // Initialize with default value

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress}>
                <FontAwesome
                    name="picture-o"
                    size={50}
                    color="#FFF"
                />
                <Text style={styles.textWhite}>Click anywhere to start!</Text>
            </TouchableOpacity>
            <View style={styles.sliderWrapper}>
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

                <Text style={styles.valueText}>Value: {sliderValue.toFixed(1)}</Text>
            </View>

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

export default HomeScreen;
