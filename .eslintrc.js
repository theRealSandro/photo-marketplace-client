module.exports = {
	env: {
		browser: true,
		es2020: true,
	},
	extends: [
		'plugin:vue/essential',
		'airbnb-base',
	],
	parserOptions: {
		ecmaVersion: 11,
		sourceType: 'module',
	},
	plugins: [
		'vue',
	],
	rules: {
		'no-new': 'off',
		'no-console': 'off',
		'no-tabs': 'off',
		indent: ['error', 'tab'],
	},
	settings: {
		'import/resolver': 'webpack',
	},
};
