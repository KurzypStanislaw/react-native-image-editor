import React, {createContext, FC, useState, ReactNode, useEffect} from "react";
import { Image } from 'react-native';

export interface EditorState {
    width: number;
    height: number;
    hue: number;
    blur: number;
    sepia: number;
    sharpen: number;
    negative: number;
    contrast: number;
    saturation: number;
    brightness: number;
    temperature: number;
    exposure: number;
    colorOverlay: [number, number, number];
}


export const defaultEditorState: EditorState = {
    width: 0,
    height: 0,
    hue: 0,
    blur: 0,
    sepia: 0,
    sharpen: 0,
    negative: 0,
    contrast: 0,
    saturation: 0,
    brightness: 0,
    temperature: 0,
    exposure: 0,
    colorOverlay: [0.0, 0.0, 0.0],
};


const EditingContext = createContext<{
    state: EditorState;
    setState: React.Dispatch<React.SetStateAction<EditorState>>;
    imageURI: string | null,
    setImageURI: React.Dispatch<React.SetStateAction<string | null>>;
    resetState: () => void;
}>({
    imageURI: "",
    setImageURI: () => {},
    state: defaultEditorState,
    setState: () => {},
    resetState: () => {}
});


const EditingProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<EditorState>(defaultEditorState);
    const [imageURI, setImageURI] = React.useState<string | null>(null);

    useEffect(() => console.log(`Width changed to: ${state.width}`), [state.width]);
    useEffect(() => console.log(`Height changed to: ${state.height}`), [state.height]);
    useEffect(() => console.log(`Hue changed to: ${state.hue}`), [state.hue]);
    useEffect(() => console.log(`Blur changed to: ${state.blur}`), [state.blur]);
    useEffect(() => console.log(`Sepia changed to: ${state.sepia}`), [state.sepia]);
    useEffect(() => console.log(`Sharpen changed to: ${state.sharpen}`), [state.sharpen]);
    useEffect(() => console.log(`Negative changed to: ${state.negative}`), [state.negative]);
    useEffect(() => console.log(`Contrast changed to: ${state.contrast}`), [state.contrast]);
    useEffect(() => console.log(`Saturation changed to: ${state.saturation}`), [state.saturation]);
    useEffect(() => console.log(`Brightness changed to: ${state.brightness}`), [state.brightness]);
    useEffect(() => console.log(`Temperature changed to: ${state.temperature}`), [state.temperature]);
    useEffect(() => console.log(`Exposure changed to: ${state.exposure}`), [state.exposure]);
    useEffect(() => console.log(`ColorOverlay changed to: [${state.colorOverlay}]`), [state.colorOverlay]);
    useEffect(() => console.log(`Image URI changed to: [${imageURI}]`), [imageURI]);


    useEffect(() => {
        if (imageURI) {
            // Get the width and height of the image
            Image.getSize(
                imageURI,
                (width: number, height: number) => {
                    setState(prevState => ({
                        ...prevState,
                        width,
                        height
                    }));
                },
                (error: any) => {
                    console.error('Error getting image size:', error);
                }
            );

        }
    }, [imageURI]);


    const resetState = () => {
        setState(defaultEditorState);
    }

    return (
        <EditingContext.Provider value={{ state, setState, imageURI, setImageURI, resetState }}>
            {children}
        </EditingContext.Provider>
    );
};

export { EditingProvider };
export default EditingContext;
