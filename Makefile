install-depencencies:
	rm -rf ./node_modules/ && npm i && cd ./local-server && rm -rf ./local-server/node_modules/ && npm i && cd -
