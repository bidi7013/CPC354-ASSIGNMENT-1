"use strict";

var canvas;
var gl;

// --- Shader Uniform Locations ---
var modelViewMatrixLoc, projectionMatrixLoc;
var colorLoc, lightDirLoc;

// --- Data Buffers ---
var pointsArray = [];
var normalsArray = [];
var numVertices = 0;
var vBuffer, nBuffer; 

// --- Animation State Variables ---
var animationState = 0; 
var currentAngle = 0;
var currentScale = 1.0;
var idleTime = 0;
var isAnimating = true; 

// --- UI Parameters ---
var param = {
    color: vec4(1.0, 0.8, 0.0, 1.0), // Gold
    depth: 0.5,
    speed: 1.5
};

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    // Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    
    // --- BACKGROUND COLOR SETTING ---
    // Set to Opaque Black
    gl.clearColor(0.0, 0.0, 0.0, 1.0); 
    
    gl.enable(gl.DEPTH_TEST);

    // Initialize Shaders
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    generateLogoGeometry();

    // --- Initialize Buffers ---
    nBuffer = gl.createBuffer(); 
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);

    var aNormal = gl.getAttribLocation(program, "aNormal");
    gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aNormal);

    vBuffer = gl.createBuffer(); 
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    modelViewMatrixLoc = gl.getUniformLocation(program, "uModelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(program, "uProjectionMatrix");
    colorLoc = gl.getUniformLocation(program, "uColor");
    lightDirLoc = gl.getUniformLocation(program, "uLightDirection");

    setupUI();
    
    window.onresize = function() {
        gl.viewport(0, 0, canvas.width, canvas.height);
    };

    render();
};

function setupUI() {
    document.getElementById("colorPicker").oninput = function(event) {
        var hex = event.target.value;
        var r = parseInt(hex.substr(1,2), 16) / 255;
        var g = parseInt(hex.substr(3,2), 16) / 255;
        var b = parseInt(hex.substr(5,2), 16) / 255;
        param.color = vec4(r, g, b, 1.0);
    };

    document.getElementById("depthSlider").oninput = function(event) {
        param.depth = parseFloat(event.target.value);
        generateLogoGeometry(); 
        
        gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);
    };

    document.getElementById("speedSlider").oninput = function(event) {
        param.speed = parseFloat(event.target.value);
    };

    document.getElementById("resetBtn").onclick = function() {
        animationState = 0;
        currentAngle = 0;
        currentScale = 1.0;
        idleTime = 0;
        isAnimating = true; 
        document.getElementById("toggleBtn").innerText = "Stop";
        document.getElementById("toggleBtn").style.backgroundColor = "#dc3545"; 
    };

    document.getElementById("toggleBtn").onclick = function() {
        isAnimating = !isAnimating;
        var btn = document.getElementById("toggleBtn");
        if(isAnimating) {
            btn.innerText = "Stop";
            btn.style.backgroundColor = "#dc3545"; 
        } else {
            btn.innerText = "Resume";
            btn.style.backgroundColor = "#28a745"; 
        }
    };
}

