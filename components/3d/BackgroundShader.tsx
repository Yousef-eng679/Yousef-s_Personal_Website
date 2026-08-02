'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    const webgl = gl as WebGLRenderingContext;

    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `;

    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }
      
      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution;
        vec3 color1 = vec3(0.024, 0.016, 0.035); 
        vec3 color2 = vec3(0.055, 0.039, 0.090);  
        vec3 color3 = vec3(0.016, 0.012, 0.024);  
        
        float n = noise(st * 2.0 + u_time * 0.08);
        float wave = sin(st.x * 4.0 + u_time * 0.8) * cos(st.y * 2.5 + u_time * 0.4) * 0.5 + 0.5;
        
        vec3 finalColor = mix(color1, color2, wave * 0.6);
        finalColor = mix(finalColor, color3, n * 0.25);
        
        float grain = noise(st * u_time) * 0.03;
        
        gl_FragColor = vec4(finalColor + grain, 1.0);
      }
    `;

    const loadShader = (type: number, source: string) => {
      const shader = webgl.createShader(type);
      if (!shader) return null;
      webgl.shaderSource(shader, source);
      webgl.compileShader(shader);
      if (!webgl.getShaderParameter(shader, webgl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + webgl.getShaderInfoLog(shader));
        webgl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = loadShader(webgl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(webgl.FRAGMENT_SHADER, fsSource);

    if (!vertexShader || !fragmentShader) return;

    const shaderProgram = webgl.createProgram();
    if (!shaderProgram) return;

    webgl.attachShader(shaderProgram, vertexShader);
    webgl.attachShader(shaderProgram, fragmentShader);
    webgl.linkProgram(shaderProgram);

    if (!webgl.getProgramParameter(shaderProgram, webgl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program: ' + webgl.getProgramInfoLog(shaderProgram));
      return;
    }

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: webgl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      },
      uniformLocations: {
        resolution: webgl.getUniformLocation(shaderProgram, 'u_resolution'),
        time: webgl.getUniformLocation(shaderProgram, 'u_time'),
      },
    };

    const positionBuffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1.0,  1.0,
       1.0,  1.0,
      -1.0, -1.0,
       1.0, -1.0,
    ];
    webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(positions), webgl.STATIC_DRAW);

    let animationFrameId: number;
    const startTime = Date.now();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      webgl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const render = () => {
      webgl.clearColor(0.02, 0.015, 0.03, 1.0);
      webgl.clear(webgl.COLOR_BUFFER_BIT);

      webgl.useProgram(programInfo.program);

      webgl.bindBuffer(webgl.ARRAY_BUFFER, positionBuffer);
      webgl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, webgl.FLOAT, false, 0, 0);
      webgl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

      webgl.uniform2f(programInfo.uniformLocations.resolution, canvas.width, canvas.height);
      webgl.uniform1f(programInfo.uniformLocations.time, (Date.now() - startTime) * 0.001);

      webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />;
}
