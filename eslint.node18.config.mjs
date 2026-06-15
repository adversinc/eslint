import base from "./eslint.base.config.mjs";
import stylistic from "@stylistic/eslint-plugin";

/**
 * ESLint rules suitable for Node 18+ projects
 */
base[0].plugins["@stylistic"] = stylistic;

base[0].rules["@stylistic/indent"] = base[0].rules["indent"];
delete base[0].rules["indent"];

export default [
	...base
];
