Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_objects = require('../../../../utils/objects.js');
const require_error = require('../../../../utils/error.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../../../hooks/use-z-index/index.js');
const require_index$3 = require('../../../../hooks/use-size/index.js');
const require_index$4 = require('../../../../hooks/use-empty-values/index.js');
const require_constants = require('../constants.js');
let vue = require("vue");

//#region ../../packages/components/config-provider/src/hooks/use-global-config.ts
const globalConfig = (0, vue.ref)();
function useGlobalConfig(key, defaultValue = void 0) {
	const config = (0, vue.getCurrentInstance)() ? (0, vue.inject)(require_constants.configProviderContextKey, globalConfig) : globalConfig;
	if (key) return (0, vue.computed)(() => config.value?.[key] ?? defaultValue);
	else return config;
}
function useGlobalComponentSettings(block, sizeFallback) {
	const config = useGlobalConfig();
	const ns = require_index$1.useNamespace(block, (0, vue.computed)(() => config.value?.namespace || require_index$1.defaultNamespace));
	const locale = require_index.useLocale((0, vue.computed)(() => config.value?.locale));
	const zIndex = require_index$2.useZIndex((0, vue.computed)(() => config.value?.zIndex || require_index$2.defaultInitialZIndex));
	const size = (0, vue.computed)(() => (0, vue.unref)(sizeFallback) || config.value?.size || "");
	provideGlobalConfig((0, vue.computed)(() => (0, vue.unref)(config) || {}));
	return {
		ns,
		locale,
		zIndex,
		size
	};
}
const provideGlobalConfig = (config, app, global = false) => {
	const inSetup = !!(0, vue.getCurrentInstance)();
	const oldConfig = inSetup ? useGlobalConfig() : void 0;
	const provideFn = app?.provide ?? (inSetup ? vue.provide : void 0);
	if (!provideFn) {
		require_error.debugWarn("provideGlobalConfig", "provideGlobalConfig() can only be used inside setup().");
		return;
	}
	const context = (0, vue.computed)(() => {
		const cfg = (0, vue.unref)(config);
		if (!oldConfig?.value) return cfg;
		return mergeConfig(oldConfig.value, cfg);
	});
	provideFn(require_constants.configProviderContextKey, context);
	provideFn(require_index.localeContextKey, (0, vue.computed)(() => context.value.locale));
	provideFn(require_index$1.namespaceContextKey, (0, vue.computed)(() => context.value.namespace));
	provideFn(require_index$2.zIndexContextKey, (0, vue.computed)(() => context.value.zIndex));
	provideFn(require_index$3.SIZE_INJECTION_KEY, { size: (0, vue.computed)(() => context.value.size || "") });
	provideFn(require_index$4.emptyValuesContextKey, (0, vue.computed)(() => ({
		emptyValues: context.value.emptyValues,
		valueOnClear: context.value.valueOnClear
	})));
	if (global || !globalConfig.value) globalConfig.value = context.value;
	return context;
};
const mergeConfig = (a, b) => {
	const keys = [...new Set([...require_objects.keysOf(a), ...require_objects.keysOf(b)])];
	const obj = {};
	for (const key of keys) obj[key] = b[key] !== void 0 ? b[key] : a[key];
	return obj;
};

//#endregion
exports.provideGlobalConfig = provideGlobalConfig;
exports.useGlobalComponentSettings = useGlobalComponentSettings;
exports.useGlobalConfig = useGlobalConfig;
//# sourceMappingURL=use-global-config.js.map