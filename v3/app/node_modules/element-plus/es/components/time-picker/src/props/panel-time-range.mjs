import { buildProps, definePropType } from "../../../../utils/vue/props/runtime.mjs";
import { timePanelSharedProps } from "./shared.mjs";

//#region ../../packages/components/time-picker/src/props/panel-time-range.ts
const panelTimeRangeProps = buildProps({
	...timePanelSharedProps,
	parsedValue: { type: definePropType(Array) }
});

//#endregion
export { panelTimeRangeProps };
//# sourceMappingURL=panel-time-range.mjs.map