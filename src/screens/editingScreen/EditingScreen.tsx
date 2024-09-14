import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { GLView } from 'expo-gl';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import EditingContext from '../../context/EditingContext';
import BottomMenu from '../../components/menu/BottomMenu';
import ColorTab from '../../components/colorTab/ColorTab';
import CropTab from '../../components/cropTab/CropTab';
import LightTab from '../../components/lightTab/LightTab';
import { EditingScreenProps } from '../../types/types';
import {createConditionalWrapper} from "../../utils/CreateConditionalWrapper";
import Temperature from "../../utils/opengl-image-filters-lib/filters/Temperature";
import {isUndefinedOrNull} from "../../utils/isUndefinedOrNull";
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
