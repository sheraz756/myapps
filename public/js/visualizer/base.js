


var o3djs = o3djs || {};

var goog = goog || {};

goog.typedef = true;

o3djs.global = this;


o3djs.BROWSER_ONLY = true;

o3djs.provided_ = [];


o3djs.provide = function(name) {
  // Ensure that the same namespace isn't provided twice.
  if (o3djs.getObjectByName(name) &&
      !o3djs.implicitNamespaces_[name]) {
    throw 'Namespace "' + name + '" already declared.';
  }

  var namespace = name;
  while ((namespace = namespace.substring(0, namespace.lastIndexOf('.')))) {
    o3djs.implicitNamespaces_[namespace] = true;
  }

  o3djs.exportPath_(name);
  o3djs.provided_.push(name);
};



o3djs.implicitNamespaces_ = {};


o3djs.exportPath_ = function(name, opt_object, opt_objectToExportTo) {
  var parts = name.split('.');
  var cur = opt_objectToExportTo || o3djs.global;
  var part;

  // Internet Explorer exhibits strange behavior when throwing errors from
  // methods externed in this manner.  See the testExportSymbolExceptions in
  // base_test.html for an example.
  if (!(parts[0] in cur) && cur.execScript) {
    cur.execScript('var ' + parts[0]);
  }

  // Parentheses added to eliminate strict JS warning in Firefox.
  while (parts.length && (part = parts.shift())) {
    if (!parts.length && o3djs.isDef(opt_object)) {
      // last part and we have an object; use it.
      cur[part] = opt_object;
    } else if (cur[part]) {
      cur = cur[part];
    } else {
      cur = cur[part] = {};
    }
  }
};



o3djs.getObjectByName = function(name, opt_obj) {
  var parts = name.split('.');
  var cur = opt_obj || o3djs.global;
  for (var pp = 0; pp < parts.length; ++pp) {
    var part = parts[pp];
    if (cur[part]) {
      cur = cur[part];
    } else {
      return null;
    }
  }
  return cur;
};


o3djs.require = function(rule) {
  // TODO(gman): For some unknown reason, when we call
  // o3djs.util.getScriptTagText_ it calls
  // document.getElementsByTagName('script') and for some reason the scripts do
  // not always show up. Calling it here seems to fix that as long as we
  // actually ask for the length, at least in FF 3.5.1 It would be nice to
  // figure out why.
  var dummy = document.getElementsByTagName('script').length;

  // if the object already exists we do not need do do anything
  if (o3djs.getObjectByName(rule)) {
    return;
  }
  var path = o3djs.getPathFromRule_(rule);
  if (path) {
    o3djs.included_[path] = true;
    o3djs.writeScripts_();
  } else {
    throw new Error('o3djs.require could not find: ' + rule);
  }
};



o3djs.basePath = '';


o3djs.included_ = {};



o3djs.dependencies_ = {
  visited: {},  // used when resolving dependencies to prevent us from
                // visiting the file twice.
  written: {}  // used to keep track of script files we have written.
};


o3djs.findBasePath_ = function() {
  var doc = o3djs.global.document;
  if (typeof doc == 'undefined') {
    return;
  }
  if (o3djs.global.BASE_PATH) {
    o3djs.basePath = o3djs.global.BASE_PATH;
    return;
  } else {
    // HACKHACK to hide compiler warnings :(
    o3djs.global.BASE_PATH = null;
  }
  var scripts = doc.getElementsByTagName('script');
  for (var script, i = 0; script = scripts[i]; i++) {
    var src = script.src;
    var l = src.length;
    if (src.substr(l - 13) == 'o3djs/base.js') {
      o3djs.basePath = src.substr(0, l - 13);
      return;
    }
  }
};



o3djs.writeScriptTag_ = function(src) {
  var doc = o3djs.global.document;
  if (typeof doc != 'undefined' &&
      !o3djs.dependencies_.written[src]) {
    o3djs.dependencies_.written[src] = true;
    doc.write('<script type="text/javascript" src="' +
              src + '"></' + 'script>');
  }
};


o3djs.writeScripts_ = function() {
  // the scripts we need to write this time.
  var scripts = [];
  var seenScript = {};
  var deps = o3djs.dependencies_;

  function visitNode(path) {
    if (path in deps.written) {
      return;
    }

    // we have already visited this one. We can get here if we have cyclic
    // dependencies.
    if (path in deps.visited) {
      if (!(path in seenScript)) {
        seenScript[path] = true;
        scripts.push(path);
      }
      return;
    }

    deps.visited[path] = true;

    if (!(path in seenScript)) {
      seenScript[path] = true;
      scripts.push(path);
    }
  }

  for (var path in o3djs.included_) {
    if (!deps.written[path]) {
      visitNode(path);
    }
  }

  for (var i = 0; i < scripts.length; i++) {
    if (scripts[i]) {
      o3djs.writeScriptTag_(o3djs.basePath + scripts[i]);
    } else {
      throw Error('Undefined script input');
    }
  }
};


