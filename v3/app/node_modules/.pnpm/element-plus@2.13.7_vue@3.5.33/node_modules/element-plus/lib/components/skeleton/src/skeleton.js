Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/skeleton/src/skeleton.ts
/**
* @deprecated Removed after 3.0.0, Use `SkeletonProps` instead.
*/
const skeletonProps = require_runtime.buildProps({
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
	throttle: { type: require_runtime.definePropType([Number, Object]) }
});

//#endregion
exports.skeletonProps = skeletonProps;
//# sourceMappingURL=skeleton.js.map