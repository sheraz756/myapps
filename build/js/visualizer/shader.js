

o3djs.provide('o3djs.shader');

/**
 * A module for shaders.
 * @namespace
 */
o3djs.shader = o3djs.shader || {};

o3djs.shader.loadFromScriptNodes = function(gl,
                                            vertexScriptName,
                                            fragmentScriptName) {
  var vertexScript = document.getElementById(vertexScriptName);
  var fragmentScript = document.getElementById(fragmentScriptName);
  if (!vertexScript || !fragmentScript)
    return null;
  return new o3djs.shader.Shader(gl,
                                 vertexScript.text,
                                 fragmentScript.text);
}


o3djs.shader.loadTextFileSynchronous = function(url) {
  var error = 'loadTextFileSynchronous failed to load url "' + url + '"';
  var request;

  request = new XMLHttpRequest();
  if (request.overrideMimeType) {
    request.overrideMimeType('text/plain');
  }

  request.open('GET', url, false);
  request.send(null);
  if (request.readyState != 4) {
    throw error;
  }
  return request.responseText;
};


o3djs.shader.loadFromURL = function(gl,
                                    vertexURL,
                                    fragmentURL) {

  var vertexText = o3djs.shader.loadTextFileSynchronous(vertexURL);
  var fragmentText = o3djs.shader.loadTextFileSynchronous(fragmentURL);

  if (!vertexText || !fragmentText)
    return null;
  return new o3djs.shader.Shader(gl,
                                 vertexText,
                                 fragmentText);
};


o3djs.shader.sendTextFileRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  if (request.overrideMimeType) {
    request.overrideMimeType('text/plain');
  }
  request.open('GET', url, true);
  request.onload = callback;
  request.send();
};

function shaderVertexLoaderCallback( vertexText ) {
  this.vertexText = vertexText.currentTarget.response;
  if ( this.fragmentText ) {
    this.shader = new o3djs.shader.Shader(this.gl, this.vertexText, this.fragmentText);
    if (this.callback)
      this.callback(this.shader);
  }
}

function shaderFragmentLoaderCallback( fragmentText ) {
  this.fragmentText = fragmentText.currentTarget.response;
  if ( this.vertexText ) {
    this.shader = new o3djs.shader.Shader(this.gl, this.vertexText, this.fragmentText);
    if (this.callback)
      this.callback(this.shader);
  }
}

o3djs.shader.asyncLoadFromURL = function(gl,
                                    vertexURL,
                                    fragmentURL, callback ) {
  var shaderLoader = {};
  shaderLoader.gl = gl;
  shaderLoader.callback = callback;

  var vertexText = o3djs.shader.sendTextFileRequest(vertexURL,shaderVertexLoaderCallback.bind(shaderLoader));
  var fragmentText = o3djs.shader.sendTextFileRequest(fragmentURL,shaderFragmentLoaderCallback.bind(shaderLoader));

}


o3djs.shader.glslNameToJs_ = function(name) {
  return name.replace(/_(.)/g, function(_, p1) { return p1.toUpperCase(); });
}


o3djs.shader.Shader = function(gl, vertex, fragment) {
  this.program = gl.createProgram();
  this.gl = gl;

  var vs = this.loadShader(this.gl.VERTEX_SHADER, vertex);
  if (vs == null) {
    return;
  }
  this.gl.attachShader(this.program, vs);
  this.gl.deleteShader(vs);

  var fs = this.loadShader(this.gl.FRAGMENT_SHADER, fragment);
  if (fs == null) {
    return;
  }
  this.gl.attachShader(this.program, fs);
  this.gl.deleteShader(fs);

  this.gl.linkProgram(this.program);
  this.gl.useProgram(this.program);

  // Check the link status
  var linked = this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS);
  if (!linked) {
    var infoLog = this.gl.getProgramInfoLog(this.program);
    output("Error linking program:\n" + infoLog);
    this.gl.deleteProgram(this.program);
    this.program = null;
    return;
  }

  // find uniforms and attributes
  var re = /(uniform|attribute)\s+\S+\s+(\S+)\s*;/g;
  var match = null;
  while ((match = re.exec(vertex + '\n' + fragment)) != null) {
    var glslName = match[2];
    var jsName = o3djs.shader.glslNameToJs_(glslName);
    var loc = -1;
    if (match[1] == "uniform") {
      this[jsName + "Loc"] = this.getUniform(glslName);
    } else if (match[1] == "attribute") {
      this[jsName + "Loc"] = this.getAttribute(glslName);
    }
    if (loc >= 0) {
      this[jsName + "Loc"] = loc;
    }
  }
}

/**
 * Binds the shader's program.
 */
o3djs.shader.Shader.prototype.bind = function() {
  this.gl.useProgram(this.program);
}

/**
 * Helper for loading a shader.
 * @private
 */
o3djs.shader.Shader.prototype.loadShader = function(type, shaderSrc) {
  var shader = this.gl.createShader(type);
  if (shader == null) {
    return null;
  }

  // Load the shader source
  this.gl.shaderSource(shader, shaderSrc);
  // Compile the shader
  this.gl.compileShader(shader);
  // Check the compile status
  if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
    var infoLog = this.gl.getShaderInfoLog(shader);
    output("Error compiling shader:\n" + infoLog);
    this.gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Helper for looking up an attribute's location.
 * @private
 */
o3djs.shader.Shader.prototype.getAttribute = function(name) {
  return this.gl.getAttribLocation(this.program, name);
};

/**
 * Helper for looking up an attribute's location.
 * @private
 */
o3djs.shader.Shader.prototype.getUniform = function(name) {
  return this.gl.getUniformLocation(this.program, name);
}
