
// frame buffer will automatically clamp colors to [0.0, 1.0] as long as it's not some HDR format

        const fragmentShaderSource = `
        precision mediump float;
        varying vec2 v_texcoord;
        uniform sampler2D texture;
        uniform float brightness; 
        uniform float exposure; 
        uniform float contrast; 
        uniform float saturation; 
        uniform float temperature;
        uniform float sharpen;
        uniform vec2 resolution;
        uniform float grain;
        uniform float hue;
        
        
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
            vec3 rgb = color.rgb * pow(2.0, value);
            return vec4(rgb, color.a);
        }
        
        vec4 applyBrightness(vec4 color, float value) {
            // Update only rgb values
            vec3 rgb = color.rgb + value;
            return vec4(rgb, color.a);
        }
        
        vec3 kelvinToRGBShift(float kelvinsTemp) {
            float k = kelvinsTemp / 6500.0; // Normalize around 6500K
            vec3 rgbShift;
            
            if (k < 1.0) {
                // Below 6500K (warmer)
                float ratio = 1.0 - k;
                rgbShift = vec3(1.0 + 0.2 * ratio, 1.0 - 0.1 * ratio, 1.0 - 0.2 * ratio);
            } else if (k == 1.0) {
                rgbShift = vec3(1.0, 1.0, 1.0);
            } else {
                // Above 6500K (cooler)
                float ratio = k - 1.0;
                rgbShift = vec3(1.0 - 0.2 * ratio, 1.0 - 0.1 * ratio, 1.0 + 0.2 * ratio);
            }
        
            return rgbShift;
        }
        
        vec4 applyTemperature(vec4 color, float value) {
            vec3 rgbShift = kelvinToRGBShift(value);
            return vec4(color.rgb * rgbShift, color.a);
        }
        
        vec4 applySharpening(sampler2D texture, float sharpen, vec2 v_texcoord, vec2 resolution) {
            vec2 texelSize = 1.0 / resolution;
        
            vec2 offset[9];
            offset[0] = vec2(-1.0, 1.0) * texelSize;
            offset[1] = vec2(0.0, 1.0) * texelSize;
            offset[2] = vec2(1.0, 1.0) * texelSize;
            offset[3] = vec2(-1.0, 0.0) * texelSize;
            offset[4] = vec2(0.0, 0.0) * texelSize;  // central pixel
            offset[5] = vec2(1.0, 0.0) * texelSize;
            offset[6] = vec2(-1.0, -1.0) * texelSize;
            offset[7] = vec2(0.0, -1.0) * texelSize;
            offset[8] = vec2(1.0, -1.0) * texelSize;
        
            float kernel[9];
            kernel[0] = 0.0; kernel[1] = -1.0; kernel[2] = 0.0;
            kernel[3] = -1.0; kernel[4] = 5.0; kernel[5] = -1.0;
            kernel[6] = 0.0; kernel[7] = -1.0; kernel[8] = 0.0;
        
            vec3 resultColor = vec3(0.0);
            
            for (int i = 0; i < 9; i++) {
                resultColor += texture2D(texture, v_texcoord + offset[i]).rgb * kernel[i];
            }
        
            vec3 originalColor = texture2D(texture, v_texcoord).rgb;
        
            resultColor = mix(originalColor, resultColor, sharpen);
        
            return vec4(resultColor, 1.0);
        }
        
        vec3 rgb2hsb(vec3 c) {
            vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
            vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
            vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
            float d = q.x - min(q.w, q.y);
            float e = 1.0e-10;
            return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
        }

        vec3 hsb2rgb(vec3 c){
            vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
            vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
            return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }
        
        vec4 applyHue(vec4 color, float value) {
            vec3 hsb = rgb2hsb(color.xyz);
            hsb[0] += (value * 0.5);
            hsb[0] = mod(hsb[0], 1.0);
            vec4 outColor = vec4(hsb2rgb(hsb), 1.0);
            return outColor;
        }
        
        void main() {
            vec4 color = texture2D(texture, v_texcoord);    // accessing specific (v_texcoord) pixel
            color = applySharpening(texture, sharpen, v_texcoord, resolution);
            color = applySaturation(color, saturation);
            color = applyContrast(color, contrast);
            color = applyExposure(color, exposure);
            color = applyBrightness(color, brightness);
            color = applyTemperature(color, temperature);
            color = applyHue(color, hue);
            
            gl_FragColor = color; 
        }

    `;

export default fragmentShaderSource;