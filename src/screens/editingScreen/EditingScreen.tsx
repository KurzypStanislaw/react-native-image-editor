import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import CustomSlider from "../../components/slider/CustomSlider";
import BottomMenu from "../../components/menu/BottomMenu";
import { EditingProvider } from "../../context/EditingContext";
import ColorTab from "../../components/colorTab/ColorTab";
import CropTab from "../../components/cropTab/CropTab";
import LightTab from "../../components/lightTab/LightTab";
import {EditingScreenProps} from "../../types/types";


const EditingScreen: React.FC<EditingScreenProps> = ({ route }) => {
    const [selectedImage, setSelectedImage] = React.useState('./assets/test_img.jpg');
    const [isColorSelected, setIsColorSelected] = React.useState(false);
    const [isLightSelected, setIsLightSelected] = React.useState(false);
    const [isCropSelected, setIsCropSelected] = React.useState(false);


    const { uri } = route.params;

    return (
        <>
            <View style={styles.container}>
                <View style={{ height: '70%' }}>
                    <Image
                        source={{ uri: uri }}
                        style={styles.image}
                    />
                </View>
            </View>

            {isColorSelected && <ColorTab />}
            {isCropSelected && <CropTab />}
            {isLightSelected && <LightTab />}

            <BottomMenu
                isColorSelected={isColorSelected}
                setIsColorSelected={setIsColorSelected}
                isLightSelected={isLightSelected}
                setIsLightSelected={setIsLightSelected}
                isCropSelected={isCropSelected}
                setIsCropSelected={setIsCropSelected}
            />

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: "3%",
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#2b3347',
        width: '100%',
        height: '70%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    sliderWrapper: {
        width: '100%',
    },
});

export default EditingScreen;
