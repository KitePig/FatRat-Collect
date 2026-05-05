import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isBoolean } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { useEmptyValuesProps } from "../../../hooks/use-empty-values/index.mjs";
import { useTooltipContentProps } from "../../tooltip/src/content.mjs";
import { tagProps } from "../../tag/src/tag.mjs";
import { CommonProps } from "../../cascader-panel/src/config.mjs";
import { CircleClose } from "@element-plus/icons-vue";
import { placements } from "@popperjs/core";

//#region ../../packages/components/cascader/src/cascader.ts
/**
* @deprecated Removed after 3.0.0, Use `CascaderComponentProps` instead.
*/
const cascaderProps = buildProps({
	...CommonProps,
	size: useSizeProp,
	placeholder: String,
	disabled: {
		type: Boolean,
		default: void 0
	},
	clearable: Boolean,
	clearIcon: {
		type: iconPropType,
		default: CircleClose
	},
	filterable: Boolean,
	filterMethod: {
		type: definePropType(Function),
		default: (node, keyword) => node.text.includes(keyword)
	},
	separator: {
		type: String,
		default: " / "
	},
	showAllLevels: {
		type: Boolean,
		default: true
	},
	collapseTags: Boolean,
	maxCollapseTags: {
		type: Number,
		default: 1
	},
	collapseTagsTooltip: Boolean,
	maxCollapseTagsTooltipHeight: { type: [String, Number] },
	debounce: {
		type: Number,
		default: 300
	},
	beforeFilter: {
		type: definePropType(Function),
		default: () => true
	},
	placement: {
		type: definePropType(String),
		values: placements,
		default: "bottom-start"
	},
	fallbackPlacements: {
		type: definePropType(Array),
		default: [
			"bottom-start",
			"bottom",
			"top-start",
			"top",
			"right",
			"left"
		]
	},
	popperClass: useTooltipContentProps.popperClass,
	popperStyle: useTooltipContentProps.popperStyle,
	teleported: useTooltipContentProps.teleported,
	effect: {
		type: definePropType(String),
		default: "light"
	},
	tagType: {
		...tagProps.type,
		default: "info"
	},
	tagEffect: {
		...tagProps.effect,
		default: "light"
	},
	validateEvent: {
		type: Boolean,
		default: true
	},
	persistent: {
		type: Boolean,
		default: true
	},
	showCheckedStrategy: {
		type: String,
		values: ["parent", "child"],
		default: "child"
	},
	checkOnClickNode: Boolean,
	showPrefix: {
		type: Boolean,
		default: true
	},
	...useEmptyValuesProps
});
const emitChangeFn = (value) => true;
const cascaderEmits = {
	[UPDATE_MODEL_EVENT]: emitChangeFn,
	[CHANGE_EVENT]: emitChangeFn,
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent,
	clear: () => true,
	visibleChange: (val) => isBoolean(val),
	expandChange: (val) => !!val,
	removeTag: (val) => !!val
};

//#endregion
export { cascaderEmits, cascaderProps };
//# sourceMappingURL=cascader.mjs.map