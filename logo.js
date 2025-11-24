"use strict";

var canvas;
var gl;

// Shader Uniform Locations
var modelViewMatrixLoc, projectionMatrixLoc;
var colorLoc, lightDirLoc;

// State Variables
var pointsArray = [];
var normalsArray = [];
var numVertices = 0;

// Animation State
var animationState = 0; // 0:RotRight, 1:Back, 2:RotLeft, 3:Back, 4:Scale, 5:Idle
var currentAngle = 0;
var currentScale = 1.0;
var idleTime = 0;

// User Interface Parameters
var param = {
    color: vec4(1.0, 0.0, 0.0, 1.0),
    depth: 0.5,
    speed: 1.5
};

// Geometry constants for the letter construction
const CUBE_SIZE = 0.2;

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    gl.enable(gl.DEPTH_TEST);

    // Initialize Shaders
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Generate the 3D Logo Geometry (The letters 'H' and 'I')
    generateLogoGeometry();

    // Create Buffers
    var nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);

    var aNormal = gl.getAttribLocation(program, "aNormal");
    gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aNormal);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    // Get Uniform Locations
    modelViewMatrixLoc = gl.getUniformLocation(program, "uModelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(program, "uProjectionMatrix");
    colorLoc = gl.getUniformLocation(program, "uColor");
    lightDirLoc = gl.getUniformLocation(program, "uLightDirection");

    // Setup UI Event Listeners
    setupUI();

    // Start Render Loop
    render();
};

function setupUI() {
    // Color Picker
    document.getElementById("colorPicker").oninput = function(event) {
        var hex = event.target.value;
        var r = parseInt(hex.substr(1,2), 16) / 255;
        var g = parseInt(hex.substr(3,2), 16) / 255;
        var b = parseInt(hex.substr(5,2), 16) / 255;
        param.color = vec4(r, g, b, 1.0);
    };

    // Depth Slider (Requires regenerating geometry)
    document.getElementById("depthSlider").oninput = function(event) {
        param.depth = parseFloat(event.target.value);
        generateLogoGeometry(); // Rebuild geometry with new depth
        // Re-bind vertex buffer
        gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW); 
    };

    // Speed Slider
    document.getElementById("speedSlider").oninput = function(event) {
        param.speed = parseFloat(event.target.value);
    };

    // Reset Button
    document.getElementById("resetBtn").onclick = function() {
        animationState = 0;
        currentAngle = 0;
        currentScale = 1.0;
        idleTime = 0;
    };
}

// -------------------------------------------------------------------------
// Geometry Generation
// -------------------------------------------------------------------------

function cube(width, height, depth, offsetX, offsetY) {
    // Define the 8 vertices of a cube based on dimensions
    var w = width/2, h = height/2, d = depth/2;
    var x = offsetX, y = offsetY;

    var vertices = [
        vec4(x-w, y-h,  d, 1.0), vec4(x-w, y+h,  d, 1.0), vec4(x+w, y+h,  d, 1.0), vec4(x+w, y-h,  d, 1.0), // Front
        vec4(x-w, y-h, -d, 1.0), vec4(x-w, y+h, -d, 1.0), vec4(x+w, y+h, -d, 1.0), vec4(x+w, y-h, -d, 1.0)  // Back
    ];

    // Helper to create a quad (two triangles) and normals
    function quad(a, b, c, d) {
        var t1 = subtract(vertices[b], vertices[a]);
        var t2 = subtract(vertices[c], vertices[b]);
        var normal = cross(t1, t2);
        normal = normalize(normal);

        pointsArray.push(vertices[a]); normalsArray.push(normal);
        pointsArray.push(vertices[b]); normalsArray.push(normal);
        pointsArray.push(vertices[c]); normalsArray.push(normal);
        pointsArray.push(vertices[a]); normalsArray.push(normal);
        pointsArray.push(vertices[c]); normalsArray.push(normal);
        pointsArray.push(vertices[d]); normalsArray.push(normal);
    }

    quad(1, 0, 3, 2); // Front
    quad(2, 3, 7, 6); // Right
    quad(3, 0, 4, 7); // Bottom
    quad(6, 5, 1, 2); // Top
    quad(4, 5, 6, 7); // Back
    quad(5, 4, 0, 1); // Left
}

