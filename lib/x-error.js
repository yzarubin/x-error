'use strict';

module.exports = (function() {

  var isArrayOrIsNotObject = function(x) {
    return x instanceof Array || !(typeof x === 'object' && x instanceof Object) || false;
  };

  var XError = function XError() {

    // called without new
    if (this === undefined) {
      return new XError(arguments[0], arguments[1], arguments[2]);
    }

    var code = (typeof arguments[0] === 'number') ? arguments[0] : undefined;

    var message = ((typeof arguments[0] !== 'undefined' && typeof code === 'undefined')
                && isArrayOrIsNotObject(arguments[0]) && String(arguments[0]) || undefined)
                || (typeof arguments[1] !== 'undefined' && isArrayOrIsNotObject(arguments[1])
                && String(arguments[1]) || undefined);

    var data = arguments[0] !== 'undefined'
             && (!isArrayOrIsNotObject(arguments[0]) && arguments[0]
             || !isArrayOrIsNotObject(arguments[1]) && arguments[1]
             || !isArrayOrIsNotObject(arguments[2]) && arguments[2])
             || {};

    this.setCode(code);
    this.setMessage(message);

    // avoid polluting the stack
    Error.captureStackTrace(this, XError);

    // modify stack's getter and setter methods to make the property enumerable by JSON.stringify()
    // activate the getter
    var _stack = this.stack;
    this.__defineGetter__('stack', function() { return _stack; });
    this.__defineSetter__('stack', function(stack) {  _stack = stack; });

    this.extend(data);

    return this;
  };

  // inherit Error
  XError.prototype = new Error();

  XError.prototype.setCode = XError.prototype.c = function(code) {
    if (typeof code !== 'undefined') { this.code = code; }
    return this;
  };

  XError.prototype.setMessage = XError.prototype.m = function(message) {
    if (typeof message !== 'undefined') { this.message = String(message); }
    return this;
  };

  XError.prototype.setSeverity = XError.prototype.s = function(severity) {
    if (typeof severity !== 'undefined') { this.severity = severity; }
    return this;
  };

  XError.prototype.setHttpCode =  XError.prototype.hc = function(httpCode) {
    if (typeof httpCode === 'number') { this.httpCode = httpCode; }
    return this;
  };

  XError.prototype.setHttpResponse = XError.prototype.hr = function(httpResponse) {
    if (typeof httpResponse !== 'undefined') { this.httpResponse = httpResponse; }
    return this;
  };

  XError.prototype.extend = XError.prototype.ex = function(source) {
    if (source instanceof Error) {
      // hidden methods will not be enumerated, so check for them manually
    	source.message && (this.message = source.message);
    	source.stack && (this.stack = source.stack);
    }

    source = source || {};
    for (var key in source) {
      this[key] = source[key];
    }
    return this;
  };

  XError.prototype.debug = XError.prototype.d = function(){
    var args = Array.prototype.slice.call(arguments)
      , self = this;

    if (this._debug == undefined) this._debug = [];

    args.forEach(function(data){
      if (self._debug instanceof Array === true) self._debug.push(data);
    });

    return this;
  };

  return XError;
})();
