Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../utils/vue/props/runtime.js');

//#region ../../packages/components/color-picker-panel/src/props/predefine.ts
/**
* @deprecated Removed after 3.0.0, Use `PredefineProps` instead.
*/
const predefineProps = require_runtime.buildProps({
	colors: {
		type: require_runtime.definePropType(Array),
		required: true
	},
	color: {
		type: require_runtime.definePropType(Object),
		required: true
	},
	enableAlpha: {
		type: Boolean,
		required: true
	},
	disabled: Boolean
});

//#endregion
exports.predefineProps = predefineProps;
//# sourceMappingURL=predefine.js.map