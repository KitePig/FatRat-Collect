Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_date = require('../../../constants/date.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_constants = require('../../time-picker/src/constants.js');
const require_utils = require('../../time-picker/src/utils.js');
const require_date_table = require('./date-table.js');
let vue = require("vue");
let dayjs = require("dayjs");
dayjs = require_runtime.__toESM(dayjs);
let dayjs_plugin_localeData_js = require("dayjs/plugin/localeData.js");
dayjs_plugin_localeData_js = require_runtime.__toESM(dayjs_plugin_localeData_js);

//#region ../../packages/components/calendar/src/use-date-table.ts
const useDateTable = (props, emit) => {
	dayjs.default.extend(dayjs_plugin_localeData_js.default);
	const firstDayOfWeek = dayjs.default.localeData().firstDayOfWeek();
	const { t, lang } = require_index.useLocale();
	const now = (0, dayjs.default)().locale(lang.value);
	const isInRange = (0, vue.computed)(() => !!props.range && !!props.range.length);
	const rows = (0, vue.computed)(() => {
		let days = [];
		if (isInRange.value) {
			const [start, end] = props.range;
			const currentMonthRange = require_utils.rangeArr(end.date() - start.date() + 1).map((index) => ({
				text: start.date() + index,
				type: "current"
			}));
			let remaining = currentMonthRange.length % 7;
			remaining = remaining === 0 ? 0 : 7 - remaining;
			const nextMonthRange = require_utils.rangeArr(remaining).map((_, index) => ({
				text: index + 1,
				type: "next"
			}));
			days = currentMonthRange.concat(nextMonthRange);
		} else {
			const firstDay = props.date.startOf("month").day();
			const prevMonthDays = require_date_table.getPrevMonthLastDays(props.date, (firstDay - firstDayOfWeek + 7) % 7).map((day) => ({
				text: day,
				type: "prev"
			}));
			const currentMonthDays = require_date_table.getMonthDays(props.date).map((day) => ({
				text: day,
				type: "current"
			}));
			days = [...prevMonthDays, ...currentMonthDays];
			const nextMonthDays = require_utils.rangeArr(7 - (days.length % 7 || 7)).map((_, index) => ({
				text: index + 1,
				type: "next"
			}));
			days = days.concat(nextMonthDays);
		}
		return require_date_table.toNestedArr(days);
	});
	const weekDays = (0, vue.computed)(() => {
		const start = firstDayOfWeek;
		if (start === 0) return require_date.WEEK_DAYS.map((_) => t(`el.datepicker.weeks.${_}`));
		else return require_date.WEEK_DAYS.slice(start).concat(require_date.WEEK_DAYS.slice(0, start)).map((_) => t(`el.datepicker.weeks.${_}`));
	});
	const getFormattedDate = (day, type) => {
		switch (type) {
			case "prev": return props.date.startOf("month").subtract(1, "month").date(day);
			case "next": return props.date.startOf("month").add(1, "month").date(day);
			case "current": return props.date.date(day);
		}
	};
	const handlePickDay = ({ text, type }) => {
		emit("pick", getFormattedDate(text, type));
	};
	const getSlotData = ({ text, type }) => {
		const day = getFormattedDate(text, type);
		return {
			isSelected: day.isSame(props.selectedDay),
			type: `${type}-month`,
			day: day.format(require_constants.DEFAULT_FORMATS_DATE),
			date: day.toDate()
		};
	};
	return {
		now,
		isInRange,
		rows,
		weekDays,
		getFormattedDate,
		handlePickDay,
		getSlotData
	};
};

//#endregion
exports.useDateTable = useDateTable;
//# sourceMappingURL=use-date-table.js.map