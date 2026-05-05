Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../../utils/types.js');
const require_use_form_common_props = require('../../../form/src/hooks/use-form-common-props.js');
const require_constants = require('../constants.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/checkbox/src/composables/use-checkbox-status.ts
const useCheckboxStatus = (props, slots, { model }) => {
	const checkboxGroup = (0, vue.inject)(require_constants.checkboxGroupContextKey, void 0);
	const isFocused = (0, vue.ref)(false);
	const actualValue = (0, vue.computed)(() => {
		if (!require_types.isPropAbsent(props.value)) return props.value;
		return props.label;
	});
	const isChecked = (0, vue.computed)(() => {
		const value = model.value;
		if (require_types.isBoolean(value)) return value;
		else if ((0, _vue_shared.isArray)(value)) if ((0, _vue_shared.isObject)(actualValue.value)) return value.map(vue.toRaw).some((o) => (0, lodash_unified.isEqual)(o, actualValue.value));
		else return value.map(vue.toRaw).includes(actualValue.value);
		else if (value !== null && value !== void 0) return value === props.trueValue || value === props.trueLabel;
		else return !!value;
	});
	return {
		checkboxButtonSize: require_use_form_common_props.useFormSize((0, vue.computed)(() => checkboxGroup?.size?.value), { prop: true }),
		isChecked,
		isFocused,
		checkboxSize: require_use_form_common_props.useFormSize((0, vue.computed)(() => checkboxGroup?.size?.value)),
		hasOwnLabel: (0, vue.computed)(() => {
			return !!slots.default || !require_types.isPropAbsent(actualValue.value);
		}),
		actualValue
	};
};

//#endregion
exports.useCheckboxStatus = useCheckboxStatus;
//# sourceMappingURL=use-checkbox-status.js.map