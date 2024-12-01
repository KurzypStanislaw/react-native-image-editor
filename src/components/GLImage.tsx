import React, {useContext, useEffect, useRef, useState} from 'react';
import {ExpoWebGLRenderingContext, GLView} from 'expo-gl';
import * as MediaLibrary from 'expo-media-library';
import {Asset} from 'expo-asset';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import EditingContext from "../context/EditingContext";
import fragmentShaderSource from "../utils/shader";
import Toast from 'react-native-root-toast';
import {Button} from "react-native-paper";

const MyGLComponent = () => {
    const {state, imageURI, setState} = useContext(EditingContext);
    const glRef = useRef<ExpoWebGLRenderingContext | undefined>();
    const textureRef = useRef<WebGLUniformLocation | null>(null);
    const brightnessLocationRef = useRef<WebGLUniformLocation | null>(null);
    const contrastLocationRef = useRef<WebGLUniformLocation | null>(null);
    const saturationLocationRef = useRef<WebGLUniformLocation | null>(null);
    const exposureLocationRef = useRef<WebGLUniformLocation | null>(null);
    const temperatureLocationRef = useRef<WebGLUniformLocation | null>(null);
    const sharpenLocationRef = useRef<WebGLUniformLocation | null>(null);
    const hueLocationRef = useRef<WebGLUniformLocation | null>(null);
    const GLWrapperViewRef = useRef<View>(null);
    const [localWidth, setLocalWidth] = useState<number>(0);
    const [localHeight, setLocalHeight] = useState<number>(0);
    const [WebGLViewPixelHeight, setWebGLViewPixelHeight] = useState<number>(0);

    const vertexShaderSource = `
        attribute vec4 position;
        attribute vec2 texcoord;
        varying vec2 v_texcoord;
        void main() {
            gl_Position = position;
            v_texcoord = texcoord;
        }
    `;

    const createShader = (gl: ExpoWebGLRenderingContext, type: any, source: string) => {
        // @ts-ignore
        const shader: WebGLShader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile failed with:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    };

    const linkProgram = (gl: ExpoWebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
        // @ts-ignore
        const program: WebGLProgram = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link failed with:', gl.getProgramInfoLog(program));
            return null;
        }
        return program;
    };

    const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
        // Setting reference to current WebGL context
        if (gl !== null) {
            glRef.current = gl;
        }

        let asset;

        if (imageURI != null) {
            asset = Asset.fromURI(imageURI);
            await asset.downloadAsync();
        }

        if (asset === null || asset === undefined) {
            throw new Error('Asset not found');
        }


        // Shaders compiling
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        // Building WebGL program from context and shaders
        const program = linkProgram(gl, vertexShader, fragmentShader);
        gl.useProgram(program);

        // Setting WebGl context position
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,
            1, 1,
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        const positionAttributeLocation = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        // Setting images tex positions (this may cause that its upside down)
        const texcoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
        const texcoords = new Float32Array([
            0, 0,
            1, 0,
            0, 1,
            1, 1,
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, texcoords, gl.STATIC_DRAW);
        const texcoordAttributeLocation = gl.getAttribLocation(program, 'texcoord');
        gl.enableVertexAttribArray(texcoordAttributeLocation);
        gl.vertexAttribPointer(texcoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        const resolutionAttributeLocation = gl.getAttribLocation(program, 'resolution');
        gl.uniform2f(resolutionAttributeLocation, asset.width as number, asset.height as number);

        //FIXME: this is quickfix for dealing with weird ExpoGL initialization, temperature must be explicitly set as it value cannot be default as 0
        setState({...state, temperature: 6500});

        // Creating texture, due to the image dimensions not being powers of 2 there are some additional setting required
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, {localUri: asset.localUri});
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        textureRef.current = texture;

        // Creating reference to FILTERS uniforms!!
        if (program) {
            brightnessLocationRef.current = gl.getUniformLocation(program, 'brightness');
            contrastLocationRef.current = gl.getUniformLocation(program, 'contrast');
            saturationLocationRef.current = gl.getUniformLocation(program, 'saturation');
            exposureLocationRef.current = gl.getUniformLocation(program, 'exposure');
            temperatureLocationRef.current = gl.getUniformLocation(program, 'temperature');
            sharpenLocationRef.current = gl.getUniformLocation(program, 'sharpen');
            hueLocationRef.current = gl.getUniformLocation(program, 'hue');
        }


        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        // Exporting frame to render
        gl.endFrameEXP();
    };

    const handleSave = async () => {
        try {
            // Request media library permission
            const {status} = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need media library permissions to save images!');
                return;
            }

            // Take snapshot
            console.log(`From state. Width: ${state.width}, Height: ${state.height}`);
            const snapshot = await GLView.takeSnapshotAsync(glRef.current, {
                height: state.height,
                width: state.width,
                compress: 1.0
            });

            // Save the snapshot to the image library
            const asset = await MediaLibrary.createAssetAsync(snapshot.uri);
            console.log('Image saved to gallery!', asset);
            Toast.show('Image saved successfully.', {
                duration: Toast.durations.SHORT, position: 80,
            });
        } catch (error) {
            console.error('Error saving image:', error);
            Toast.show('Error saving image!', {
                duration: Toast.durations.LONG, position: Toast.positions.TOP,
            });
        }
    };

    useEffect(() => {
        if (
            glRef.current &&
            brightnessLocationRef.current &&
            contrastLocationRef.current &&
            saturationLocationRef.current &&
            exposureLocationRef.current &&
            temperatureLocationRef.current &&
            sharpenLocationRef.current &&
            hueLocationRef.current &&
            textureRef.current
        ) {
            const gl: ExpoWebGLRenderingContext = glRef.current;
            gl.useProgram(gl.getParameter(gl.CURRENT_PROGRAM));

            gl.uniform1f(brightnessLocationRef.current, state.brightness);
            gl.uniform1f(contrastLocationRef.current, state.contrast);
            gl.uniform1f(saturationLocationRef.current, state.saturation);
            gl.uniform1f(exposureLocationRef.current, state.exposure);
            gl.uniform1f(temperatureLocationRef.current, state.temperature);
            gl.uniform1f(sharpenLocationRef.current, state.sharpen);
            gl.uniform1f(hueLocationRef.current, state.hue);


            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            gl.endFrameEXP();
        }
    }, [state]);

    const setDimensions = (event: LayoutChangeEvent) => {
        setLocalHeight(event.nativeEvent.layout.height);
        setLocalWidth(event.nativeEvent.layout.width);
    }

    useEffect(() => {
        const uriWidth = state.width || 1; // Ensure uriWidth is not 0 or undefined
        const uriHeight = state.height || 1; // Ensure uriHeight is not 0 or undefined

        const heightPercentage = (uriHeight * 100) / uriWidth;

        setWebGLViewPixelHeight((localWidth * heightPercentage) / 100);

        console.log('WebGLViewPixelHeight', WebGLViewPixelHeight);

    }, [state.width, state.height]);



    return (
        <View style={styles.container} ref={GLWrapperViewRef} onLayout={(e) => setDimensions(e)}>

            <GLView style={[styles.glView, {width: '100%', height: WebGLViewPixelHeight}]}
                    onContextCreate={onContextCreate}/>

            <Button
                icon={"content-save"}
                mode={"contained-tonal"}
                testID={"detail"}
                onPress={handleSave}
                style={{margin: 20}}
            >
                Save
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: '60%'
    },
    glView: {
        marginTop: 20,
        objectFit: 'contain'
    },
});

export default MyGLComponent;
