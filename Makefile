test:
	NODE_ENV=test ./node_modules/.bin/mocha --check-leaks \
		-w  \
		--reporter spec \
				test/*

.PHONY: test