import { buildProps, definePropType } from "../../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/color-picker-panel/src/props/slider.ts
/**
* @deprecated Removed after 3.0.0, Use `AlphaSliderProps` instead.
*/
const alphaSliderProps = buildProps({
	color: {
		type: definePropType(Object),
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
export { alphaSliderProps, hueSliderProps };
//# sourceMappingURL=slider.mjs.map