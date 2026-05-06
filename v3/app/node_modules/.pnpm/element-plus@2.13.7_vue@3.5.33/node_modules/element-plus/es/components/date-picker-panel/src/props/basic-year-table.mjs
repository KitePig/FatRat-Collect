import { buildProps } from "../../../../utils/vue/props/runtime.mjs";
import { datePickerSharedProps, selectionModeWithDefault } from "./shared.mjs";

//#region ../../packages/components/date-picker-panel/src/props/basic-year-table.ts
const basicYearTableProps = buildProps({
	...datePickerSharedProps,
	selectionMode: selectionModeWithDefault("year")
});

//#endregion
export { basicYearTableProps };
//# sourceMappingURL=basic-year-table.mjs.map