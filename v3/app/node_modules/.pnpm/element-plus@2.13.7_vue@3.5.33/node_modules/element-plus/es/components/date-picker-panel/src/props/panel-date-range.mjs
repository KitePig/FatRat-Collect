import { buildProps } from "../../../../utils/vue/props/runtime.mjs";
import { panelRangeSharedProps, panelSharedProps } from "./shared.mjs";

//#region ../../packages/components/date-picker-panel/src/props/panel-date-range.ts
const panelDateRangeProps = buildProps({
	...panelSharedProps,
	...panelRangeSharedProps
});

//#endregion
export { panelDateRangeProps };
//# sourceMappingURL=panel-date-range.mjs.map