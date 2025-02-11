import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import jsdoc from 'eslint-plugin-jsdoc';

export default [
	{
		files: ['**/*.ts'],
		plugins: {
			jsdoc,
			"@typescript-eslint": tsPlugin,
		},

		languageOptions: {
			parser: tsParser,
		},

		"rules": {
			"semi": ["error", "always"],
			"indent": ["error", "tab", {
				"SwitchCase": 1,
				"ignoredNodes": [
					"FunctionExpression > .params[decorators.length > 0]",
					"FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
					"ClassBody.body > PropertyDefinition[decorators.length > 0] > .key"
				]
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

			"space-before-blocks": "error",

			"padding-line-between-statements": [
				"error",
				{ "blankLine": "always", "prev": "*", "next": "function" }
			],

			"lines-around-comment": [
				"error", {
					"beforeBlockComment": true,
					"allowBlockStart": true,
					"allowObjectStart": true
				}
			],

			"operator-linebreak": [
				"error",
				"after" // Place the operator before the line break
			],

			"no-var": "off",
			"no-constant-condition": "off",
			"no-case-declarations": "off",
			"prefer-rest-params": "off",

			// TypeScript rules
			"@typescript-eslint/indent": [
				"error", "tab", {
					"SwitchCase": 1,
					"ignoredNodes": [
						"FunctionExpression > .params[decorators.length > 0]",
						"FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
						"ClassBody.body > PropertyDefinition[decorators.length > 0] > .key"
					]
				}
			],
			"@typescript-eslint/no-empty-interface": ["off"],
			"@typescript-eslint/no-var-requires": ["off"],
			"@typescript-eslint/no-empty-function": "off",
			"@typescript-eslint/no-inferrable-types": "off",
			"@typescript-eslint/ban-ts-comment": "off",


			// JSDoc rules
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
