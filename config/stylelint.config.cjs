module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
	rules: {
		'unit-allowed-list': ['em', 'rem', '%', 'px', 's', 'deg', 'fr', 'vh', 'vw', 'ms'],
		'declaration-colon-newline-after': null,
		'value-list-comma-newline-after': null,
		'custom-property-pattern': [
			'^sl(-[a-zA-Z]+)?$',
			{
				message: 'Expected custom property name to be FUN-case with prefix "sl-"'
			}
		],
		'selector-class-pattern': [
			'^sl(-[a-zA-Z0-9]+)?$',
			{
				message: 'Expected class selector to be FUN-case with prefix "sl-"'
			}
		]
	}
}
