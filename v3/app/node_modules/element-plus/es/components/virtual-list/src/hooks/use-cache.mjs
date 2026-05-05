import { memoize } from "lodash-unified";
import { computed, getCurrentInstance } from "vue";
import memoOne from "memoize-one";

//#region ../../packages/components/virtual-list/src/hooks/use-cache.ts
const useCache = () => {
	const props = getCurrentInstance().proxy.$props;
	return computed(() => {
		const _getItemStyleCache = (_, __, ___) => ({});
		return props.perfMode ? memoize(_getItemStyleCache) : memoOne(_getItemStyleCache);
	});
};

//#endregion
export { useCache };
//# sourceMappingURL=use-cache.mjs.map