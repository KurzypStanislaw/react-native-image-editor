import React, {useState, useEffect, useContext} from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import {HomeScreenProps} from "../../types/types";
import EditingContext from "../../context/EditingContext";


const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const { setImageURI, resetState, setState } = useContext(EditingContext);

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
        console.log(result);

        if (!result.canceled) {
            resetState();
            // setState((prevState) => ({ ...prevState, height: result.assets[0].height, width: result.assets[0].width })); // TODO: causes sth else to break lol
            console.log(result.assets[0].height, 'x', result.assets[0].width);
            setSelectedImage(result.assets[0].uri);
            setImageURI(result.assets[0].uri);
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
