import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { radioPropsBase } from "./radio.mjs";

//#region ../../packages/components/radio/src/radio-button.ts
/**
* @deprecated Removed after 3.0.0, Use `RadioButtonProps` instead.
*/
const radioButtonProps = buildProps({ ...radioPropsBase });
/**
* @description default values for RadioButtonProps
*/
const radioButtonPropsDefaults = {
	modelValue: void 0,
	disabled: void 0,
	label: void 0,
	value: void 0,
	name: void 0
};

//#endregion
export { radioButtonProps, radioButtonPropsDefaults };
//# sourceMappingURL=radio-button.mjs.map