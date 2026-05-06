import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/watermark/src/watermark.ts
/**
* @deprecated Removed after 3.0.0, Use `WatermarkProps` instead.
*/
const watermarkProps = buildProps({
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
		type: definePropType([String, Array]),
		default: "Element Plus"
	},
	font: { type: definePropType(Object) },
	gap: {
		type: definePropType(Array),
		default: () => [100, 100]
	},
	offset: { type: definePropType(Array) }
});

//#endregion
export { watermarkProps };
//# sourceMappingURL=watermark.mjs.map