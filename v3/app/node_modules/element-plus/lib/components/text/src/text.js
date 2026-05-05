Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_size = require('../../../constants/size.js');
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/text/src/text.ts
/**
* @deprecated Removed after 3.0.0, Use `TextProps` instead.
*/
const textProps = require_runtime.buildProps({
	type: {
		type: String,
		values: [
			"primary",
			"success",
			"info",
			"warning",
			"danger",
			""
		],
		default: ""
	},
	size: {
		type: String,
		values: require_size.componentSizes,
		default: ""
	},
	truncated: Boolean,
	lineClamp: { type: [String, Number] },
	tag: {
		type: String,
		default: "span"
	}
});

//#endregion
exports.textProps = textProps;
//# sourceMappingURL=text.js.map