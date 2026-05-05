import { componentSizes } from "../../../constants/size.mjs";
import { buildProps } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/text/src/text.ts
/**
* @deprecated Removed after 3.0.0, Use `TextProps` instead.
*/
const textProps = buildProps({
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
		values: componentSizes,
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
export { textProps };
//# sourceMappingURL=text.mjs.map