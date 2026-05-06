Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_typescript = require('../../../utils/typescript.js');
const require_index = require('../../../hooks/use-size/index.js');
const require_index$1 = require('../../../hooks/use-aria/index.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");

//#region ../../packages/components/rate/src/rate.ts
/**
* @deprecated Removed after 3.0.0, Use `RateProps` instead.
*/
const rateProps = require_runtime$1.buildProps({
	modelValue: {
		type: Number,
		default: 0
	},
	id: {
		type: String,
		default: void 0
	},
	lowThreshold: {
		type: Number,
		default: 2
	},
	highThreshold: {
		type: Number,
		default: 4
	},
	max: {
		type: Number,
		default: 5
	},
	colors: {
		type: require_runtime$1.definePropType([Array, Object]),
		default: () => require_typescript.mutable([
			"",
			"",
			""
		])
	},
	voidColor: {
		type: String,
		default: ""
	},
	disabledVoidColor: {
		type: String,
		default: ""
	},
	icons: {
		type: require_runtime$1.definePropType([Array, Object]),
		default: () => [
			_element_plus_icons_vue.StarFilled,
			_element_plus_icons_vue.StarFilled,
			_element_plus_icons_vue.StarFilled
		]
	},
	voidIcon: {
		type: require_icon.iconPropType,
		default: () => _element_plus_icons_vue.Star
	},
	disabledVoidIcon: {
		type: require_icon.iconPropType,
		default: () => _element_plus_icons_vue.StarFilled
	},
	disabled: {
		type: Boolean,
		default: void 0
	},
	allowHalf: Boolean,
	showText: Boolean,
	showScore: Boolean,
	textColor: {
		type: String,
		default: ""
	},
	texts: {
		type: require_runtime$1.definePropType(Array),
		default: () => require_typescript.mutable([
			"Extremely bad",
			"Disappointed",
			"Fair",
			"Satisfied",
			"Surprise"
		])
	},
	scoreTemplate: {
		type: String,
		default: "{value}"
	},
	size: require_index.useSizeProp,
	clearable: Boolean,
	...require_index$1.useAriaProps(["ariaLabel"])
});
const rateEmits = {
	[require_event.CHANGE_EVENT]: (value) => require_types.isNumber(value),
	[require_event.UPDATE_MODEL_EVENT]: (value) => require_types.isNumber(value)
};

//#endregion
exports.rateEmits = rateEmits;
exports.rateProps = rateProps;
//# sourceMappingURL=rate.js.map