import base from "./eslint.base.config.mjs";

if(!base[0].ignores) {
	base[0].ignores = [];
}
base[0].ignores.push("**/.meteor/");

export default [
	...base,
	{
		ignores: [".meteor/", "packages/"]
	}
];
