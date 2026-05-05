Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_utils = require('../../time-picker/src/utils.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/calendar/src/date-table.ts
const getPrevMonthLastDays = (date, count) => {
	const lastDay = date.subtract(1, "month").endOf("month").date();
	return require_utils.rangeArr(count).map((_, index) => lastDay - (count - index - 1));
};
const getMonthDays = (date) => {
	return require_utils.rangeArr(date.daysInMonth()).map((_, index) => index + 1);
};
const toNestedArr = (days) => require_utils.rangeArr(days.length / 7).map((index) => {
	const start = index * 7;
	return days.slice(start, start + 7);
});
/**
*  @deprecated Removed after 3.0.0, Use `DateTableProps` instead.
*/
const dateTableProps = require_runtime$1.buildProps({
	selectedDay: { type: require_runtime$1.definePropType(Object) },
	range: { type: require_runtime$1.definePropType(Array) },
	date: {
		type: require_runtime$1.definePropType(Object),
		required: true
	},
	hideHeader: { type: Boolean }
});
const dateTableEmits = { pick: (value) => (0, _vue_shared.isObject)(value) };

//#endregion
exports.dateTableEmits = dateTableEmits;
exports.dateTableProps = dateTableProps;
exports.getMonthDays = getMonthDays;
exports.getPrevMonthLastDays = getPrevMonthLastDays;
exports.toNestedArr = toNestedArr;
//# sourceMappingURL=date-table.js.map