'use strict';

module.exports = (function() {
  var xError = function (code, msg, data, severity) {
  	severity =  (typeof severity === 'number') ? severity // so that 0 is valid
              : (typeof data === 'number' && data) 
             || (typeof msg === 'number' && msg)
             || undefined;
    data = (typeof data === 'object' && data) 
        || (typeof msg === 'object' && msg) 
        || (typeof code === 'object' && code) 
        || undefined;
    msg =  (typeof msg === 'string' && msg)
        || (typeof code === 'string' && code)
        || undefined;
    code = (typeof code ==='number') ? code
        : undefined;

    this.setSeverity(severity);
    this.setData(data);
    this.setMsg(msg);
    this.setCode(code);

    this.name = 'xError';
   
    Error.captureStackTrace(this, xError); // avoid polluting the stack
    var tmp = this.stack; // activate the getter
    this.__defineGetter__('stack', function() { return tmp; }); // JSON.stringify can now correctly enumerate this property in case we need it

    return this;
  };

  xError.prototype = new Error(); // inherit Error
  xError.prototype.constructor = Error; // ensure xError is an instance of Error
  xError.prototype.__defineGetter__('stack', function() { return this.stack; });

  Object.defineProperty(xError.prototype, 'message', {
    configurable: true,
    enumerable: true,
    writable: true
	});

	 Object.defineProperty(xError.prototype, 'stack', {
    configurable: true,
    enumerable: true,
    writable: true
	});

  xError.prototype.setCode = xError.prototype.c = function(code) {
    if (typeof code !== 'undefined') { this.code = code; }
    return this;
  };
 	xError.prototype.setMsg = xError.prototype.m = function(msg) {
    if (typeof msg !== 'undefined') { this.message = msg; }
    return this;
  };
  xError.prototype.setData = xError.prototype.d = function(data) {
    if (typeof data !== 'undefined') { this.data = data; }
    return this;
  };
  xError.prototype.setSeverity = xError.prototype.s = function(severity) {
    if (typeof severity !== 'undefined') { this.severity = severity; }
    return this;
  };
  xError.prototype.setHttpCode =  xError.prototype.hc = function(httpCode) {
    if (typeof httpCode === 'number') { this.httpCode = httpCode; }
    return this;
  };
  xError.prototype.setHttpResponse = xError.prototype.hr = function(httpResponse) {
    if (typeof httpResponse !== 'undefined') { this.httpResponse = httpResponse; }
    return this;
  };
  xError.prototype.extends = xError.prototype.ex = function(error) {
    if (error instanceof Error) { 
    	error.message && (this.message = error.message);
    	this.stack = error.stack;
    }
    return this;
  };
  xError.prototype.pushData = xError.prototype.pd = function(key, value) {
 		if (typeof key !== 'undefined' && typeof value !== 'undefined') {
 			if (!this.data) this.data = {};
 			this.data[key] = value;
 		}
    return this;
  };

  return xError;
})();