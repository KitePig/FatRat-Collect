import { useProp } from "../../../../hooks/use-prop/index.mjs";
import { useGlobalSize } from "../../../../hooks/use-size/index.mjs";
import { formContextKey, formItemContextKey } from "../constants.mjs";
import { computed, inject, ref, unref } from "vue";

//#region ../../packages/components/form/src/hooks/use-form-common-props.ts
const useFormSize = (fallback, ignore = {}) => {
	const emptyRef = ref(void 0);
	const size = ignore.prop ? emptyRef : useProp("size");
	const globalConfig = ignore.global ? emptyRef : useGlobalSize();
	const form = ignore.form ? { size: void 0 } : inject(formContextKey, void 0);
	const formItem = ignore.formItem ? { size: void 0 } : inject(formItemContextKey, void 0);
	return computed(() => size.value || unref(fallback) || formItem?.size || form?.size || globalConfig.value || "");
};
const useFormDisabled = (fallback) => {
	const disabled = useProp("disabled");
	const form = inject(formContextKey, void 0);
	return computed(() => {
		return disabled.value ?? unref(fallback) ?? form?.disabled ?? false;
	});
};
const useSize = useFormSize;
const useDisabled = useFormDisabled;

//#endregion
export { useDisabled, useFormDisabled, useFormSize, useSize };
//# sourceMappingURL=use-form-common-props.mjs.map