import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isArray, isNumber } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { useAriaProps } from "../../../hooks/use-aria/index.mjs";
import { placements } from "@popperjs/core";

//#region ../../packages/components/slider/src/slider.ts
const sliderProps = buildProps({
	modelValue: {
		type: definePropType([Number, Array]),
		default: 0
	},
	id: {
		type: String,
		default: void 0
	},
	min: {
		type: Number,
		default: 0
	},
	max: {
		type: Number,
		default: 100
	},
	step: {
		type: definePropType([Number, String]),
		default: 1
	},
	showInput: Boolean,
	showInputControls: {
		type: Boolean,
		default: true
	},
	size: useSizeProp,
	inputSize: useSizeProp,
	showStops: Boolean,
	showTooltip: {
		type: Boolean,
		default: true
	},
	formatTooltip: {
		type: definePropType(Function),
		default: void 0
	},
	disabled: {
		type: Boolean,
		default: void 0
	},
	range: Boolean,
	vertical: Boolean,
	height: String,
	rangeStartLabel: {
		type: String,
		default: void 0
	},
	rangeEndLabel: {
		type: String,
		default: void 0
	},
	formatValueText: {
		type: definePropType(Function),
		default: void 0
	},
	tooltipClass: {
		type: String,
		default: void 0
	},
	placement: {
		type: String,
		values: placements,
		default: "top"
	},
	marks: { type: definePropType(Object) },
	validateEvent: {
		type: Boolean,
		default: true
	},
	persistent: {
		type: Boolean,
		default: true
	},
	...useAriaProps(["ariaLabel"])
});
const isValidValue = (value) => isNumber(value) || isArray(value) && value.every(isNumber);
const sliderEmits = {
	[UPDATE_MODEL_EVENT]: isValidValue,
	[INPUT_EVENT]: isValidValue,
	[CHANGE_EVENT]: isValidValue
};

//#endregion
export { sliderEmits, sliderProps };
//# sourceMappingURL=slider.mjs.map