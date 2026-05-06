import { buildProps } from "../../../../utils/vue/props/runtime.mjs";
import { datePickerSharedProps, selectionModeWithDefault } from "./shared.mjs";

//#region ../../packages/components/date-picker-panel/src/props/basic-month-table.ts
const basicMonthTableProps = buildProps({
	...datePickerSharedProps,
	selectionMode: selectionModeWithDefault("month")
});

//#endregion
export { basicMonthTableProps };
//# sourceMappingURL=basic-month-table.mjs.map