Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/watermark/src/watermark.ts
/**
* @deprecated Removed after 3.0.0, Use `WatermarkProps` instead.
*/
const watermarkProps = require_runtime.buildProps({
	zIndex: {
		type: Number,
		default: 9
	},
	rotate: {
		type: Number,
		default: -22
	},
	width: Number,
	height: Number,
	image: String,
	content: {
		type: require_runtime.definePropType([String, Array]),
		default: "Element Plus"
	},
	font: { type: require_runtime.definePropType(Object) },
	gap: {
		type: require_runtime.definePropType(Array),
		default: () => [100, 100]
	},
	offset: { type: require_runtime.definePropType(Array) }
});

//#endregion
exports.watermarkProps = watermarkProps;
//# sourceMappingURL=watermark.js.map