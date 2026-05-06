import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isBoolean, isNumber, isString } from "../../../utils/types.mjs";
import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";

//#region ../../packages/components/radio/src/radio.ts
/**
* @deprecated Removed after 3.0.0, Use `RadioPropsBase` instead.
*/
const radioPropsBase = buildProps({
	modelValue: {
		type: [
			String,
			Number,
			Boolean
		],
		default: void 0
	},
	size: useSizeProp,
	disabled: {
		type: Boolean,
		default: void 0
	},
	label: {
		type: [
			String,
			Number,
			Boolean
		],
		default: void 0
	},
	value: {
		type: [
			String,
			Number,
			Boolean
		],
		default: void 0
	},
	name: {
		type: String,
		default: void 0
	}
});
/**
* @deprecated Removed after 3.0.0, Use `RadioProps` instead.
*/
const radioProps = buildProps({
	...radioPropsBase,
	border: Boolean
});
const radioEmits = {
	[UPDATE_MODEL_EVENT]: (val) => isString(val) || isNumber(val) || isBoolean(val),
	[CHANGE_EVENT]: (val) => isString(val) || isNumber(val) || isBoolean(val)
};
/**
* @description default values for RadioProps
*/
const radioPropsDefaults = {
	modelValue: void 0,
	disabled: void 0,
	label: void 0,
	value: void 0,
	name: void 0,
	border: false
};

//#endregion
export { radioEmits, radioProps, radioPropsBase, radioPropsDefaults };
//# sourceMappingURL=radio.mjs.map