import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { ESLint } from "eslint";
import base from "../eslint.base.config.mjs";

const cwd = fileURLToPath(new URL("../", import.meta.url));
const ruleId = "decorator-position/decorator-position";
const [bad, good] = await Promise.all([
	readFile(new URL("04-decorators-bad.ts", import.meta.url), "utf8"),
	readFile(new URL("05-decorators-good.ts", import.meta.url), "utf8"),
]);

// Exercise the exported config directly, without relying on a consumer's plugins.
const options = { cwd, overrideConfigFile: true, overrideConfig: base };
const eslint = new ESLint(options);

test("accepts decorators above properties, methods, getters and setters", async () => {
	const [result] = await eslint.lintText(good, { filePath: "test/example.ts" });
	assert.deepEqual(result.messages, []);
});

test("reports each inline decorator with the transferred rule", async () => {
	const [result] = await eslint.lintText(bad, { filePath: "test/example.ts" });
	assert.deepEqual(
		result.messages.map(({ ruleId, messageId, severity, line }) => ({ ruleId, messageId, severity, line })),
		[2, 4, 6, 8, 12, 16].map((line) => ({ ruleId, messageId: "expectedAbove", severity: 2, line })),
	);
	assert.equal(result.fixableErrorCount, 6);
});

test("autofix produces lint-clean code and is stable on a second pass", async () => {
	const fixer = new ESLint({ ...options, fix: true });
	const [fixed] = await fixer.lintText(bad, { filePath: "test/example.ts" });
	assert.ok(fixed.output);
	assert.deepEqual(fixed.messages, []);

	// The upstream fixer inserts spaces before properties, which the existing indent exception ignores.
	// Verify placement separately so this test does not promise tab-correct autofixes.
	assert.equal(fixed.output.replace(/^[ \t]+/gm, ""), good.replace(/^[ \t]+/gm, ""));
	const [secondPass] = await fixer.lintText(fixed.output, { filePath: "test/example.ts" });
	assert.deepEqual(secondPass.messages, []);
	assert.equal(secondPass.output, undefined);
});

test("preserves class and parameter decorators", async () => {
	const source = [
		"@entity class Example {",
		"\tconstructor(@inject service: Service) {}",
		"}",
		"",
	].join("\n");
	const [result] = await eslint.lintText(source, { filePath: "test/example.ts" });
	assert.deepEqual(result.messages, []);
});

test("supports consumers that apply the base rules to TSX", async () => {
	const tsxEslint = new ESLint({
		...options,
		overrideConfig: base.map((config) => ({ ...config, files: ["**/*.{ts,tsx}"] })),
	});
	const [valid] = await tsxEslint.lintText(good, { filePath: "test/example.tsx" });
	assert.deepEqual(valid.messages, []);

	const [invalid] = await tsxEslint.lintText(bad, { filePath: "test/example.tsx" });
	assert.equal(invalid.messages.length, 6);
	assert.ok(invalid.messages.every((message) => message.ruleId === ruleId));
});
