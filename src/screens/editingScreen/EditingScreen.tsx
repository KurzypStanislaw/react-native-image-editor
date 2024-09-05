import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import CustomSlider from "../../components/slider/CustomSlider";
import BottomMenu from "../../components/menu/BottomMenu";
import { EditingProvider } from "../../context/EditingContext";
import ColorTab from "../../components/colorTab/ColorTab";
import CropTab from "../../components/cropTab/CropTab";
import LightTab from "../../components/lightTab/LightTab";

const EditingScreen: React.FC = () => {
    const [selectedImage, setSelectedImage] = React.useState('./assets/test_img.jpg');
    const [isColorSelected, setIsColorSelected] = React.useState(false);
    const [isLightSelected, setIsLightSelected] = React.useState(false);
    const [isCropSelected, setIsCropSelected] = React.useState(false);

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
