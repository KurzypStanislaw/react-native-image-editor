import React, {useState, useEffect, useContext} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import {useNavigation} from "@react-navigation/native";
import {HomeScreenProps} from "../../types/types";
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
            // after choosing new photo all filters should be changed to default values!
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
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };

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
    image: {
        width: 300,
        height: 300,
        marginTop: 20,
        borderRadius: 10,
    },
});

export default HomeScreen;
