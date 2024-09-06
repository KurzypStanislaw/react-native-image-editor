import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { GLView } from 'expo-gl';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import EditingContext from '../../context/EditingContext';
import BottomMenu from '../../components/menu/BottomMenu';
import ColorTab from '../../components/colorTab/ColorTab';
import CropTab from '../../components/cropTab/CropTab';
import LightTab from '../../components/lightTab/LightTab';
import { EditingScreenProps } from '../../types/types';
import {createConditionalWrapper} from "../../utils/CreateConditionalWrapper";
import Temperature from "../../utils/opengl-image-filters-lib/filters/Temperature";
import {isUndefinedOrNull} from "../../utils/isUndefinedOrNull";
import GLImage from "../../components/GLImage";

const EditingScreen: React.FC<EditingScreenProps> = ({ route }) => {
    const { uri } = route.params;
    const [isColorSelected, setIsColorSelected] = useState(false);
    const [isLightSelected, setIsLightSelected] = useState(false);
    const [isCropSelected, setIsCropSelected] = useState(false);

    // function isPowerOf2(value: number) {
    //     return (value & (value - 1)) === 0;
    // }
    //
    //
    // async function loadImageAndCreateProgram(gl: WebGLRenderingContext, imageUri: string) {
    //     const response = await fetch(uri);
    //     const blob = await response.blob();
    //     const imageBitmap = await createImageBitmap(blob);
    //
    //     console.log(imageBitmap);
    //
    //     const level = 0;
    //     const internalFormat = gl.RGBA;
    //     const srcFormat = gl.RGBA;
    //     const srcType = gl.UNSIGNED_BYTE;
    //
    //     // Create texture and bind it
    //     const texture = gl.createTexture();
    //     gl.bindTexture(gl.TEXTURE_2D, texture);
    //
    //     // Upload the image to the texture
    //     // texImage2D(target, level, internalformat, format, type, pixels)
    //     gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageBitmap);
    //
    //     // Set texture parameters
    //     if (isPowerOf2(imageBitmap.width) && isPowerOf2(imageBitmap.height)) {
    //         gl.generateMipmap(gl.TEXTURE_2D);
    //     } else {
    //         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    //         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    //         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    //     }
    //
    //     // Create vertex shader
    //     const vertShader = gl.createShader(gl.VERTEX_SHADER);
    //     gl.shaderSource(
    //         vertShader,
    //         `
    //   attribute vec2 position;
    //   varying vec2 texCoord;
    //   void main() {
    //     texCoord = position * 0.5 + 0.5;
    //     gl_Position = vec4(position, 0.0, 1.0);
    //   }
    // `
    //     );
    //     gl.compileShader(vertShader);
    //
    //     // Create fragment shader to display texture
    //     const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    //     gl.shaderSource(
    //         fragShader,
    //         `
    //   precision mediump float;
    //   varying vec2 texCoord;
    //   uniform sampler2D texture;
    //   void main() {
    //     gl_FragColor = texture2D(texture, texCoord);
    //   }
    // `
    //     );
    //     gl.compileShader(fragShader);
    //
    //     // Link shaders into a program
    //     const program = gl.createProgram();
    //     gl.attachShader(program, vertShader);
    //     gl.attachShader(program, fragShader);
    //     gl.linkProgram(program);
    //     gl.useProgram(program);
    //
    //     // Create buffer and load vertex data (rectangle to cover full view)
    //     const positionBuffer = gl.createBuffer();
    //     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    //     gl.bufferData(
    //         gl.ARRAY_BUFFER,
    //         new Float32Array([
    //             -1, -1,
    //             1, -1,
    //             -1, 1,
    //             1, 1,
    //         ]),
    //         gl.STATIC_DRAW
    //     );
    //
    //     const positionLocation = gl.getAttribLocation(program, 'position');
    //     gl.enableVertexAttribArray(positionLocation);
    //     gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    //
    //     // Bind the texture to the fragment shader
    //     gl.activeTexture(gl.TEXTURE0);
    //     gl.bindTexture(gl.TEXTURE_2D, texture);
    //     const textureLocation = gl.getUniformLocation(program, 'texture');
    //     gl.uniform1i(textureLocation, 0);
    //
    //     // Clear and draw the scene
    //     gl.clear(gl.COLOR_BUFFER_BIT);
    //     gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    //
    //     // Finish rendering
    //     gl.flush();
    //     gl.endFrameEXP();
    // }
    //
    // function onContextCreate(gl: WebGLRenderingContext) {
    //     // Viewport setup
    //     gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    //     gl.clearColor(0, 0, 0, 1);
    //     gl.clear(gl.COLOR_BUFFER_BIT);
    //
    //     // Load and draw the image
    //     loadImageAndCreateProgram(gl, uri);
    // }
    //
    // const TemperatureConditional = createConditionalWrapper({
    //     FilterComponent: Temperature,
    //     condition: isUndefinedOrNull(6500),
    //     factor: 6500,
    // });

    return (
        <>
            <View style={styles.container}>
                {/*<GLView style={{ width: 300, height: 300 }} onContextCreate={onContextCreate} />*/}
                <GLImage/>
            </View>




            {isColorSelected && <ColorTab />}
            {isCropSelected && <CropTab />}
            {isLightSelected && <LightTab />}

            <BottomMenu
                isColorSelected={isColorSelected}
                setIsColorSelected={setIsColorSelected}
                isLightSelected={isLightSelected}
                setIsLightSelected={setIsLightSelected}
                isCropSelected={isCropSelected}
                setIsCropSelected={setIsCropSelected}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: '3%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#2b3347',
        width: '100%',
        height: '70%',
    },
});

export default EditingScreen;
