Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_content = require('../../tooltip/src/content.js');
const require_input = require('../../input/src/input.js');
const require_helper = require('./helper.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/mention/src/mention.ts
/**
* @deprecated Removed after 3.0.0, Use `MentionProps` instead.
*/
const mentionProps = require_runtime$1.buildProps({
	...require_input.inputProps,
	options: {
		type: require_runtime$1.definePropType(Array),
		default: () => []
	},
	prefix: {
		type: require_runtime$1.definePropType([String, Array]),
		default: "@",
		validator: (val) => {
			if ((0, _vue_shared.isString)(val)) return val.length === 1;
			return val.every((v) => (0, _vue_shared.isString)(v) && v.length === 1);
		}
	},
	split: {
		type: String,
		default: " ",
		validator: (val) => val.length === 1
	},
	filterOption: {
		type: require_runtime$1.definePropType([Boolean, Function]),
		default: () => require_helper.filterOption,
		validator: (val) => {
			if (val === false) return true;
			return (0, _vue_shared.isFunction)(val);
		}
	},
	placement: {
		type: require_runtime$1.definePropType(String),
		default: "bottom"
	},
	showArrow: Boolean,
	offset: {
		type: Number,
		default: 0
	},
	whole: Boolean,
	checkIsWhole: { type: require_runtime$1.definePropType(Function) },
	modelValue: String,
	loading: Boolean,
	popperClass: require_content.useTooltipContentProps.popperClass,
	popperStyle: require_content.useTooltipContentProps.popperStyle,
	popperOptions: {
		type: require_runtime$1.definePropType(Object),
		default: () => ({})
	},
	props: {
		type: require_runtime$1.definePropType(Object),
		default: () => mentionDefaultProps
	}
});
const mentionEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (value) => (0, _vue_shared.isString)(value),
	"whole-remove": (pattern, prefix) => (0, _vue_shared.isString)(pattern) && (0, _vue_shared.isString)(prefix),
	input: (value) => (0, _vue_shared.isString)(value),
	search: (pattern, prefix) => (0, _vue_shared.isString)(pattern) && (0, _vue_shared.isString)(prefix),
	select: (option, prefix) => (0, _vue_shared.isObject)(option) && (0, _vue_shared.isString)(prefix),
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent
};
const mentionDefaultProps = {
	value: "value",
	label: "label",
	disabled: "disabled"
};

//#endregion
exports.mentionDefaultProps = mentionDefaultProps;
exports.mentionEmits = mentionEmits;
exports.mentionProps = mentionProps;
//# sourceMappingURL=mention.js.map