import { debugWarn } from "../../utils/error.mjs";
import { fromPairs } from "lodash-unified";
import { computed, getCurrentInstance } from "vue";

//#region ../../packages/hooks/use-attrs/index.ts
const DEFAULT_EXCLUDE_KEYS = ["class", "style"];
const LISTENER_PREFIX = /^on[A-Z]/;
const useAttrs = (params = {}) => {
	const { excludeListeners = false, excludeKeys } = params;
	const allExcludeKeys = computed(() => {
		return (excludeKeys?.value || []).concat(DEFAULT_EXCLUDE_KEYS);
	});
	const instance = getCurrentInstance();
	if (!instance) {
		debugWarn("use-attrs", "getCurrentInstance() returned null. useAttrs() must be called at the top of a setup function");
		return computed(() => ({}));
	}
	return computed(() => fromPairs(Object.entries(instance.proxy?.$attrs).filter(([key]) => !allExcludeKeys.value.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key)))));
};

//#endregion
export { useAttrs };
//# sourceMappingURL=index.mjs.map