const versionTarget = {
	"@typescript-eslint/parsereslint": "semver", // eslint >5 won't work with required plugins
	"@typescript-eslint/eslint-plugin": "semver",
	"@typescript-eslint/parser": "semver",
	"@stylistic/eslint-plugin-js": "semver",
	"eslint-plugin-jsdoc": "semver",
};

if(Object.keys(versionTarget).length) {
	console.log("");
	for (const pkg of Object.keys(versionTarget)) {
		console.warn(`${pkg}* uses ${versionTarget[pkg]}`);
	}
	console.log("");
}

module.exports = {
	"enginesNode": true,

	target: (name, semver) => {
		for(const pkg of Object.keys(versionTarget)) {
			if(name.startsWith(pkg)) {
				return versionTarget[pkg];
			}
		}

		return 'latest';
	},

	"reject": [
		"eslint",
	],
};
