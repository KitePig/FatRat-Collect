Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_index = require('../../../hooks/use-size/index.js');
const require_index$1 = require('../../../hooks/use-empty-values/index.js');
const require_index$2 = require('../../../hooks/use-aria/index.js');
const require_content = require('../../tooltip/src/content.js');
let lodash_unified = require("lodash-unified");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/color-picker/src/color-picker.ts
/**
* @deprecated Removed after 3.0.0, Use `ColorPickerProps` instead.
*/
const colorPickerProps = require_runtime$1.buildProps({
	persistent: {
		type: Boolean,
		default: true
	},
	modelValue: {
		type: require_runtime$1.definePropType(String),
		default: void 0
	},
	id: String,
	showAlpha: Boolean,
	colorFormat: { type: require_runtime$1.definePropType(String) },
	disabled: {
		type: Boolean,
		default: void 0
	},
	clearable: {
		type: Boolean,
		default: true
	},
	size: require_index.useSizeProp,
	popperClass: require_content.useTooltipContentProps.popperClass,
	popperStyle: require_content.useTooltipContentProps.popperStyle,
	tabindex: {
		type: [String, Number],
		default: 0
	},
	teleported: require_content.useTooltipContentProps.teleported,
	appendTo: require_content.useTooltipContentProps.appendTo,
	predefine: { type: require_runtime$1.definePropType(Array) },
	validateEvent: {
		type: Boolean,
		default: true
	},
	...require_index$1.useEmptyValuesProps,
	...require_index$2.useAriaProps(["ariaLabel"])
});
const colorPickerEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (val) => (0, _vue_shared.isString)(val) || (0, lodash_unified.isNil)(val),
	[require_event.CHANGE_EVENT]: (val) => (0, _vue_shared.isString)(val) || (0, lodash_unified.isNil)(val),
	activeChange: (val) => (0, _vue_shared.isString)(val) || (0, lodash_unified.isNil)(val),
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent,
	clear: () => true
};
/**
* @description default values for ColorPickerProps, used in components that extend ColorPickerProps
*/
const colorPickerPropsDefaults = {
	persistent: true,
	modelValue: void 0,
	disabled: void 0,
	clearable: true,
	popperStyle: void 0,
	tabindex: 0,
	teleported: true,
	validateEvent: true,
	valueOnClear: void 0
};

//#endregion
exports.colorPickerEmits = colorPickerEmits;
exports.colorPickerProps = colorPickerProps;
exports.colorPickerPropsDefaults = colorPickerPropsDefaults;
//# sourceMappingURL=color-picker.js.map