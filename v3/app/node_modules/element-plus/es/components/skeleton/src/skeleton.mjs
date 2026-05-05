import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/skeleton/src/skeleton.ts
/**
* @deprecated Removed after 3.0.0, Use `SkeletonProps` instead.
*/
const skeletonProps = buildProps({
	animated: Boolean,
	count: {
		type: Number,
		default: 1
	},
	rows: {
		type: Number,
		default: 3
	},
	loading: {
		type: Boolean,
		default: true
	},
	throttle: { type: definePropType([Number, Object]) }
});

//#endregion
export { skeletonProps };
//# sourceMappingURL=skeleton.mjs.map