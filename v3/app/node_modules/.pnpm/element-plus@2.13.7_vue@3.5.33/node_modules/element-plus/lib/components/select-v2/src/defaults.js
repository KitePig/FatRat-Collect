Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_index = require('../../../hooks/use-size/index.js');
const require_index$1 = require('../../../hooks/use-empty-values/index.js');
const require_index$2 = require('../../../hooks/use-aria/index.js');
const require_content = require('../../tooltip/src/content.js');
const require_tag = require('../../tag/src/tag.js');
const require_useProps = require('./useProps.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let _popperjs_core = require("@popperjs/core");

//#region ../../packages/components/select-v2/src/defaults.ts
const selectV2Props = require_runtime$1.buildProps({
	allowCreate: Boolean,
	autocomplete: {
		type: require_runtime$1.definePropType(String),
		default: "none"
	},
	automaticDropdown: Boolean,
	clearable: Boolean,
	clearIcon: {
		type: require_icon.iconPropType,
		default: _element_plus_icons_vue.CircleClose
	},
	effect: {
		type: require_runtime$1.definePropType(String),
		default: "light"
	},
	collapseTags: Boolean,
	collapseTagsTooltip: Boolean,
	tagTooltip: {
		type: require_runtime$1.definePropType(Object),
		default: () => ({})
	},
	maxCollapseTags: {
		type: Number,
		default: 1
	},
	defaultFirstOption: Boolean,
	disabled: {
		type: Boolean,
		default: void 0
	},
	estimatedOptionHeight: {
		type: Number,
		default: void 0
	},
	filterable: Boolean,
	filterMethod: { type: require_runtime$1.definePropType(Function) },
	height: {
		type: Number,
		default: 274
	},
	itemHeight: {
		type: Number,
		default: 34
	},
	id: String,
	loading: Boolean,
	loadingText: String,
	modelValue: {
		type: require_runtime$1.definePropType([
			Array,
			String,
			Number,
			Boolean,
			Object
		]),
		default: void 0
	},
	multiple: Boolean,
	multipleLimit: {
		type: Number,
		default: 0
	},
	name: String,
	noDataText: String,
	noMatchText: String,
	remoteMethod: { type: require_runtime$1.definePropType(Function) },
	reserveKeyword: {
		type: Boolean,
		default: true
	},
	options: {
		type: require_runtime$1.definePropType(Array),
		required: true
	},
	placeholder: { type: String },
	teleported: require_content.useTooltipContentProps.teleported,
	persistent: {
		type: Boolean,
		default: true
	},
	popperClass: require_content.useTooltipContentProps.popperClass,
	popperStyle: require_content.useTooltipContentProps.popperStyle,
	popperOptions: {
		type: require_runtime$1.definePropType(Object),
		default: () => ({})
	},
	remote: Boolean,
	debounce: {
		type: Number,
		default: 300
	},
	size: require_index.useSizeProp,
	props: {
		type: require_runtime$1.definePropType(Object),
		default: () => require_useProps.defaultProps
	},
	valueKey: {
		type: String,
		default: "value"
	},
	scrollbarAlwaysOn: Boolean,
	validateEvent: {
		type: Boolean,
		default: true
	},
	offset: {
		type: Number,
		default: 12
	},
	remoteShowSuffix: Boolean,
	showArrow: {
		type: Boolean,
		default: true
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
			"top-start",
			"right",
			"left"
		]
	},
	tagType: {
		...require_tag.tagProps.type,
		default: "info"
	},
	tagEffect: {
		...require_tag.tagProps.effect,
		default: "light"
	},
	tabindex: {
		type: [String, Number],
		default: 0
	},
	appendTo: require_content.useTooltipContentProps.appendTo,
	fitInputWidth: {
		type: [Boolean, Number],
		default: true,
		validator(val) {
			return require_types.isBoolean(val) || require_types.isNumber(val);
		}
	},
	suffixIcon: {
		type: require_icon.iconPropType,
		default: _element_plus_icons_vue.ArrowDown
	},
	...require_index$1.useEmptyValuesProps,
	...require_index$2.useAriaProps(["ariaLabel"])
});
const optionV2Props = require_runtime$1.buildProps({
	data: Array,
	disabled: Boolean,
	hovering: Boolean,
	item: {
		type: require_runtime$1.definePropType(Object),
		required: true
	},
	index: Number,
	style: Object,
	selected: Boolean,
	created: Boolean
});
const selectV2Emits = {
	[require_event.UPDATE_MODEL_EVENT]: (val) => true,
	[require_event.CHANGE_EVENT]: (val) => true,
	"remove-tag": (val) => true,
	"visible-change": (visible) => true,
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent,
	clear: () => true
};
const optionV2Emits = {
	hover: (index) => require_types.isNumber(index),
	select: (val, index) => true
};

//#endregion
exports.optionV2Emits = optionV2Emits;
exports.optionV2Props = optionV2Props;
exports.selectV2Emits = selectV2Emits;
exports.selectV2Props = selectV2Props;
//# sourceMappingURL=defaults.js.map