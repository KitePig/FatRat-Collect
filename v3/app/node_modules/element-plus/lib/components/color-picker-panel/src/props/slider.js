Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../utils/vue/props/runtime.js');

//#region ../../packages/components/color-picker-panel/src/props/slider.ts
/**
* @deprecated Removed after 3.0.0, Use `AlphaSliderProps` instead.
*/
const alphaSliderProps = require_runtime.buildProps({
	color: {
		type: require_runtime.definePropType(Object),
		required: true
	},
	vertical: Boolean,
	disabled: Boolean
});
/**
* @deprecated Removed after 3.0.0, Use `HueSliderProps` instead.
*/
const hueSliderProps = alphaSliderProps;

//#endregion
exports.alphaSliderProps = alphaSliderProps;
exports.hueSliderProps = hueSliderProps;
//# sourceMappingURL=slider.js.map