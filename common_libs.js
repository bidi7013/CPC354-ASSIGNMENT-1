// flatten.js

function flatten( v )
{

    if(!Array.isArray(v)) return v;


    if(typeof(v[0])=='number'){
      var floats = new Float32Array( v.length );

      for(var i = 0; i<v.length; i++)
          floats[i] = v[i];

      return floats;
    }

    var floats = new Float32Array( v.length*v[0].length  );

    for(var i = 0; i<v.length; i++) for(var j=0; j<v[0].length; j++) {
      floats[i*v[0].length+j] = v[i][j];

    }

    return floats;
}

//initshaders.js

                                             //
//  initShaders.js
//

function initShaders( gl, vertexShaderId, fragmentShaderId )
{
    var vertShdr;
    var fragShdr;

    var vertElem = document.getElementById( vertexShaderId );
    if ( !vertElem ) {
        alert( "Unable to load vertex shader " + vertexShaderId );
        return -1;
    }
    else {
        vertShdr = gl.createShader( gl.VERTEX_SHADER );
        gl.shaderSource( vertShdr, vertElem.textContent.replace(/^\s+|\s+$/g, '' ));
        gl.compileShader( vertShdr );
        if ( !gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS) ) {
            var msg = "Vertex shader '"
                + vertexShaderId
                + "' failed to compile.  The error log is:\n\n"
        	    + gl.getShaderInfoLog( vertShdr );
            alert( msg );
            return -1;
        }
    }

    var fragElem = document.getElementById( fragmentShaderId );
    if ( !fragElem ) {
        alert( "Unable to load vertex shader " + fragmentShaderId );
        return -1;
    }
    else {
        fragShdr = gl.createShader( gl.FRAGMENT_SHADER );
        gl.shaderSource( fragShdr, fragElem.textContent.replace(/^\s+|\s+$/g, '' ) );
        gl.compileShader( fragShdr );
        if ( !gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS) ) {
            var msg = "Fragment shader '"
                + fragmentShaderId
                + "' failed to compile.  The error log is:\n\n"
        	    + gl.getShaderInfoLog( fragShdr );
            alert( msg );
            return -1;
        }
    }

    var program = gl.createProgram();
    gl.attachShader( program, vertShdr );
    gl.attachShader( program, fragShdr );
    gl.linkProgram( program );

    if ( !gl.getProgramParameter(program, gl.LINK_STATUS) ) {
        var msg = "Shader program failed to link.  The error log is:\n\n"
            + gl.getProgramInfoLog( program );
        alert( msg );
        return -1;
    }

    return program;
}


//initshaders2.js


    // Get a file as a string using  AJAX
    function loadFileAJAX(name) {
        var xhr = new XMLHttpRequest(),
        okStatus = document.location.protocol === "file:" ? 0 : 200;
        xhr.open('GET', name, false);
        xhr.send(null);
        return xhr.status == okStatus ? xhr.responseText : null;
    };


    function initShaders(gl, vShaderName, fShaderName) {
        function getShader(gl, shaderName, type) {
            var shader = gl.createShader(type),
                shaderScript = loadFileAJAX(shaderName);
            if (!shaderScript) {
                alert("Could not find shader source: "+shaderName);
            }
            gl.shaderSource(shader, shaderScript);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                alert(gl.getShaderInfoLog(shader));
                return null;
            }
            return shader;
        }
        var vertexShader = getShader(gl, vShaderName, gl.VERTEX_SHADER),
            fragmentShader = getShader(gl, fShaderName, gl.FRAGMENT_SHADER),
            program = gl.createProgram();

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
            return null;
        }


        return program;
    };


//initshaders3.js

                                             //
//  initShaders.js
//

function initShaders( gl, vertexShaderId, fragmentShaderId )
{
    var vertShdr;
    var fragShdr;

    var vertElem = document.getElementById( vertexShaderId );
    if ( !vertElem ) {
        alert( "Unable to load vertex shader " + vertexShaderId );
        return -1;
    }
    else {
        vertShdr = gl.createShader( gl.VERTEX_SHADER );
        vertElem.textContent = "#version 300 es" + vertElem.textContent;
        gl.shaderSource( vertShdr, vertElem.textContent.replace(/^\s+|\s+$/g, '' ));
        gl.compileShader( vertShdr );
        if ( !gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS) ) {
            var msg = "Vertex shader failed to compile.  The error log is:"
        	+ "<pre>" + gl.getShaderInfoLog( vertShdr ) + "</pre>";
            alert( msg );
            return -1;
        }
    }

    var fragElem = document.getElementById( fragmentShaderId );
    if ( !fragElem ) {
        alert( "Unable to load vertex shader " + fragmentShaderId );
        return -1;
    }
    else {
        fragShdr = gl.createShader( gl.FRAGMENT_SHADER );
        fragElem.textContent = "#version 300 es" + fragElem.textContent;
        gl.shaderSource( fragShdr, fragElem.textContent.replace(/^\s+|\s+$/g, '' ) );
        gl.compileShader( fragShdr );
        if ( !gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS) ) {
            var msg = "Fragment shader failed to compile.  The error log is:"
        	+ "<pre>" + gl.getShaderInfoLog( fragShdr ) + "</pre>";
            alert( msg );
            return -1;
        }
    }

    var program = gl.createProgram();
    gl.attachShader( program, vertShdr );
    gl.attachShader( program, fragShdr );
    gl.linkProgram( program );

    if ( !gl.getProgramParameter(program, gl.LINK_STATUS) ) {
        var msg = "Shader program failed to link.  The error log is:"
            + "<pre>" + gl.getProgramInfoLog( program ) + "</pre>";
        alert( msg );
        return -1;
    }

    return program;
}


//initshadersES6.js

                                             //
//  initShaders.js
//

function initShaders( gl, vertexShaderId, fragmentShaderId )
{
    let vertShdr;
    let fragShdr;

    let vertElem = document.getElementById( vertexShaderId );
    if ( !vertElem ) {
        alert( "Unable to load vertex shader " + vertexShaderId );
        return -1;
    }
    else {
        vertShdr = gl.createShader( gl.VERTEX_SHADER );
        gl.shaderSource( vertShdr, vertElem.textContent.replace(/^\s+|\s+$/g, '' ));
        gl.compileShader( vertShdr );
        if ( !gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS) ) {
            let msg = "Vertex shader '"
                + vertexShaderId
                + "' failed to compile.  The error log is:\n\n"
        	    + gl.getShaderInfoLog( vertShdr );
            alert( msg );
            return -1;
        }
    }

    let fragElem = document.getElementById( fragmentShaderId );
    if ( !fragElem ) {
        alert( "Unable to load vertex shader " + fragmentShaderId );
        return -1;
    }
    else {
        fragShdr = gl.createShader( gl.FRAGMENT_SHADER );
        gl.shaderSource( fragShdr, fragElem.textContent.replace(/^\s+|\s+$/g, '' ) );
        gl.compileShader( fragShdr );
        if ( !gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS) ) {
            let msg = "Fragment shader '"
                + fragmentShaderId
                + "' failed to compile.  The error log is:\n\n"
        	    + gl.getShaderInfoLog( fragShdr );
            alert( msg );
            return -1;
        }
    }

    let program = gl.createProgram();
    gl.attachShader( program, vertShdr );
    gl.attachShader( program, fragShdr );
    gl.linkProgram( program );

    if ( !gl.getProgramParameter(program, gl.LINK_STATUS) ) {
        let msg = "Shader program failed to link.  The error log is:\n\n"
            + gl.getProgramInfoLog( program );
        alert( msg );
        return -1;
    }

    return program;
}


//MV.js

//////////////////////////////////////////////////////////////////////////////
//
//  MV.js
//
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------

//
// Helper Functions
//
function MVbuffer(size) {
  var b = {};
  b.buf = new Float32Array(size);
  b.index = 0;
  b.push = function(x) {
    for(var i=0; i<x.length; i++) {
      b.buf[b.index+i] = x[i];
    }
    b.index += x.length;
    b.type = '';
  }
  return b;
}

function isVector(v) {
  if(v.type == "vec2" || v.type == "vec3" || v.type == "vec4") return true;
  return false;
}

function isMatrix(v) {
  if(v.type == "mat2" || v.type == "mat3" || v.type == "mat4") return true;
  return false;
}

function radians( degrees ) {
    return degrees * Math.PI / 180.0;
}

//----------------------------------------------------------------------------


function patch() {
  var out = new Array(4);
  for(var i = 0; i< 4; i++) out[i] = new Array(4);
  out.type = "patch";
  return out;
}

function curve() {
  var out = new Array(4);
  out.type = "curve";
  return out;
}
//
//  Vector Constructors
//

function vec2()
{
    var out = new Array(2);
    out.type = 'vec2';

    switch ( arguments.length ) {
      case 0:
        out[0] = 0.0;
        out[1] = 0.0;
        break;
      case 1:
        if(isVector(arguments[0] && (arguments[0].type != 'vec2'))) {
        out[0] = arguments[0][0];
        out[1] = arguments[0][1];
      }
        break;

      case 2:
        out[0] = arguments[0];
        out[1] = arguments[1];
        break;
    }
    return out;
}

function vec3()
{
//var result = _argumentsToArray( arguments );

    var out = new Array(3);
    out.type = 'vec3';

    switch ( arguments.length ) {
    case 0:
      out[0] = 0.0;
      out[1] = 0.0;
      out[2] = 0.0;
      return out;
    case 1:
    if(isVector(arguments[0]) && (arguments[0].type == "vec3")) {
      out[0] = arguments[0][0];
      out[1] = arguments[0][1];
      out[2] = arguments[0][2];
      return out;
    }
    case 3:
      out[0] = arguments[0];
      out[1] = arguments[1];
      out[2] = arguments[2];
      return out;
      default:
        throw "vec3: wrong arguments";
    }

    return out;
}

function vec4()
{
    var out = new Array(4);
    out.type = 'vec4';
    switch ( arguments.length ) {

      case 0:

        out[0] = 0.0;
        out[1] = 0.0;
        out[2] = 0.0;
        out[3] = 0.0;
        return out;

      case 1:
        if(isVector(arguments[0])) {
          if(arguments[0].type == "vec4") {
            out[0] = arguments[0][0];
            out[1] = arguments[0][1];
            out[2] = arguments[0][2];
            out[3] = arguments[0][3];
            return out;
          }
        }
          else if(arguments[0].type == "vec3") {
            out[0] = arguments[0][0];
            out[1] = arguments[0][1];
            out[2] = arguments[0][2];
            out[3] = 1.0;
            return out;
          }
          else {
            out[0] = arguments[0][0];
            out[1] = arguments[0][1];
            out[2] = arguments[0][2];
            out[3] = arguments[0][3];
            return out;
          }



      case 2:
        if(typeof(arguments[0])=='number'&&arguments[1].type == 'vec3') {
          out[0] = arguments[0];
          out[1] = arguments[1][0];
          out[2] = arguments[1][1];
          out[3] = arguments[1][2];
          return out;
      }
      return out;

      case 4:

      if(isVector(arguments[0])) {
        out[0] = arguments[0][0];
        out[1] = arguments[0][1];
        out[2] = arguments[0][2];
        out[3] = arguments[0][3];
        return out;
      }
        out[0] = arguments[0];
        out[1] = arguments[1];
        out[2] = arguments[2];
        out[3] = arguments[3];
        return out;
      case 3:
        out[0] = arguments[0][0];
        out[1] = arguments[0][1];
        out[2] = arguments[0][2];
        out[3] = 1.0;
        return out;
      default:
        throw "vec4: wrong arguments";
  }
}

//----------------------------------------------------------------------------
//
//  Matrix Constructors
//

function mat2()
{
    var out = new Array(2);
    out[0] = new Array(2);
    out[1] = new Array(2);

    switch ( arguments.length ) {
    case 0:
        out[0][0]=out[3]=1.0;
        out[1]=out[2]=0.0;
        break;
    case 1:
      if(arguments[0].type == 'mat2') {
        out[0][0] = arguments[0][0][0];
        out[0][1] = arguments[0][0][1];
        out[1][0] = arguments[0][1][0];
        out[1][1] = arguments[0][1][1];
        break;
      }

    case 4:
        out[0][0] = arguments[0];
        out[0][1] = arguments[1];
        out[1][0] = arguments[2];
        out[1][1] = arguments[3];
        break;
     default:
         throw "mat2: wrong arguments";
    }
    out.type = 'mat2';

    return out;
}

//----------------------------------------------------------------------------

function mat3()
{
    // v = _argumentsToArray( arguments );

    var out = new Array(3);
    out[0] = new Array(3);
    out[1] = new Array(3);
    out[2] = new Array(3);

    switch ( arguments.length ) {
      case 0:
          out[0][0]=out[1][1]=out[2][2]=1.0;
          out[0][1]=out[0][2]=out[1][0]=out[1][2]=out[2][0]=out[2][1]=0.0;
          break;
    case 1:
         for(var i=0; i<3; i++) for(var j=0; j<3; j++) {
           out[i][j]=arguments[0][3*i+j];
         }
        break;

    case 9:
        for(var i=0; i<3; i++) for(var j=0; j<3; j++) {
          out[i][j] = arguments[3*i+j];
        }
        break;
    default:
        throw "mat3: wrong arguments";
    }
    out.type = 'mat3';

    return out;
}

