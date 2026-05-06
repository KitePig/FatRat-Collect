Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_index = require('../../../hooks/use-size/index.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/radio/src/radio.ts
/**
* @deprecated Removed after 3.0.0, Use `RadioPropsBase` instead.
*/
const radioPropsBase = require_runtime$1.buildProps({
	modelValue: {
		type: [
			String,
			Number,
			Boolean
		],
		default: void 0
	},
	size: require_index.useSizeProp,
	disabled: {
		type: Boolean,
		default: void 0
	},
	label: {
		type: [
			String,
			Number,
			Boolean
		],
		default: void 0
	},
	value: {
		type: [
			String,
			Number,
			Boolean
		],
		default: void 0
	},
	name: {
		type: String,
		default: void 0
	}
});
/**
* @deprecated Removed after 3.0.0, Use `RadioProps` instead.
*/
const radioProps = require_runtime$1.buildProps({
	...radioPropsBase,
	border: Boolean
});
const radioEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (val) => (0, _vue_shared.isString)(val) || require_types.isNumber(val) || require_types.isBoolean(val),
	[require_event.CHANGE_EVENT]: (val) => (0, _vue_shared.isString)(val) || require_types.isNumber(val) || require_types.isBoolean(val)
};
/**
* @description default values for RadioProps
*/
const radioPropsDefaults = {
	modelValue: void 0,
	disabled: void 0,
	label: void 0,
	value: void 0,
	name: void 0,
	border: false
};

//#endregion
exports.radioEmits = radioEmits;
exports.radioProps = radioProps;
exports.radioPropsBase = radioPropsBase;
exports.radioPropsDefaults = radioPropsDefaults;
//# sourceMappingURL=radio.js.map