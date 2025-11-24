"use strict";

var canvas;
var gl;
var program;

// Data Buffers
var points = [];
var colors = [];

// Animation State Variables
// 0:Right, 1:Center, 2:Left, 3:Center, 4:Scale, 5:Idle
var animState = 0; 
var theta = 0.0;
var scaleFactor = 1.0;

// UI Parameters
var speed = 1.0;
var extrusionDepth = 1.0;
var userColor = vec4(1.0, 0.0, 0.0, 1.0); // Default Red

// Shader Uniform Locations
var modelViewMatrixLoc, projectionMatrixLoc;
var userColorLoc;

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext('webgl2');
    if (!gl) { alert("WebGL 2.0 isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    gl.enable(gl.DEPTH_TEST);

    // 1. Generate Geometry: Create a generic Cube
    // We will stretch this cube to make letter parts
    colorCube();

    // 2. Load Shaders
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // 3. Create Buffers
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    // 4. Get Uniform Locations
    modelViewMatrixLoc = gl.getUniformLocation(program, "uModelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(program, "uProjectionMatrix");
    userColorLoc = gl.getUniformLocation(program, "uUserColor");

    // 5. Setup Event Listeners (UI)
    document.getElementById("speedSlider").onchange = function(e) { speed = parseFloat(e.target.value); };
    document.getElementById("depthSlider").onchange = function(e) { extrusionDepth = parseFloat(e.target.value); };
    document.getElementById("colorR").oninput = function(e) { userColor[0] = parseFloat(e.target.value); };
    document.getElementById("colorG").oninput = function(e) { userColor[1] = parseFloat(e.target.value); };
    
    document.getElementById("resetBtn").onclick = function() {
        animState = 0;
        theta = 0;
        scaleFactor = 1.0;
    };

    render();
}

// --- Geometry Helper: Create a Unit Cube ---
function colorCube() {
    quad(1, 0, 3, 2); // front
    quad(2, 3, 7, 6); // right
    quad(3, 0, 4, 7); // bottom
    quad(6, 5, 1, 2); // top
    quad(4, 5, 6, 7); // back
    quad(5, 4, 0, 1); // left
}

function quad(a, b, c, d) {
    var vertices = [
        vec4(-0.5, -0.5,  0.5, 1.0),
        vec4(-0.5,  0.5,  0.5, 1.0),
        vec4( 0.5,  0.5,  0.5, 1.0),
        vec4( 0.5, -0.5,  0.5, 1.0),
        vec4(-0.5, -0.5, -0.5, 1.0),
        vec4(-0.5,  0.5, -0.5, 1.0),
        vec4( 0.5,  0.5, -0.5, 1.0),
        vec4( 0.5, -0.5, -0.5, 1.0)
    ];
    // Define simple shading colors for the faces to see depth
    var vertexColors = [
        vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0),
        vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0),
        vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0),
        vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0)
    ];
    var indices = [a, b, c, a, c, d];
    for (var i = 0; i < indices.length; ++i) {
        points.push(vertices[indices[i]]);
        colors.push(vertexColors[a]); // Use face color
    }
}

// --- The Animation Sequence State Machine ---
function updateState() {
    var step = 2.0 * speed;
    switch(animState) {
        case 0: // Rotate Right to 180
            theta += step;
            if (theta >= 180) { theta = 180; animState = 1; }
            break;
        case 1: // Return to Center
            theta -= step;
            if (theta <= 0) { theta = 0; animState = 2; }
            break;
        case 2: // Rotate Left to -180
            theta -= step;
            if (theta <= -180) { theta = -180; animState = 3; }
            break;
        case 3: // Return to Center
            theta += step;
            if (theta >= 0) { theta = 0; animState = 4; }
            break;
        case 4: // Scale Up
            scaleFactor += 0.01 * speed;
            if (scaleFactor >= 2.0) animState = 5;
            break;
        case 5: // Move about (Wobble loop)
            theta = 15 * Math.sin(Date.now() * 0.002 * speed);
            break;
    }
}

// --- Drawing Function (Block Construction) ---
function drawBlock(mv, x, y, width, height) {
    // Save the current matrix
    var instance = mult(mv, translate(x, y, 0.0)); 
    // Scale the unit cube to the desired width/height/thickness
    instance = mult(instance, scale(width, height, extrusionDepth)); 
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instance));
    gl.drawArrays(gl.TRIANGLES, 0, 36);
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // 1. Calculate Transforms
    updateState();

    var projection = perspective(45, canvas.width/canvas.height, 0.1, 100);
    var eye = vec3(0, 0, 8); // Camera position
    var at = vec3(0, 0, 0);
    var up = vec3(0, 1, 0);
    var mv = lookAt(eye, at, up);

    // Apply Global Animation (Rotation & Scale)
    mv = mult(mv, rotateY(theta));
    mv = mult(mv, scale(scaleFactor, scaleFactor, scaleFactor));

    // Send Matrices and Color to Shader
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projection));
    gl.uniform4fv(userColorLoc, flatten(userColor));

    // 2. Draw "H"
    // Left leg
    drawBlock(mv, -1.5, 0, 0.5, 2.0);
    // Right leg
    drawBlock(mv, -0.5, 0, 0.5, 2.0);
    // Cross bar
    drawBlock(mv, -1.0, 0, 0.5, 0.5);

    // 3. Draw "I"
    drawBlock(mv, 1.0, 0, 0.5, 2.0);

    requestAnimationFrame(render);
}