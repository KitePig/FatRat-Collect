import { UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isString } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
import { mutable } from "../../../utils/typescript.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { useAriaProps } from "../../../hooks/use-aria/index.mjs";
import { CircleClose } from "@element-plus/icons-vue";
import { markRaw } from "vue";

//#region ../../packages/components/input/src/input.ts
/**
* @deprecated Removed after 3.0.0, Use `InputProps` instead.
*/
const inputProps = buildProps({
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
		type: definePropType([
			String,
			Number,
			Object
		]),
		default: ""
	},
	modelModifiers: {
		type: definePropType(Object),
		default: () => ({})
	},
	maxlength: { type: [String, Number] },
	minlength: { type: [String, Number] },
	type: {
		type: definePropType(String),
		default: "text"
	},
	resize: {
		type: String,
		values: [
			"none",
			"both",
			"horizontal",
			"vertical"
		]
	},
	autosize: {
		type: definePropType([Boolean, Object]),
		default: false
	},
	autocomplete: {
		type: definePropType(String),
		default: "off"
	},
	formatter: { type: Function },
	parser: { type: Function },
	placeholder: { type: String },
	form: { type: String },
	readonly: Boolean,
	clearable: Boolean,
	clearIcon: {
		type: iconPropType,
		default: CircleClose
	},
	showPassword: Boolean,
	showWordLimit: Boolean,
	wordLimitPosition: {
		type: String,
		values: ["inside", "outside"],
		default: "inside"
	},
	suffixIcon: { type: iconPropType },
	prefixIcon: { type: iconPropType },
	containerRole: {
		type: String,
		default: void 0
	},
	tabindex: {
		type: [String, Number],
		default: 0
	},
	validateEvent: {
		type: Boolean,
		default: true
	},
	inputStyle: {
		type: definePropType([
			Object,
			Array,
			String
		]),
		default: () => mutable({})
	},
	countGraphemes: { type: definePropType(Function) },
	autofocus: Boolean,
	rows: {
		type: Number,
		default: 2
	},
	...useAriaProps(["ariaLabel"]),
	inputmode: {
		type: definePropType(String),
		default: void 0
	},
	name: String
});
const inputEmits = {
	[UPDATE_MODEL_EVENT]: (value) => isString(value),
	input: (value) => isString(value),
	change: (value, evt) => isString(value) && (evt instanceof Event || evt === void 0),
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent,
	clear: (evt) => evt === void 0 || evt instanceof MouseEvent,
	mouseleave: (evt) => evt instanceof MouseEvent,
	mouseenter: (evt) => evt instanceof MouseEvent,
	keydown: (evt) => evt instanceof Event,
	compositionstart: (evt) => evt instanceof CompositionEvent,
	compositionupdate: (evt) => evt instanceof CompositionEvent,
	compositionend: (evt) => evt instanceof CompositionEvent
};
/**
* @description default values for InputProps, used in components that extend InputProps like Autocomplete
*/
const inputPropsDefaults = {
	disabled: void 0,
	modelValue: "",
	modelModifiers: () => ({}),
	type: "text",
	autocomplete: "off",
	clearIcon: markRaw(CircleClose),
	wordLimitPosition: "inside",
	tabindex: 0,
	validateEvent: true,
	inputStyle: () => ({}),
	rows: 2
};

//#endregion
export { inputEmits, inputProps, inputPropsDefaults };
//# sourceMappingURL=input.mjs.map