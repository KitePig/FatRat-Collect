import { isUndefined } from "../../../../utils/types.mjs";
import { formContextKey } from "../../../form/src/constants.mjs";
import { useFormDisabled } from "../../../form/src/hooks/use-form-common-props.mjs";
import { checkboxGroupContextKey } from "../constants.mjs";
import { computed, inject } from "vue";

//#region ../../packages/components/checkbox/src/composables/use-checkbox-disabled.ts
const useCheckboxDisabled = ({ model, isChecked }) => {
	const checkboxGroup = inject(checkboxGroupContextKey, void 0);
	const formContext = inject(formContextKey, void 0);
	const isLimitDisabled = computed(() => {
		const max = checkboxGroup?.max?.value;
		const min = checkboxGroup?.min?.value;
		return !isUndefined(max) && model.value.length >= max && !isChecked.value || !isUndefined(min) && model.value.length <= min && isChecked.value;
	});
	return {
		isDisabled: useFormDisabled(computed(() => {
			if (checkboxGroup === void 0) return formContext?.disabled ?? isLimitDisabled.value;
			else return checkboxGroup.disabled?.value || isLimitDisabled.value;
		})),
		isLimitDisabled
	};
};

//#endregion
export { useCheckboxDisabled };
//# sourceMappingURL=use-checkbox-disabled.mjs.map