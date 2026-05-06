Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_error = require('../../../utils/error.js');
const require_index = require('../../../hooks/use-locale/index.js');
let vue = require("vue");
let dayjs = require("dayjs");
dayjs = require_runtime.__toESM(dayjs);
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/calendar/src/use-calendar.ts
const adjacentMonth = (start, end) => {
	const firstMonthLastDay = start.endOf("month");
	const lastMonthFirstDay = end.startOf("month");
	const lastMonthStartDay = firstMonthLastDay.isSame(lastMonthFirstDay, "week") ? lastMonthFirstDay.add(1, "week") : lastMonthFirstDay;
	return [[start, firstMonthLastDay], [lastMonthStartDay.startOf("week"), end]];
};
const threeConsecutiveMonth = (start, end) => {
	const firstMonthLastDay = start.endOf("month");
	const secondMonthFirstDay = start.add(1, "month").startOf("month");
	const secondMonthStartDay = firstMonthLastDay.isSame(secondMonthFirstDay, "week") ? secondMonthFirstDay.add(1, "week") : secondMonthFirstDay;
	const secondMonthLastDay = secondMonthStartDay.endOf("month");
	const lastMonthFirstDay = end.startOf("month");
	const lastMonthStartDay = secondMonthLastDay.isSame(lastMonthFirstDay, "week") ? lastMonthFirstDay.add(1, "week") : lastMonthFirstDay;
	return [
		[start, firstMonthLastDay],
		[secondMonthStartDay.startOf("week"), secondMonthLastDay],
		[lastMonthStartDay.startOf("week"), end]
	];
};
const useCalendar = (props, emit, componentName) => {
	const { lang } = require_index.useLocale();
	const selectedDay = (0, vue.ref)();
	const now = (0, dayjs.default)().locale(lang.value);
	const realSelectedDay = (0, vue.computed)({
		get() {
			if (!props.modelValue) return selectedDay.value;
			return date.value;
		},
		set(val) {
			if (!val) return;
			selectedDay.value = val;
			const result = val.toDate();
			emit(require_event.INPUT_EVENT, result);
			emit(require_event.UPDATE_MODEL_EVENT, result);
		}
	});
	const validatedRange = (0, vue.computed)(() => {
		if (!props.range || !(0, _vue_shared.isArray)(props.range) || props.range.length !== 2 || props.range.some((item) => !(0, _vue_shared.isDate)(item))) return [];
		const [startDayjs, endDayjs] = props.range.map((_) => (0, dayjs.default)(_).locale(lang.value));
		if (startDayjs.isAfter(endDayjs)) {
			require_error.debugWarn(componentName, "end time should be greater than start time");
			return [];
		}
		if (startDayjs.isSame(endDayjs, "month")) return calculateValidatedDateRange(startDayjs, endDayjs);
		else {
			if (startDayjs.add(1, "month").month() !== endDayjs.month()) {
				require_error.debugWarn(componentName, "start time and end time interval must not exceed two months");
				return [];
			}
			return calculateValidatedDateRange(startDayjs, endDayjs);
		}
	});
	const date = (0, vue.computed)(() => {
		if (!props.modelValue) return realSelectedDay.value || (validatedRange.value.length ? validatedRange.value[0][0] : now);
		else return (0, dayjs.default)(props.modelValue).locale(lang.value);
	});
	const prevMonthDayjs = (0, vue.computed)(() => date.value.subtract(1, "month").date(1));
	const nextMonthDayjs = (0, vue.computed)(() => date.value.add(1, "month").date(1));
	const prevYearDayjs = (0, vue.computed)(() => date.value.subtract(1, "year").date(1));
	const nextYearDayjs = (0, vue.computed)(() => date.value.add(1, "year").date(1));
	const calculateValidatedDateRange = (startDayjs, endDayjs) => {
		const firstDay = startDayjs.startOf("week");
		const lastDay = endDayjs.endOf("week");
		const firstMonth = firstDay.get("month");
		const lastMonth = lastDay.get("month");
		if (firstMonth === lastMonth) return [[firstDay, lastDay]];
		else if ((firstMonth + 1) % 12 === lastMonth) return adjacentMonth(firstDay, lastDay);
		else if (firstMonth + 2 === lastMonth || (firstMonth + 1) % 11 === lastMonth) return threeConsecutiveMonth(firstDay, lastDay);
		else {
			require_error.debugWarn(componentName, "start time and end time interval must not exceed two months");
			return [];
		}
	};
	const pickDay = (day) => {
		realSelectedDay.value = day;
	};
	const selectDate = (type) => {
		const day = {
			"prev-month": prevMonthDayjs.value,
			"next-month": nextMonthDayjs.value,
			"prev-year": prevYearDayjs.value,
			"next-year": nextYearDayjs.value,
			today: now
		}[type];
		if (!day.isSame(date.value, "day")) pickDay(day);
	};
	const handleDateChange = (date) => {
		if (date === "today") selectDate("today");
		else pickDay(date);
	};
	return {
		calculateValidatedDateRange,
		date,
		realSelectedDay,
		pickDay,
		selectDate,
		validatedRange,
		handleDateChange
	};
};

//#endregion
exports.useCalendar = useCalendar;
//# sourceMappingURL=use-calendar.js.map