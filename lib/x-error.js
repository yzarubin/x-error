'use strict';

var _ = require('lodash');

module.exports = (function() {
  var xError = function xError(code, message, data) {
    data = data
        || (typeof message !== 'string' && message)
        || (typeof code !== 'number' && typeof code !== 'string' && code )
        || {};
    message =  (typeof message === 'string' && message)
        || (typeof code === 'string' && code)
        || undefined;
    code = (typeof code ==='number') ? code
        : undefined;
    
    this.extend(data);
    this.setMsg(message);
    this.setCode(code);
    
    Error.captureStackTrace(this, xError); // avoid polluting the stack
    // modify stack's getter and setter methods to make the property enumerable by JSON.stringify()
    var _stack = this.stack; // activate the getter
    this.__defineGetter__('stack', function() { return _stack; });
    this.__defineSetter__('stack', function(stack) {  _stack = stack; });
    
    return this;
  };

  xError.prototype = new Error(); // inherit Error
  //xError.prototype.constructor = Error; // ensure xError is an instance of Error

  xError.prototype.setCode = xError.prototype.c = function(code) {
    if (typeof code !== 'undefined') { this.code = code; }
    return this;
  };
  xError.prototype.setMsg = xError.prototype.m = function(message) {
    if (typeof message !== 'undefined') { this.message = message; }
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
  xError.prototype.extend = xError.prototype.ex = function(source) {
    if (source instanceof Error) {
      // hidden methods will not be enumerated, so check for them manually
    	source.message && (this.message = source.message);
    	source.stack = (this.stack = source.stack);
    }
    
    return _.assign(this, source || {});
  };
  xError.prototype.debug = function(data){
    if (!this._debug) this._debug = [];
    if (typeof data !== 'undefined' && this._debug instanceof Array === true) {
      this._debug.push(data);
    }

    return this;
  };

  return xError;
})();