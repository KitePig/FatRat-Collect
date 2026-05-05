Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/scrollbar/src/bar.ts
/**
* @deprecated Removed after 3.0.0, Use `BarProps` instead.
*/
const barProps = require_runtime.buildProps({
	always: {
		type: Boolean,
		default: true
	},
	minSize: {
		type: Number,
		required: true
	}
});

//#endregion
exports.barProps = barProps;
//# sourceMappingURL=bar.js.map