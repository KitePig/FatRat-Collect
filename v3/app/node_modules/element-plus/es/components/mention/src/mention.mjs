import { UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isFunction, isObject, isString } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { useTooltipContentProps } from "../../tooltip/src/content.mjs";
import { inputProps } from "../../input/src/input.mjs";
import { filterOption } from "./helper.mjs";

//#region ../../packages/components/mention/src/mention.ts
/**
* @deprecated Removed after 3.0.0, Use `MentionProps` instead.
*/
const mentionProps = buildProps({
	...inputProps,
	options: {
		type: definePropType(Array),
		default: () => []
	},
	prefix: {
		type: definePropType([String, Array]),
		default: "@",
		validator: (val) => {
			if (isString(val)) return val.length === 1;
			return val.every((v) => isString(v) && v.length === 1);
		}
	},
	split: {
		type: String,
		default: " ",
		validator: (val) => val.length === 1
	},
	filterOption: {
		type: definePropType([Boolean, Function]),
		default: () => filterOption,
		validator: (val) => {
			if (val === false) return true;
			return isFunction(val);
		}
	},
	placement: {
		type: definePropType(String),
		default: "bottom"
	},
	showArrow: Boolean,
	offset: {
		type: Number,
		default: 0
	},
	whole: Boolean,
	checkIsWhole: { type: definePropType(Function) },
	modelValue: String,
	loading: Boolean,
	popperClass: useTooltipContentProps.popperClass,
	popperStyle: useTooltipContentProps.popperStyle,
	popperOptions: {
		type: definePropType(Object),
		default: () => ({})
	},
	props: {
		type: definePropType(Object),
		default: () => mentionDefaultProps
	}
});
const mentionEmits = {
	[UPDATE_MODEL_EVENT]: (value) => isString(value),
	"whole-remove": (pattern, prefix) => isString(pattern) && isString(prefix),
	input: (value) => isString(value),
	search: (pattern, prefix) => isString(pattern) && isString(prefix),
	select: (option, prefix) => isObject(option) && isString(prefix),
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent
};
const mentionDefaultProps = {
	value: "value",
	label: "label",
	disabled: "disabled"
};

//#endregion
export { mentionDefaultProps, mentionEmits, mentionProps };
//# sourceMappingURL=mention.mjs.map