//----------------------------------------------------------------------------

function mat4()
{
    //var v = _argumentsToArray( arguments );

    var out = new Array(4);
    out[0] = new Array(4);
    out[1] = new Array(4);
    out[2] = new Array(4);
    out[3] = new Array(4);

    switch ( arguments.length ) {
    case 0:
      out[0][0]=out[1][1]=out[2][2]=out[3][3] = 1.0;
      out[0][1]=out[0][2]=out[0][3]=out[1][0]=out[1][2]=out[1][3]=out[2][0]=out[2][1]
        =out[2][3]=out[3][0]=out[3][1]=out[3][2]=0.0;

      break;

    case 1:
      for(var i=0; i<4; i++) for(var j=0; j<4; j++) {
        out[i][j]=arguments[0][4*i+j];
      }
      break;

    case 4:
      if(arguments[0].type == "vec4") {
      for( var i=0; i<4; i++)
        for(var j=0; j<4; j++)
          out[i][j] = arguments[i][j];
       break;
      }

    case 16:
      for(var i=0; i<4; i++) for(var j=0; j<4; j++) {
        out[i][j] = arguments[4*i+j];
      }
      break;
    }
    out.type = 'mat4';

    return out;
}

//----------------------------------------------------------------------------
//
//  Generic Mathematical Operations for Vectors and Matrices
//

function equal( u, v )
{
    if(!(isMatrix(u)&&isMatrix(v) || (isVector(u)&&isVector(v))))
      throw "equal: at least one input not a vec or mat";
    if ( u.type != v.type ) throw "equal: types different";
    if(isMatrix(u)) {
        for ( var i = 0; i < u.length; ++i ) for ( var j = 0; j < u.length; ++j )
            if ( u[i][j] !== v[i][j] )  return false;
        return true;
    }
    if(isVector(u)) {
        for ( var i = 0; i < u.length; ++i )
            if ( u[i] !== v[i] )  return false;
          return true;
        }
}



//----------------------------------------------------------------------------

function add( u, v )
{

  if ( u.type != v.type ) {
      throw "add(): trying to add different types";
  }
  if(isVector(u)){
    var result = new Array(u.length);
    result.type = u.type;
    for(var i=0; i<u.length; i++) {
      result[i] = u[i] + v[i];
      }
      return result;
    }
  if(isMatrix(u)){
    if(u.type == 'mat2') var result = mat2();
    if(u.type == 'mat3') var result = mat3();
    if(u.type == 'mat4') var result = mat4();
    for(var i=0; i<u.length; i++) for(var j=0; j<u.length; j++){
       result[i][j] = u[i][j] + v[i][j];
      }
      return result;
    }
}

//----------------------------------------------------------------------------

function subtract( u, v )
{

  if ( u.type != v.type ) {
      throw "add(): trying to add different types";
  }
  if(isVector(u)){
    if(u.type == 'vec2')  var result =vec2();
    if(u.type == 'vec3')  var result = vec3();
    if(u.type == 'vec4')  var result = vec4();
    result.type = u.type;
    for(var i=0; i<u.length; i++) {
      result[i] = u[i] - v[i];
      }
      return result;
    }
  if(isMatrix(u)){
    if(u.type == 'mat2')  var result = mat2();
    if(u.type == 'mat3')  var result = mat3();
    if(u.type == 'mat4')  var result = mat4();
    for(var i=0; i<u.length; i++) for(var j=0; j<u.length; j++){
       result[i][j] = u[i][j] - v[i][j];
      }
      return result;
    }
}

//----------------------------------------------------------------------------

function mult( u, v )
{

  if(typeof(u)=="number" && (isMatrix(v)||isVector(v))) {

    if(isVector(v)){
      result = new Array(v.length);
      result.type = v.type;
      for(var i =0; i<v.length; i++) {
        result[i] = u*v[i];
      }
      return result;
    }
   if(v.type = 'mat2') result = mat2();
   if(v.type = 'mat3') result = mat3();
   if(v.type = 'mat4') result = mat4();
  }
  if(u.type=='mat2' && v.type == 'vec2') {
    var result = vec2();
    for(i=0;i<2;i++)  {
      result[i] = 0.0;
      for(var k=0;k<2;k++) result[i]+=u[i][k]*v[k];
    }
    return result;
  }
  if(u.type=='mat3'&& v.type=='vec3') {
    var result = vec3();
    for(i=0;i<3;i++)  {
      result[i] = 0.0;
      for(var k=0;k<3;k++) result[i]+=u[i][k]*v[k];
    }
    return result;
  }
  if(u.type=='mat4'&& v.type=='vec4')  {
    var result = vec4();
    for(i=0;i<4;i++)  {
      result[i] = 0.0;
      for(var k=0;k<4;k++) result[i]+=u[i][k]*v[k];
    }
    return result;
  }
 if (u.type=='mat2'&&v.type=='mat2'){
    result = mat2();
    for(i=0;i<2;i++) for(j=0;j<2;j++) {
      result[i][j] = 0.0;
      for(var k=0;k<2;k++) result[i][j]+=u[i][k]*v[k][j];
    }
    return result;
  }
 if (u.type=='mat3'&&v.type=='mat3'){
    result = mat3();
    for(i=0;i<3;i++) for(j=0;j<3;j++) {
      result[i][j] = 0.0;
      for(var k=0;k<3;k++) result[i][j]+=u[i][k]*v[k][j];
    }
    return result;
  }
  else if (u.type=='mat4'&&v.type=='mat4'){
    result = mat4();
    for(i=0;i<4;i++) for(j=0;j<4;j++) {
      result[i][j] = 0.0;
      for(var k=0;k<4;k++) result[i][j]+=u[i][k]*v[k][j];
    }

    return result;
  }
  if (u.type=='vec3'&&v.type=='vec3'){
    var result = vec3(u[0]*v[0], u[1]*v[1], u[2]*v[2]);
    return result;
  }
  if (u.type=='vec4'&&v.type=='vec4'){
    var result = vec4(u[0]*v[0], u[1]*v[1], u[2]*v[2], u[3]*v[3]);
    return result;
  }
    throw "mult(): trying to mult incompatible types";
}


//----------------------------------------------------------------------------
//
//  Basic Transformation Matrix Generators
//

function translate( x, y, z )
{
    if(arguments.length!=2 && arguments.length != 3) {
      throw "translate(): not a mat3 or mat4";
    }
    if(arguments.length == 2) {
      result = mat3();
      result[0][2] = x;
      result[1][2] = y;

      return result;
    }
      result = mat4();

      result[0][3] = x;
      result[1][3] = y;
      result[2][3] = z;

      return result;

}

//----------------------------------------------------------------------------

function rotate( angle, axis )
{
  if ( axis.length == 3 ) {
    axis = vec3(axis[0], axis[1], axis[2] );
  }
   if(arguments.length == 4) {
    axis = vec3(arguments[1], arguments[2], arguments[3]);
  }
    if(axis.type != 'vec3') throw "rotate: axis not a vec3";
    var v = normalize( axis );

    var x = v[0];
    var y = v[1];
    var z = v[2];

    var c = Math.cos( radians(angle) );
    var omc = 1.0 - c;
    var s = Math.sin( radians(angle) );

    var result = mat4(
        x*x*omc + c,   x*y*omc + z*s, x*z*omc - y*s, 0.0 ,
         x*y*omc - z*s, y*y*omc + c,   y*z*omc + x*s, 0.0 ,
         x*z*omc + y*s, y*z*omc - x*s, z*z*omc + c,   0.0 ,
        0.0, 0.0, 0.0, 1.0
    );
    return result;
}

function rotateX(theta) {
  var c = Math.cos( radians(theta) );
  var s = Math.sin( radians(theta) );
  var rx = mat4( 1.0,  0.0,  0.0, 0.0,
      0.0,  c,  -s, 0.0,
      0.0, s,  c, 0.0,
      0.0,  0.0,  0.0, 1.0 );
  return rx;
}
function rotateY(theta) {
  var c = Math.cos( radians(theta) );
  var s = Math.sin( radians(theta) );
  var ry = mat4( c, 0.0, s, 0.0,
      0.0, 1.0,  0.0, 0.0,
      -s, 0.0,  c, 0.0,
      0.0, 0.0,  0.0, 1.0 );
  return ry;
}
function rotateZ(theta) {
  var c = Math.cos( radians(theta) );
  var s = Math.sin( radians(theta) );
  var rz = mat4( c, -s, 0.0, 0.0,
      s,  c, 0.0, 0.0,
      0.0,  0.0, 1.0, 0.0,
      0.0,  0.0, 0.0, 1.0 );
  return rz;
}
//----------------------------------------------------------------------------


function scale( )
{
// legacy code
// should use mult

    if(arguments.length == 2 && isVector(arguments[1])) {
      result = new Array(arguments[1].length);
      result.type = arguments[1].type;
      for(var i=0; i<arguments[1].length; i++)
          result[i] = arguments[0]*arguments[1][i];
      return result;
    }
// end legacy code

    if(arguments.length == 3) {

    var result = mat4();
    result[0][0] = arguments[0];
    result[1][1] = arguments[1];
    result[2][2] = arguments[2];
    result[3][3] = 1.0;
    return result;
  }

  throw "scale: wrong arguments";

}


//----------------------------------------------------------------------------
//
//  ModelView Matrix Generators
//

function lookAt( eye, at, up )
{
    if ( eye.type != 'vec3') {
        throw "lookAt(): first parameter [eye] must be an a vec3";
    }

    if ( at.type != 'vec3') {
        throw "lookAt(): first parameter [at] must be an a vec3";
    }

    if (up.type != 'vec3') {
        throw "lookAt(): first parameter [up] must be an a vec3";
    }

    if ( equal(eye, at) ) {
        return mat4();
    }

    var v = normalize( subtract(at, eye) );  // view direction vector
    var n = normalize( cross(v, up) ); // perpendicular vector
    var u = normalize( cross(n, v) );        // "new" up vector
    v = negate( v );

    var result = mat4(
        n[0], n[1], n[2], -dot(n, eye),
        u[0], u[1], u[2], -dot(u, eye),
        v[0], v[1], v[2], -dot(v, eye),
        0.0,  0.0,  0.0,  1.0
    );

    return result;
}

//----------------------------------------------------------------------------
//
//  Projection Matrix Generators
//

function ortho( left, right, bottom, top, near, far )
{
    if ( left == right ) { throw "ortho(): left and right are equal"; }
    if ( bottom == top ) { throw "ortho(): bottom and top are equal"; }
    if ( near == far )   { throw "ortho(): near and far are equal"; }

    var w = right - left;
    var h = top - bottom;
    var d = far - near;

    var result = mat4();

    result[0][0] = 2.0 / w;
    result[1][1] = 2.0 / h;
    result[2][2] = -2.0 / d;

    result[0][3] = -(left + right) / w;
    result[1][3] = -(top + bottom) / h;
    result[2][3] = -(near + far) / d;
    result[3][3] = 1.0;

    return result;
}

//----------------------------------------------------------------------------

function perspective( fovy, aspect, near, far )
{
    var f = 1.0 / Math.tan( radians(fovy) / 2 );
    var d = far - near;

    var result = mat4();
    result[0][0] = f / aspect;
    result[1][1] = f;
    result[2][2] = -(near + far) / d;
    result[2][3] = -2 * near * far / d;
    result[3][2] = -1;
    result[3][3] = 0.0;

    return result;
}

//----------------------------------------------------------------------------
//
//  Matrix Functions
//

function transpose( m )
{
    if(m.type == 'patch') {
        var out = patch()
        for(var i=0; i<4; i++) out[i] = new Array(4);
        for(var i=0; i<4; i++)
          for(var j=0; j<4; j++) out[i][j] = m[j][i];
        return out;
    }

    switch(m.type) {
      case 'mat2':
        var result = mat2(m[0][0], m[1][0],
                          m[0][1], m[1][1]
                        );
        return result;
        break;

      case 'mat3':
        var result = mat3(m[0][0], m[1][0], m[2][0],
                        m[0][1], m[1][1], m[2][1],
                        m[0][2], m[1][2], m[2][2]
                      );
        return result;
        break;

      case 'mat4':

        var result = mat4(m[0][0], m[1][0], m[2][0], m[3][0],
                          m[0][1], m[1][1], m[2][1], m[3][1],
                          m[0][2], m[1][2], m[2][2], m[3][2],
                          m[0][3], m[1][3], m[2][3], m[3][3]
                        );

        return result;
        break;

      default: throw "transpose(): trying to transpose a non-matrix";
    }
}


//----------------------------------------------------------------------------
//
//  Vector Functions
//

function dot( u, v )
{

    if ( u.type != v.type ) {
      throw "dot(): types are not the same ";
    }
    if (u.type != 'vec2' && u.type != 'vec3' && u.type != 'vec4') {
      throw "dot(): not a vector ";
    }

    var sum = 0.0;
    for ( var i = 0; i < u.length; i++ ) {
        sum += u[i] * v[i];
    }
    return sum;
}

//----------------------------------------------------------------------------

function negate( u )
{
  if (u.type != 'vec2' && u.type != 'vec3' && u.type != 'vec4') {
    throw "negate(): not a vector ";
  }
  var result = new Array(u.length);
  result.type = u.type;
  for ( var i = 0; i < u.length; ++i ) {
    result[i] = -u[i];
  }
    return result;
}

