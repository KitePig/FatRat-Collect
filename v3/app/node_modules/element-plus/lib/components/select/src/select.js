Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_index = require('../../../hooks/use-size/index.js');
const require_index$1 = require('../../../hooks/use-empty-values/index.js');
const require_index$2 = require('../../../hooks/use-aria/index.js');
const require_content = require('../../tooltip/src/content.js');
const require_scrollbar = require('../../scrollbar/src/scrollbar.js');
const require_tag = require('../../tag/src/tag.js');
const require_useProps = require('../../select-v2/src/useProps.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let _popperjs_core = require("@popperjs/core");

//#region ../../packages/components/select/src/select.ts
const selectProps = require_runtime$1.buildProps({
	name: String,
	id: String,
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
	autocomplete: {
		type: String,
		default: "off"
	},
	automaticDropdown: Boolean,
	size: require_index.useSizeProp,
	effect: {
		type: require_runtime$1.definePropType(String),
		default: "light"
	},
	disabled: {
		type: Boolean,
		default: void 0
	},
	clearable: Boolean,
	filterable: Boolean,
	allowCreate: Boolean,
	loading: Boolean,
	popperClass: {
		type: String,
		default: ""
	},
	popperStyle: { type: require_runtime$1.definePropType([String, Object]) },
	popperOptions: {
		type: require_runtime$1.definePropType(Object),
		default: () => ({})
	},
	remote: Boolean,
	debounce: {
		type: Number,
		default: 300
	},
	loadingText: String,
	noMatchText: String,
	noDataText: String,
	remoteMethod: { type: require_runtime$1.definePropType(Function) },
	filterMethod: { type: require_runtime$1.definePropType(Function) },
	multiple: Boolean,
	multipleLimit: {
		type: Number,
		default: 0
	},
	placeholder: { type: String },
	defaultFirstOption: Boolean,
	reserveKeyword: {
		type: Boolean,
		default: true
	},
	valueKey: {
		type: String,
		default: "value"
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
	teleported: require_content.useTooltipContentProps.teleported,
	persistent: {
		type: Boolean,
		default: true
	},
	clearIcon: {
		type: require_icon.iconPropType,
		default: _element_plus_icons_vue.CircleClose
	},
	fitInputWidth: Boolean,
	suffixIcon: {
		type: require_icon.iconPropType,
		default: _element_plus_icons_vue.ArrowDown
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
	remoteShowSuffix: Boolean,
	showArrow: {
		type: Boolean,
		default: true
	},
	offset: {
		type: Number,
		default: 12
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
	tabindex: {
		type: [String, Number],
		default: 0
	},
	appendTo: require_content.useTooltipContentProps.appendTo,
	options: { type: require_runtime$1.definePropType(Array) },
	props: {
		type: require_runtime$1.definePropType(Object),
		default: () => require_useProps.defaultProps
	},
	...require_index$1.useEmptyValuesProps,
	...require_index$2.useAriaProps(["ariaLabel"])
});
const selectEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (val) => true,
	[require_event.CHANGE_EVENT]: (val) => true,
	"popup-scroll": require_scrollbar.scrollbarEmits.scroll,
	"remove-tag": (val) => true,
	"visible-change": (visible) => true,
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent,
	clear: () => true
};

//#endregion
exports.selectEmits = selectEmits;
exports.selectProps = selectProps;
//# sourceMappingURL=select.js.map