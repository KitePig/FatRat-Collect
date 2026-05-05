import { keysOf } from "../../../../utils/objects.mjs";
import { debugWarn } from "../../../../utils/error.mjs";
import { localeContextKey, useLocale } from "../../../../hooks/use-locale/index.mjs";
import { defaultNamespace, namespaceContextKey, useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { defaultInitialZIndex, useZIndex, zIndexContextKey } from "../../../../hooks/use-z-index/index.mjs";
import { SIZE_INJECTION_KEY } from "../../../../hooks/use-size/index.mjs";
import { emptyValuesContextKey } from "../../../../hooks/use-empty-values/index.mjs";
import { configProviderContextKey } from "../constants.mjs";
import { computed, getCurrentInstance, inject, provide, ref, unref } from "vue";

//#region ../../packages/components/config-provider/src/hooks/use-global-config.ts
const globalConfig = ref();
function useGlobalConfig(key, defaultValue = void 0) {
	const config = getCurrentInstance() ? inject(configProviderContextKey, globalConfig) : globalConfig;
	if (key) return computed(() => config.value?.[key] ?? defaultValue);
	else return config;
}
function useGlobalComponentSettings(block, sizeFallback) {
	const config = useGlobalConfig();
	const ns = useNamespace(block, computed(() => config.value?.namespace || defaultNamespace));
	const locale = useLocale(computed(() => config.value?.locale));
	const zIndex = useZIndex(computed(() => config.value?.zIndex || defaultInitialZIndex));
	const size = computed(() => unref(sizeFallback) || config.value?.size || "");
	provideGlobalConfig(computed(() => unref(config) || {}));
	return {
		ns,
		locale,
		zIndex,
		size
	};
}
const provideGlobalConfig = (config, app, global = false) => {
	const inSetup = !!getCurrentInstance();
	const oldConfig = inSetup ? useGlobalConfig() : void 0;
	const provideFn = app?.provide ?? (inSetup ? provide : void 0);
	if (!provideFn) {
		debugWarn("provideGlobalConfig", "provideGlobalConfig() can only be used inside setup().");
		return;
	}
	const context = computed(() => {
		const cfg = unref(config);
		if (!oldConfig?.value) return cfg;
		return mergeConfig(oldConfig.value, cfg);
	});
	provideFn(configProviderContextKey, context);
	provideFn(localeContextKey, computed(() => context.value.locale));
	provideFn(namespaceContextKey, computed(() => context.value.namespace));
	provideFn(zIndexContextKey, computed(() => context.value.zIndex));
	provideFn(SIZE_INJECTION_KEY, { size: computed(() => context.value.size || "") });
	provideFn(emptyValuesContextKey, computed(() => ({
		emptyValues: context.value.emptyValues,
		valueOnClear: context.value.valueOnClear
	})));
	if (global || !globalConfig.value) globalConfig.value = context.value;
	return context;
};
const mergeConfig = (a, b) => {
	const keys = [...new Set([...keysOf(a), ...keysOf(b)])];
	const obj = {};
	for (const key of keys) obj[key] = b[key] !== void 0 ? b[key] : a[key];
	return obj;
};

//#endregion
export { provideGlobalConfig, useGlobalComponentSettings, useGlobalConfig };
//# sourceMappingURL=use-global-config.mjs.map