//----------------------------------------------------------------------------

function cross( u, v )
{
    if ( u.type == 'vec3' && v.type == 'vec3') {
      var result = vec3(
          u[1]*v[2] - u[2]*v[1],
          u[2]*v[0] - u[0]*v[2],
          u[0]*v[1] - u[1]*v[0]
      );
      return result;
    }

    if ( v.type == 'vec4' && v.type == 'vec4') {
      var result = vec3(
          u[1]*v[2] - u[2]*v[1],
          u[2]*v[0] - u[0]*v[2],
          u[0]*v[1] - u[1]*v[0]
      );
      return result;
    }

    throw "cross: types aren't matched vec3 or vec4";
}

//----------------------------------------------------------------------------

function length( u )
{
    return Math.sqrt( dot(u, u) );
}

//----------------------------------------------------------------------------

function normalize( u, excludeLastComponent )
{
    if(u.type != 'vec3' && u.type != 'vec4') {

      throw "normalize: not a vector type";
    }
    switch(u.type) {
      case 'vec2':
        var len = Math.sqrt(u[0]*u[0]+u[1]*u[1]);
        var result = vec2(u[0]/len, u[1]/len);
        return result;
      break;
      case 'vec3':
        if(excludeLastComponent) {
          var len = Math.sqrt(u[0]*u[0]+u[1]*u[1]);
          var result = vec3(u[0]/len, u[1]/len, u[2]);
          return result;
          break;
        }
        else {
        var len = Math.sqrt(u[0]*u[0]+u[1]*u[1]+u[2]*u[2]);
        var result = vec3(u[0]/len, u[1]/len, u[2]/len);
        return result;
        break;
      }
      case 'vec4':
      if(excludeLastComponent) {
        var len = Math.sqrt(u[0]*u[0]+u[1]*u[1]+u[2]*u[2]);
        var result = vec4(u[0]/len, u[1]/len, u[2]/len, u[3]);
        return result;
        break;
      }
      else {
        var len = Math.sqrt(u[0]*u[0]+u[1]*u[1]+u[2]*u[2]+u[3]*u[3]);
        var result = vec4(u[0]/len, u[1]/len, u[2]/len, u[3]/len);
        return result;
        break;
      }
    }
}

//----------------------------------------------------------------------------

function mix( u, v, s )
{
    if ( typeof(s) !== "number" ) {
        throw "mix: the last paramter " + s + " must be a number";
    }
    if(typeof(u)=='number'&&typeof(v)=='number') {
      return (1.0-s)*u + s*v;
    }

    if ( u.length != v.length ) {

        throw "vector dimension mismatch";
    }

    var result = new Array(u.length);
    for ( var i = 0; i < u.length; ++i ) {
        result[i] =  (1.0 - s) * u[i] + s * v[i] ;
    }
    result.type = u.type;
    return result;
}

//----------------------------------------------------------------------------
//
// Vector and Matrix utility functions
//


function flatten( v )
{

    if(isVector(v)) {
      var floats = new Float32Array(v.length)
      for(var i =0; i<v.length; i++) floats[i] = v[i];
      return floats;
    }
    if(isMatrix(v)) {

        var floats = new Float32Array(v.length*v.length);
        for(var i =0; i<v.length; i++) for(j=0;j<v.length; j++) {
          floats[i*v.length+j] = v[j][i];
        }
        return floats;
      }

      var floats = new Float32Array( v.length*v[0].length  );

      for(var i = 0; i<v.length; i++) for(var j=0; j<v[0].length; j++) {
        floats[i*v[0].length+j] = v[i][j];
      }
      return floats;
}

//
//----------------------------------------------------------------------------


function cut(a)
{
  return Math.round(a*1000)/1000;
}
function printm(m)
{
    switch(m.type) {
      case 'mat2':
        console.log(cut(m[0][0]), cut(m[0][1]));
        console.log(cut(m[1][0]), cut(m[1][1]));
       break;
      case 'mat3':
       console.log(cut(m[0][0]), cut(m[0][1]), cut(m[0][2]));
       console.log(cut(m[1][0]), cut(m[1][1]), cut(m[1][2]));
       console.log(cut(m[2][0]), cut(m[2][1]), cut(m[2][2]));
       break;
      case 'mat4':
        console.log(cut(m[0][0]), cut(m[0][1]), cut(m[0][2]), cut(m[0][3]));
        console.log(cut(m[1][0]), cut(m[1][1]), cut(m[1][2]), cut(m[1][3]));
        console.log(cut(m[2][0]), cut(m[2][1]), cut(m[2][2]), cut(m[2][3]));
        console.log(cut(m[3][0]), cut(m[3][1]), cut(m[3][2]), cut(m[3][3]));
        break;
      case 'patch':
        for(var i=0;i<4;i++)
          console.log(m[i][0], m[i][1], m[i][2], m[i][3]);
         break;
      default: throw "printm: not a matrix";
    }
}
// determinants

function det2(m)
{

     return m[0][0]*m[1][1]-m[0][1]*m[1][0];

}

function det3(m)
{
     var d = m[0][0]*m[1][1]*m[2][2]
           + m[0][1]*m[1][2]*m[2][0]
           + m[0][2]*m[2][1]*m[1][0]
           - m[2][0]*m[1][1]*m[0][2]
           - m[1][0]*m[0][1]*m[2][2]
           - m[0][0]*m[1][2]*m[2][1]
           ;
     return d;
}

function det4(m)
{
     var m0 = [
         vec3(m[1][1], m[1][2], m[1][3]),
         vec3(m[2][1], m[2][2], m[2][3]),
         vec3(m[3][1], m[3][2], m[3][3])
     ];
     var m1 = [
         vec3(m[1][0], m[1][2], m[1][3]),
         vec3(m[2][0], m[2][2], m[2][3]),
         vec3(m[3][0], m[3][2], m[3][3])
     ];
     var m2 = [
         vec3(m[1][0], m[1][1], m[1][3]),
         vec3(m[2][0], m[2][1], m[2][3]),
         vec3(m[3][0], m[3][1], m[3][3])
     ];
     var m3 = [
         vec3(m[1][0], m[1][1], m[1][2]),
         vec3(m[2][0], m[2][1], m[2][2]),
         vec3(m[3][0], m[3][1], m[3][2])
     ];
     return m[0][0]*det3(m0) - m[0][1]*det3(m1)
         + m[0][2]*det3(m2) - m[0][3]*det3(m3);

}

function det(m)
{
     if(!isMatrix(m)) throw("det: m not a matrix");
     if(m.length == 2) return det2(m);
     if(m.length == 3) return det3(m);
     if(m.length == 4) return det4(m);
}


//---------------------------------------------------------

// inverses

function inverse2(m)
{
     var a = mat2();
     var d = det2(m);
     a[0][0] = m[1][1]/d;
     a[0][1] = -m[0][1]/d;
     a[1][0] = -m[1][0]/d;
     a[1][1] = m[0][0]/d;
     return a;
}

function inverse3(m)
{
    var a = mat3();
    var d = det3(m);

    var a00 = [
       vec2(m[1][1], m[1][2]),
       vec2(m[2][1], m[2][2])
    ];
    var a01 = [
       vec2(m[1][0], m[1][2]),
       vec2(m[2][0], m[2][2])
    ];
    var a02 = [
       vec2(m[1][0], m[1][1]),
       vec2(m[2][0], m[2][1])
    ];
    var a10 = [
       vec2(m[0][1], m[0][2]),
       vec2(m[2][1], m[2][2])
    ];
    var a11 = [
       vec2(m[0][0], m[0][2]),
       vec2(m[2][0], m[2][2])
    ];
    var a12 = [
       vec2(m[0][0], m[0][1]),
       vec2(m[2][0], m[2][1])
    ];
    var a20 = [
       vec2(m[0][1], m[0][2]),
       vec2(m[1][1], m[1][2])
    ];
    var a21 = [
       vec2(m[0][0], m[0][2]),
       vec2(m[1][0], m[1][2])
    ];
    var a22 = [
       vec2(m[0][0], m[0][1]),
       vec2(m[1][0], m[1][1])
    ];

   a[0][0] = det2(a00)/d;
   a[0][1] = -det2(a10)/d;
   a[0][2] = det2(a20)/d;
   a[1][0] = -det2(a01)/d;
   a[1][1] = det2(a11)/d;
   a[1][2] = -det2(a21)/d;
   a[2][0] = det2(a02)/d;
   a[2][1] = -det2(a12)/d;
   a[2][2] = det2(a22)/d;

   return a;

}

function inverse4(m)
{
    var a = mat4();
    var d = det4(m);

    var a00 = [
       vec3(m[1][1], m[1][2], m[1][3]),
       vec3(m[2][1], m[2][2], m[2][3]),
       vec3(m[3][1], m[3][2], m[3][3])
    ];
    var a01 = [
       vec3(m[1][0], m[1][2], m[1][3]),
       vec3(m[2][0], m[2][2], m[2][3]),
       vec3(m[3][0], m[3][2], m[3][3])
    ];
    var a02 = [
       vec3(m[1][0], m[1][1], m[1][3]),
       vec3(m[2][0], m[2][1], m[2][3]),
       vec3(m[3][0], m[3][1], m[3][3])
    ];
    var a03 = [
       vec3(m[1][0], m[1][1], m[1][2]),
       vec3(m[2][0], m[2][1], m[2][2]),
       vec3(m[3][0], m[3][1], m[3][2])
    ];
    var a10 = [
       vec3(m[0][1], m[0][2], m[0][3]),
       vec3(m[2][1], m[2][2], m[2][3]),
       vec3(m[3][1], m[3][2], m[3][3])
    ];
    var a11 = [
       vec3(m[0][0], m[0][2], m[0][3]),
       vec3(m[2][0], m[2][2], m[2][3]),
       vec3(m[3][0], m[3][2], m[3][3])
    ];
    var a12 = [
       vec3(m[0][0], m[0][1], m[0][3]),
       vec3(m[2][0], m[2][1], m[2][3]),
       vec3(m[3][0], m[3][1], m[3][3])
    ];
    var a13 = [
       vec3(m[0][0], m[0][1], m[0][2]),
       vec3(m[2][0], m[2][1], m[2][2]),
       vec3(m[3][0], m[3][1], m[3][2])
    ];
    var a20 = [
       vec3(m[0][1], m[0][2], m[0][3]),
       vec3(m[1][1], m[1][2], m[1][3]),
       vec3(m[3][1], m[3][2], m[3][3])
    ];
    var a21 = [
       vec3(m[0][0], m[0][2], m[0][3]),
       vec3(m[1][0], m[1][2], m[1][3]),
       vec3(m[3][0], m[3][2], m[3][3])
    ];
    var a22 = [
       vec3(m[0][0], m[0][1], m[0][3]),
       vec3(m[1][0], m[1][1], m[1][3]),
       vec3(m[3][0], m[3][1], m[3][3])
    ];
    var a23 = [
       vec3(m[0][0], m[0][1], m[0][2]),
       vec3(m[1][0], m[1][1], m[1][2]),
       vec3(m[3][0], m[3][1], m[3][2])
    ];

    var a30 = [
       vec3(m[0][1], m[0][2], m[0][3]),
       vec3(m[1][1], m[1][2], m[1][3]),
       vec3(m[2][1], m[2][2], m[2][3])
    ];
    var a31 = [
       vec3(m[0][0], m[0][2], m[0][3]),
       vec3(m[1][0], m[1][2], m[1][3]),
       vec3(m[2][0], m[2][2], m[2][3])
    ];
    var a32 = [
       vec3(m[0][0], m[0][1], m[0][3]),
       vec3(m[1][0], m[1][1], m[1][3]),
       vec3(m[2][0], m[2][1], m[2][3])
    ];
    var a33 = [
       vec3(m[0][0], m[0][1], m[0][2]),
       vec3(m[1][0], m[1][1], m[1][2]),
       vec3(m[2][0], m[2][1], m[2][2])
    ];



   a[0][0] = det3(a00)/d;
   a[0][1] = -det3(a10)/d;
   a[0][2] = det3(a20)/d;
   a[0][3] = -det3(a30)/d;
   a[1][0] = -det3(a01)/d;
   a[1][1] = det3(a11)/d;
   a[1][2] = -det3(a21)/d;
   a[1][3] = det3(a31)/d;
   a[2][0] = det3(a02)/d;
   a[2][1] = -det3(a12)/d;
   a[2][2] = det3(a22)/d;
   a[2][3] = -det3(a32)/d;
   a[3][0] = -det3(a03)/d;
   a[3][1] = det3(a13)/d;
   a[3][2] = -det3(a23)/d;
   a[3][3] = det3(a33)/d;

   return a;
}
function inverse(m)
{
   if(!isMatrix(m)) throw("inverse: m not a matrix");
   if(m.length == 2) return inverse2(m);
   if(m.length == 3) return inverse3(m);
   if(m.length == 4) return inverse4(m);
}

//---------------------------------------------------------

// normal matrix


function normalMatrix(m, flag)
{
    if(m.type!='mat4') throw "normalMatrix: input not a mat4";
    var a = inverse(transpose(m));
    if(arguments.length == 1 &&flag == false) return a;

    var b = mat3();
    for(var i=0;i<3;i++) for(var j=0; j<3; j++) b[i][j] = a[i][j];

    return b;
}


