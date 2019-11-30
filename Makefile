install-depencencies:
	rm -rf ./node_modules/ && npm i && cd ./functions && rm -rf ./node_modules/ && npm i && cd -

lint-functions:
	cd functions && npm run lint && cd ../

lint-storelocatorjs:
	npm run test:eslint && npm run test:stylelint