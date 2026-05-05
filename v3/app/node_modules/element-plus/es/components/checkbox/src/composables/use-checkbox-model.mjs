import { UPDATE_MODEL_EVENT } from "../../../../constants/event.mjs";
import { isArray, isUndefined } from "../../../../utils/types.mjs";
import { checkboxGroupContextKey } from "../constants.mjs";
import { computed, getCurrentInstance, inject, ref } from "vue";

//#region ../../packages/components/checkbox/src/composables/use-checkbox-model.ts
const useCheckboxModel = (props) => {
	const selfModel = ref(false);
	const { emit, vnode } = getCurrentInstance();
	const checkboxGroup = inject(checkboxGroupContextKey, void 0);
	const isGroup = computed(() => isUndefined(checkboxGroup) === false);
	const isLimitExceeded = ref(false);
	const isControlled = computed(() => {
		const rawProps = vnode.props ?? {};
		return "modelValue" in rawProps || "model-value" in rawProps;
	});
	const model = computed({
		get() {
			return isGroup.value ? checkboxGroup?.modelValue?.value : !isControlled.value ? selfModel.value : props.modelValue;
		},
		set(val) {
			if (isGroup.value && isArray(val)) {
				isLimitExceeded.value = checkboxGroup?.max?.value !== void 0 && val.length > checkboxGroup?.max.value && val.length > model.value.length;
				isLimitExceeded.value === false && checkboxGroup?.changeEvent?.(val);
			} else {
				emit(UPDATE_MODEL_EVENT, val);
				selfModel.value = val;
			}
		}
	});
	return {
		model,
		isGroup,
		isLimitExceeded
	};
};

//#endregion
export { useCheckboxModel };
//# sourceMappingURL=use-checkbox-model.mjs.map