//MVES6.js

//////////////////////////////////////////////////////////////////////////////
//
//  MV.js
//
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------

//
// Helper Functions
//
function MVbuffer(size) {
  let b = {};
  b.buf = new Float32Array(size);
  b.index = 0;
  b.push = function(x) {
    for(let i=0; i<x.length; i++) {
      b.buf[b.index+i] = x[i];
    }
    b.index += x.length;
    b.type = '';
  }
  return b;
}

function isVector(v) {
  if(v.type == "vec2" || v.type == "vec3" || v.type == "vec4") return true;
  return false;
}

function isMatrix(v) {
  if(v.type == "mat2" || v.type == "mat3" || v.type == "mat4") return true;
  return false;
}

function radians( degrees ) {
    return degrees * Math.PI / 180.0;
}

//----------------------------------------------------------------------------


function patch() {
  let out = new Array(4);
  for(let i = 0; i< 4; i++) out[i] = new Array(4);
  out.type = "patch";
  return out;
}

function curve() {
  let out = new Array(4);
  out.type = "curve";
  return out;
}
//
//  Vector Constructors
//

function vec2()
{
    let out = new Array(2);
    out.type = 'vec2';

    switch ( arguments.length ) {
      case 0:
        out[0] = 0.0;
        out[1] = 0.0;
        break;
      case 1:
        if(isVector(arguments[0] && (arguments[0].type != 'vec2'))) {
        out[0] = arguments[0][0];
        out[1] = arguments[0][1];
      }
        break;

      case 2:
        out[0] = arguments[0];
        out[1] = arguments[1];
        break;
    }
    return out;
}

function vec3()
{
//let result = _argumentsToArray( arguments );

    let out = new Array(3);
    out.type = 'vec3';

    switch ( arguments.length ) {
    case 0:
      out[0] = 0.0;
      out[1] = 0.0;
      out[2] = 0.0;
      return out;
    case 1:
    if(isVector(arguments[0]) && (arguments[0].type == "vec3")) {
      out[0] = arguments[0][0];
      out[1] = arguments[0][1];
      out[2] = arguments[0][2];
      return out;
    }
    case 3:
      out[0] = arguments[0];
      out[1] = arguments[1];
      out[2] = arguments[2];
      return out;
      default:
        throw "vec3: wrong arguments";
    }

    return out;
}

function vec4()
{
    let out = new Array(4);
    out.type = 'vec4';
    switch ( arguments.length ) {

      case 0:

        out[0] = 0.0;
        out[1] = 0.0;
        out[2] = 0.0;
        out[3] = 0.0;
        return out;

      case 1:
        if(isVector(arguments[0])) {
          if(arguments[0].type == "vec4") {
            out[0] = arguments[0][0];
            out[1] = arguments[0][1];
            out[2] = arguments[0][2];
            out[3] = arguments[0][3];
            return out;
          }
        }
          else if(arguments[0].type == "vec3") {
            out[0] = arguments[0][0];
            out[1] = arguments[0][1];
            out[2] = arguments[0][2];
            out[3] = 1.0;
            return out;
          }
          else {
            out[0] = arguments[0][0];
            out[1] = arguments[0][1];
            out[2] = arguments[0][2];
            out[3] = arguments[0][3];
            return out;
          }



      case 2:
        if(typeof(arguments[0])=='number'&&arguments[1].type == 'vec3') {
          out[0] = arguments[0];
          out[1] = arguments[1][0];
          out[2] = arguments[1][1];
          out[3] = arguments[1][2];
          return out;
      }
      return out;

      case 4:

      if(isVector(arguments[0])) {
        out[0] = arguments[0][0];
        out[1] = arguments[0][1];
        out[2] = arguments[0][2];
        out[3] = arguments[0][3];
        return out;
      }
        out[0] = arguments[0];
        out[1] = arguments[1];
        out[2] = arguments[2];
        out[3] = arguments[3];
        return out;
      case 3:
        out[0] = arguments[0][0];
        out[1] = arguments[0][1];
        out[2] = arguments[0][2];
        out[3] = 1.0;
        return out;
      default:
        throw "vec4: wrong arguments";
  }
}

//----------------------------------------------------------------------------
//
//  Matrix Constructors
//

function mat2()
{
    let out = new Array(2);
    out[0] = new Array(2);
    out[1] = new Array(2);

    switch ( arguments.length ) {
    case 0:
        out[0][0]=out[3]=1.0;
        out[1]=out[2]=0.0;
        break;
    case 1:
      if(arguments[0].type == 'mat2') {
        out[0][0] = arguments[0][0][0];
        out[0][1] = arguments[0][0][1];
        out[1][0] = arguments[0][1][0];
        out[1][1] = arguments[0][1][1];
        break;
      }

    case 4:
        out[0][0] = arguments[0];
        out[0][1] = arguments[1];
        out[1][0] = arguments[2];
        out[1][1] = arguments[3];
        break;
     default:
         throw "mat2: wrong arguments";
    }
    out.type = 'mat2';

    return out;
}

//----------------------------------------------------------------------------

function mat3()
{
    // v = _argumentsToArray( arguments );

    let out = new Array(3);
    out[0] = new Array(3);
    out[1] = new Array(3);
    out[2] = new Array(3);

    switch ( arguments.length ) {
      case 0:
          out[0][0]=out[1][1]=out[2][2]=1.0;
          out[0][1]=out[0][2]=out[1][0]=out[1][2]=out[2][0]=out[2][1]=0.0;
          break;
    case 1:
         for(let i=0; i<3; i++) for(let i=0; i<3; i++) {
           out[i][j]=arguments[0][3*i+j];
         }
        break;

    case 9:
        for(let i=0; i<3; i++) for(let j=0; j<3; j++) {
          out[i][j] = arguments[3*i+j];
        }
        break;
    default:
        throw "mat3: wrong arguments";
    }
    out.type = 'mat3';

    return out;
}

//----------------------------------------------------------------------------

function mat4()
{
    //let v = _argumentsToArray( arguments );

    let out = new Array(4);
    out[0] = new Array(4);
    out[1] = new Array(4);
    out[2] = new Array(4);
    out[3] = new Array(4);

    switch ( arguments.length ) {
    case 0:
      out[0][0]=out[1][1]=out[2][2]=out[3][3] = 1.0;
      out[0][1]=out[0][2]=out[0][3]=out[1][0]=out[1][2]=out[1][3]=out[2][0]=out[2][1]
        =out[2][3]=out[3][0]=out[3][1]=out[3][2]=0.0;

      break;

    case 1:
      for(let i=0; i<4; i++) for(let i=0; i<4; i++) {
        out[i][j]=arguments[0][4*i+j];
      }
      break;

    case 4:
      if(arguments[0].type == "vec4") {
      for( let i=0; i<4; i++)
        for(let j=0; j<4; j++)
          out[i][j] = arguments[i][j];
       break;
      }

    case 16:
      for(let i=0; i<4; i++) for(let j=0; j<4; j++) {
        out[i][j] = arguments[4*i+j];
      }
      break;
    }
    out.type = 'mat4';

    return out;
}

//----------------------------------------------------------------------------
//
//  Generic Mathematical Operations for Vectors and Matrices
//

function equal( u, v )
{
    if(!(isMatrix(u)&&isMatrix(v) || (isVector(u)&&isVector(v))))
      throw "equal: at least one input not a vec or mat";
    if ( u.type != v.type ) throw "equal: types different";
    if(isMatrix(u)) {
        for ( let i = 0; i < u.length; ++i ) for ( let j = 0; j < u.length; ++j )
            if ( u[i][j] !== v[i][j] )  return false;
        return true;
    }
    if(isVector(u)) {
        for ( let i = 0; i < u.length; ++i )
            if ( u[i] !== v[i] )  return false;
          return true;
        }
}



//----------------------------------------------------------------------------

function add( u, v )
{

  if ( u.type != v.type ) {
      throw "add(): trying to add different types";
  }
  if(isVector(u)){
    let result = new Array(u.length);
    result.type = u.type;
    for(let i=0; i<u.length; i++) {
      result[i] = u[i] + v[i];
      }
      return result;
    }
  if(isMatrix(u)){
    if(u.type == 'mat2')  result = mat2();
    if(u.type == 'mat3')  result = mat3();
    if(u.type == 'mat4')  result = mat4();
    for(let i=0; i<u.length; i++) for(let j=0; j<u.length; j++){
       result[i][j] = u[i][j] + v[i][j];
      }
      return result;
    }
}

//----------------------------------------------------------------------------

function subtract( u, v )
{

  if ( u.type != v.type ) {
      throw "add(): trying to add different types";
  }
  if(isVector(u)){
    if(u.type == 'vec2')   result =vec2();
    if(u.type == 'vec3')   result = vec3();
    if(u.type == 'vec4')   result = vec4();
    result.type = u.type;
    for(let i=0; i<u.length; i++) {
      result[i] = u[i] - v[i];
      }
      return result;
    }
  if(isMatrix(u)){
    if(u.type == 'mat2')   result = mat2();
    if(u.type == 'mat3')   result = mat3();
    if(u.type == 'mat4')   result = mat4();
    for(let i=0; i<u.length; i++) for(let j=0; j<u.length; j++){
       result[i][j] = u[i][j] - v[i][j];
      }
      return result;
    }
}

//----------------------------------------------------------------------------

function mult( u, v )
{

  if(typeof(u)=="number" && (isMatrix(v)||isVector(v))) {

    if(isVector(v)){
      result = new Array(v.length);
      result.type = v.type;
      for(let i =0; i<v.length; i++) {
        result[i] = u*v[i];
      }
      return result;
    }
   if(v.type = 'mat2') result = mat2();
   if(v.type = 'mat3') result = mat3();
   if(v.type = 'mat4') result = mat4();
  }
  if(u.type=='mat2' && v.type == 'vec2') {
    let result = vec2();
    for(i=0;i<2;i++)  {
      result[i] = 0.0;
      for(let k=0;k<2;k++) result[i]+=u[i][k]*v[k];
    }
    return result;
  }
  if(u.type=='mat3'&& v.type=='vec3') {
    let result = vec3();
    for(i=0;i<3;i++)  {
      result[i] = 0.0;
      for(let k=0;k<3;k++) result[i]+=u[i][k]*v[k];
    }
    return result;
  }
  if(u.type=='mat4'&& v.type=='vec4')  {
    let result = vec4();
    for(i=0;i<4;i++)  {
      result[i] = 0.0;
      for(let k=0;k<4;k++) result[i]+=u[i][k]*v[k];
    }
    return result;
  }
 if (u.type=='mat2'&&v.type=='mat2'){
    result = mat2();
    for(i=0;i<2;i++) for(j=0;j<2;j++) {
      result[i][j] = 0.0;
      for(let k=0;k<2;k++) result[i][j]+=u[i][k]*v[k][j];
    }
    return result;
  }
 if (u.type=='mat3'&&v.type=='mat3'){
    result = mat3();
    for(i=0;i<3;i++) for(j=0;j<3;j++) {
      result[i][j] = 0.0;
      for(let k=0;k<3;k++) result[i][j]+=u[i][k]*v[k][j];
    }
    return result;
  }
  else if (u.type=='mat4'&&v.type=='mat4'){
    result = mat4();
    for(i=0;i<4;i++) for(j=0;j<4;j++) {
      result[i][j] = 0.0;
      for(let k=0;k<4;k++) result[i][j]+=u[i][k]*v[k][j];
    }

    return result;
  }
  if (u.type=='vec3'&&v.type=='vec3'){
    let result = vec3(u[0]*v[0], u[1]*v[1], u[2]*v[2]);
    return result;
  }
  if (u.type=='vec4'&&v.type=='vec4'){
    let result = vec4(u[0]*v[0], u[1]*v[1], u[2]*v[2], u[3]*v[3]);
    return result;
  }
    throw "mult(): trying to mult incompatible types";
}


//----------------------------------------------------------------------------
//
//  Basic Transformation Matrix Generators
//

function translate( x, y, z )
{
    if(arguments.length!=2 && arguments.length != 3) {
      throw "translate(): not a mat3 or mat4";
    }
    if(arguments.length == 2) {
      result = mat3();
      result[0][2] = x;
      result[1][2] = y;

      return result;
    }
      result = mat4();

      result[0][3] = x;
      result[1][3] = y;
      result[2][3] = z;

      return result;

}

//----------------------------------------------------------------------------

function rotate( angle, axis )
{
  if ( axis.length == 3 ) {
    axis = vec3(axis[0], axis[1], axis[2] );
  }
   if(arguments.length == 4) {
    axis = vec3(arguments[1], arguments[2], arguments[3]);
  }
    if(axis.type != 'vec3') throw "rotate: axis not a vec3";
    let v = normalize( axis );

    let x = v[0];
    let y = v[1];
    let z = v[2];

    let c = Math.cos( radians(angle) );
    let omc = 1.0 - c;
    let s = Math.sin( radians(angle) );

    let result = mat4(
        x*x*omc + c,   x*y*omc + z*s, x*z*omc - y*s, 0.0 ,
         x*y*omc - z*s, y*y*omc + c,   y*z*omc + x*s, 0.0 ,
         x*z*omc + y*s, y*z*omc - x*s, z*z*omc + c,   0.0 ,
        0.0, 0.0, 0.0, 1.0
    );
    return result;
}

