Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_index = require('../../../hooks/use-size/index.js');
const require_index$1 = require('../../../hooks/use-aria/index.js');
const require_radio = require('./radio.js');

//#region ../../packages/components/radio/src/radio-group.ts
const radioDefaultProps = {
	label: "label",
	value: "value",
	disabled: "disabled"
};
/**
* @deprecated Removed after 3.0.0, Use `RadioGroupProps` instead.
*/
const radioGroupProps = require_runtime.buildProps({
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
	options: { type: require_runtime.definePropType(Array) },
	props: {
		type: require_runtime.definePropType(Object),
		default: () => radioDefaultProps
	},
	type: {
		type: String,
		values: ["radio", "button"],
		default: "radio"
	},
	...require_index$1.useAriaProps(["ariaLabel"])
});
const radioGroupEmits = require_radio.radioEmits;
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
exports.radioDefaultProps = radioDefaultProps;
exports.radioGroupEmits = radioGroupEmits;
exports.radioGroupProps = radioGroupProps;
exports.radioGroupPropsDefaults = radioGroupPropsDefaults;
//# sourceMappingURL=radio-group.js.map