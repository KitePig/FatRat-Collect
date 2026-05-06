Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_runtime$1 = require('../../../../utils/vue/props/runtime.js');
const require_index = require('../../../../hooks/use-size/index.js');
const require_index$1 = require('../../../../hooks/use-empty-values/index.js');
const require_index$2 = require('../../../../hooks/use-aria/index.js');
const require_content = require('../../../tooltip/src/content.js');
const require_shared = require('../props/shared.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let _popperjs_core = require("@popperjs/core");

//#region ../../packages/components/time-picker/src/common/props.ts
const timePickerDefaultProps = require_runtime$1.buildProps({
	automaticDropdown: {
		type: Boolean,
		default: true
	},
	id: { type: require_runtime$1.definePropType([Array, String]) },
	name: { type: require_runtime$1.definePropType([Array, String]) },
	popperClass: require_content.useTooltipContentProps.popperClass,
	popperStyle: require_content.useTooltipContentProps.popperStyle,
	format: String,
	valueFormat: String,
	dateFormat: String,
	timeFormat: String,
	type: {
		type: String,
		default: ""
	},
	clearable: {
		type: Boolean,
		default: true
	},
	clearIcon: {
		type: require_runtime$1.definePropType([String, Object]),
		default: _element_plus_icons_vue.CircleClose
	},
	editable: {
		type: Boolean,
		default: true
	},
	saveOnBlur: {
		type: Boolean,
		default: true
	},
	prefixIcon: {
		type: require_runtime$1.definePropType([String, Object]),
		default: ""
	},
	size: require_index.useSizeProp,
	readonly: Boolean,
	disabled: {
		type: Boolean,
		default: void 0
	},
	placeholder: {
		type: String,
		default: ""
	},
	popperOptions: {
		type: require_runtime$1.definePropType(Object),
		default: () => ({})
	},
	modelValue: {
		type: require_runtime$1.definePropType([
			Date,
			Array,
			String,
			Number
		]),
		default: ""
	},
	rangeSeparator: {
		type: String,
		default: "-"
	},
	startPlaceholder: String,
	endPlaceholder: String,
	defaultValue: { type: require_runtime$1.definePropType([Date, Array]) },
	defaultTime: { type: require_runtime$1.definePropType([Date, Array]) },
	isRange: Boolean,
	...require_shared.disabledTimeListsProps,
	disabledDate: { type: Function },
	cellClassName: { type: Function },
	shortcuts: {
		type: Array,
		default: () => []
	},
	arrowControl: Boolean,
	tabindex: {
		type: require_runtime$1.definePropType([String, Number]),
		default: 0
	},
	validateEvent: {
		type: Boolean,
		default: true
	},
	unlinkPanels: Boolean,
	placement: {
		type: require_runtime$1.definePropType(String),
		values: _popperjs_core.placements,
		default: "bottom"
	},
	fallbackPlacements: {
		type: require_runtime$1.definePropType(Array),
		default: [
			"bottom",
			"top",
			"right",
			"left"
		]
	},
	...require_index$1.useEmptyValuesProps,
	...require_index$2.useAriaProps(["ariaLabel"]),
	showNow: {
		type: Boolean,
		default: true
	},
	showConfirm: {
		type: Boolean,
		default: true
	},
	showFooter: {
		type: Boolean,
		default: true
	},
	showWeekNumber: Boolean
});
const timePickerRangeTriggerProps = require_runtime$1.buildProps({
	id: { type: require_runtime$1.definePropType(Array) },
	name: { type: require_runtime$1.definePropType(Array) },
	modelValue: { type: require_runtime$1.definePropType([Array, String]) },
	startPlaceholder: String,
	endPlaceholder: String,
	disabled: Boolean
});
/**
* @deprecated Use `timePickerRangeTriggerProps` instead. This will be removed in future versions.
*/
const timePickerRngeTriggerProps = timePickerRangeTriggerProps;

//#endregion
exports.timePickerDefaultProps = timePickerDefaultProps;
exports.timePickerRangeTriggerProps = timePickerRangeTriggerProps;
exports.timePickerRngeTriggerProps = timePickerRngeTriggerProps;
//# sourceMappingURL=props.js.map