function rotateX(theta) {
  let c = Math.cos( radians(theta) );
  let s = Math.sin( radians(theta) );
  let rx = mat4( 1.0,  0.0,  0.0, 0.0,
      0.0,  c,  -s, 0.0,
      0.0, s,  c, 0.0,
      0.0,  0.0,  0.0, 1.0 );
  return rx;
}
function rotateY(theta) {
  let c = Math.cos( radians(theta) );
  let s = Math.sin( radians(theta) );
  let ry = mat4( c, 0.0, s, 0.0,
      0.0, 1.0,  0.0, 0.0,
      -s, 0.0,  c, 0.0,
      0.0, 0.0,  0.0, 1.0 );
  return ry;
}
function rotateZ(theta) {
  let c = Math.cos( radians(theta) );
  let s = Math.sin( radians(theta) );
  let rz = mat4( c, -s, 0.0, 0.0,
      s,  c, 0.0, 0.0,
      0.0,  0.0, 1.0, 0.0,
      0.0,  0.0, 0.0, 1.0 );
  return rz;
}
//----------------------------------------------------------------------------


function scale( )
{
// legacy code
// should use mult

    if(arguments.length == 2 && isVector(arguments[1])) {
      result = new Array(arguments[1].length);
      result.type = arguments[1].type;
      for(let i=0; i<arguments[1].length; i++)
          result[i] = arguments[0]*arguments[1][i];
      return result;
    }
// end legacy code

    if(arguments.length == 3) {

    let result = mat4();
    result[0][0] = arguments[0];
    result[1][1] = arguments[1];
    result[2][2] = arguments[2];
    result[3][3] = 1.0;
    return result;
  }

  throw "scale: wrong arguments";

}


//----------------------------------------------------------------------------
//
//  ModelView Matrix Generators
//

function lookAt( eye, at, up )
{
    if ( eye.type != 'vec3') {
        throw "lookAt(): first parameter [eye] must be an a vec3";
    }

    if ( at.type != 'vec3') {
        throw "lookAt(): first parameter [at] must be an a vec3";
    }

    if (up.type != 'vec3') {
        throw "lookAt(): first parameter [up] must be an a vec3";
    }

    if ( equal(eye, at) ) {
        return mat4();
    }

    let v = normalize( subtract(at, eye) );  // view direction vector
    let n = normalize( cross(v, up) ); // perpendicular vector
    let u = normalize( cross(n, v) );        // "new" up vector
    v = negate( v );

    let result = mat4(
        n[0], n[1], n[2], -dot(n, eye),
        u[0], u[1], u[2], -dot(u, eye),
        v[0], v[1], v[2], -dot(v, eye),
        0.0,  0.0,  0.0,  1.0
    );

    return result;
}

//----------------------------------------------------------------------------
//
//  Projection Matrix Generators
//

function ortho( left, right, bottom, top, near, far )
{
    if ( left == right ) { throw "ortho(): left and right are equal"; }
    if ( bottom == top ) { throw "ortho(): bottom and top are equal"; }
    if ( near == far )   { throw "ortho(): near and far are equal"; }

    let w = right - left;
    let h = top - bottom;
    let d = far - near;

    let result = mat4();

    result[0][0] = 2.0 / w;
    result[1][1] = 2.0 / h;
    result[2][2] = -2.0 / d;

    result[0][3] = -(left + right) / w;
    result[1][3] = -(top + bottom) / h;
    result[2][3] = -(near + far) / d;
    result[3][3] = 1.0;

    return result;
}

//----------------------------------------------------------------------------

function perspective( fovy, aspect, near, far )
{
    let f = 1.0 / Math.tan( radians(fovy) / 2 );
    let d = far - near;

    let result = mat4();
    result[0][0] = f / aspect;
    result[1][1] = f;
    result[2][2] = -(near + far) / d;
    result[2][3] = -2 * near * far / d;
    result[3][2] = -1;
    result[3][3] = 0.0;

    return result;
}

//----------------------------------------------------------------------------
//
//  Matrix Functions
//

function transpose( m )
{
    if(m.type == 'patch') {
        let out = patch()
        for(let i=0; i<4; i++) out[i] = new Array(4);
        for(let i=0; i<4; i++)
          for(let j=0; j<4; j++) out[i][j] = m[j][i];
        return out;
    }

    switch(m.type) {
      case 'mat2':
        let result = mat2(m[0][0], m[1][0],
                          m[0][1], m[1][1]
                        );
        return result;
        break;

      case 'mat3':
         result = mat3(m[0][0], m[1][0], m[2][0],
                        m[0][1], m[1][1], m[2][1],
                        m[0][2], m[1][2], m[2][2]
                      );
        return result;
        break;

      case 'mat4':

         result = mat4(m[0][0], m[1][0], m[2][0], m[3][0],
                          m[0][1], m[1][1], m[2][1], m[3][1],
                          m[0][2], m[1][2], m[2][2], m[3][2],
                          m[0][3], m[1][3], m[2][3], m[3][3]
                        );

        return result;
        break;

      default: throw "transpose(): trying to transpose a non-matrix";
    }
}


//----------------------------------------------------------------------------
//
//  Vector Functions
//

function dot( u, v )
{

    if ( u.type != v.type ) {
      throw "dot(): types are not the same ";
    }
    if (u.type != 'vec2' && u.type != 'vec3' && u.type != 'vec4') {
      throw "dot(): not a vector ";
    }

    let sum = 0.0;
    for ( let i = 0; i < u.length; i++ ) {
        sum += u[i] * v[i];
    }
    return sum;
}

//----------------------------------------------------------------------------

function negate( u )
{
  if (u.type != 'vec2' && u.type != 'vec3' && u.type != 'vec4') {
    throw "negate(): not a vector ";
  }
  let result = new Array(u.length);
  result.type = u.type;
  for ( let i = 0; i < u.length; ++i ) {
    result[i] = -u[i];
  }
    return result;
}

//----------------------------------------------------------------------------

function cross( u, v )
{
    if ( u.type == 'vec3' && v.type == 'vec3') {
      let result = vec3(
          u[1]*v[2] - u[2]*v[1],
          u[2]*v[0] - u[0]*v[2],
          u[0]*v[1] - u[1]*v[0]
      );
      return result;
    }

    if ( v.type == 'vec4' && v.type == 'vec4') {
      let result = vec3(
          u[1]*v[2] - u[2]*v[1],
          u[2]*v[0] - u[0]*v[2],
          u[0]*v[1] - u[1]*v[0]
      );
      return result;
    }

    throw "cross: types aren't matched vec3 or vec4";
}

//----------------------------------------------------------------------------

function length( u )
{
    return Math.sqrt( dot(u, u) );
}

//----------------------------------------------------------------------------

function normalize( u, excludeLastComponent )
{
    if(u.type != 'vec3' && u.type != 'vec4') {

      throw "normalize: not a vector type";
    }
    switch(u.type) {
      case 'vec2':
        let len = Math.sqrt(u[0]*u[0]+u[1]*u[1]);
        let result = vec2(u[0]/len, u[1]/len);
        return result;
      break;
      case 'vec3':
        if(excludeLastComponent) {
          let len = Math.sqrt(u[0]*u[0]+u[1]*u[1]);
          let result = vec3(u[0]/len, u[1]/len, u[2]);
          return result;
          break;
        }
        else {
        let len = Math.sqrt(u[0]*u[0]+u[1]*u[1]+u[2]*u[2]);
        let result = vec3(u[0]/len, u[1]/len, u[2]/len);
        return result;
        break;
      }
      case 'vec4':
      if(excludeLastComponent) {
        let len = Math.sqrt(u[0]*u[0]+u[1]*u[1]+u[2]*u[2]);
        let result = vec4(u[0]/len, u[1]/len, u[2]/len, u[3]);
        return result;
        break;
      }
      else {
        let len = Math.sqrt(u[0]*u[0]+u[1]*u[1]+u[2]*u[2]+u[3]*u[3]);
        let result = vec4(u[0]/len, u[1]/len, u[2]/len, u[3]/len);
        return result;
        break;
      }
    }
}

//----------------------------------------------------------------------------

function mix( u, v, s )
{
    if ( typeof(s) !== "number" ) {
        throw "mix: the last paramter " + s + " must be a number";
    }
    if(typeof(u)=='number'&&typeof(v)=='number') {
      return (1.0-s)*u + s*v;
    }

    if ( u.length != v.length ) {

        throw "vector dimension mismatch";
    }

    let result = new Array(u.length);
    for ( let i = 0; i < u.length; ++i ) {
        result[i] =  (1.0 - s) * u[i] + s * v[i] ;
    }
    result.type = u.type;
    return result;
}

//----------------------------------------------------------------------------
//
// Vector and Matrix utility functions
//


function flatten( v )
{

    if(isVector(v)) {
      let floats = new Float32Array(v.length)
      for(let i =0; i<v.length; i++) floats[i] = v[i];
      return floats;
    }
    if(isMatrix(v)) {

        let floats = new Float32Array(v.length*v.length);
        for(let i =0; i<v.length; i++) for(j=0;j<v.length; j++) {
          floats[i*v.length+j] = v[j][i];
        }
        return floats;
      }

      let floats = new Float32Array( v.length*v[0].length  );

      for(let i = 0; i<v.length; i++) for(let j=0; j<v[0].length; j++) {
        floats[i*v[0].length+j] = v[i][j];
      }
      return floats;
}

//
//----------------------------------------------------------------------------


function cut(a)
{
  return Math.round(a*1000)/1000;
}
function printm(m)
{
    switch(m.type) {
      case 'mat2':
        console.log(cut(m[0][0]), cut(m[0][1]));
        console.log(cut(m[1][0]), cut(m[1][1]));
       break;
      case 'mat3':
       console.log(cut(m[0][0]), cut(m[0][1]), cut(m[0][2]));
       console.log(cut(m[1][0]), cut(m[1][1]), cut(m[1][2]));
       console.log(cut(m[2][0]), cut(m[2][1]), cut(m[2][2]));
       break;
      case 'mat4':
        console.log(cut(m[0][0]), cut(m[0][1]), cut(m[0][2]), cut(m[0][3]));
        console.log(cut(m[1][0]), cut(m[1][1]), cut(m[1][2]), cut(m[1][3]));
        console.log(cut(m[2][0]), cut(m[2][1]), cut(m[2][2]), cut(m[2][3]));
        console.log(cut(m[3][0]), cut(m[3][1]), cut(m[3][2]), cut(m[3][3]));
        break;
      case 'patch':
        for(let i=0;i<4;i++)
          console.log(m[i][0], m[i][1], m[i][2], m[i][3]);
         break;
      default: throw "printm: not a matrix";
    }
}
// determinants

function det2(m)
{

     return m[0][0]*m[1][1]-m[0][1]*m[1][0];

}

function det3(m)
{
     let d = m[0][0]*m[1][1]*m[2][2]
           + m[0][1]*m[1][2]*m[2][0]
           + m[0][2]*m[2][1]*m[1][0]
           - m[2][0]*m[1][1]*m[0][2]
           - m[1][0]*m[0][1]*m[2][2]
           - m[0][0]*m[1][2]*m[2][1]
           ;
     return d;
}

function det4(m)
{
     let m0 = [
         vec3(m[1][1], m[1][2], m[1][3]),
         vec3(m[2][1], m[2][2], m[2][3]),
         vec3(m[3][1], m[3][2], m[3][3])
     ];
     let m1 = [
         vec3(m[1][0], m[1][2], m[1][3]),
         vec3(m[2][0], m[2][2], m[2][3]),
         vec3(m[3][0], m[3][2], m[3][3])
     ];
     let m2 = [
         vec3(m[1][0], m[1][1], m[1][3]),
         vec3(m[2][0], m[2][1], m[2][3]),
         vec3(m[3][0], m[3][1], m[3][3])
     ];
     let m3 = [
         vec3(m[1][0], m[1][1], m[1][2]),
         vec3(m[2][0], m[2][1], m[2][2]),
         vec3(m[3][0], m[3][1], m[3][2])
     ];
     return m[0][0]*det3(m0) - m[0][1]*det3(m1)
         + m[0][2]*det3(m2) - m[0][3]*det3(m3);

}

function det(m)
{
     if(!isMatrix(m)) throw("det: m not a matrix");
     if(m.length == 2) return det2(m);
     if(m.length == 3) return det3(m);
     if(m.length == 4) return det4(m);
}


//---------------------------------------------------------

// inverses

function inverse2(m)
{
     let a = mat2();
     let d = det2(m);
     a[0][0] = m[1][1]/d;
     a[0][1] = -m[0][1]/d;
     a[1][0] = -m[1][0]/d;
     a[1][1] = m[0][0]/d;
     return a;
}

