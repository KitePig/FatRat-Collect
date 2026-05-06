import { buildProps } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/skeleton/src/skeleton-item.ts
/**
* @deprecated Removed after 3.0.0, Use `SkeletonItemProps` instead.
*/
const skeletonItemProps = buildProps({ variant: {
	type: String,
	values: [
		"circle",
		"rect",
		"h1",
		"h3",
		"text",
		"caption",
		"p",
		"image",
		"button"
	],
	default: "text"
} });

//#endregion
export { skeletonItemProps };
//# sourceMappingURL=skeleton-item.mjs.map