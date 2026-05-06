Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_types = require('../../utils/types.js');
const require_error = require('../../utils/error.js');
let vue = require("vue");
let _vueuse_core = require("@vueuse/core");

//#region ../../packages/hooks/use-z-index/index.ts
const initial = { current: 0 };
const zIndex = (0, vue.ref)(0);
const defaultInitialZIndex = 2e3;
const ZINDEX_INJECTION_KEY = Symbol("elZIndexContextKey");
const zIndexContextKey = Symbol("zIndexContextKey");
const useZIndex = (zIndexOverrides) => {
	const increasingInjection = (0, vue.getCurrentInstance)() ? (0, vue.inject)(ZINDEX_INJECTION_KEY, initial) : initial;
	const zIndexInjection = zIndexOverrides || ((0, vue.getCurrentInstance)() ? (0, vue.inject)(zIndexContextKey, void 0) : void 0);
	const initialZIndex = (0, vue.computed)(() => {
		const zIndexFromInjection = (0, vue.unref)(zIndexInjection);
		return require_types.isNumber(zIndexFromInjection) ? zIndexFromInjection : defaultInitialZIndex;
	});
	const currentZIndex = (0, vue.computed)(() => initialZIndex.value + zIndex.value);
	const nextZIndex = () => {
		increasingInjection.current++;
		zIndex.value = increasingInjection.current;
		return currentZIndex.value;
	};
	if (!_vueuse_core.isClient && !(0, vue.inject)(ZINDEX_INJECTION_KEY)) require_error.debugWarn("ZIndexInjection", `Looks like you are using server rendering, you must provide a z-index provider to ensure the hydration process to be succeed
usage: app.provide(ZINDEX_INJECTION_KEY, { current: 0 })`);
	return {
		initialZIndex,
		currentZIndex,
		nextZIndex
	};
};

//#endregion
exports.ZINDEX_INJECTION_KEY = ZINDEX_INJECTION_KEY;
exports.defaultInitialZIndex = defaultInitialZIndex;
exports.useZIndex = useZIndex;
exports.zIndexContextKey = zIndexContextKey;
//# sourceMappingURL=index.js.map