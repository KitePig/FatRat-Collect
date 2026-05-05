Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_error = require('../../utils/error.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");

//#region ../../packages/hooks/use-attrs/index.ts
const DEFAULT_EXCLUDE_KEYS = ["class", "style"];
const LISTENER_PREFIX = /^on[A-Z]/;
const useAttrs = (params = {}) => {
	const { excludeListeners = false, excludeKeys } = params;
	const allExcludeKeys = (0, vue.computed)(() => {
		return (excludeKeys?.value || []).concat(DEFAULT_EXCLUDE_KEYS);
	});
	const instance = (0, vue.getCurrentInstance)();
	if (!instance) {
		require_error.debugWarn("use-attrs", "getCurrentInstance() returned null. useAttrs() must be called at the top of a setup function");
		return (0, vue.computed)(() => ({}));
	}
	return (0, vue.computed)(() => (0, lodash_unified.fromPairs)(Object.entries(instance.proxy?.$attrs).filter(([key]) => !allExcludeKeys.value.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key)))));
};

//#endregion
exports.useAttrs = useAttrs;
//# sourceMappingURL=index.js.map