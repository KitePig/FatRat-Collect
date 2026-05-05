Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
let vue = require("vue");

//#region ../../packages/hooks/use-namespace/index.ts
const defaultNamespace = "el";
const statePrefix = "is-";
const _bem = (namespace, block, blockSuffix, element, modifier) => {
	let cls = `${namespace}-${block}`;
	if (blockSuffix) cls += `-${blockSuffix}`;
	if (element) cls += `__${element}`;
	if (modifier) cls += `--${modifier}`;
	return cls;
};
const namespaceContextKey = Symbol("namespaceContextKey");
const useGetDerivedNamespace = (namespaceOverrides) => {
	const derivedNamespace = namespaceOverrides || ((0, vue.getCurrentInstance)() ? (0, vue.inject)(namespaceContextKey, (0, vue.ref)(defaultNamespace)) : (0, vue.ref)(defaultNamespace));
	return (0, vue.computed)(() => {
		return (0, vue.unref)(derivedNamespace) || defaultNamespace;
	});
};
const useNamespace = (block, namespaceOverrides) => {
	const namespace = useGetDerivedNamespace(namespaceOverrides);
	const b = (blockSuffix = "") => _bem(namespace.value, block, blockSuffix, "", "");
	const e = (element) => element ? _bem(namespace.value, block, "", element, "") : "";
	const m = (modifier) => modifier ? _bem(namespace.value, block, "", "", modifier) : "";
	const be = (blockSuffix, element) => blockSuffix && element ? _bem(namespace.value, block, blockSuffix, element, "") : "";
	const em = (element, modifier) => element && modifier ? _bem(namespace.value, block, "", element, modifier) : "";
	const bm = (blockSuffix, modifier) => blockSuffix && modifier ? _bem(namespace.value, block, blockSuffix, "", modifier) : "";
	const bem = (blockSuffix, element, modifier) => blockSuffix && element && modifier ? _bem(namespace.value, block, blockSuffix, element, modifier) : "";
	const is = (name, ...args) => {
		const state = args.length >= 1 ? args[0] : true;
		return name && state ? `${statePrefix}${name}` : "";
	};
	const cssVar = (object) => {
		const styles = {};
		for (const key in object) if (object[key]) styles[`--${namespace.value}-${key}`] = object[key];
		return styles;
	};
	const cssVarBlock = (object) => {
		const styles = {};
		for (const key in object) if (object[key]) styles[`--${namespace.value}-${block}-${key}`] = object[key];
		return styles;
	};
	const cssVarName = (name) => `--${namespace.value}-${name}`;
	const cssVarBlockName = (name) => `--${namespace.value}-${block}-${name}`;
	return {
		namespace,
		b,
		e,
		m,
		be,
		em,
		bm,
		bem,
		is,
		cssVar,
		cssVarName,
		cssVarBlock,
		cssVarBlockName
	};
};

//#endregion
exports.defaultNamespace = defaultNamespace;
exports.namespaceContextKey = namespaceContextKey;
exports.useGetDerivedNamespace = useGetDerivedNamespace;
exports.useNamespace = useNamespace;
//# sourceMappingURL=index.js.map