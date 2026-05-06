import { buildProps } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/splitter/src/split-panel.ts
/**
* @deprecated Removed after 3.0.0, Use `SplitterPanelProps` instead.
*/
const splitterPanelProps = buildProps({
	min: { type: [String, Number] },
	max: { type: [String, Number] },
	size: { type: [String, Number] },
	resizable: {
		type: Boolean,
		default: true
	},
	collapsible: Boolean
});
const splitterPanelEmits = { "update:size": (value) => typeof value === "number" || typeof value === "string" };

//#endregion
export { splitterPanelEmits, splitterPanelProps };
//# sourceMappingURL=split-panel.mjs.map