function inverse3(m)
{
    let a = mat3();
    let d = det3(m);

    let a00 = [
       vec2(m[1][1], m[1][2]),
       vec2(m[2][1], m[2][2])
    ];
    let a01 = [
       vec2(m[1][0], m[1][2]),
       vec2(m[2][0], m[2][2])
    ];
    let a02 = [
       vec2(m[1][0], m[1][1]),
       vec2(m[2][0], m[2][1])
    ];
    let a10 = [
       vec2(m[0][1], m[0][2]),
       vec2(m[2][1], m[2][2])
    ];
    let a11 = [
       vec2(m[0][0], m[0][2]),
       vec2(m[2][0], m[2][2])
    ];
    let a12 = [
       vec2(m[0][0], m[0][1]),
       vec2(m[2][0], m[2][1])
    ];
    let a20 = [
       vec2(m[0][1], m[0][2]),
       vec2(m[1][1], m[1][2])
    ];
    let a21 = [
       vec2(m[0][0], m[0][2]),
       vec2(m[1][0], m[1][2])
    ];
    let a22 = [
       vec2(m[0][0], m[0][1]),
       vec2(m[1][0], m[1][1])
    ];

   a[0][0] = det2(a00)/d;
   a[0][1] = -det2(a10)/d;
   a[0][2] = det2(a20)/d;
   a[1][0] = -det2(a01)/d;
   a[1][1] = det2(a11)/d;
   a[1][2] = -det2(a21)/d;
   a[2][0] = det2(a02)/d;
   a[2][1] = -det2(a12)/d;
   a[2][2] = det2(a22)/d;

   return a;

}

function inverse4(m)
{
    let a = mat4();
    let d = det4(m);

    let a00 = [
       vec3(m[1][1], m[1][2], m[1][3]),
       vec3(m[2][1], m[2][2], m[2][3]),
       vec3(m[3][1], m[3][2], m[3][3])
    ];
    let a01 = [
       vec3(m[1][0], m[1][2], m[1][3]),
       vec3(m[2][0], m[2][2], m[2][3]),
       vec3(m[3][0], m[3][2], m[3][3])
    ];
    let a02 = [
       vec3(m[1][0], m[1][1], m[1][3]),
       vec3(m[2][0], m[2][1], m[2][3]),
       vec3(m[3][0], m[3][1], m[3][3])
    ];
    let a03 = [
       vec3(m[1][0], m[1][1], m[1][2]),
       vec3(m[2][0], m[2][1], m[2][2]),
       vec3(m[3][0], m[3][1], m[3][2])
    ];
    let a10 = [
       vec3(m[0][1], m[0][2], m[0][3]),
       vec3(m[2][1], m[2][2], m[2][3]),
       vec3(m[3][1], m[3][2], m[3][3])
    ];
    let a11 = [
       vec3(m[0][0], m[0][2], m[0][3]),
       vec3(m[2][0], m[2][2], m[2][3]),
       vec3(m[3][0], m[3][2], m[3][3])
    ];
    let a12 = [
       vec3(m[0][0], m[0][1], m[0][3]),
       vec3(m[2][0], m[2][1], m[2][3]),
       vec3(m[3][0], m[3][1], m[3][3])
    ];
    let a13 = [
       vec3(m[0][0], m[0][1], m[0][2]),
       vec3(m[2][0], m[2][1], m[2][2]),
       vec3(m[3][0], m[3][1], m[3][2])
    ];
    let a20 = [
       vec3(m[0][1], m[0][2], m[0][3]),
       vec3(m[1][1], m[1][2], m[1][3]),
       vec3(m[3][1], m[3][2], m[3][3])
    ];
    let a21 = [
       vec3(m[0][0], m[0][2], m[0][3]),
       vec3(m[1][0], m[1][2], m[1][3]),
       vec3(m[3][0], m[3][2], m[3][3])
    ];
    let a22 = [
       vec3(m[0][0], m[0][1], m[0][3]),
       vec3(m[1][0], m[1][1], m[1][3]),
       vec3(m[3][0], m[3][1], m[3][3])
    ];
    let a23 = [
       vec3(m[0][0], m[0][1], m[0][2]),
       vec3(m[1][0], m[1][1], m[1][2]),
       vec3(m[3][0], m[3][1], m[3][2])
    ];

    let a30 = [
       vec3(m[0][1], m[0][2], m[0][3]),
       vec3(m[1][1], m[1][2], m[1][3]),
       vec3(m[2][1], m[2][2], m[2][3])
    ];
    let a31 = [
       vec3(m[0][0], m[0][2], m[0][3]),
       vec3(m[1][0], m[1][2], m[1][3]),
       vec3(m[2][0], m[2][2], m[2][3])
    ];
    let a32 = [
       vec3(m[0][0], m[0][1], m[0][3]),
       vec3(m[1][0], m[1][1], m[1][3]),
       vec3(m[2][0], m[2][1], m[2][3])
    ];
    let a33 = [
       vec3(m[0][0], m[0][1], m[0][2]),
       vec3(m[1][0], m[1][1], m[1][2]),
       vec3(m[2][0], m[2][1], m[2][2])
    ];



   a[0][0] = det3(a00)/d;
   a[0][1] = -det3(a10)/d;
   a[0][2] = det3(a20)/d;
   a[0][3] = -det3(a30)/d;
   a[1][0] = -det3(a01)/d;
   a[1][1] = det3(a11)/d;
   a[1][2] = -det3(a21)/d;
   a[1][3] = det3(a31)/d;
   a[2][0] = det3(a02)/d;
   a[2][1] = -det3(a12)/d;
   a[2][2] = det3(a22)/d;
   a[2][3] = -det3(a32)/d;
   a[3][0] = -det3(a03)/d;
   a[3][1] = det3(a13)/d;
   a[3][2] = -det3(a23)/d;
   a[3][3] = det3(a33)/d;

   return a;
}
function inverse(m)
{
   if(!isMatrix(m)) throw("inverse: m not a matrix");
   if(m.length == 2) return inverse2(m);
   if(m.length == 3) return inverse3(m);
   if(m.length == 4) return inverse4(m);
}

//---------------------------------------------------------

// normal matrix


function normalMatrix(m, flag)
{
    if(m.type!='mat4') throw "normalMatrix: input not a mat4";
    let a = inverse(transpose(m));
    if(arguments.length == 1 &&flag == false) return a;

    let b = mat3();
    for(let i=0;i<3;i++) for(let j=0; j<3; j++) b[i][j] = a[i][j];

    return b;
}


//MVNEW.js

//////////////////////////////////////////////////////////////////////////////
//
//  MV.js
//
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------

//
// Helper Functions
//
function MVbuffer(size) {
  var b = {};
  b.buf = new Float32Array(size);
  b.index = 0;
  b.push = function(x) {
    for(var i=0; i<x.length; i++) {
      b.buf[b.index+i] = x[i];
    }
    b.index += x.length;
    b.type = '';
  }
  return b;
}

function isVector(v) {
  if(v.type == "vec2" || v.type == "vec3" || v.type == "vec4") return true;
  return false;
}

function isMatrix(v) {
  if(v.type == "mat2" || v.type == "mat3" || v.type == "mat4") return true;
  return false;
}

function radians( degrees ) {
    return degrees * Math.PI / 180.0;
}

//----------------------------------------------------------------------------


function patch() {
  var out = new Array(4);
  for(var i = 0; i< 4; i++) out[i] = new Array(4);
  out.type = "patch";
  return out;
}

function curve() {
  var out = new Array(4);
  out.type = "curve";
  return out;
}
//
//  Vector Constructors
//

function vec2()
{
    var out = new Array(2);
    out.type = 'vec2';

    switch ( arguments.length ) {
      case 0:
        out[0] = 0.0;
        out[1] = 0.0;
        break;
      case 1:
        if(isVector(arguments[0] && (arguments[0].type != 'vec2'))) {
        out[0] = arguments[0][0];
        out[1] = arguments[0][1];
      }
        break;

      case 2:
        out[0] = arguments[0];
        out[1] = arguments[1];
        break;
    }
    return out;
}

function vec3()
{
//var result = _argumentsToArray( arguments );

    var out = new Array(3);
    out.type = 'vec3';

    switch ( arguments.length ) {
    case 0:
      out[0] = 0.0;
      out[1] = 0.0;
      out[2] = 0.0;
      return out;
    case 1:
    if(isVector(arguments[0]) && (arguments[0].type == "vec3")) {
      out[0] = arguments[0][0];
      out[1] = arguments[0][1];
      out[2] = arguments[0][2];
      return out;
    }
    case 3:
      out[0] = arguments[0];
      out[1] = arguments[1];
      out[2] = arguments[2];
      return out;
      default:
        throw "vec3: wrong arguments";
    }

    return out;
}

function vec4()
{
    var out = new Array(4);
    out.type = 'vec4';
    switch ( arguments.length ) {

      case 0:

        out[0] = 0.0;
        out[1] = 0.0;
        out[2] = 0.0;
        out[3] = 0.0;
        return out;

      case 1:
        if(isVector(arguments[0])) {
          if(arguments[0].type == "vec4") {
            out[0] = arguments[0][0];
            out[1] = arguments[0][1];
            out[2] = arguments[0][2];
            out[3] = arguments[0][3];
            return out;
          }
        }
          else if(arguments[0].type == "vec3") {
            out[0] = arguments[0][0];
            out[1] = arguments[0][1];
            out[2] = arguments[0][2];
            out[3] = 1.0;
            return out;
          }
          else {
            out[0] = arguments[0][0];
            out[1] = arguments[0][1];
            out[2] = arguments[0][2];
            out[3] = arguments[0][3];
            return out;
          }



      case 2:
        if(typeof(arguments[0])=='number'&&arguments[1].type == 'vec3') {
          out[0] = arguments[0];
          out[1] = arguments[1][0];
          out[2] = arguments[1][1];
          out[3] = arguments[1][2];
          return out;
      }
      return out;

      case 4:

      if(isVector(arguments[0])) {
        out[0] = arguments[0][0];
        out[1] = arguments[0][1];
        out[2] = arguments[0][2];
        out[3] = arguments[0][3];
        return out;
      }
        out[0] = arguments[0];
        out[1] = arguments[1];
        out[2] = arguments[2];
        out[3] = arguments[3];
        return out;
      case 3:
        out[0] = arguments[0][0];
        out[1] = arguments[0][1];
        out[2] = arguments[0][2];
        out[3] = 1.0;
        return out;
      default:
        throw "vec4: wrong arguments";
  }
}

//----------------------------------------------------------------------------
//
//  Matrix Constructors
//

function mat2()
{
    var out = new Array(2);
    out[0] = new Array(2);
    out[1] = new Array(2);

    switch ( arguments.length ) {
    case 0:
        out[0][0]=out[3]=1.0;
        out[1]=out[2]=0.0;
        break;
    case 1:
      if(arguments[0].type == 'mat2') {
        out[0][0] = arguments[0][0][0];
        out[0][1] = arguments[0][0][1];
        out[1][0] = arguments[0][1][0];
        out[1][1] = arguments[0][1][1];
        break;
      }

    case 4:
        out[0][0] = arguments[0];
        out[0][1] = arguments[1];
        out[1][0] = arguments[2];
        out[1][1] = arguments[3];
        break;
     default:
         throw "mat2: wrong arguments";
    }
    out.type = 'mat2';

    return out;
}

//----------------------------------------------------------------------------

function mat3()
{
    // v = _argumentsToArray( arguments );

    var out = new Array(3);
    out[0] = new Array(3);
    out[1] = new Array(3);
    out[2] = new Array(3);

    switch ( arguments.length ) {
      case 0:
          out[0][0]=out[1][1]=out[2][2]=1.0;
          out[0][1]=out[0][2]=out[1][0]=out[1][2]=out[2][0]=out[2][1]=0.0;
          break;
    case 1:
         for(var i=0; i<3; i++) for(var i=0; i<3; i++) {
           out[i][j]=arguments[0][3*i+j];
         }
        break;

    case 9:
        for(var i=0; i<3; i++) for(var j=0; j<3; j++) {
          out[i][j] = arguments[3*i+j];
        }
        break;
    default:
        throw "mat3: wrong arguments";
    }
    out.type = 'mat3';

    return out;
}

//----------------------------------------------------------------------------

function mat4()
{
    //var v = _argumentsToArray( arguments );

    var out = new Array(4);
    out[0] = new Array(4);
    out[1] = new Array(4);
    out[2] = new Array(4);
    out[3] = new Array(4);

    switch ( arguments.length ) {
    case 0:
      out[0][0]=out[1][1]=out[2][2]=out[3][3] = 1.0;
      out[0][1]=out[0][2]=out[0][3]=out[1][0]=out[1][2]=out[1][3]=out[2][0]=out[2][1]
        =out[2][3]=out[3][0]=out[3][1]=out[3][2]=0.0;

      break;

    case 1:
      for(var i=0; i<4; i++) for(var i=0; i<4; i++) {
        out[i][j]=arguments[0][4*i+j];
      }
      break;

    case 4:
      if(arguments[0].type == "vec4") {
      for( var i=0; i<4; i++)
        for(var j=0; j<4; j++)
          out[i][j] = arguments[i][j];
       break;
      }

    case 16:
      for(var i=0; i<4; i++) for(var j=0; j<4; j++) {
        out[i][j] = arguments[4*i+j];
      }
      break;
    }
    out.type = 'mat4';

    return out;
}

//----------------------------------------------------------------------------
//
//  Generic Mathematical Operations for Vectors and Matrices
//

function equal( u, v )
{
    if(!(isMatrix(u)&&isMatrix(v) || (isVector(u)&&isVector(v))))
      throw "equal: at least one input not a vec or mat";
    if ( u.type != v.type ) throw "equal: types different";
    if(isMatrix(u)) {
        for ( var i = 0; i < u.length; ++i ) for ( var j = 0; j < u.length; ++j )
            if ( u[i][j] !== v[i][j] )  return false;
        return true;
    }
    if(isVector(u)) {
        for ( var i = 0; i < u.length; ++i )
            if ( u[i] !== v[i] )  return false;
          return true;
        }
}



