import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import CustomSlider from "../../components/slider/CustomSlider";
import { Button } from "react-native-paper";
import BottomMenu from "../../components/menu/BottomMenu";
import { EditingProvider } from "../../context/EditingContext";
import ColorTab from "../../components/colorTab/ColorTab";

const EditingScreen: React.FC = () => {
    const [sliderValue, setSliderValue] = React.useState(0.2); // Initialize with default value
    const [selectedImage, setSelectedImage] = React.useState('./assets/test_img.jpg');
    const [isColorSelected, setIsColorSelected] = React.useState(false);
    const [isLightSelected, setIsLightSelected] = React.useState(false);
    const [isCropSelected, setIsCropSelected] = React.useState(false);

    const handleChange = (value: number) => {
        console.log(value);
    };

    const dummySliders = Array.from({ length: 10 }, (_, index) => (
        <View key={index} style={styles.sliderWrapper}>
            <CustomSlider
                initialValue={0}
                minValue={-100}
                maxValue={100}
                onValueChange={handleChange}
                title={`slider${index + 1}`}
            />
            {/* <Divider /> */}
        </View>
    ));

    return (
        <EditingProvider>
            <View style={styles.container}>
                <View style={{ height: '70%' }}>
                    <Image
                        source={{ uri: selectedImage }}
                        style={styles.image}
                    />
                </View>


            </View>

            {isColorSelected && <ColorTab />}

            <BottomMenu
                isColorSelected={isColorSelected}
                setIsColorSelected={setIsColorSelected}
                isLightSelected={isLightSelected}
                setIsLightSelected={setIsLightSelected}
                isCropSelected={isCropSelected}
                setIsCropSelected={setIsCropSelected}
            />

        </EditingProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: '#2b3347',
        width: '100%',
        height: '100%',
        paddingTop: 35,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    sliderWrapper: {
        width: '100%',
    },
});

export default EditingScreen;
