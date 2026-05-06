Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let memoize_one = require("memoize-one");
memoize_one = require_runtime.__toESM(memoize_one);

//#region ../../packages/components/virtual-list/src/hooks/use-cache.ts
const useCache = () => {
	const props = (0, vue.getCurrentInstance)().proxy.$props;
	return (0, vue.computed)(() => {
		const _getItemStyleCache = (_, __, ___) => ({});
		return props.perfMode ? (0, lodash_unified.memoize)(_getItemStyleCache) : (0, memoize_one.default)(_getItemStyleCache);
	});
};

//#endregion
exports.useCache = useCache;
//# sourceMappingURL=use-cache.js.map