function generateLogoGeometry() {
    pointsArray = [];
    normalsArray = [];

    var d = param.depth * 0.2; 

    function addBar(w, h, depth, tx, ty, rotDeg) {
        var hw = w/2, hh = h/2, hd = depth/2;
        var ang = radians(rotDeg);
        var c = Math.cos(ang);
        var s = Math.sin(ang);

        var localVerts = [
            vec3(-hw, -hh,  hd), vec3(-hw, hh,  hd), vec3(hw, hh,  hd), vec3(hw, -hh,  hd), 
            vec3(-hw, -hh, -hd), vec3(-hw, hh, -hd), vec3(hw, hh, -hd), vec3(hw, -hh, -hd) 
        ];

        var transVerts = [];
        for(var i=0; i<8; i++) {
            var vx = localVerts[i][0];
            var vy = localVerts[i][1];
            var rx = vx * c - vy * s;
            var ry = vx * s + vy * c;
            transVerts.push(vec4(rx + tx, ry + ty, localVerts[i][2], 1.0));
        }

        function pushFace(a, b, c, idx, normalDir) {
            var nx = normalDir[0] * c - normalDir[1] * s;
            var ny = normalDir[0] * s + normalDir[1] * c;
            var rotNormal = vec3(nx, ny, normalDir[2]);

            pointsArray.push(transVerts[a]); normalsArray.push(rotNormal);
            pointsArray.push(transVerts[b]); normalsArray.push(rotNormal);
            pointsArray.push(transVerts[c]); normalsArray.push(rotNormal);
            pointsArray.push(transVerts[a]); normalsArray.push(rotNormal);
            pointsArray.push(transVerts[c]); normalsArray.push(rotNormal);
            pointsArray.push(transVerts[idx]); normalsArray.push(rotNormal);
        }

        pushFace(1, 0, 3, 2, vec3(0,0,1)); 
        pushFace(2, 3, 7, 6, vec3(1,0,0)); 
        pushFace(3, 0, 4, 7, vec3(0,-1,0)); 
        pushFace(6, 5, 1, 2, vec3(0,1,0)); 
        pushFace(4, 5, 6, 7, vec3(0,0,-1)); 
        pushFace(5, 4, 0, 1, vec3(-1,0,0)); 
    }

    // T
    addBar(0.6, 0.15, d, -0.7, 0.35, 0); 
    addBar(0.15, 0.7, d, -0.7, -0.05, 0); 

    // V
    addBar(0.15, 0.95, d, -0.16, 0.05, 20); 
    addBar(0.15, 0.95, d,  0.16, 0.05, -20);

    // X
    addBar(0.15, 1.0, d, 0.7, 0.0, -30); 
    addBar(0.15, 1.0, d, 0.7, 0.0, 30);  
    
    numVertices = pointsArray.length;
}

function updateAnimationState() {
    if (!isAnimating) return;

    var step = 2.0 * param.speed; 
    var statusEl = document.getElementById("statusText");

    switch(animationState) {
        case 0: 
            statusEl.innerText = "Phase 1: Rotating Right (180)";
            currentAngle += step;
            if (currentAngle >= 180) {
                currentAngle = 180;
                animationState = 1;
            }
            break;
        case 1: 
            statusEl.innerText = "Phase 2: Returning to Center";
            currentAngle -= step;
            if (currentAngle <= 0) {
                currentAngle = 0;
                animationState = 2;
            }
            break;
        case 2: 
            statusEl.innerText = "Phase 3: Rotating Left (180)";
            currentAngle -= step;
            if (currentAngle <= -180) {
                currentAngle = -180;
                animationState = 3;
            }
            break;
        case 3: 
            statusEl.innerText = "Phase 4: Returning to Center";
            currentAngle += step;
            if (currentAngle >= 0) {
                currentAngle = 0;
                animationState = 4;
            }
            break;
        case 4: 
            statusEl.innerText = "Phase 5: Scaling Up";
            currentScale += 0.01 * param.speed;
            if (currentScale >= 2.0) {
                currentScale = 2.0;
                animationState = 5;
            }
            break;
        case 5: 
            statusEl.innerText = "Phase 6: Idle Movement Loop";
            idleTime += 0.02 * param.speed;
            currentAngle = Math.sin(idleTime) * 15; 
            break;
    }
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    updateAnimationState();

    var fieldOfView = 45;
    var aspect = canvas.width / canvas.height;
    var projectionMatrix = perspective(fieldOfView, aspect, 0.1, 100.0);

    var eye = vec3(0.0, 0.0, 4.0);
    var at = vec3(0.0, 0.0, 0.0);
    var up = vec3(0.0, 1.0, 0.0);
    var modelViewMatrix = lookAt(eye, at, up);

    modelViewMatrix = mult(modelViewMatrix, scale(currentScale, currentScale, currentScale));
    modelViewMatrix = mult(modelViewMatrix, rotateY(currentAngle));
    
    if(animationState === 5) {
        var hover = Math.sin(idleTime * 2) * 0.1;
        modelViewMatrix = mult(modelViewMatrix, translate(0, hover, 0));
    }

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    gl.uniform4fv(colorLoc, flatten(param.color));
    
    var lightDir = vec3(0.5, 0.5, 1.0); 
    gl.uniform3fv(lightDirLoc, flatten(lightDir));

    gl.drawArrays(gl.TRIANGLES, 0, numVertices);

    requestAnimationFrame(render);
}