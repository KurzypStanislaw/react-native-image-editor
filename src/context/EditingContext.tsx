import React, {createContext, FC, useState, ReactNode, useEffect} from "react";

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
    brightness: 0,
    temperature: 0,
    exposure: 0,
    colorOverlay: [0.0, 0.0, 0.0],
};


const EditingContext = createContext<{
    state: EditorState;
    setState: React.Dispatch<React.SetStateAction<EditorState>>;
}>({
    state: defaultEditorState,
    setState: () => {},
});


const EditingProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<EditorState>(defaultEditorState);

    useEffect(() => {
        console.log('The state has changed!' + state);
    }, [state]);

    return (
        <EditingContext.Provider value={{ state, setState }}>
            {children}
        </EditingContext.Provider>
    );
};

export { EditingProvider };
export default EditingContext;
