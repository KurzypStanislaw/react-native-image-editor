
// frame buffer will automatically clamp colors to [0.0, 1.0] as long as it's not some HDR format

const fragmentShaderSource = `
        precision mediump float;
        varying vec2 v_texcoord;
        uniform sampler2D texture;
        uniform float brightness; 
        uniform float exposure; 
        uniform float contrast; 
        uniform float saturation; 
        
        vec4 applyDesaturated(vec4 color) {
          // sRGB colorspace luminosity factor
          vec3 luma = vec3(0.2126, 0.7152, 0.0722);
          vec3 rgb = vec3(dot(color.rgb, luma));
          return vec4(rgb, color.a);
        }
        
        vec4 applySaturation(vec4 color, float value) {
          vec4 desaturated = applyDesaturated(color);
          return mix(desaturated, color, 1.0 + value);
        }
        
        vec4 applyContrast(vec4 color, float value) {
          // Update only rgb values
          vec3 rgb = 0.5 + (1.0 + value) * (color.rgb - 0.5);
          return vec4(rgb, color.a);
        }
        
        vec4 applyExposure(vec4 color, float value) {
          // Update only rgb values
          // vec3 rgb = (1.0 + color.rgb) * value;
          vec3 rgb = color.rgb * pow(2.0, value);
          return vec4(rgb, color.a);
        }
        
        vec4 applyBrightness(vec4 color, float value) {
          // Update only rgb values
          vec3 rgb = color.rgb + value;
          return vec4(rgb, color.a);
        }
        
        void main() {
            vec4 color = texture2D(texture, v_texcoord);
            color = applySaturation(color, saturation);
            color = applyContrast(color, contrast);
            color = applyExposure(color, exposure);
            color = applyBrightness(color, brightness);
            gl_FragColor = vec4(color.rgb, color.a); 
        }
    `;

export default fragmentShaderSource;