Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_validator = require('../../../utils/vue/validator.js');
const require_index = require('../../../hooks/use-aria/index.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/switch/src/switch.ts
/**
* @deprecated Removed after 3.0.0, Use `SwitchProps` instead.
*/
const switchProps = require_runtime$1.buildProps({
	modelValue: {
		type: [
			Boolean,
			String,
			Number
		],
		default: false
	},
	disabled: {
		type: Boolean,
		default: void 0
	},
	loading: Boolean,
	size: {
		type: String,
		validator: require_validator.isValidComponentSize
	},
	width: {
		type: [String, Number],
		default: ""
	},
	inlinePrompt: Boolean,
	inactiveActionIcon: { type: require_icon.iconPropType },
	activeActionIcon: { type: require_icon.iconPropType },
	activeIcon: { type: require_icon.iconPropType },
	inactiveIcon: { type: require_icon.iconPropType },
	activeText: {
		type: String,
		default: ""
	},
	inactiveText: {
		type: String,
		default: ""
	},
	activeValue: {
		type: [
			Boolean,
			String,
			Number
		],
		default: true
	},
	inactiveValue: {
		type: [
			Boolean,
			String,
			Number
		],
		default: false
	},
	name: {
		type: String,
		default: ""
	},
	validateEvent: {
		type: Boolean,
		default: true
	},
	beforeChange: { type: require_runtime$1.definePropType(Function) },
	id: String,
	tabindex: { type: [String, Number] },
	...require_index.useAriaProps(["ariaLabel"])
});
const switchEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (val) => require_types.isBoolean(val) || (0, _vue_shared.isString)(val) || require_types.isNumber(val),
	[require_event.CHANGE_EVENT]: (val) => require_types.isBoolean(val) || (0, _vue_shared.isString)(val) || require_types.isNumber(val),
	[require_event.INPUT_EVENT]: (val) => require_types.isBoolean(val) || (0, _vue_shared.isString)(val) || require_types.isNumber(val)
};

//#endregion
exports.switchEmits = switchEmits;
exports.switchProps = switchProps;
//# sourceMappingURL=switch.js.map