o3djs.getPathFromRule_ = function(rule) {
  var parts = rule.split('.');
  return parts.join('/') + '.js';
};

o3djs.findBasePath_();


o3djs.isDef = function(val) {
  return typeof val != 'undefined';
};



o3djs.exportSymbol = function(publicPath, object, opt_objectToExportTo) {
  o3djs.exportPath_(publicPath, object, opt_objectToExportTo);
};


o3djs.v8Initializer_ = '';


o3djs.v8InitializerArgs_ = [];


o3djs.valueToString_ = function(value) {
  switch (typeof(value)) {
    case 'undefined':
      return 'undefined';
    case 'string':
      var escaped = escape(value);
      if (escaped === value) {
        return '"' + value + '"';
      } else {
        return 'unescape("' + escaped + '")';
      }
    case 'object':
      if (value === null) {
        return 'null';
      } else {
        // TODO: all the other builtin JavaScript objects like Date,
        // Number, Boolean, etc.
        if (value instanceof RegExp) {
          var result =
              'new RegExp(' + o3djs.valueToString_(value.source) + ', "';
          if (value.global) {
            result += 'g';
          }
          if (value.ignoreCase) {
            result += 'i';
          }
          if (value.multiline) {
            result += 'm';
          }
          result += '")';
          return result;
        } else if (o3djs.base.isArray(value)) {
          var valueAsArray = /** @type {!Array} */ (value);
          var result = '[';
          var separator = '';
          for (var i = 0; i < valueAsArray.length; ++i) {
            result += separator + o3djs.valueToString_(valueAsArray[i]);
            separator = ',';
          }
          result += ']\n';
          return result;
        } else {
          var valueAsObject = /** @type {!Object} */ (value);
          var result = '{\n';
          var separator = '';
          for (var propertyName in valueAsObject) {
            result += separator + '"' + propertyName + '": ' +
              o3djs.valueToString_(valueAsObject[propertyName]);
            separator = ',';
          }
          result += '}\n';
          return result;
        }
      }
    default:
      return value.toString()
  }
};


o3djs.namespaceInitializer_ = function(namespaceObject,
                                       namespaceName,
                                       opt_args) {
  var result = namespaceName + ' = {};\n';
  for (var propertyName in namespaceObject) {
    var propertyNamespaceName = namespaceName + '.' + propertyName;
    var propertyValue = namespaceObject[propertyName];
    if (typeof(propertyValue) === 'object' && propertyValue !== null &&
        !o3djs.base.isArray(propertyValue) &&
        !(propertyValue instanceof RegExp)) {
      result += o3djs.namespaceInitializer_(propertyValue,
                                            propertyNamespaceName);
    } else {
      var valueAsString = o3djs.valueToString_(propertyValue);

      // If this is a browser only function then bind to the browser version
      // of the function rather than create a new function in V8.
      if (typeof(propertyValue) == 'function' &&
          valueAsString.indexOf('o3djs.BROWSER_ONLY') != -1) {
        valueAsString = 'args_[' + opt_args.length + ']';
        opt_args.push(propertyValue);
      }
      result += propertyNamespaceName + ' = ' + valueAsString + ';\n';

      if (typeof(propertyValue) === 'function' && propertyValue.prototype) {
        result += o3djs.namespaceInitializer_(
            propertyValue.prototype,
            propertyNamespaceName + '.prototype');
      }
    }
  }
  return result;
};

o3djs.provide('o3djs.base');

/**
 * The base module for o3djs.
 * @namespace
 */
o3djs.base = o3djs.base || {};

/**
 * The a Javascript copy of the o3d namespace object. (holds constants, enums,
 * etc...)
 * @type {o3d.o3d}
 */
o3djs.base.o3d = null;


o3djs.base.snapshotProvidedNamespaces = function()  {
  // Snapshot the V8 initializer string from the current state of browser
  // JavaScript the first time this is called.
  o3djs.v8Initializer_ = 'function(args_) {\n';
  o3djs.v8InitializerArgs_ = [];
  for (var i = 0; i < o3djs.provided_.length; ++i) {
    var object = o3djs.getObjectByName(o3djs.provided_[i]);
    o3djs.v8Initializer_ += o3djs.namespaceInitializer_(
        /** @type {!Object} */ (object),
        o3djs.provided_[i],
        o3djs.v8InitializerArgs_);
  }

  o3djs.v8Initializer_ += '}\n';
};


o3djs.base.initV8 = function(clientObject)  {
  var v8Init = function(initializer, args) {
    // Set up the o3djs namespace.
    var o3djsBrowser = o3djs;
    o3djs = {};
    o3djs.browser = o3djsBrowser;
    o3djs.global = (function() { return this; })();

    o3djs.require = function(rule) {}
    o3djs.provide = function(rule) {}

    // Evaluate the initializer string with the arguments containing bindings
    // to browser side objects.
    eval('(' + initializer + ')')(args);

    // Make sure this points to the o3d namespace for this particular
    // instance of the plugin.
    o3djs.base.o3d = plugin.o3d;
  };

  clientObject.eval(v8Init.toString())(o3djs.v8Initializer_,
                                       o3djs.v8InitializerArgs_);
};


