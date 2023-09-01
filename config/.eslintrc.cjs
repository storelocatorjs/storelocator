module.exports = {
	parser: '@babel/eslint-parser',
	parserOptions: {
		requireConfigFile: false,
		ecmaVersion: 6,
		ecmaFeatures: {
			impliedStrict: true,
			experimentalObjectRestSpread: true
		},
		sourceType: 'module'
	},

	env: {
		browser: true,
		node: true,
		es6: true
	},

	extends: ['standard', 'plugin:prettier/recommended'],

	rules: {
		indent: ['error', 'tab', { ignoredNodes: ['TemplateLiteral *'], SwitchCase: 1 }],
		'no-tabs': 0,
		'space-before-function-paren': [
			'error',
			{ anonymous: 'always', named: 'never', asyncArrow: 'always' }
		],
		'linebreak-style': ['error', 'unix']
	},

	globals: {
		document: false,
		navigator: false,
		window: false
	},

	ignorePatterns: ['node_modules', 'dist', 'src/core/check.js']
}
