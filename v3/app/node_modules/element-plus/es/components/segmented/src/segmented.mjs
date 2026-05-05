import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isBoolean, isNumber, isString } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { useAriaProps } from "../../../hooks/use-aria/index.mjs";

//#region ../../packages/components/segmented/src/segmented.ts
const defaultProps = {
	label: "label",
	value: "value",
	disabled: "disabled"
};
/**
* @deprecated Removed after 3.0.0, Use `SegmentedProps` instead.
*/
const segmentedProps = buildProps({
	direction: {
		type: definePropType(String),
		default: "horizontal"
	},
	options: {
		type: definePropType(Array),
		default: () => []
	},
	modelValue: {
		type: [
			String,
			Number,
			Boolean
		],
		default: void 0
	},
	props: {
		type: definePropType(Object),
		default: () => defaultProps
	},
	block: Boolean,
	size: useSizeProp,
	disabled: {
		type: Boolean,
		default: void 0
	},
	validateEvent: {
		type: Boolean,
		default: true
	},
	id: String,
	name: String,
	...useAriaProps(["ariaLabel"])
});
const segmentedEmits = {
	[UPDATE_MODEL_EVENT]: (val) => isString(val) || isNumber(val) || isBoolean(val),
	[CHANGE_EVENT]: (val) => isString(val) || isNumber(val) || isBoolean(val)
};

//#endregion
export { defaultProps, segmentedEmits, segmentedProps };
//# sourceMappingURL=segmented.mjs.map