o3djs.base.init = function(clientObject)  {
  function recursivelyCopyProperties(object) {
    var copy = {};
    var hasProperties = false;
    for (var key in object) {
      var property = object[key];
      if (typeof property == 'object' || typeof property == 'function') {
        property = recursivelyCopyProperties(property);
      }
      if (typeof property != 'undefined') {
        copy[key] = property;
        hasProperties = true;
      }
    }
    return hasProperties ? copy : undefined;
  }
  try {
    o3djs.base.o3d = recursivelyCopyProperties(clientObject.o3d);
  } catch (e) {
    // Firefox 2 raises an exception when trying to enumerate a NPObject
    o3djs.base.o3d = clientObject.o3d;
  }
  // Because of a bug in chrome, it is not possible for the browser to enumerate
  // the properties of an NPObject.
  // Chrome bug: http://code.google.com/p/chromium/issues/detail?id=5743
  o3djs.base.o3d = o3djs.base.o3d || clientObject.o3d;
};


o3djs.base.isArray = function(value) {
  var valueAsObject = /** @type {!Object} */ (value);
  return typeof(value) === 'object' && value !== null &&
      'length' in valueAsObject && 'splice' in valueAsObject;
};


o3djs.base.ready = function() {
  return o3djs.base.o3d != null;
};


o3djs.base.maybeDeobfuscateFunctionName_ = function(name) {
  return name;
};


o3djs.base.inherit = function(subClass, superClass) {

  var TmpClass = function() { };
  TmpClass.prototype = superClass.prototype;
  subClass.prototype = new TmpClass();
};


o3djs.base.parseErrorStack = function(excp) {
  var stack = [];
  var name;
  var line;

  if (!excp || !excp.stack) {
    return stack;
  }

  var stacklist = excp.stack.split('\n');

  for (var i = 0; i < stacklist.length - 1; i++) {
    var framedata = stacklist[i];

    name = framedata.match(/^([a-zA-Z0-9_$]*)/)[1];
    if (name) {
      name = o3djs.base.maybeDeobfuscateFunctionName_(name);
    } else {
      name = 'anonymous';
    }

    var result = framedata.match(/(.*:[0-9]+)$/);
    line = result && result[1];

    if (!line) {
      line = '(unknown)';
    }

    stack[stack.length] = name + ' : ' + line
  }

  // remove top level anonymous functions to match IE
  var omitRegexp = /^anonymous :/;
  while (stack.length && omitRegexp.exec(stack[stack.length - 1])) {
    stack.length = stack.length - 1;
  }

  return stack;
};


o3djs.base.getFunctionName = function(aFunction) {
  var regexpResult = aFunction.toString().match(/function(\s*)(\w*)/);
  if (regexpResult && regexpResult.length >= 2 && regexpResult[2]) {
    return o3djs.base.maybeDeobfuscateFunctionName_(regexpResult[2]);
  }
  return 'anonymous';
};

o3djs.base.formatErrorStack = function(stack) {
  var result = '';
  for (var i = 0; i < stack.length; i++) {
    result += '> ' + stack[i] + '\n';
  }
  return result;
};


o3djs.base.getStackTrace = function(stripCount) {
  var result = '';

  if (typeof(arguments.caller) != 'undefined') { // IE, not ECMA
    for (var a = arguments.caller; a != null; a = a.caller) {
      result += '> ' + o3djs.base.getFunctionName(a.callee) + '\n';
      if (a.caller == a) {
        result += '*';
        break;
      }
    }
  } else { // Mozilla, not ECMA
    // fake an exception so we can get Mozilla's error stack
    var testExcp;
    try {
      eval('var var;');
    } catch (testExcp) {
      var stack = o3djs.base.parseErrorStack(testExcp);
      result += o3djs.base.formatErrorStack(stack.slice(3 + stripCount,
                                                        stack.length));
    }
  }

  return result;
};


o3djs.base.setErrorHandler = function(client) {
  client.setErrorCallback(
      function(msg) {
        // Clear the error callback. Otherwise if the callback is happening
        // during rendering it's possible the user will not be able to
        // get out of an infinite loop of alerts.
        client.clearErrorCallback();
        alert('ERROR: ' + msg + '\n' + o3djs.base.getStackTrace(1));
      });
};


o3djs.base.IsMSIE = function() {
  var ua = navigator.userAgent.toLowerCase();
  var msie = /msie/.test(ua) && !/opera/.test(ua);
  return msie;
};

o3djs.base.IsChrome10 = function() {
  return navigator.userAgent.indexOf('Chrome/1.0') >= 0;
};
