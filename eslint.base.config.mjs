import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import jsdoc from 'eslint-plugin-jsdoc';

export default [
	{
		files: ['**/*.ts'],
		plugins: {
			jsdoc,
			tsPlugin,
		},

		languageOptions: {
			parser: tsParser,
		},

		"rules": {
			"semi": ["error", "always"],
			"indent": ["error", "tab", {
				"SwitchCase": 1,
			}],
			"keyword-spacing": ["error", {
				"overrides": {
					"if": {"after": false},
					"for": {"after": false},
					"while": {"after": false},
					"static": {"after": false},
					"catch": {"after": false},
					"as": {"after": false},
					"switch": {"after": false},
				}
			}],
			"object-curly-spacing": ["error", "always"],


			"jsdoc/require-jsdoc": [ "error", {
				"require": {
					"FunctionDeclaration": true,
					"MethodDefinition": true,
					"ClassDeclaration": false,
					"ArrowFunctionExpression": false,
					"FunctionExpression": true
				},
				"contexts": [
					{
						"context": "FunctionDeclaration",
						"inlineCommentBlock": true,
						"minLineCount": 12
					},
					{
						"context": "MethodDefinition",
						"inlineCommentBlock": true,
						"minLineCount": 12
					},
					{
						"context": "FunctionExpression",
						"inlineCommentBlock": false,
						"minLineCount": 12
					}
				]
			}
			],
			"jsdoc/require-returns": [ "off" ],
			"jsdoc/require-param": [ "off" ]
		}
	}
];