//----------------------------------------------------------------------------

function add( u, v )
{

  if ( u.type != v.type ) {
      throw "add(): trying to add different types";
  }
  if(isVector(u)){
    var result = new Array(u.length);
    result.type = u.type;
    for(var i=0; i<u.length; i++) {
      result[i] = u[i] + v[i];
      }
      return result;
    }
  if(isMatrix(u)){
    if(u.type == 'mat2') var result = mat2();
    if(u.type == 'mat3') var result = mat3();
    if(u.type == 'mat4') var result = mat4();
    for(var i=0; i<u.length; i++) for(var j=0; j<u.length; j++){
       result[i][j] = u[i][j] + v[i][j];
      }
      return result;
    }
}

//----------------------------------------------------------------------------

function subtract( u, v )
{

  if ( u.type != v.type ) {
      throw "add(): trying to add different types";
  }
  if(isVector(u)){
    if(u.type == 'vec2')  var result =vec2();
    if(u.type == 'vec3')  var result = vec3();
    if(u.type == 'vec4')  var result = vec4();
    result.type = u.type;
    for(var i=0; i<u.length; i++) {
      result[i] = u[i] - v[i];
      }
      return result;
    }
  if(isMatrix(u)){
    if(u.type == 'mat2')  var result = mat2();
    if(u.type == 'mat3')  var result = mat3();
    if(u.type == 'mat4')  var result = mat4();
    for(var i=0; i<u.length; i++) for(var j=0; j<u.length; j++){
       result[i][j] = u[i][j] - v[i][j];
      }
      return result;
    }
}

//----------------------------------------------------------------------------

function mult( u, v )
{

  if(typeof(u)=="number" && (isMatrix(v)||isVector(v))) {

    if(isVector(v)){
      result = new Array(v.length);
      result.type = v.type;
      for(var i =0; i<v.length; i++) {
        result[i] = u*v[i];
      }
      return result;
    }
   if(v.type = 'mat2') result = mat2();
   if(v.type = 'mat3') result = mat3();
   if(v.type = 'mat4') result = mat4();
  }
  if(u.type=='mat2' && v.type == 'vec2') {
    var result = vec2();
    for(i=0;i<2;i++)  {
      result[i] = 0.0;
      for(var k=0;k<2;k++) result[i]+=u[i][k]*v[k];
    }
    return result;
  }
  if(u.type=='mat3'&& v.type=='vec3') {
    var result = vec3();
    for(i=0;i<3;i++)  {
      result[i] = 0.0;
      for(var k=0;k<3;k++) result[i]+=u[i][k]*v[k];
    }
    return result;
  }
  if(u.type=='mat4'&& v.type=='vec4')  {
    var result = vec4();
    for(i=0;i<4;i++)  {
      result[i] = 0.0;
      for(var k=0;k<4;k++) result[i]+=u[i][k]*v[k];
    }
    return result;
  }
 if (u.type=='mat2'&&v.type=='mat2'){
    result = mat2();
    for(i=0;i<2;i++) for(j=0;j<2;j++) {
      result[i][j] = 0.0;
      for(var k=0;k<2;k++) result[i][j]+=u[i][k]*v[k][j];
    }
    return result;
  }
 if (u.type=='mat3'&&v.type=='mat3'){
    result = mat3();
    for(i=0;i<3;i++) for(j=0;j<3;j++) {
      result[i][j] = 0.0;
      for(var k=0;k<3;k++) result[i][j]+=u[i][k]*v[k][j];
    }
    return result;
  }
  else if (u.type=='mat4'&&v.type=='mat4'){
    result = mat4();
    for(i=0;i<4;i++) for(j=0;j<4;j++) {
      result[i][j] = 0.0;
      for(var k=0;k<4;k++) result[i][j]+=u[i][k]*v[k][j];
    }

    return result;
  }
  if (u.type=='vec3'&&v.type=='vec3'){
    var result = vec3(u[0]*v[0], u[1]*v[1], u[2]*v[2]);
    return result;
  }
  if (u.type=='vec4'&&v.type=='vec4'){
    var result = vec4(u[0]*v[0], u[1]*v[1], u[2]*v[2], u[3]*v[3]);
    return result;
  }
    throw "mult(): trying to mult incompatible types";
}


//----------------------------------------------------------------------------
//
//  Basic Transformation Matrix Generators
//

function translate( x, y, z )
{
    if(arguments.length!=2 && arguments.length != 3) {
      throw "translate(): not a mat3 or mat4";
    }
    if(arguments.length == 2) {
      result = mat3();
      result[0][2] = x;
      result[1][2] = y;

      return result;
    }
      result = mat4();

      result[0][3] = x;
      result[1][3] = y;
      result[2][3] = z;

      return result;

}

//----------------------------------------------------------------------------

function rotate( angle, axis )
{
  if ( axis.length == 3 ) {
    axis = vec3(axis[0], axis[1], axis[2] );
  }
   if(arguments.length == 4) {
    axis = vec3(arguments[1], arguments[2], arguments[3]);
  }
    if(axis.type != 'vec3') throw "rotate: axis not a vec3";
    var v = normalize( axis );

    var x = v[0];
    var y = v[1];
    var z = v[2];

    var c = Math.cos( radians(angle) );
    var omc = 1.0 - c;
    var s = Math.sin( radians(angle) );

    var result = mat4(
        x*x*omc + c,   x*y*omc + z*s, x*z*omc - y*s, 0.0 ,
         x*y*omc - z*s, y*y*omc + c,   y*z*omc + x*s, 0.0 ,
         x*z*omc + y*s, y*z*omc - x*s, z*z*omc + c,   0.0 ,
        0.0, 0.0, 0.0, 1.0
    );
    return result;
}

function rotateX(theta) {
  var c = Math.cos( radians(theta) );
  var s = Math.sin( radians(theta) );
  var rx = mat4( 1.0,  0.0,  0.0, 0.0,
      0.0,  c,  -s, 0.0,
      0.0, s,  c, 0.0,
      0.0,  0.0,  0.0, 1.0 );
  return rx;
}
function rotateY(theta) {
  var c = Math.cos( radians(theta) );
  var s = Math.sin( radians(theta) );
  var ry = mat4( c, 0.0, s, 0.0,
      0.0, 1.0,  0.0, 0.0,
      -s, 0.0,  c, 0.0,
      0.0, 0.0,  0.0, 1.0 );
  return ry;
}
function rotateZ(theta) {
  var c = Math.cos( radians(theta) );
  var s = Math.sin( radians(theta) );
  var rz = mat4( c, -s, 0.0, 0.0,
      s,  c, 0.0, 0.0,
      0.0,  0.0, 1.0, 0.0,
      0.0,  0.0, 0.0, 1.0 );
  return rz;
}
//----------------------------------------------------------------------------


function scale( )
{
// legacy code
// should use mult

    if(arguments.length == 2 && isVector(arguments[1])) {
      result = new Array(arguments[1].length);
      result.type = arguments[1].type;
      for(var i=0; i<arguments[1].length; i++)
          result[i] = arguments[0]*arguments[1][i];
      return result;
    }
// end legacy code

    if(arguments.length == 3) {

    var result = mat4();
    result[0][0] = arguments[0];
    result[1][1] = arguments[1];
    result[2][2] = arguments[2];
    result[3][3] = 1.0;
    return result;
  }

  throw "scale: wrong arguments";

}


//----------------------------------------------------------------------------
//
//  ModelView Matrix Generators
//

function lookAt( eye, at, up )
{
    if ( eye.type != 'vec3') {
        throw "lookAt(): first parameter [eye] must be an a vec3";
    }

    if ( at.type != 'vec3') {
        throw "lookAt(): first parameter [at] must be an a vec3";
    }

    if (up.type != 'vec3') {
        throw "lookAt(): first parameter [up] must be an a vec3";
    }

    if ( equal(eye, at) ) {
        return mat4();
    }

    var v = normalize( subtract(at, eye) );  // view direction vector
    var n = normalize( cross(v, up) ); // perpendicular vector
    var u = normalize( cross(n, v) );        // "new" up vector
    v = negate( v );

    var result = mat4(
        n[0], n[1], n[2], -dot(n, eye),
        u[0], u[1], u[2], -dot(u, eye),
        v[0], v[1], v[2], -dot(v, eye),
        0.0,  0.0,  0.0,  1.0
    );

    return result;
}

//----------------------------------------------------------------------------
//
//  Projection Matrix Generators
//

function ortho( left, right, bottom, top, near, far )
{
    if ( left == right ) { throw "ortho(): left and right are equal"; }
    if ( bottom == top ) { throw "ortho(): bottom and top are equal"; }
    if ( near == far )   { throw "ortho(): near and far are equal"; }

    var w = right - left;
    var h = top - bottom;
    var d = far - near;

    var result = mat4();

    result[0][0] = 2.0 / w;
    result[1][1] = 2.0 / h;
    result[2][2] = -2.0 / d;

    result[0][3] = -(left + right) / w;
    result[1][3] = -(top + bottom) / h;
    result[2][3] = -(near + far) / d;
    result[3][3] = 1.0;

    return result;
}

//----------------------------------------------------------------------------

function perspective( fovy, aspect, near, far )
{
    var f = 1.0 / Math.tan( radians(fovy) / 2 );
    var d = far - near;

    var result = mat4();
    result[0][0] = f / aspect;
    result[1][1] = f;
    result[2][2] = -(near + far) / d;
    result[2][3] = -2 * near * far / d;
    result[3][2] = -1;
    result[3][3] = 0.0;

    return result;
}

//----------------------------------------------------------------------------
//
//  Matrix Functions
//

function transpose( m )
{
    if(m.type == 'patch') {
        var out = patch()
        for(var i=0; i<4; i++) out[i] = new Array(4);
        for(var i=0; i<4; i++)
          for(var j=0; j<4; j++) out[i][j] = m[j][i];
        return out;
    }

    switch(m.type) {
      case 'mat2':
        var result = mat2(m[0][0], m[1][0],
                          m[0][1], m[1][1]
                        );
        return result;
        break;

      case 'mat3':
        var result = mat3(m[0][0], m[1][0], m[2][0],
                        m[0][1], m[1][1], m[2][1],
                        m[0][2], m[1][2], m[2][2]
                      );
        return result;
        break;

      case 'mat4':

        var result = mat4(m[0][0], m[1][0], m[2][0], m[3][0],
                          m[0][1], m[1][1], m[2][1], m[3][1],
                          m[0][2], m[1][2], m[2][2], m[3][2],
                          m[0][3], m[1][3], m[2][3], m[3][3]
                        );

        return result;
        break;

      default: throw "transpose(): trying to transpose a non-matrix";
    }
}


//----------------------------------------------------------------------------
//
//  Vector Functions
//

function dot( u, v )
{

    if ( u.type != v.type ) {
      throw "dot(): types are not the same ";
    }
    if (u.type != 'vec2' && u.type != 'vec3' && u.type != 'vec4') {
      throw "dot(): not a vector ";
    }

    var sum = 0.0;
    for ( var i = 0; i < u.length; i++ ) {
        sum += u[i] * v[i];
    }
    return sum;
}

//----------------------------------------------------------------------------

function negate( u )
{
  if (u.type != 'vec2' && u.type != 'vec3' && u.type != 'vec4') {
    throw "negate(): not a vector ";
  }
  var result = new Array(u.length);
  result.type = u.type;
  for ( var i = 0; i < u.length; ++i ) {
    result[i] = -u[i];
  }
    return result;
}

//----------------------------------------------------------------------------

function cross( u, v )
{
    if ( u.type == 'vec3' && v.type == 'vec3') {
      var result = vec3(
          u[1]*v[2] - u[2]*v[1],
          u[2]*v[0] - u[0]*v[2],
          u[0]*v[1] - u[1]*v[0]
      );
      return result;
    }

    if ( v.type == 'vec4' && v.type == 'vec4') {
      var result = vec3(
          u[1]*v[2] - u[2]*v[1],
          u[2]*v[0] - u[0]*v[2],
          u[0]*v[1] - u[1]*v[0]
      );
      return result;
    }

    throw "cross: types aren't matched vec3 or vec4";
}

//----------------------------------------------------------------------------

function length( u )
{
    return Math.sqrt( dot(u, u) );
}

//----------------------------------------------------------------------------

function normalize( u, excludeLastComponent )
{
    if(u.type != 'vec3' && u.type != 'vec4') {

      throw "normalize: not a vector type";
    }
    switch(u.type) {
      case 'vec2':
        var len = Math.sqrt(u[0]*u[0]+u[1]*u[1]);
        var result = vec2(u[0]/len, u[1]/len);
        return result;
      break;
      case 'vec3':
        if(excludeLastComponent) {
          var len = Math.sqrt(u[0]*u[0]+u[1]*u[1]);
          var result = vec3(u[0]/len, u[1]/len, u[2]);
          return result;
          break;
        }
        else {
        var len = Math.sqrt(u[0]*u[0]+u[1]*u[1]+u[2]*u[2]);
        var result = vec3(u[0]/len, u[1]/len, u[2]/len);
        return result;
        break;
      }
      case 'vec4':
      if(excludeLastComponent) {
        var len = Math.sqrt(u[0]*u[0]+u[1]*u[1]+u[2]*u[2]);
        var result = vec4(u[0]/len, u[1]/len, u[2]/len, u[3]);
        return result;
        break;
      }
      else {
        var len = Math.sqrt(u[0]*u[0]+u[1]*u[1]+u[2]*u[2]+u[3]*u[3]);
        var result = vec4(u[0]/len, u[1]/len, u[2]/len, u[3]/len);
        return result;
        break;
      }
    }
}

