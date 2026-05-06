Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_index = require('../../../hooks/use-size/index.js');
const require_index$1 = require('../../../hooks/use-aria/index.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/checkbox/src/checkbox-group.ts
/**
* @deprecated Removed after 3.0.0, Use `CheckboxGroupProps` instead.
*/
const checkboxGroupProps = require_runtime$1.buildProps({
	modelValue: {
		type: require_runtime$1.definePropType(Array),
		default: () => []
	},
	disabled: {
		type: Boolean,
		default: void 0
	},
	min: Number,
	max: Number,
	size: require_index.useSizeProp,
	fill: String,
	textColor: String,
	tag: {
		type: String,
		default: "div"
	},
	validateEvent: {
		type: Boolean,
		default: true
	},
	options: { type: require_runtime$1.definePropType(Array) },
	props: {
		type: require_runtime$1.definePropType(Object),
		default: () => checkboxDefaultProps
	},
	type: {
		type: String,
		values: ["checkbox", "button"],
		default: "checkbox"
	},
	...require_index$1.useAriaProps(["ariaLabel"])
});
const checkboxGroupEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (val) => (0, _vue_shared.isArray)(val),
	change: (val) => (0, _vue_shared.isArray)(val)
};
const checkboxDefaultProps = {
	label: "label",
	value: "value",
	disabled: "disabled"
};

//#endregion
exports.checkboxDefaultProps = checkboxDefaultProps;
exports.checkboxGroupEmits = checkboxGroupEmits;
exports.checkboxGroupProps = checkboxGroupProps;
//# sourceMappingURL=checkbox-group.js.map