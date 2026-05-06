Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_typescript = require('../../../utils/typescript.js');
const require_index = require('../../../hooks/use-size/index.js');
const require_index$1 = require('../../../hooks/use-aria/index.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/input/src/input.ts
/**
* @deprecated Removed after 3.0.0, Use `InputProps` instead.
*/
const inputProps = require_runtime$1.buildProps({
	id: {
		type: String,
		default: void 0
	},
	size: require_index.useSizeProp,
	disabled: {
		type: Boolean,
		default: void 0
	},
	modelValue: {
		type: require_runtime$1.definePropType([
			String,
			Number,
			Object
		]),
		default: ""
	},
	modelModifiers: {
		type: require_runtime$1.definePropType(Object),
		default: () => ({})
	},
	maxlength: { type: [String, Number] },
	minlength: { type: [String, Number] },
	type: {
		type: require_runtime$1.definePropType(String),
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
		type: require_runtime$1.definePropType([Boolean, Object]),
		default: false
	},
	autocomplete: {
		type: require_runtime$1.definePropType(String),
		default: "off"
	},
	formatter: { type: Function },
	parser: { type: Function },
	placeholder: { type: String },
	form: { type: String },
	readonly: Boolean,
	clearable: Boolean,
	clearIcon: {
		type: require_icon.iconPropType,
		default: _element_plus_icons_vue.CircleClose
	},
	showPassword: Boolean,
	showWordLimit: Boolean,
	wordLimitPosition: {
		type: String,
		values: ["inside", "outside"],
		default: "inside"
	},
	suffixIcon: { type: require_icon.iconPropType },
	prefixIcon: { type: require_icon.iconPropType },
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
		type: require_runtime$1.definePropType([
			Object,
			Array,
			String
		]),
		default: () => require_typescript.mutable({})
	},
	countGraphemes: { type: require_runtime$1.definePropType(Function) },
	autofocus: Boolean,
	rows: {
		type: Number,
		default: 2
	},
	...require_index$1.useAriaProps(["ariaLabel"]),
	inputmode: {
		type: require_runtime$1.definePropType(String),
		default: void 0
	},
	name: String
});
const inputEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (value) => (0, _vue_shared.isString)(value),
	input: (value) => (0, _vue_shared.isString)(value),
	change: (value, evt) => (0, _vue_shared.isString)(value) && (evt instanceof Event || evt === void 0),
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
	clearIcon: (0, vue.markRaw)(_element_plus_icons_vue.CircleClose),
	wordLimitPosition: "inside",
	tabindex: 0,
	validateEvent: true,
	inputStyle: () => ({}),
	rows: 2
};

//#endregion
exports.inputEmits = inputEmits;
exports.inputProps = inputProps;
exports.inputPropsDefaults = inputPropsDefaults;
//# sourceMappingURL=input.js.map