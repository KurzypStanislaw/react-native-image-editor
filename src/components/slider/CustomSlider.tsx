import React, {useState} from "react";
import { Slider } from '@miblanchard/react-native-slider';


type Props = {
    initialValue: number;
    minValue: number;
    maxValue: number;
    onValueChange: (value: number) => void;

}

const CustomSlider : React.FC = () => {
    const [sliderValue, setSliderValue] = useState<number>(0);



    return(

    );
}


export default CustomSlider;