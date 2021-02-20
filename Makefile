install:
	nodeenv env
	. env/bin/activate
	 env/bin/npm install package.json

run:
	env/bin/node v1/proxy.js
