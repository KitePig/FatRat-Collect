import { UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isBoolean, isNumber, isString } from "../../../utils/types.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { useAriaProps } from "../../../hooks/use-aria/index.mjs";

//#region ../../packages/components/checkbox/src/checkbox.ts
/**
* @deprecated Removed after 3.0.0, Use `CheckboxProps` instead.
*/
const checkboxProps = {
	modelValue: {
		type: [
			Number,
			String,
			Boolean
		],
		default: void 0
	},
	label: {
		type: [
			String,
			Boolean,
			Number,
			Object
		],
		default: void 0
	},
	value: {
		type: [
			String,
			Boolean,
			Number,
			Object
		],
		default: void 0
	},
	indeterminate: Boolean,
	disabled: {
		type: Boolean,
		default: void 0
	},
	checked: Boolean,
	name: {
		type: String,
		default: void 0
	},
	trueValue: {
		type: [String, Number],
		default: void 0
	},
	falseValue: {
		type: [String, Number],
		default: void 0
	},
	trueLabel: {
		type: [String, Number],
		default: void 0
	},
	falseLabel: {
		type: [String, Number],
		default: void 0
	},
	id: {
		type: String,
		default: void 0
	},
	border: Boolean,
	size: useSizeProp,
	tabindex: [String, Number],
	validateEvent: {
		type: Boolean,
		default: true
	},
	ariaLabel: String,
	...useAriaProps(["ariaControls"])
};
const checkboxEmits = {
	[UPDATE_MODEL_EVENT]: (val) => isString(val) || isNumber(val) || isBoolean(val),
	change: (val) => isString(val) || isNumber(val) || isBoolean(val)
};
const checkboxPropsDefaults = {
	modelValue: void 0,
	label: void 0,
	value: void 0,
	disabled: void 0,
	name: void 0,
	trueValue: void 0,
	falseValue: void 0,
	trueLabel: void 0,
	falseLabel: void 0,
	id: void 0,
	validateEvent: true
};

//#endregion
export { checkboxEmits, checkboxProps, checkboxPropsDefaults };
//# sourceMappingURL=checkbox.mjs.map