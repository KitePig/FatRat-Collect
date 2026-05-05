Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_index = require('../../../hooks/use-size/index.js');
const require_index$1 = require('../../../hooks/use-aria/index.js');
let _vue_shared = require("@vue/shared");

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
	size: require_index.useSizeProp,
	tabindex: [String, Number],
	validateEvent: {
		type: Boolean,
		default: true
	},
	ariaLabel: String,
	...require_index$1.useAriaProps(["ariaControls"])
};
const checkboxEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (val) => (0, _vue_shared.isString)(val) || require_types.isNumber(val) || require_types.isBoolean(val),
	change: (val) => (0, _vue_shared.isString)(val) || require_types.isNumber(val) || require_types.isBoolean(val)
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
exports.checkboxEmits = checkboxEmits;
exports.checkboxProps = checkboxProps;
exports.checkboxPropsDefaults = checkboxPropsDefaults;
//# sourceMappingURL=checkbox.js.map