function generateLogoGeometry() {
    pointsArray = [];
    normalsArray = [];

    var d = param.depth * 0.2; // Scale user depth factor
    var w = 0.2; // Width of bars

    // Constructing letter "H"
    cube(w, 1.0, d, -0.6, 0); // Left vertical
    cube(w, 1.0, d, -0.2, 0); // Right vertical
    cube(0.4, w, d, -0.4, 0); // Middle bar

    // Constructing letter "I"
    cube(w, 1.0, d, 0.4, 0);  // Vertical bar
    cube(0.5, w, d, 0.4, 0.4); // Top Serif
    cube(0.5, w, d, 0.4, -0.4); // Bottom Serif
    
    numVertices = pointsArray.length;
}

// -------------------------------------------------------------------------
// Animation & Render Logic
// -------------------------------------------------------------------------

function updateAnimationState() {
    var step = 2.0 * param.speed; // Rotation step size
    var statusEl = document.getElementById("statusText");

    switch(animationState) {
        case 0: // Rotate Right to 180
            statusEl.innerText = "Rotating Right...";
            currentAngle += step;
            if (currentAngle >= 180) {
                currentAngle = 180;
                animationState = 1;
            }
            break;
        case 1: // Rotate Back to 0
            statusEl.innerText = "Returning Center...";
            currentAngle -= step;
            if (currentAngle <= 0) {
                currentAngle = 0;
                animationState = 2;
            }
            break;
        case 2: // Rotate Left to -180
            statusEl.innerText = "Rotating Left...";
            currentAngle -= step;
            if (currentAngle <= -180) {
                currentAngle = -180;
                animationState = 3;
            }
            break;
        case 3: // Rotate Back to 0
            statusEl.innerText = "Returning Center...";
            currentAngle += step;
            if (currentAngle >= 0) {
                currentAngle = 0;
                animationState = 4;
            }
            break;
        case 4: // Scale Up
            statusEl.innerText = "Scaling Up...";
            currentScale += 0.01 * param.speed;
            if (currentScale >= 2.0) { // Target scale
                currentScale = 2.0;
                animationState = 5;
            }
            break;
        case 5: // Idle Loop
            statusEl.innerText = "Idle (Floating)";
            idleTime += 0.02 * param.speed;
            // Complex movement: bobbing up/down + slow rotation
            currentAngle = Math.sin(idleTime) * 15; // Gentle rock
            break;
    }
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Update Logic
    updateAnimationState();

    // 1. Setup Projection Matrix (Perspective)
    var fieldOfView = 45;
    var aspect = canvas.width / canvas.height;
    var projectionMatrix = perspective(fieldOfView, aspect, 0.1, 100.0);

    // 2. Setup ModelView Matrix
    // Move camera back to see the object
    var eye = vec3(0.0, 0.0, 4.0);
    var at = vec3(0.0, 0.0, 0.0);
    var up = vec3(0.0, 1.0, 0.0);
    
    var modelViewMatrix = lookAt(eye, at, up);

    // 3. Apply Transformations based on Animation State
    
    // Scale transformation (happens in phase 4)
    modelViewMatrix = mult(modelViewMatrix, scale(currentScale, currentScale, currentScale));

    // Rotation transformation (happens in phases 0-3 and idle)
    modelViewMatrix = mult(modelViewMatrix, rotateY(currentAngle));
    
    // If in idle state, add a translation for "hovering" effect
    if(animationState === 5) {
        var hover = Math.sin(idleTime * 2) * 0.1;
        modelViewMatrix = mult(modelViewMatrix, translate(0, hover, 0));
    }

    // 4. Send Uniforms to GPU
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    gl.uniform4fv(colorLoc, flatten(param.color));
    
    // Light coming from the front-right-up
    var lightDir = vec3(0.5, 0.5, 1.0); 
    gl.uniform3fv(lightDirLoc, flatten(lightDir));

    // 5. Draw
    gl.drawArrays(gl.TRIANGLES, 0, numVertices);

    requestAnimationFrame(render);
}