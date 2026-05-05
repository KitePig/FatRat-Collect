import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/tour/src/mask.ts
/**
* @deprecated Removed after 3.0.0, Use `MaskProps` instead.
*/
const maskProps = buildProps({
	zIndex: {
		type: Number,
		default: 1001
	},
	visible: Boolean,
	fill: {
		type: String,
		default: "rgba(0,0,0,0.5)"
	},
	pos: { type: definePropType(Object) },
	targetAreaClickable: {
		type: Boolean,
		default: true
	}
});

//#endregion
export { maskProps };
//# sourceMappingURL=mask.mjs.map