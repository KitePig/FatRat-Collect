Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_index = require('../../../hooks/use-size/index.js');
const require_index$1 = require('../../../hooks/use-empty-values/index.js');
const require_content = require('../../tooltip/src/content.js');
const require_tag = require('../../tag/src/tag.js');
const require_config = require('../../cascader-panel/src/config.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let _popperjs_core = require("@popperjs/core");

//#region ../../packages/components/cascader/src/cascader.ts
/**
* @deprecated Removed after 3.0.0, Use `CascaderComponentProps` instead.
*/
const cascaderProps = require_runtime$1.buildProps({
	...require_config.CommonProps,
	size: require_index.useSizeProp,
	placeholder: String,
	disabled: {
		type: Boolean,
		default: void 0
	},
	clearable: Boolean,
	clearIcon: {
		type: require_icon.iconPropType,
		default: _element_plus_icons_vue.CircleClose
	},
	filterable: Boolean,
	filterMethod: {
		type: require_runtime$1.definePropType(Function),
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
		type: require_runtime$1.definePropType(Function),
		default: () => true
	},
	placement: {
		type: require_runtime$1.definePropType(String),
		values: _popperjs_core.placements,
		default: "bottom-start"
	},
	fallbackPlacements: {
		type: require_runtime$1.definePropType(Array),
		default: [
			"bottom-start",
			"bottom",
			"top-start",
			"top",
			"right",
			"left"
		]
	},
	popperClass: require_content.useTooltipContentProps.popperClass,
	popperStyle: require_content.useTooltipContentProps.popperStyle,
	teleported: require_content.useTooltipContentProps.teleported,
	effect: {
		type: require_runtime$1.definePropType(String),
		default: "light"
	},
	tagType: {
		...require_tag.tagProps.type,
		default: "info"
	},
	tagEffect: {
		...require_tag.tagProps.effect,
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
	...require_index$1.useEmptyValuesProps
});
const emitChangeFn = (value) => true;
const cascaderEmits = {
	[require_event.UPDATE_MODEL_EVENT]: emitChangeFn,
	[require_event.CHANGE_EVENT]: emitChangeFn,
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent,
	clear: () => true,
	visibleChange: (val) => require_types.isBoolean(val),
	expandChange: (val) => !!val,
	removeTag: (val) => !!val
};

//#endregion
exports.cascaderEmits = cascaderEmits;
exports.cascaderProps = cascaderProps;
//# sourceMappingURL=cascader.js.map