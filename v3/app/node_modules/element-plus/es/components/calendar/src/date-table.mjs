import { isObject } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { rangeArr } from "../../time-picker/src/utils.mjs";

//#region ../../packages/components/calendar/src/date-table.ts
const getPrevMonthLastDays = (date, count) => {
	const lastDay = date.subtract(1, "month").endOf("month").date();
	return rangeArr(count).map((_, index) => lastDay - (count - index - 1));
};
const getMonthDays = (date) => {
	return rangeArr(date.daysInMonth()).map((_, index) => index + 1);
};
const toNestedArr = (days) => rangeArr(days.length / 7).map((index) => {
	const start = index * 7;
	return days.slice(start, start + 7);
});
/**
*  @deprecated Removed after 3.0.0, Use `DateTableProps` instead.
*/
const dateTableProps = buildProps({
	selectedDay: { type: definePropType(Object) },
	range: { type: definePropType(Array) },
	date: {
		type: definePropType(Object),
		required: true
	},
	hideHeader: { type: Boolean }
});
const dateTableEmits = { pick: (value) => isObject(value) };

//#endregion
export { dateTableEmits, dateTableProps, getMonthDays, getPrevMonthLastDays, toNestedArr };
//# sourceMappingURL=date-table.mjs.map