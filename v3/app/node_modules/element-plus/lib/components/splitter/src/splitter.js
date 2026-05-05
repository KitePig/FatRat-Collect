Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/splitter/src/splitter.ts
/**
* @deprecated Removed after 3.0.0, Use `SplitterProps` instead.
*/
const splitterProps = require_runtime.buildProps({
	layout: {
		type: String,
		default: "horizontal",
		values: ["horizontal", "vertical"]
	},
	lazy: Boolean
});
const splitterEmits = {
	resizeStart: (index, sizes) => true,
	resize: (index, sizes) => true,
	resizeEnd: (index, sizes) => true,
	collapse: (index, type, sizes) => true
};

//#endregion
exports.splitterEmits = splitterEmits;
exports.splitterProps = splitterProps;
//# sourceMappingURL=splitter.js.map