const tsPlugin = require("@typescript-eslint/eslint-plugin");
const jsdocPlugin = require("eslint-plugin-jsdoc");
const pluginVue = require('eslint-plugin-vue');

module.exports = [
	jsdocPlugin.configs['flat/recommended'],
	...pluginVue.configs['flat/recommended'],

	{
		//parser: "vue-eslint-parser",
		languageOptions: {
			//parser: tsParser,
			parserOptions: {
				parser: "@typescript-eslint/parser",
				sourceType: "module"
			},

		},
		"plugins": {tsPlugin, jsdocPlugin},
		files: ['**/*.{ts,vue}'],

		"rules": {
			"semi": ["error", "always"],
			"indent": ["error", "tab"],
			"keyword-spacing": ["error", { "overrides": {
					"if": { "after": false },
					"for": { "after": false },
					"while": { "after": false },
					"static": { "after": false },
					"catch": { "after": false },
					"as": { "after": false }
				} }],
			"object-curly-spacing": ["error", "always"],

			"jsdoc/require-jsdoc": ["error"],
			"jsdoc/require-returns": ["off"],
			"jsdoc/require-param": ["off"],

			"vue/html-indent": ["error", "tab"],
			"vue/singleline-html-element-content-newline": ["off"],
			"vue/max-attributes-per-line": ["off"],
			"vue/html-self-closing": ["off"],
			"vue/html-closing-bracket-spacing": ["off"],
			"vue/multi-word-component-names": ["off"],
			"vue/mustache-interpolation-spacing": ["off"],

			// Probably should be enabled later:
			"vue/require-explicit-emits": ["off"],
			"vue/no-async-in-computed-properties": ["off"],
			"vue/attribute-hyphenation": ["off"],
			"vue/attributes-order": ["off"],
			"vue/require-default-prop": ["off"],
		}
	}
];
