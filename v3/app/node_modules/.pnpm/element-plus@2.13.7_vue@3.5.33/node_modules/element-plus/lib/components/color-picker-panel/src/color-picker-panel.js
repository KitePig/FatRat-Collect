Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
let lodash_unified = require("lodash-unified");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/color-picker-panel/src/color-picker-panel.ts
/**
* @deprecated Removed after 3.0.0, Use `ColorPickerPanelProps` instead.
*/
const colorPickerPanelProps = require_runtime$1.buildProps({
	modelValue: {
		type: require_runtime$1.definePropType(String),
		default: void 0
	},
	border: {
		type: Boolean,
		default: true
	},
	showAlpha: Boolean,
	colorFormat: { type: require_runtime$1.definePropType(String) },
	disabled: Boolean,
	predefine: { type: require_runtime$1.definePropType(Array) },
	validateEvent: {
		type: Boolean,
		default: true
	},
	hueSliderClass: { type: require_runtime$1.definePropType([
		String,
		Array,
		Object
	]) },
	hueSliderStyle: { type: require_runtime$1.definePropType([
		String,
		Array,
		Object
	]) }
});
const colorPickerPanelEmits = { [require_event.UPDATE_MODEL_EVENT]: (val) => (0, _vue_shared.isString)(val) || (0, lodash_unified.isNil)(val) };
const ROOT_COMMON_COLOR_INJECTION_KEY = Symbol("colorCommonPickerKey");
const colorPickerPanelContextKey = Symbol("colorPickerPanelContextKey");

//#endregion
exports.ROOT_COMMON_COLOR_INJECTION_KEY = ROOT_COMMON_COLOR_INJECTION_KEY;
exports.colorPickerPanelContextKey = colorPickerPanelContextKey;
exports.colorPickerPanelEmits = colorPickerPanelEmits;
exports.colorPickerPanelProps = colorPickerPanelProps;
//# sourceMappingURL=color-picker-panel.js.map