import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, VirtualizedList, Text} from 'react-native';
import CustomSlider from "../../components/slider/CustomSlider";
import {Button, Divider} from "react-native-paper";
import ListMenu from "../../components/ menu/ListMenu";



const EditingScreen: React.FC = () => {

    const [selectedImage, setSelectedImage] = useState<string>();

    const [sliderValue, setSliderValue] = React.useState(0.2); // Initialize with default value

    const handleChange = ( value: number ) => {
        console.log( value );
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
        </View>
    ));


    return (
        <View style={styles.container}>

            <View style={{height:'70%'}}>
                <View style={styles.photoMock}/>
            </View>

            <ScrollView style={styles.scrollViewContainer}>
                {dummySliders}
                <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
                    Press me
                </Button>

            </ScrollView>

            <ListMenu
                isColorSelected={false}
                isLightSelected={false}
                isCropSelected={false}
            >
                <Text>aaaaa</Text>
            </ListMenu>

            <View>

            </View>
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
        paddingTop: 35,
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
        height: '30%',
        alignSelf: 'flex-end',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        paddingVertical: '5%',
    },
    sliderWrapper: {
      width: '100%',
    },
    photoSection: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoMock: {
        height:'100%',
        width:'100%',
        backgroundColor:"#123456",
        borderRadius: 20,
    }
});

export default EditingScreen;
