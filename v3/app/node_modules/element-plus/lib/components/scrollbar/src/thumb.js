Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/scrollbar/src/thumb.ts
/**
* @deprecated Removed after 3.0.0, Use `ThumbProps` instead.
*/
const thumbProps = require_runtime.buildProps({
	vertical: Boolean,
	size: String,
	move: Number,
	ratio: {
		type: Number,
		required: true
	},
	always: Boolean
});

//#endregion
exports.thumbProps = thumbProps;
//# sourceMappingURL=thumb.js.map