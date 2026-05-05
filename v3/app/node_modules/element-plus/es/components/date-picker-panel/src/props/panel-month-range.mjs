import { buildProps } from "../../../../utils/vue/props/runtime.mjs";
import { panelRangeSharedProps } from "./shared.mjs";

//#region ../../packages/components/date-picker-panel/src/props/panel-month-range.ts
const panelMonthRangeProps = buildProps({ ...panelRangeSharedProps });
const panelMonthRangeEmits = [
	"pick",
	"set-picker-option",
	"calendar-change"
];

//#endregion
export { panelMonthRangeEmits, panelMonthRangeProps };
//# sourceMappingURL=panel-month-range.mjs.map