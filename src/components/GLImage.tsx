import React, { useEffect, useState } from 'react';
import { GLView } from 'expo-gl';
import { Asset } from 'expo-asset';
import { StyleSheet, View, Image, Text } from 'react-native';

const MyGLComponent = () => {

    // Shader source code (vertex and fragment shaders)
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
        uniform float brightness; // Uniform variable for brightness
        
        void main() {
            vec4 color = texture2D(texture, v_texcoord);
            gl_FragColor = vec4(color.rgb * brightness, color.a); // Adjust brightness
        }
    `;

    // Helper function to compile a shader
    const compileShader = (gl, type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile failed with:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    };

    // Helper function to link shaders into a program
    const linkProgram = (gl, vertexShader, fragmentShader) => {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link failed with:', gl.getProgramInfoLog(program));
            return null;
        }
        return program;
    };

    // OpenGL rendering setup in GLView
    const onContextCreate = async (gl) => {
        // Load and download the image asset
        const asset = Asset.fromModule(require('../../assets/test_img.jpg'));
        await asset.downloadAsync();

        // Compile shaders
        const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        const program = linkProgram(gl, vertexShader, fragmentShader);
        gl.useProgram(program);

        // Set up the position buffer
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = new Float32Array([
            -1, -1,  // bottom-left
            1, -1,  // bottom-right
            -1,  1,  // top-left
            1,  1,  // top-right
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        // Set up the position attribute
        const positionAttributeLocation = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        // Set up the texture coordinate buffer
        const texcoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
        const texcoords = new Float32Array([
            0, 0,  // bottom-left
            1, 0,  // bottom-right
            0, 1,  // top-left
            1, 1,  // top-right
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, texcoords, gl.STATIC_DRAW);

        // Set up the texture coordinate attribute
        const texcoordAttributeLocation = gl.getAttribLocation(program, 'texcoord');
        gl.enableVertexAttribArray(texcoordAttributeLocation);
        gl.vertexAttribPointer(texcoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        // Create and bind the texture
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        // Load the image as a texture
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            { localUri: asset.localUri }
        );

        // Set texture parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        // Get location of the brightness uniform
        const brightnessLocation = gl.getUniformLocation(program, 'brightness');

        // Set the brightness value (e.g., 1.5 for 50% brighter)
        gl.uniform1f(brightnessLocation, 1.5);

        // Clear and draw the texture to the GLView
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        // End the frame
        gl.endFrameEXP();
    };

    return (
        <View style={styles.container}>
            <GLView style={styles.glView} onContextCreate={onContextCreate} />
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
