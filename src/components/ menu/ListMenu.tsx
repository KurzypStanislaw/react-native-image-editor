import React, {useState} from "react";
import {GestureResponderEvent, StyleSheet, View} from "react-native";
import {Button} from "react-native-paper";
import {handlePress} from "react-native-paper/lib/typescript/components/RadioButton/utils";


type ListMenuProps = {
    children: React.ReactNode;
    isLightSelected: boolean;
    isColorSelected: boolean;
    isCropSelected: boolean;
}



const ListMenu: React.FC<ListMenuProps> = ({isLightSelected, isColorSelected, isCropSelected}) => {

    const [lightSelected, setLightSelected] = useState<boolean>(isLightSelected);
    const [colorSelected, setColorSelected] = useState<boolean>(isColorSelected);
    const [cropSelected, setCropSelected] = useState<boolean>(isCropSelected);

    const handlePress = (id : string) =>{

        if (id === 'light') {
            setLightSelected(!lightSelected);
            setColorSelected(false);
            setCropSelected(false);
            /// setting the selected menu as visible
        } else if (id === 'color') {
            setLightSelected(false);
            setColorSelected(!colorSelected);
            setCropSelected(false);
            /// setting the selected menu as visible
        } else if (id === 'crop') {
            setColorSelected(false);
            setLightSelected(false);
            setCropSelected(!cropSelected);
            /// setting the selected menu as visible
        }
    }

    return(
        <View style={styles.container} >
            <Button icon={'weather-sunny'} mode={lightSelected?"contained-tonal":"outlined"} testID={'light'} onPress={() => handlePress('light')}>Light</Button>
            <Button icon={'format-color-fill'} mode={colorSelected?"contained-tonal":"outlined"} testID={'color'} onPress={() => handlePress('color')}>color</Button>
            <Button icon={'crop'} mode={cropSelected?"contained-tonal":"outlined"} testID={'crop'} onPress={() => handlePress('crop')}>Crop</Button>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
        height: 50,
    },

});

export default ListMenu;