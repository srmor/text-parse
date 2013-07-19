test:
	NODE_ENV=test ./node_modules/.bin/mocha --check-leaks \
		-w  \
		--reporter dot matrix \
				test/*

.PHONY: test