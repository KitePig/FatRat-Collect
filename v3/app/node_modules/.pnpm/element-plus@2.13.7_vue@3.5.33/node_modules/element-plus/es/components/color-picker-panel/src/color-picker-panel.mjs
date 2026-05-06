import { UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isString } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { isNil } from "lodash-unified";

//#region ../../packages/components/color-picker-panel/src/color-picker-panel.ts
/**
* @deprecated Removed after 3.0.0, Use `ColorPickerPanelProps` instead.
*/
const colorPickerPanelProps = buildProps({
	modelValue: {
		type: definePropType(String),
		default: void 0
	},
	border: {
		type: Boolean,
		default: true
	},
	showAlpha: Boolean,
	colorFormat: { type: definePropType(String) },
	disabled: Boolean,
	predefine: { type: definePropType(Array) },
	validateEvent: {
		type: Boolean,
		default: true
	},
	hueSliderClass: { type: definePropType([
		String,
		Array,
		Object
	]) },
	hueSliderStyle: { type: definePropType([
		String,
		Array,
		Object
	]) }
});
const colorPickerPanelEmits = { [UPDATE_MODEL_EVENT]: (val) => isString(val) || isNil(val) };
const ROOT_COMMON_COLOR_INJECTION_KEY = Symbol("colorCommonPickerKey");
const colorPickerPanelContextKey = Symbol("colorPickerPanelContextKey");

//#endregion
export { ROOT_COMMON_COLOR_INJECTION_KEY, colorPickerPanelContextKey, colorPickerPanelEmits, colorPickerPanelProps };
//# sourceMappingURL=color-picker-panel.mjs.map