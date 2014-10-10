test:
	./node_modules/.bin/mocha --reporter spec

jshint:
	./node_modules/.bin/jshint lib

.PHONY: test