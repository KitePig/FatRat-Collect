import { buildProps, definePropType } from "../../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/color-picker-panel/src/props/sv-panel.ts
/**
* @deprecated Removed after 3.0.0, Use `SvPanelProps` instead.
*/
const svPanelProps = buildProps({
	color: {
		type: definePropType(Object),
		required: true
	},
	disabled: Boolean
});

//#endregion
export { svPanelProps };
//# sourceMappingURL=sv-panel.mjs.map