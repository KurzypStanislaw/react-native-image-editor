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


const defaultEditorState: EditorState = {
    width: 0,
    height: 0,
    hue: 0,
    blur: 0,
    sepia: 0,
    sharpen: 0,
    negative: 0,
    contrast: 0,
    saturation: 0,
    brightness: 1,
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

    useEffect(() => {
        console.log('The state has changed!' + state);
    }, [state]);

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
