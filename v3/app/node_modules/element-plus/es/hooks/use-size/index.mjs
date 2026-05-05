import { componentSizes } from "../../constants/size.mjs";
import { buildProp } from "../../utils/vue/props/runtime.mjs";
import { computed, inject, unref } from "vue";

//#region ../../packages/hooks/use-size/index.ts
const useSizeProp = buildProp({
	type: String,
	values: componentSizes,
	required: false
});
const useSizeProps = { size: useSizeProp };
const SIZE_INJECTION_KEY = Symbol("size");
const useGlobalSize = () => {
	const injectedSize = inject(SIZE_INJECTION_KEY, {});
	return computed(() => {
		return unref(injectedSize.size) || "";
	});
};

//#endregion
export { SIZE_INJECTION_KEY, useGlobalSize, useSizeProp, useSizeProps };
//# sourceMappingURL=index.mjs.map