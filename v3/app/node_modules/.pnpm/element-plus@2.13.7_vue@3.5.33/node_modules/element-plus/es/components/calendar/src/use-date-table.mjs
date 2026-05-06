import { WEEK_DAYS } from "../../../constants/date.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { DEFAULT_FORMATS_DATE } from "../../time-picker/src/constants.mjs";
import { rangeArr } from "../../time-picker/src/utils.mjs";
import { getMonthDays, getPrevMonthLastDays, toNestedArr } from "./date-table.mjs";
import { computed } from "vue";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData.js";

//#region ../../packages/components/calendar/src/use-date-table.ts
const useDateTable = (props, emit) => {
	dayjs.extend(localeData);
	const firstDayOfWeek = dayjs.localeData().firstDayOfWeek();
	const { t, lang } = useLocale();
	const now = dayjs().locale(lang.value);
	const isInRange = computed(() => !!props.range && !!props.range.length);
	const rows = computed(() => {
		let days = [];
		if (isInRange.value) {
			const [start, end] = props.range;
			const currentMonthRange = rangeArr(end.date() - start.date() + 1).map((index) => ({
				text: start.date() + index,
				type: "current"
			}));
			let remaining = currentMonthRange.length % 7;
			remaining = remaining === 0 ? 0 : 7 - remaining;
			const nextMonthRange = rangeArr(remaining).map((_, index) => ({
				text: index + 1,
				type: "next"
			}));
			days = currentMonthRange.concat(nextMonthRange);
		} else {
			const firstDay = props.date.startOf("month").day();
			const prevMonthDays = getPrevMonthLastDays(props.date, (firstDay - firstDayOfWeek + 7) % 7).map((day) => ({
				text: day,
				type: "prev"
			}));
			const currentMonthDays = getMonthDays(props.date).map((day) => ({
				text: day,
				type: "current"
			}));
			days = [...prevMonthDays, ...currentMonthDays];
			const nextMonthDays = rangeArr(7 - (days.length % 7 || 7)).map((_, index) => ({
				text: index + 1,
				type: "next"
			}));
			days = days.concat(nextMonthDays);
		}
		return toNestedArr(days);
	});
	const weekDays = computed(() => {
		const start = firstDayOfWeek;
		if (start === 0) return WEEK_DAYS.map((_) => t(`el.datepicker.weeks.${_}`));
		else return WEEK_DAYS.slice(start).concat(WEEK_DAYS.slice(0, start)).map((_) => t(`el.datepicker.weeks.${_}`));
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
			day: day.format(DEFAULT_FORMATS_DATE),
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
export { useDateTable };
//# sourceMappingURL=use-date-table.mjs.map