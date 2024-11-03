import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomMenu from '../../components/menu/BottomMenu';
import ColorTab from '../../components/colorTab/ColorTab';
import LightTab from '../../components/lightTab/LightTab';
import { EditingScreenProps } from '../../types/types';
import GLImage from "../../components/GLImage";


const EditingScreen: React.FC<EditingScreenProps> = ({ route }) => {
    const { uri } = route.params;
    const [isColorSelected, setIsColorSelected] = useState(false);
    const [isLightSelected, setIsLightSelected] = useState(false);
    const [isCropSelected, setIsCropSelected] = useState(false);

    return (
        <>
            <View style={styles.container}>
                <GLImage/>
            </View>


            {isColorSelected && <ColorTab />}
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
        padding: '3%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#2b3347',
        width: '100%',
        height: '70%',
    },
});

export default EditingScreen;
