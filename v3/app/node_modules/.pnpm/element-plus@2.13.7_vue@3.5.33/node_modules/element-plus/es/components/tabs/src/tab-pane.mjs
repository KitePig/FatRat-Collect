import { buildProps } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/tabs/src/tab-pane.ts
/**
* @deprecated Removed after 3.0.0, Use `TabPaneProps` instead.
*/
const tabPaneProps = buildProps({
	label: {
		type: String,
		default: ""
	},
	name: { type: [String, Number] },
	closable: {
		type: Boolean,
		default: void 0
	},
	disabled: Boolean,
	lazy: Boolean
});

//#endregion
export { tabPaneProps };
//# sourceMappingURL=tab-pane.mjs.map