var xError = require('./../lib/x-error')
  , chai      = require('chai')
  , expect    = chai.expect
  , should = chai.should()

describe('xError tests', function () {
  describe('constructors', function () {
    it('should be an instance of error', function () {
      var e = new xError()
      expect(e).to.be.an.instanceof(Error)
    })
    it('should generate the stack correctly', function () {
      var e = new xError()
      expect(typeof e.stack === 'string').to.be.true
    })
    it('should instantiate with arguments correctly #1', function () {
      var e = new xError(5)
      expect(typeof e.stack === 'string').to.be.true
      expect(e.code).to.equal(5)
    })
    it('should instantiate with arguments correctly #2', function () {
      var e = new xError(5, 'hello')
      expect(typeof e.stack === 'string').to.be.true
      expect(e.code).to.equal(5)
      expect(e.message).to.equal('hello')
    })
    it('should instantiate with arguments correctly #3', function () {
      var e = new xError(5, 'hello', {test: 123})
      expect(typeof e.stack === 'string').to.be.true
      expect(e.code).to.equal(5)
      expect(e.message).to.equal('hello')
      expect(e.data.toString()).to.equal({test: 123}.toString())
    })
    it('should instantiate with arguments correctly #4', function () {
      var e = new xError(5, 'hello', {test: 123}, 99)
      console.log(JSON.stringify(e))
      expect(typeof e.stack === 'string').to.be.true
      expect(e.code).to.equal(5)
      expect(e.message).to.equal('hello')
      expect(e.data.toString()).to.equal({test: 123}.toString())
      expect(e.severity).to.equal(99)
    })
    it('should instantiate with arguments correctly #5', function () {
      var e = new xError('hello', {test: 123}, 99)
      expect(typeof e.stack === 'string').to.be.true
      expect(e.message).to.equal('hello')
      expect(e.data.toString()).to.equal({test: 123}.toString())
      expect(e.severity).to.equal(99)
    })
    it('should instantiate with arguments correctly #6', function () {
      var e = new xError({test: 123}, 99)
      expect(typeof e.stack === 'string').to.be.true
      expect(e.data.toString()).to.equal({test: 123}.toString())
      expect(e.severity).to.equal(99)
    })
    it('should instantiate with arguments correctly #7', function () {
      var e = new xError(99)
      expect(typeof e.stack === 'string').to.be.true
      expect(e.code).to.equal(99)
    })
    it('should instantiate with arguments correctly #8', function () {
      var e = new xError(5,99)
      expect(typeof e.stack === 'string').to.be.true
      expect(e.code).to.equal(5)
      expect(e.severity).to.equal(99)
    })
    it('should instantiate with arguments correctly #9', function () {
      var e = new xError(5,'hello',99)
      expect(typeof e.stack === 'string').to.be.true
      expect(e.code).to.equal(5)
      expect(e.message).to.equal('hello')
      expect(e.severity).to.equal(99)
    })
    it('should instantiate with arguments correctly #10', function () {
      var e = new xError(5,{test: 123},99)
      expect(typeof e.stack === 'string').to.be.true
      expect(e.code).to.equal(5)
      expect(e.data.toString()).to.equal({test: 123}.toString())
      expect(e.severity).to.equal(99)
    })
    it('should push data into an undefined data object', function () {
      var e = new xError()
      expect(typeof e.stack === 'string').to.be.true
      expect(e.data).to.equal(undefined)

      e.pushData('newkey', 'newvalue')
      expect(e.data['newkey']).to.equal('newvalue')
    })
    it('should push data into a defined data object', function () {
      var e = new xError({ value: '123'})
      expect(typeof e.stack === 'string').to.be.true
      expect(e.data.value).to.equal('123')

      e.pushData('newkey', 'newvalue')
      expect(e.data['newkey']).to.equal('newvalue')
    })
    it('should push data into a defined data object', function () {
      var e = new xError({ value: '123'})
      expect(typeof e.stack === 'string').to.be.true
      expect(e.data.value).to.equal('123')

      e.pushData('newkey', 'newvalue')
      expect(e.data['newkey']).to.equal('newvalue')
    })
    it('should set httpCode', function () {
      var e = new xError()
      expect(typeof e.stack === 'string').to.be.true

      e.setHttpCode(500)
      expect(e.httpCode).to.equal(500)
    })
    it('should not set httpCode', function () {
      var e = new xError()
      expect(typeof e.stack === 'string').to.be.true
      e.setHttpCode('500')
      expect(e.httpCode).to.equal(undefined)
    })
    it('should not set httpResponse', function () {
      var e = new xError()
      expect(typeof e.stack === 'string').to.be.true
      e.setHttpResponse('an error has occured')
      expect(e.httpResponse).to.equal('an error has occured')
    })
    it('should be extended by the Error object', function () {
      var e = new Error('message')
      var ex = new xError()
      ex.extends(e)
      console.log(ex.stack)
      console.log(e.stack)

      expect(typeof e.stack === 'string').to.be.true
      expect(ex.message).to.equal('message')
      expect(ex.stack).to.equal(e.stack)
    })
  })

})