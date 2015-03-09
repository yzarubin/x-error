var XError    = require('./../lib/x-error')
  , chai      = require('chai')
  , expect    = chai.expect
  , should    = chai.should();

describe('XError tests', function () {
  it('should be an instance of Error', function () {
    var e = new XError();
    expect(e).to.be.an.instanceof(Error);
  });

  it('should be an instance of XError', function () {
    var e = new XError();
    expect(e).to.be.an.instanceof(XError);
  });

  it('should generate the stack correctly', function () {
    var e = new XError();
    expect(typeof e.stack === 'string').to.be.true;
  });

  it('should instantiate with arguments correctly #1', function () {
    var e = new XError(5);
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.code).to.equal(5);
  });

  it('should instantiate with arguments correctly #2', function () {
    var e = new XError(5, 'hello');
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.code).to.equal(5);
    expect(e.message).to.equal('hello');
  });

  it('should instantiate with arguments correctly #3', function () {
    var e = new XError(5, 'hello', {test: 123});
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.code).to.equal(5);
    expect(e.message).to.equal('hello');
    expect(e.test).to.equal(123);
  });

  it('should instantiate with arguments correctly #4', function () {
    var e = new XError(5, 'hello').extend({test:123});
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.code).to.equal(5);
    expect(e.message).to.equal('hello');
    expect(e.test).to.equal(123);
  });

  it('should instantiate with arguments correctly #5', function () {
    var e = new XError('hello', {test: 123});
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.message).to.equal('hello');
    expect(e.test).to.equal(123);
  });

  it('should instantiate with arguments correctly #6', function () {
    var e = new XError({test: 123});
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.test).to.equal(123);
  });

  it('should instantiate with arguments correctly #7', function () {
    var e = new XError(99);
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.code).to.equal(99);
  });

  it('should instantiate with arguments correctly #8', function () {
    var e = new XError(5,99);
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.code).to.equal(5);
    expect(e.message).to.equal("99");
  });

  it('should instantiate with arguments correctly #9', function () {
    var e = new XError(5,'hello');
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.code).to.equal(5);
    expect(e.message).to.equal('hello');
  });

  it('should instantiate with arguments correctly #10', function () {
    var e = new XError(5,{test: 123});
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.code).to.equal(5);
    expect(e.test).to.equal(123);
  });

  it('should instantiate with arguments correctly #11', function () {
    var e = new XError(1, 2, 3);
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.code).to.equal(1);
    expect(e.message).to.equal('2');
  });

  it('should instantiate with null correctly #1', function () {
    var e = new XError(1, null, 3);
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.code).to.equal(1);
    expect(e.message).to.equal('null');
  });

  it('should instantiate with null correctly #2', function () {
    var e = new XError(null, 'foo', {foo: 'bar'});
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.code).to.equal(undefined);
    expect(e.message).to.equal('null');
    expect(e.foo).to.equal('bar');
  });

    it('should instantiate with null correctly #3', function () {
    var e = new XError(null, 'foo', {foo: 'bar'});
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.code).to.equal(undefined);
    expect(e.message).to.equal('null');
    expect(e.foo).to.equal('bar');
  });
  
  it('should instantiate with arrays correctly #1', function () {
    var e = new XError([1,2]);
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.message).to.equal('1,2');
  });

  it('should instantiate with arrays correctly #2', function () {
    var e = new XError([1,2], [2,3], {foo: 'bar'});
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.message).to.equal('1,2');
    expect(e.foo).to.equal('bar');
  });

  it('should instantiate with arrays correctly #3', function () {
    var e = new XError( {foo: 'bar'}, [1,2], [2,3]);
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.message).to.equal('1,2');
    expect(e.foo).to.equal('bar');
  });

  it('should instantiate with arrays correctly #4', function () {
    var e = new XError("1", {foo: 'bar'}, {foo: 'baz'});
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.message).to.equal('1');
    expect(e.foo).to.equal('bar');
  });

  it('should instantiate with a function correctly #1', function () {
    var e = new Error(function(){ 1+1=2; });
    var ex = new XError(function(){ 1+1=2; });
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.message).to.equal(ex.message);
  });

  it('should instantiate with a function correctly #2', function () {
    var e = new Error(function(){ 1+1=2; });
    var ex = new XError(function(){ 1+1=2; }, { foo: 'bar' });
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.message).to.equal(ex.message);
    expect(ex.foo).to.equal('bar');
  });
  
  it('should instantiate with out of order arguments', function () {
    var e = new XError({foo: 'bar'}, 'foobar');
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.message).to.equal('foobar');
    expect(e.foo).to.equal('bar');
  });
  
  it('should extend error with new properties', function () {
    var e = new XError();
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.data).to.equal(undefined);
    e.extend({test:123});
    expect(e.test).to.equal(123);
  });
  it('should set httpCode', function () {
    var e = new XError();
    expect(typeof e.stack === 'string').to.be.true;
    e.setHttpCode(500);
    expect(e.httpCode).to.equal(500);
  });

  it('should not set httpCode', function () {
    var e = new XError();
    expect(typeof e.stack === 'string').to.be.true;
    e.setHttpCode('500');
    expect(e.httpCode).to.equal(undefined);
  });

  it('should set httpResponse', function () {
    var e = new XError();
    expect(typeof e.stack === 'string').to.be.true;
    e.setHttpResponse('an error has occured');
    expect(e.httpResponse).to.equal('an error has occured');
  });

  it('should be extended by the Error object', function () {
    var e = new Error('message');
    var ex = new XError();
    ex.extend(e).extend({test:123});

    expect(typeof e.stack === 'string').to.be.true;
    expect(ex.message).to.equal('message');
    expect(ex.stack).to.equal(e.stack);
    expect(ex.test).to.equal(123);
  });

  it('stack should be included in JSON.stringify()', function () {
    var e = new Error('message');
    var ex = new XError().extend(e);

    expect(JSON.parse(JSON.stringify(ex)).stack.length).to.be.gt(10);
    expect(JSON.parse(JSON.stringify(ex)).message).to.equal('message');
    expect(JSON.parse(JSON.stringify(e)).stack).to.equal(undefined);
  });

  it('stacks should be equal', function () {
    var e = new Error('message');
    var ex = new XError('message');
    
    expect(e.stack.substring(0,30)).to.equal(ex.stack.substring(0,30));
  });

  it('should chain correctly #1', function () {
    var ex = new XError().c(500).m('error').extend({a:'b'}).s(10).hc(500).hr('error has occured');
    var ex2 = new XError(500, 'error', {a:'b'}).s(10).hc(500).hr('error has occured');
    
    expect(ex.code).to.equal(500);
    expect(ex.message).to.equal('error');
    expect(ex.a).to.equal('b');
    expect(ex.severity).to.equal(10);
    expect(ex.httpCode).to.equal(500);
    expect(ex.httpResponse).to.equal('error has occured');
    
    expect(ex2.code).to.equal(500);
    expect(ex2.message).to.equal('error');
    expect(ex2.a).to.equal('b');
    expect(ex2.severity).to.equal(10);
    expect(ex2.httpCode).to.equal(500);
    expect(ex2.httpResponse).to.equal('error has occured');
  });

  it('should populate the debug array', function(){
    var e = new XError('message').debug('foo').debug(['bar']).debug({foo:'bar'});
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.message).to.equal('message');
    expect(e._debug[0]).to.equal('foo');
    expect(e._debug[1][0]).to.equal('bar');
    expect(e._debug[2].foo).to.equal('bar');
  });

  it('should populate the debug array with multiple arguments', function(){
    var e = new XError('message').debug('foo', ['bar'], {foo:'bar'});
    expect(typeof e.stack === 'string').to.be.true;
    expect(e.message).to.equal('message');
    expect(e._debug[0]).to.equal('foo');
    expect(e._debug[1][0]).to.equal('bar');
    expect(e._debug[2].foo).to.equal('bar');
  });
  
  it('should instantiate correctly with Error instance as the parameter #1', function(){
    var e = new Error('foobar');
    var ex = new XError(e);
    expect(ex.message).to.equal('foobar');
    expect(e.stack).to.equal(ex.stack);

  });

  it('should instantiate correctly with Error instance as the parameter #2', function(){
    var e = new Error('foobar');
    var ex = new XError(1, 'hello', e);
    expect(ex.message).to.equal('foobar');
    expect(e.stack).to.equal(ex.stack);
    expect(ex.code).to.equal(1);
    
  });
  
  it('should instantiate correctly with XError instance as the parameter', function(){
    var ex = new XError('foobar').setHttpCode(200).setHttpResponse('baz').debug('test').debug('test2');
    var ex2 = new XError(ex);
    expect(ex.message).to.equal('foobar');
    expect(ex2.stack).to.equal(ex.stack);
    expect(ex2.httpResponse).to.equal('baz');
    expect(ex2.httpCode).to.equal(200);
    expect(ex2._debug[0]).to.equal('test');
    expect(ex2._debug[1]).to.equal('test2');
  });

  it('should instantiate correctly without calling new', function(){
    var ex = XError(1,'foo', {foo: 'bar'});
    expect(ex.message).to.equal('foo');
    expect(ex.code).to.equal(1);
    expect(ex.foo).to.equal('bar');
  });

  it('should extend prototype correctly', function(){
    XError.prototype.setPriority = function(priority) {
      this.priority = priority;
      return this;
    };

    var ex = new XError(1, 'foo', {foo: 'bar'}).setPriority('top').debug('test');
    expect(ex.message).to.equal('foo');
    expect(ex.code).to.equal(1);
    expect(ex.foo).to.equal('bar');
    expect(ex._debug[0]).to.equal('test');
    expect(ex.priority).to.equal('top');
  });
});