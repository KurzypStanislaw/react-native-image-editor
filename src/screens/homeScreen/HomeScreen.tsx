import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { HomeScreenProps } from "../../types/types";
import EditingContext from "../../context/EditingContext";

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const { setImageURI, resetState } = useContext(EditingContext);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        if (selectedImage) {
            navigation.navigate("Edit", {
                uri: selectedImage,
            });
            resetState();
            setImageURI(selectedImage);
        }
    }, [selectedImage]);

    const handlePress = () => {
        if (hasPermission) {
            pickImageAsync();
        } else {
            alert('We need permission to access your photo library.');
        }
    };

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };

    return (
        <ImageBackground
            source={require('../../../assets/background.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <TouchableOpacity onPress={handlePress}>
                    <View style={styles.textContainer}>
                        <Text style={styles.textWhite}>▶️CLICK TO SELECT A PHOTO◀️</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    textContainer: {
        backgroundColor: 'rgba(10, 0, 0, 0.6)',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    textWhite: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },
});

export default HomeScreen;
