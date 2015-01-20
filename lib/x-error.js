'use strict';

module.exports = (function() {
  var xError = function (code, msg, data) {
    data = data
         || (typeof msg !== 'string' && msg)
         || (typeof code !== 'number' && typeof code !== 'string' && code )
         || undefined;
    msg =  (typeof msg === 'string' && msg)
         || (typeof code === 'string' && code)
         || undefined;
    code = (typeof code ==='number') ? code
         : undefined;

    this.setData(data);
    this.setMsg(msg);
    this.setCode(code);

    this.name = 'xError';
    
    Error.captureStackTrace(this, xError); // avoid polluting the stack

    // modify stack's getter and setter methods to make enumerable by JSON.stringify()
    var _stack = this.stack; // activate the getter
    this.__defineGetter__('stack', function() { return _stack; });
    this.__defineSetter__('stack', function(stack) {  _stack = stack; });

    return this;
  };

  xError.prototype = new Error(); // inherit Error
  xError.prototype.constructor = Error; // ensure xError is an instance of Error

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
  xError.prototype.extend = xError.prototype.ex = function(error) {
    if (error instanceof Error) { 
    	error.message && (this.message = error.message);
    	this.stack = error.stack;
    }
    return this;
  };
  xError.prototype.pushData = xError.prototype.ad = function(key, value) {
    if (typeof key !== 'undefined' && typeof value !== 'undefined') {
      if (!this.data) this.data = {};
      this.data[key] = value;
    }
    return this;
  };
  xError.prototype.respondWithMsg = xError.prototype.rwm = function() {
    this.httpResponse = this.message;
    return this;
  };

  return xError;
})();