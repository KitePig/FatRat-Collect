import { isArray, isBoolean, isObject, isPropAbsent } from "../../../../utils/types.mjs";
import { useFormSize } from "../../../form/src/hooks/use-form-common-props.mjs";
import { checkboxGroupContextKey } from "../constants.mjs";
import { isEqual } from "lodash-unified";
import { computed, inject, ref, toRaw } from "vue";

//#region ../../packages/components/checkbox/src/composables/use-checkbox-status.ts
const useCheckboxStatus = (props, slots, { model }) => {
	const checkboxGroup = inject(checkboxGroupContextKey, void 0);
	const isFocused = ref(false);
	const actualValue = computed(() => {
		if (!isPropAbsent(props.value)) return props.value;
		return props.label;
	});
	const isChecked = computed(() => {
		const value = model.value;
		if (isBoolean(value)) return value;
		else if (isArray(value)) if (isObject(actualValue.value)) return value.map(toRaw).some((o) => isEqual(o, actualValue.value));
		else return value.map(toRaw).includes(actualValue.value);
		else if (value !== null && value !== void 0) return value === props.trueValue || value === props.trueLabel;
		else return !!value;
	});
	return {
		checkboxButtonSize: useFormSize(computed(() => checkboxGroup?.size?.value), { prop: true }),
		isChecked,
		isFocused,
		checkboxSize: useFormSize(computed(() => checkboxGroup?.size?.value)),
		hasOwnLabel: computed(() => {
			return !!slots.default || !isPropAbsent(actualValue.value);
		}),
		actualValue
	};
};

//#endregion
export { useCheckboxStatus };
//# sourceMappingURL=use-checkbox-status.mjs.map