import { buildProps } from "../../../../utils/vue/props/runtime.mjs";
import { datePickerSharedProps, selectionModeWithDefault } from "./shared.mjs";

//#region ../../packages/components/date-picker-panel/src/props/basic-date-table.ts
const basicDateTableProps = buildProps({
	...datePickerSharedProps,
	showWeekNumber: Boolean,
	selectionMode: selectionModeWithDefault("date")
});
const basicDateTableEmits = [
	"changerange",
	"pick",
	"select"
];

//#endregion
export { basicDateTableEmits, basicDateTableProps };
//# sourceMappingURL=basic-date-table.mjs.map