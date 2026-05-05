import { buildProps, definePropType } from "../../../../utils/vue/props/runtime.mjs";
import { useSizeProp } from "../../../../hooks/use-size/index.mjs";
import { useEmptyValuesProps } from "../../../../hooks/use-empty-values/index.mjs";
import { useAriaProps } from "../../../../hooks/use-aria/index.mjs";
import { useTooltipContentProps } from "../../../tooltip/src/content.mjs";
import { disabledTimeListsProps } from "../props/shared.mjs";
import { CircleClose } from "@element-plus/icons-vue";
import { placements } from "@popperjs/core";

//#region ../../packages/components/time-picker/src/common/props.ts
const timePickerDefaultProps = buildProps({
	automaticDropdown: {
		type: Boolean,
		default: true
	},
	id: { type: definePropType([Array, String]) },
	name: { type: definePropType([Array, String]) },
	popperClass: useTooltipContentProps.popperClass,
	popperStyle: useTooltipContentProps.popperStyle,
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
		type: definePropType([String, Object]),
		default: CircleClose
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
		type: definePropType([String, Object]),
		default: ""
	},
	size: useSizeProp,
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
		type: definePropType(Object),
		default: () => ({})
	},
	modelValue: {
		type: definePropType([
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
	defaultValue: { type: definePropType([Date, Array]) },
	defaultTime: { type: definePropType([Date, Array]) },
	isRange: Boolean,
	...disabledTimeListsProps,
	disabledDate: { type: Function },
	cellClassName: { type: Function },
	shortcuts: {
		type: Array,
		default: () => []
	},
	arrowControl: Boolean,
	tabindex: {
		type: definePropType([String, Number]),
		default: 0
	},
	validateEvent: {
		type: Boolean,
		default: true
	},
	unlinkPanels: Boolean,
	placement: {
		type: definePropType(String),
		values: placements,
		default: "bottom"
	},
	fallbackPlacements: {
		type: definePropType(Array),
		default: [
			"bottom",
			"top",
			"right",
			"left"
		]
	},
	...useEmptyValuesProps,
	...useAriaProps(["ariaLabel"]),
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
const timePickerRangeTriggerProps = buildProps({
	id: { type: definePropType(Array) },
	name: { type: definePropType(Array) },
	modelValue: { type: definePropType([Array, String]) },
	startPlaceholder: String,
	endPlaceholder: String,
	disabled: Boolean
});
/**
* @deprecated Use `timePickerRangeTriggerProps` instead. This will be removed in future versions.
*/
const timePickerRngeTriggerProps = timePickerRangeTriggerProps;

//#endregion
export { timePickerDefaultProps, timePickerRangeTriggerProps, timePickerRngeTriggerProps };
//# sourceMappingURL=props.mjs.map