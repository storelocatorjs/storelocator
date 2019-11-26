install-depencencies:
	rm -rf ./node_modules/ && npm i && cd ./server && rm -rf ./server/node_modules/ && npm i && cd -
