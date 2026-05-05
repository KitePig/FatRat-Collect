Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/tour/src/mask.ts
/**
* @deprecated Removed after 3.0.0, Use `MaskProps` instead.
*/
const maskProps = require_runtime.buildProps({
	zIndex: {
		type: Number,
		default: 1001
	},
	visible: Boolean,
	fill: {
		type: String,
		default: "rgba(0,0,0,0.5)"
	},
	pos: { type: require_runtime.definePropType(Object) },
	targetAreaClickable: {
		type: Boolean,
		default: true
	}
});

//#endregion
exports.maskProps = maskProps;
//# sourceMappingURL=mask.js.map