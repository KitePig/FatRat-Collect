import { buildProps } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/splitter/src/splitter.ts
/**
* @deprecated Removed after 3.0.0, Use `SplitterProps` instead.
*/
const splitterProps = buildProps({
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
export { splitterEmits, splitterProps };
//# sourceMappingURL=splitter.mjs.map