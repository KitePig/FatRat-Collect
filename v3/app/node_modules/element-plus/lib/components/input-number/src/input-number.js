Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_index = require('../../../hooks/use-size/index.js');
const require_index$1 = require('../../../hooks/use-aria/index.js');
let lodash_unified = require("lodash-unified");

//#region ../../packages/components/input-number/src/input-number.ts
/**
* @deprecated Removed after 3.0.0, Use `InputNumberProps` instead.
*/
const inputNumberProps = require_runtime$1.buildProps({
	id: {
		type: String,
		default: void 0
	},
	step: {
		type: Number,
		default: 1
	},
	stepStrictly: Boolean,
	max: {
		type: Number,
		default: Number.MAX_SAFE_INTEGER
	},
	min: {
		type: Number,
		default: Number.MIN_SAFE_INTEGER
	},
	modelValue: { type: [Number, null] },
	readonly: Boolean,
	disabled: {
		type: Boolean,
		default: void 0
	},
	size: require_index.useSizeProp,
	controls: {
		type: Boolean,
		default: true
	},
	controlsPosition: {
		type: String,
		default: "",
		values: ["", "right"]
	},
	valueOnClear: {
		type: require_runtime$1.definePropType([
			String,
			Number,
			null
		]),
		validator: (val) => val === null || require_types.isNumber(val) || ["min", "max"].includes(val),
		default: null
	},
	name: String,
	placeholder: String,
	precision: {
		type: Number,
		validator: (val) => val >= 0 && val === Number.parseInt(`${val}`, 10)
	},
	validateEvent: {
		type: Boolean,
		default: true
	},
	...require_index$1.useAriaProps(["ariaLabel"]),
	inputmode: {
		type: require_runtime$1.definePropType(String),
		default: void 0
	},
	align: {
		type: require_runtime$1.definePropType(String),
		default: "center"
	},
	disabledScientific: Boolean
});
const inputNumberEmits = {
	[require_event.CHANGE_EVENT]: (cur, prev) => prev !== cur,
	blur: (e) => e instanceof FocusEvent,
	focus: (e) => e instanceof FocusEvent,
	[require_event.INPUT_EVENT]: (val) => require_types.isNumber(val) || (0, lodash_unified.isNil)(val),
	[require_event.UPDATE_MODEL_EVENT]: (val) => require_types.isNumber(val) || (0, lodash_unified.isNil)(val)
};

//#endregion
exports.inputNumberEmits = inputNumberEmits;
exports.inputNumberProps = inputNumberProps;
//# sourceMappingURL=input-number.js.map