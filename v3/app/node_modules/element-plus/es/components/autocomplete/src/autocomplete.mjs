import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isNumber, isObject, isString } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { NOOP } from "../../../utils/functions.mjs";
import { useTooltipContentProps } from "../../tooltip/src/content.mjs";
import { inputProps } from "../../input/src/input.mjs";

//#region ../../packages/components/autocomplete/src/autocomplete.ts
/**
* @deprecated Removed after 3.0.0, Use `AutocompleteProps` instead.
*/
const autocompleteProps = buildProps({
	...inputProps,
	valueKey: {
		type: String,
		default: "value"
	},
	modelValue: {
		type: [String, Number],
		default: ""
	},
	debounce: {
		type: Number,
		default: 300
	},
	placement: {
		type: definePropType(String),
		values: [
			"top",
			"top-start",
			"top-end",
			"bottom",
			"bottom-start",
			"bottom-end"
		],
		default: "bottom-start"
	},
	fetchSuggestions: {
		type: definePropType([Function, Array]),
		default: NOOP
	},
	popperClass: useTooltipContentProps.popperClass,
	popperStyle: useTooltipContentProps.popperStyle,
	triggerOnFocus: {
		type: Boolean,
		default: true
	},
	selectWhenUnmatched: Boolean,
	hideLoading: Boolean,
	teleported: useTooltipContentProps.teleported,
	appendTo: useTooltipContentProps.appendTo,
	highlightFirstItem: Boolean,
	fitInputWidth: Boolean,
	loopNavigation: {
		type: Boolean,
		default: true
	}
});
const autocompleteEmits = {
	[UPDATE_MODEL_EVENT]: (value) => isString(value) || isNumber(value),
	[INPUT_EVENT]: (value) => isString(value) || isNumber(value),
	[CHANGE_EVENT]: (value) => isString(value) || isNumber(value),
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent,
	clear: () => true,
	select: (item) => isObject(item)
};

//#endregion
export { autocompleteEmits, autocompleteProps };
//# sourceMappingURL=autocomplete.mjs.map