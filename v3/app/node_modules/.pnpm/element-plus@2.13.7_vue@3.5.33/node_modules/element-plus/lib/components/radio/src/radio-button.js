Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_radio = require('./radio.js');

//#region ../../packages/components/radio/src/radio-button.ts
/**
* @deprecated Removed after 3.0.0, Use `RadioButtonProps` instead.
*/
const radioButtonProps = require_runtime.buildProps({ ...require_radio.radioPropsBase });
/**
* @description default values for RadioButtonProps
*/
const radioButtonPropsDefaults = {
	modelValue: void 0,
	disabled: void 0,
	label: void 0,
	value: void 0,
	name: void 0
};

//#endregion
exports.radioButtonProps = radioButtonProps;
exports.radioButtonPropsDefaults = radioButtonPropsDefaults;
//# sourceMappingURL=radio-button.js.map