import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isNumber } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { useAriaProps } from "../../../hooks/use-aria/index.mjs";
import { isNil } from "lodash-unified";

//#region ../../packages/components/input-number/src/input-number.ts
/**
* @deprecated Removed after 3.0.0, Use `InputNumberProps` instead.
*/
const inputNumberProps = buildProps({
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
	size: useSizeProp,
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
		type: definePropType([
			String,
			Number,
			null
		]),
		validator: (val) => val === null || isNumber(val) || ["min", "max"].includes(val),
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
	...useAriaProps(["ariaLabel"]),
	inputmode: {
		type: definePropType(String),
		default: void 0
	},
	align: {
		type: definePropType(String),
		default: "center"
	},
	disabledScientific: Boolean
});
const inputNumberEmits = {
	[CHANGE_EVENT]: (cur, prev) => prev !== cur,
	blur: (e) => e instanceof FocusEvent,
	focus: (e) => e instanceof FocusEvent,
	[INPUT_EVENT]: (val) => isNumber(val) || isNil(val),
	[UPDATE_MODEL_EVENT]: (val) => isNumber(val) || isNil(val)
};

//#endregion
export { inputNumberEmits, inputNumberProps };
//# sourceMappingURL=input-number.mjs.map