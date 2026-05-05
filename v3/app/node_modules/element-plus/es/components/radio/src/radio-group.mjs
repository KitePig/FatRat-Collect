import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { useAriaProps } from "../../../hooks/use-aria/index.mjs";
import { radioEmits } from "./radio.mjs";

//#region ../../packages/components/radio/src/radio-group.ts
const radioDefaultProps = {
	label: "label",
	value: "value",
	disabled: "disabled"
};
/**
* @deprecated Removed after 3.0.0, Use `RadioGroupProps` instead.
*/
const radioGroupProps = buildProps({
	id: {
		type: String,
		default: void 0
	},
	size: useSizeProp,
	disabled: {
		type: Boolean,
		default: void 0
	},
	modelValue: {
		type: [
			String,
			Number,
			Boolean
		],
		default: void 0
	},
	fill: {
		type: String,
		default: ""
	},
	textColor: {
		type: String,
		default: ""
	},
	name: {
		type: String,
		default: void 0
	},
	validateEvent: {
		type: Boolean,
		default: true
	},
	options: { type: definePropType(Array) },
	props: {
		type: definePropType(Object),
		default: () => radioDefaultProps
	},
	type: {
		type: String,
		values: ["radio", "button"],
		default: "radio"
	},
	...useAriaProps(["ariaLabel"])
});
const radioGroupEmits = radioEmits;
/**
* @description default values for RadioGroupProps
*/
const radioGroupPropsDefaults = {
	id: void 0,
	disabled: void 0,
	modelValue: void 0,
	fill: "",
	textColor: "",
	name: void 0,
	validateEvent: true,
	props: () => radioDefaultProps,
	type: "radio"
};

//#endregion
export { radioDefaultProps, radioGroupEmits, radioGroupProps, radioGroupPropsDefaults };
//# sourceMappingURL=radio-group.mjs.map