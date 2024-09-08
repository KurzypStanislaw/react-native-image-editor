import React, { useContext, useEffect, useRef } from 'react';
import {ExpoWebGLRenderingContext, GLView} from 'expo-gl';
import * as MediaLibrary from 'expo-media-library';
import { Asset } from 'expo-asset';
import { StyleSheet, View } from 'react-native';
import EditingContext from "../context/EditingContext";
import {Button} from "react-native-paper";

const MyGLComponent = () => {
    const { state } = useContext(EditingContext);
    const glRef  = useRef(null);
    const textureRef = useRef(null);
    const brightnessLocationRef = useRef(null);

    const vertexShaderSource = `
        attribute vec4 position;
        attribute vec2 texcoord;
        varying vec2 v_texcoord;
        void main() {
            gl_Position = position;
            v_texcoord = texcoord;
        }
    `;

    const fragmentShaderSource = `
        precision mediump float;
        varying vec2 v_texcoord;
        uniform sampler2D texture;
        uniform float brightness; 
        
        void main() {
            vec4 color = texture2D(texture, v_texcoord);
            gl_FragColor = vec4(color.rgb * brightness, color.a); 
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
        if( gl !== null ) {
            glRef.current = gl;
        }

        // Downloading asset (localURI required)
        const asset = Asset.fromModule(require('../../assets/test_img.jpg'));
        await asset.downloadAsync();

        // Shaders compiling
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        // Building WebGL program from context and shaders
        const program = linkProgram(gl, vertexShader, fragmentShader);
        gl.useProgram(program);

        // Setting WebGl context position ??
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = new Float32Array([
            -1, -1,
            1, -1,
            -1,  1,
            1,  1,
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

        // Creating texture, due to the image dimensions not being powers of 2 there are some additional setting required
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, { localUri: asset.localUri });
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        textureRef.current = texture;

        // Creating reference to brightness uniform
        brightnessLocationRef.current = gl.getUniformLocation(program, 'brightness');


        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        // Exporting frame to render
        gl.endFrameEXP();
    };

    const handlePress = async () => {
        try {
            // Request media library permission
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need media library permissions to save images!');
                return;
            }

            // Take snapshot
            const snapshot = await GLView.takeSnapshotAsync(glRef.current);

            // Save the snapshot to the image library
            const asset = await MediaLibrary.createAssetAsync(snapshot.uri);
            console.log('Image saved to gallery!', asset);
        } catch (error) {
            console.error('Error saving image:', error);
        }
    };

    useEffect(() => {
        // changing brightness uniform without rerendering whole GLView
        if (glRef.current && brightnessLocationRef.current && textureRef.current) {
            const gl: ExpoWebGLRenderingContext = glRef.current;
            gl.useProgram(gl.getParameter(gl.CURRENT_PROGRAM));

            gl.uniform1f(brightnessLocationRef.current, state.brightness);

            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            gl.endFrameEXP();
        }
    }, [state.brightness]);

    return (
        <View style={styles.container}>
            <GLView style={styles.glView} onContextCreate={onContextCreate} />
            <Button onPress={handlePress}>Save</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    glView: {
        width: 300,
        height: 400,
        marginTop: 20,
    },
});

export default MyGLComponent;
