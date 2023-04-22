module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
	rules: {
		indentation: ['tab', { ignore: 'inside-parens' }],
		'unit-allowed-list': ['em', 'rem', '%', 'px', 's', 'deg', 'fr', 'vh', 'vw', 'ms'],
		'declaration-colon-newline-after': null,
		'value-list-comma-newline-after': null,
		'property-no-vendor-prefix': null,
		'selector-class-pattern': null,
		'custom-property-pattern': null,
		'no-irregular-whitespace': null,
		'selector-id-pattern': [
			'^([a-z][a-zA-Z0-9]*)(-[a-z][a-zA-Z0-9]+)?$',
			{
				message: 'Expected id selector to be FUN-case'
			}
		]
	}
}
