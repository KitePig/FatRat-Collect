Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_index = require('../../../hooks/use-size/index.js');
const require_tag = require('../../tag/src/tag.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/input-tag/src/input-tag.ts
/**
* @deprecated Removed after 3.0.0, Use `InputTagProps` instead.
*/
const inputTagProps = require_runtime$1.buildProps({
	modelValue: { type: require_runtime$1.definePropType(Array) },
	max: Number,
	tagType: {
		...require_tag.tagProps.type,
		default: "info"
	},
	tagEffect: require_tag.tagProps.effect,
	effect: {
		type: require_runtime$1.definePropType(String),
		default: "light"
	},
	trigger: {
		type: require_runtime$1.definePropType(String),
		default: require_aria.EVENT_CODE.enter
	},
	draggable: Boolean,
	delimiter: {
		type: [String, RegExp],
		default: ""
	},
	size: require_index.useSizeProp,
	clearable: Boolean,
	clearIcon: {
		type: require_icon.iconPropType,
		default: _element_plus_icons_vue.CircleClose
	},
	disabled: {
		type: Boolean,
		default: void 0
	},
	validateEvent: {
		type: Boolean,
		default: true
	},
	readonly: Boolean,
	autofocus: Boolean,
	id: {
		type: String,
		default: void 0
	},
	tabindex: {
		type: [String, Number],
		default: 0
	},
	maxlength: { type: [String, Number] },
	minlength: { type: [String, Number] },
	placeholder: String,
	autocomplete: {
		type: require_runtime$1.definePropType(String),
		default: "off"
	},
	saveOnBlur: {
		type: Boolean,
		default: true
	},
	collapseTags: Boolean,
	collapseTagsTooltip: Boolean,
	maxCollapseTags: {
		type: Number,
		default: 1
	},
	ariaLabel: String
});
const inputTagEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (value) => (0, _vue_shared.isArray)(value) || require_types.isUndefined(value),
	[require_event.CHANGE_EVENT]: (value) => (0, _vue_shared.isArray)(value) || require_types.isUndefined(value),
	[require_event.INPUT_EVENT]: (value) => (0, _vue_shared.isString)(value),
	"add-tag": (value) => (0, _vue_shared.isString)(value) || (0, _vue_shared.isArray)(value),
	"remove-tag": (value, index) => (0, _vue_shared.isString)(value) && require_types.isNumber(index),
	"drag-tag": (oldIndex, newIndex, value) => require_types.isNumber(oldIndex) && require_types.isNumber(newIndex) && (0, _vue_shared.isString)(value),
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent,
	clear: () => true
};

//#endregion
exports.inputTagEmits = inputTagEmits;
exports.inputTagProps = inputTagProps;
//# sourceMappingURL=input-tag.js.map