import { buildProps } from "../../../../utils/vue/props/runtime.mjs";
import { panelRangeSharedProps } from "./shared.mjs";

//#region ../../packages/components/date-picker-panel/src/props/panel-year-range.ts
const panelYearRangeProps = buildProps({ ...panelRangeSharedProps });
const panelYearRangeEmits = [
	"pick",
	"set-picker-option",
	"calendar-change"
];

//#endregion
export { panelYearRangeEmits, panelYearRangeProps };
//# sourceMappingURL=panel-year-range.mjs.map