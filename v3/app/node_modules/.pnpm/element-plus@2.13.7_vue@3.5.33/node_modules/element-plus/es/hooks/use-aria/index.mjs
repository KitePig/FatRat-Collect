import { buildProps } from "../../utils/vue/props/runtime.mjs";
import { pick } from "lodash-unified";

//#region ../../packages/hooks/use-aria/index.ts
/**
* @deprecated Removed after 3.0.0, Use `AriaProps` instead.
*/
const ariaProps = buildProps({
	ariaLabel: String,
	ariaOrientation: {
		type: String,
		values: [
			"horizontal",
			"vertical",
			"undefined"
		]
	},
	ariaControls: String
});
const useAriaProps = (arias) => {
	return pick(ariaProps, arias);
};

//#endregion
export { ariaProps, useAriaProps };
//# sourceMappingURL=index.mjs.map