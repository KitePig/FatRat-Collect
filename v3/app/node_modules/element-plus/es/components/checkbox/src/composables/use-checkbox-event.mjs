import { CHANGE_EVENT } from "../../../../constants/event.mjs";
import { debugWarn } from "../../../../utils/error.mjs";
import { useFormItem } from "../../../form/src/hooks/use-form-item.mjs";
import { checkboxGroupContextKey } from "../constants.mjs";
import { computed, getCurrentInstance, inject, nextTick, watch } from "vue";

//#region ../../packages/components/checkbox/src/composables/use-checkbox-event.ts
const useCheckboxEvent = (props, { model, isLimitExceeded, hasOwnLabel, isDisabled, isLabeledByFormItem }) => {
	const checkboxGroup = inject(checkboxGroupContextKey, void 0);
	const { formItem } = useFormItem();
	const { emit } = getCurrentInstance();
	function getLabeledValue(value) {
		return [
			true,
			props.trueValue,
			props.trueLabel
		].includes(value) ? props.trueValue ?? props.trueLabel ?? true : props.falseValue ?? props.falseLabel ?? false;
	}
	function emitChangeEvent(checked, e) {
		emit(CHANGE_EVENT, getLabeledValue(checked), e);
	}
	function handleChange(e) {
		if (isLimitExceeded.value) return;
		const target = e.target;
		emit(CHANGE_EVENT, getLabeledValue(target.checked), e);
	}
	async function onClickRoot(e) {
		if (isLimitExceeded.value) return;
		if (!hasOwnLabel.value && !isDisabled.value && isLabeledByFormItem.value) {
			if (!e.composedPath().some((item) => item.tagName === "LABEL")) {
				model.value = getLabeledValue([
					false,
					props.falseValue,
					props.falseLabel
				].includes(model.value));
				await nextTick();
				emitChangeEvent(model.value, e);
			}
		}
	}
	const validateEvent = computed(() => checkboxGroup?.validateEvent || props.validateEvent);
	watch(() => props.modelValue, () => {
		if (validateEvent.value) formItem?.validate("change").catch((err) => debugWarn(err));
	});
	return {
		handleChange,
		onClickRoot
	};
};

//#endregion
export { useCheckboxEvent };
//# sourceMappingURL=use-checkbox-event.mjs.map