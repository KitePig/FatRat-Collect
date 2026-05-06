Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_content = require('../../tooltip/src/content.js');
const require_input = require('../../input/src/input.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/autocomplete/src/autocomplete.ts
/**
* @deprecated Removed after 3.0.0, Use `AutocompleteProps` instead.
*/
const autocompleteProps = require_runtime$1.buildProps({
	...require_input.inputProps,
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
		type: require_runtime$1.definePropType(String),
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
		type: require_runtime$1.definePropType([Function, Array]),
		default: _vue_shared.NOOP
	},
	popperClass: require_content.useTooltipContentProps.popperClass,
	popperStyle: require_content.useTooltipContentProps.popperStyle,
	triggerOnFocus: {
		type: Boolean,
		default: true
	},
	selectWhenUnmatched: Boolean,
	hideLoading: Boolean,
	teleported: require_content.useTooltipContentProps.teleported,
	appendTo: require_content.useTooltipContentProps.appendTo,
	highlightFirstItem: Boolean,
	fitInputWidth: Boolean,
	loopNavigation: {
		type: Boolean,
		default: true
	}
});
const autocompleteEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (value) => (0, _vue_shared.isString)(value) || require_types.isNumber(value),
	[require_event.INPUT_EVENT]: (value) => (0, _vue_shared.isString)(value) || require_types.isNumber(value),
	[require_event.CHANGE_EVENT]: (value) => (0, _vue_shared.isString)(value) || require_types.isNumber(value),
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent,
	clear: () => true,
	select: (item) => (0, _vue_shared.isObject)(item)
};

//#endregion
exports.autocompleteEmits = autocompleteEmits;
exports.autocompleteProps = autocompleteProps;
//# sourceMappingURL=autocomplete.js.map