Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../../utils/types.js');
const require_constants = require('../../../form/src/constants.js');
const require_use_form_common_props = require('../../../form/src/hooks/use-form-common-props.js');
const require_constants$1 = require('../constants.js');
let vue = require("vue");

//#region ../../packages/components/checkbox/src/composables/use-checkbox-disabled.ts
const useCheckboxDisabled = ({ model, isChecked }) => {
	const checkboxGroup = (0, vue.inject)(require_constants$1.checkboxGroupContextKey, void 0);
	const formContext = (0, vue.inject)(require_constants.formContextKey, void 0);
	const isLimitDisabled = (0, vue.computed)(() => {
		const max = checkboxGroup?.max?.value;
		const min = checkboxGroup?.min?.value;
		return !require_types.isUndefined(max) && model.value.length >= max && !isChecked.value || !require_types.isUndefined(min) && model.value.length <= min && isChecked.value;
	});
	return {
		isDisabled: require_use_form_common_props.useFormDisabled((0, vue.computed)(() => {
			if (checkboxGroup === void 0) return formContext?.disabled ?? isLimitDisabled.value;
			else return checkboxGroup.disabled?.value || isLimitDisabled.value;
		})),
		isLimitDisabled
	};
};

//#endregion
exports.useCheckboxDisabled = useCheckboxDisabled;
//# sourceMappingURL=use-checkbox-disabled.js.map