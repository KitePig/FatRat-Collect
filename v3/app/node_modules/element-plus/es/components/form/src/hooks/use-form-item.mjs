import { useId } from "../../../../hooks/use-id/index.mjs";
import { formContextKey, formItemContextKey } from "../constants.mjs";
import { computed, getCurrentInstance, inject, onMounted, onUnmounted, ref, toRef, watch } from "vue";

//#region ../../packages/components/form/src/hooks/use-form-item.ts
const useFormItem = () => {
	return {
		form: inject(formContextKey, void 0),
		formItem: inject(formItemContextKey, void 0)
	};
};
const useFormItemInputId = (props, { formItemContext, disableIdGeneration, disableIdManagement }) => {
	if (!disableIdGeneration) disableIdGeneration = ref(false);
	if (!disableIdManagement) disableIdManagement = ref(false);
	const instance = getCurrentInstance();
	const inLabel = () => {
		let parent = instance?.parent;
		while (parent) {
			if (parent.type.name === "ElFormItem") return false;
			if (parent.type.name === "ElLabelWrap") return true;
			parent = parent.parent;
		}
		return false;
	};
	const inputId = ref();
	let idUnwatch = void 0;
	const isLabeledByFormItem = computed(() => {
		return !!(!(props.label || props.ariaLabel) && formItemContext && formItemContext.inputIds && formItemContext.inputIds?.length <= 1);
	});
	onMounted(() => {
		idUnwatch = watch([toRef(props, "id"), disableIdGeneration], ([id, disableIdGeneration]) => {
			const newId = id ?? (!disableIdGeneration ? useId().value : void 0);
			if (newId !== inputId.value) {
				if (formItemContext?.removeInputId && !inLabel()) {
					inputId.value && formItemContext.removeInputId(inputId.value);
					if (!disableIdManagement?.value && !disableIdGeneration && newId) formItemContext.addInputId(newId);
				}
				inputId.value = newId;
			}
		}, { immediate: true });
	});
	onUnmounted(() => {
		idUnwatch && idUnwatch();
		if (formItemContext?.removeInputId) inputId.value && formItemContext.removeInputId(inputId.value);
	});
	return {
		isLabeledByFormItem,
		inputId
	};
};

//#endregion
export { useFormItem, useFormItemInputId };
//# sourceMappingURL=use-form-item.mjs.map