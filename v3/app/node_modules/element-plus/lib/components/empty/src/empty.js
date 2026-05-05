Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/empty/src/empty.ts
/**
* @deprecated Removed after 3.0.0, Use `EmptyProps` instead.
*/
const emptyProps = require_runtime.buildProps({
	image: {
		type: String,
		default: ""
	},
	imageSize: Number,
	description: {
		type: String,
		default: ""
	}
});

//#endregion
exports.emptyProps = emptyProps;
//# sourceMappingURL=empty.js.map