//----------------------------------------------------------------------------

function mix( u, v, s )
{
    if ( typeof(s) !== "number" ) {
        throw "mix: the last paramter " + s + " must be a number";
    }
    if(typeof(u)=='number'&&typeof(v)=='number') {
      return (1.0-s)*u + s*v;
    }

    if ( u.length != v.length ) {

        throw "vector dimension mismatch";
    }

    var result = new Array(u.length);
    for ( var i = 0; i < u.length; ++i ) {
        result[i] =  (1.0 - s) * u[i] + s * v[i] ;
    }
    result.type = u.type;
    return result;
}

//----------------------------------------------------------------------------
//
// Vector and Matrix utility functions
//


function flatten( v )
{

    if(isVector(v)) {
      var floats = new Float32Array(v.length)
      for(var i =0; i<v.length; i++) floats[i] = v[i];
      return floats;
    }
    if(isMatrix(v)) {

        var floats = new Float32Array(v.length*v.length);
        for(var i =0; i<v.length; i++) for(j=0;j<v.length; j++) {
          floats[i*v.length+j] = v[j][i];
        }
        return floats;
      }

      var floats = new Float32Array( v.length*v[0].length  );

      for(var i = 0; i<v.length; i++) for(var j=0; j<v[0].length; j++) {
        floats[i*v[0].length+j] = v[i][j];
      }
      return floats;
}

//
//----------------------------------------------------------------------------


function cut(a)
{
  return Math.round(a*1000)/1000;
}
function printm(m)
{
    switch(m.type) {
      case 'mat2':
        console.log(cut(m[0][0]), cut(m[0][1]));
        console.log(cut(m[1][0]), cut(m[1][1]));
       break;
      case 'mat3':
       console.log(cut(m[0][0]), cut(m[0][1]), cut(m[0][2]));
       console.log(cut(m[1][0]), cut(m[1][1]), cut(m[1][2]));
       console.log(cut(m[2][0]), cut(m[2][1]), cut(m[2][2]));
       break;
      case 'mat4':
        console.log(cut(m[0][0]), cut(m[0][1]), cut(m[0][2]), cut(m[0][3]));
        console.log(cut(m[1][0]), cut(m[1][1]), cut(m[1][2]), cut(m[1][3]));
        console.log(cut(m[2][0]), cut(m[2][1]), cut(m[2][2]), cut(m[2][3]));
        console.log(cut(m[3][0]), cut(m[3][1]), cut(m[3][2]), cut(m[3][3]));
        break;
      case 'patch':
        for(var i=0;i<4;i++)
          console.log(m[i][0], m[i][1], m[i][2], m[i][3]);
         break;
      default: throw "printm: not a matrix";
    }
}
// determinants

function det2(m)
{

     return m[0][0]*m[1][1]-m[0][1]*m[1][0];

}

function det3(m)
{
     var d = m[0][0]*m[1][1]*m[2][2]
           + m[0][1]*m[1][2]*m[2][0]
           + m[0][2]*m[2][1]*m[1][0]
           - m[2][0]*m[1][1]*m[0][2]
           - m[1][0]*m[0][1]*m[2][2]
           - m[0][0]*m[1][2]*m[2][1]
           ;
     return d;
}

function det4(m)
{
     var m0 = [
         vec3(m[1][1], m[1][2], m[1][3]),
         vec3(m[2][1], m[2][2], m[2][3]),
         vec3(m[3][1], m[3][2], m[3][3])
     ];
     var m1 = [
         vec3(m[1][0], m[1][2], m[1][3]),
         vec3(m[2][0], m[2][2], m[2][3]),
         vec3(m[3][0], m[3][2], m[3][3])
     ];
     var m2 = [
         vec3(m[1][0], m[1][1], m[1][3]),
         vec3(m[2][0], m[2][1], m[2][3]),
         vec3(m[3][0], m[3][1], m[3][3])
     ];
     var m3 = [
         vec3(m[1][0], m[1][1], m[1][2]),
         vec3(m[2][0], m[2][1], m[2][2]),
         vec3(m[3][0], m[3][1], m[3][2])
     ];
     return m[0][0]*det3(m0) - m[0][1]*det3(m1)
         + m[0][2]*det3(m2) - m[0][3]*det3(m3);

}

function det(m)
{
     if(!isMatrix(m)) throw("det: m not a matrix");
     if(m.length == 2) return det2(m);
     if(m.length == 3) return det3(m);
     if(m.length == 4) return det4(m);
}


//---------------------------------------------------------

// inverses

function inverse2(m)
{
     var a = mat2();
     var d = det2(m);
     a[0][0] = m[1][1]/d;
     a[0][1] = -m[0][1]/d;
     a[1][0] = -m[1][0]/d;
     a[1][1] = m[0][0]/d;
     return a;
}

function inverse3(m)
{
    var a = mat3();
    var d = det3(m);

    var a00 = [
       vec2(m[1][1], m[1][2]),
       vec2(m[2][1], m[2][2])
    ];
    var a01 = [
       vec2(m[1][0], m[1][2]),
       vec2(m[2][0], m[2][2])
    ];
    var a02 = [
       vec2(m[1][0], m[1][1]),
       vec2(m[2][0], m[2][1])
    ];
    var a10 = [
       vec2(m[0][1], m[0][2]),
       vec2(m[2][1], m[2][2])
    ];
    var a11 = [
       vec2(m[0][0], m[0][2]),
       vec2(m[2][0], m[2][2])
    ];
    var a12 = [
       vec2(m[0][0], m[0][1]),
       vec2(m[2][0], m[2][1])
    ];
    var a20 = [
       vec2(m[0][1], m[0][2]),
       vec2(m[1][1], m[1][2])
    ];
    var a21 = [
       vec2(m[0][0], m[0][2]),
       vec2(m[1][0], m[1][2])
    ];
    var a22 = [
       vec2(m[0][0], m[0][1]),
       vec2(m[1][0], m[1][1])
    ];

   a[0][0] = det2(a00)/d;
   a[0][1] = -det2(a10)/d;
   a[0][2] = det2(a20)/d;
   a[1][0] = -det2(a01)/d;
   a[1][1] = det2(a11)/d;
   a[1][2] = -det2(a21)/d;
   a[2][0] = det2(a02)/d;
   a[2][1] = -det2(a12)/d;
   a[2][2] = det2(a22)/d;

   return a;

}

function inverse4(m)
{
    var a = mat4();
    var d = det4(m);

    var a00 = [
       vec3(m[1][1], m[1][2], m[1][3]),
       vec3(m[2][1], m[2][2], m[2][3]),
       vec3(m[3][1], m[3][2], m[3][3])
    ];
    var a01 = [
       vec3(m[1][0], m[1][2], m[1][3]),
       vec3(m[2][0], m[2][2], m[2][3]),
       vec3(m[3][0], m[3][2], m[3][3])
    ];
    var a02 = [
       vec3(m[1][0], m[1][1], m[1][3]),
       vec3(m[2][0], m[2][1], m[2][3]),
       vec3(m[3][0], m[3][1], m[3][3])
    ];
    var a03 = [
       vec3(m[1][0], m[1][1], m[1][2]),
       vec3(m[2][0], m[2][1], m[2][2]),
       vec3(m[3][0], m[3][1], m[3][2])
    ];
    var a10 = [
       vec3(m[0][1], m[0][2], m[0][3]),
       vec3(m[2][1], m[2][2], m[2][3]),
       vec3(m[3][1], m[3][2], m[3][3])
    ];
    var a11 = [
       vec3(m[0][0], m[0][2], m[0][3]),
       vec3(m[2][0], m[2][2], m[2][3]),
       vec3(m[3][0], m[3][2], m[3][3])
    ];
    var a12 = [
       vec3(m[0][0], m[0][1], m[0][3]),
       vec3(m[2][0], m[2][1], m[2][3]),
       vec3(m[3][0], m[3][1], m[3][3])
    ];
    var a13 = [
       vec3(m[0][0], m[0][1], m[0][2]),
       vec3(m[2][0], m[2][1], m[2][2]),
       vec3(m[3][0], m[3][1], m[3][2])
    ];
    var a20 = [
       vec3(m[0][1], m[0][2], m[0][3]),
       vec3(m[1][1], m[1][2], m[1][3]),
       vec3(m[3][1], m[3][2], m[3][3])
    ];
    var a21 = [
       vec3(m[0][0], m[0][2], m[0][3]),
       vec3(m[1][0], m[1][2], m[1][3]),
       vec3(m[3][0], m[3][2], m[3][3])
    ];
    var a22 = [
       vec3(m[0][0], m[0][1], m[0][3]),
       vec3(m[1][0], m[1][1], m[1][3]),
       vec3(m[3][0], m[3][1], m[3][3])
    ];
    var a23 = [
       vec3(m[0][0], m[0][1], m[0][2]),
       vec3(m[1][0], m[1][1], m[1][2]),
       vec3(m[3][0], m[3][1], m[3][2])
    ];

    var a30 = [
       vec3(m[0][1], m[0][2], m[0][3]),
       vec3(m[1][1], m[1][2], m[1][3]),
       vec3(m[2][1], m[2][2], m[2][3])
    ];
    var a31 = [
       vec3(m[0][0], m[0][2], m[0][3]),
       vec3(m[1][0], m[1][2], m[1][3]),
       vec3(m[2][0], m[2][2], m[2][3])
    ];
    var a32 = [
       vec3(m[0][0], m[0][1], m[0][3]),
       vec3(m[1][0], m[1][1], m[1][3]),
       vec3(m[2][0], m[2][1], m[2][3])
    ];
    var a33 = [
       vec3(m[0][0], m[0][1], m[0][2]),
       vec3(m[1][0], m[1][1], m[1][2]),
       vec3(m[2][0], m[2][1], m[2][2])
    ];



   a[0][0] = det3(a00)/d;
   a[0][1] = -det3(a10)/d;
   a[0][2] = det3(a20)/d;
   a[0][3] = -det3(a30)/d;
   a[1][0] = -det3(a01)/d;
   a[1][1] = det3(a11)/d;
   a[1][2] = -det3(a21)/d;
   a[1][3] = det3(a31)/d;
   a[2][0] = det3(a02)/d;
   a[2][1] = -det3(a12)/d;
   a[2][2] = det3(a22)/d;
   a[2][3] = -det3(a32)/d;
   a[3][0] = -det3(a03)/d;
   a[3][1] = det3(a13)/d;
   a[3][2] = -det3(a23)/d;
   a[3][3] = det3(a33)/d;

   return a;
}
function inverse(m)
{
   if(!isMatrix(m)) throw("inverse: m not a matrix");
   if(m.length == 2) return inverse2(m);
   if(m.length == 3) return inverse3(m);
   if(m.length == 4) return inverse4(m);
}

//---------------------------------------------------------

// normal matrix


function normalMatrix(m, flag)
{
    if(m.type!='mat4') throw "normalMatrix: input not a mat4";
    var a = inverse(transpose(m));
    if(arguments.length == 1 &&flag == false) return a;

    var b = mat3();
    for(var i=0;i<3;i++) for(var j=0; j<3; j++) b[i][j] = a[i][j];

    return b;
}


//utility.js

(function () {
    'use strict';

    window.getShaderSource = function(id) {
        return document.getElementById(id).textContent.replace(/^\s+|\s+$/g, '');
    };

    function createShader(gl, source, type) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    }

    window.createProgram = function(gl, vertexShaderSource, fragmentShaderSource) {
        var program = gl.createProgram();
        var vshader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
        var fshader = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
        gl.attachShader(program, vshader);
        gl.deleteShader(vshader);
        gl.attachShader(program, fshader);
        gl.deleteShader(fshader);
        gl.linkProgram(program);

        var log = gl.getProgramInfoLog(program);
        if (log) {
            console.log(log);
        }

        log = gl.getShaderInfoLog(vshader);
        if (log) {
            console.log(log);
        }

        log = gl.getShaderInfoLog(fshader);
        if (log) {
            console.log(log);
        }

        return program;
    };
/*
   window.loadImage = function(url, onload) {
        var img = new Image();
        img.src = url;
        img.onload = function() {
            onload(img);
        };
        return img;
    };

    window.loadImages = function(urls, onload) {
        var imgs = [];
        var imgsToLoad = urls.length;

        function onImgLoad() {
            if (--imgsToLoad <= 0) {
                onload(imgs);
            }
        }

        for (var i = 0; i < imgsToLoad; ++i) {
            imgs.push(loadImage(urls[i], onImgLoad));
        }
    };

    window.loadObj = function(url, onload) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'text';
        xhr.onload = function(e) {
            var mesh = new OBJ.Mesh(this.response);
            onload(mesh);
        };
        xhr.send();
    };
*/
})();
