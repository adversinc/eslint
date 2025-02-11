import base from "./eslint.base.config.mjs";
import stylisticJs from '@stylistic/eslint-plugin-js'

/**
 * ESLint rules suitable for Node 18+ projects
 */
base[0].plugins['@stylistic/js'] = stylisticJs;

base[0].rules["@stylistic/js/indent"] = base[0].rules["indent"];
delete base[0].rules["indent"];

export default [
	...base
];
