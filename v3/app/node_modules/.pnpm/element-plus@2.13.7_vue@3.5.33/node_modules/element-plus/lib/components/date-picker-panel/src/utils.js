Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_utils = require('../../time-picker/src/utils.js');
let dayjs = require("dayjs");
dayjs = require_runtime.__toESM(dayjs);
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/date-picker-panel/src/utils.ts
const isValidRange = (range) => {
	if (!(0, _vue_shared.isArray)(range)) return false;
	const [left, right] = range;
	return dayjs.default.isDayjs(left) && dayjs.default.isDayjs(right) && (0, dayjs.default)(left).isValid() && (0, dayjs.default)(right).isValid() && left.isSameOrBefore(right);
};
const getDefaultValue = (defaultValue, { lang, step = 1, unit, unlinkPanels }) => {
	let start;
	if ((0, _vue_shared.isArray)(defaultValue)) {
		let [left, right] = defaultValue.map((d) => (0, dayjs.default)(d).locale(lang));
		if (!unlinkPanels) right = left.add(step, unit);
		return [left, right];
	} else if (defaultValue) start = (0, dayjs.default)(defaultValue);
	else start = (0, dayjs.default)();
	start = start.locale(lang);
	return [start, start.add(step, unit)];
};
const buildPickerTable = (dimension, rows, { columnIndexOffset, startDate, nextEndDate, now, unit, relativeDateGetter, setCellMetadata, setRowMetadata }) => {
	for (let rowIndex = 0; rowIndex < dimension.row; rowIndex++) {
		const row = rows[rowIndex];
		for (let columnIndex = 0; columnIndex < dimension.column; columnIndex++) {
			let cell = row[columnIndex + columnIndexOffset];
			if (!cell) cell = {
				row: rowIndex,
				column: columnIndex,
				type: "normal",
				inRange: false,
				start: false,
				end: false
			};
			const nextStartDate = relativeDateGetter(rowIndex * dimension.column + columnIndex);
			cell.dayjs = nextStartDate;
			cell.date = nextStartDate.toDate();
			cell.timestamp = nextStartDate.valueOf();
			cell.type = "normal";
			cell.inRange = !!(startDate && nextStartDate.isSameOrAfter(startDate, unit) && nextEndDate && nextStartDate.isSameOrBefore(nextEndDate, unit)) || !!(startDate && nextStartDate.isSameOrBefore(startDate, unit) && nextEndDate && nextStartDate.isSameOrAfter(nextEndDate, unit));
			if (startDate?.isSameOrAfter(nextEndDate)) {
				cell.start = !!nextEndDate && nextStartDate.isSame(nextEndDate, unit);
				cell.end = startDate && nextStartDate.isSame(startDate, unit);
			} else {
				cell.start = !!startDate && nextStartDate.isSame(startDate, unit);
				cell.end = !!nextEndDate && nextStartDate.isSame(nextEndDate, unit);
			}
			if (nextStartDate.isSame(now, unit)) cell.type = "today";
			setCellMetadata?.(cell, {
				rowIndex,
				columnIndex
			});
			row[columnIndex + columnIndexOffset] = cell;
		}
		setRowMetadata?.(row);
	}
};
const datesInMonth = (date, year, month, lang) => {
	const firstDay = (0, dayjs.default)().locale(lang).startOf("month").month(month).year(year).hour(date.hour()).minute(date.minute()).second(date.second());
	return require_utils.rangeArr(firstDay.daysInMonth()).map((n) => firstDay.add(n, "day").toDate());
};
const getValidDateOfMonth = (date, year, month, lang, disabledDate) => {
	const _value = (0, dayjs.default)().year(year).month(month).startOf("month").hour(date.hour()).minute(date.minute()).second(date.second());
	const _date = datesInMonth(date, year, month, lang).find((date) => {
		return !disabledDate?.(date);
	});
	if (_date) return (0, dayjs.default)(_date).locale(lang);
	return _value.locale(lang);
};
const getValidDateOfYear = (value, lang, disabledDate) => {
	const year = value.year();
	if (!disabledDate?.(value.toDate())) return value.locale(lang);
	const month = value.month();
	if (!datesInMonth(value, year, month, lang).every(disabledDate)) return getValidDateOfMonth(value, year, month, lang, disabledDate);
	for (let i = 0; i < 12; i++) if (!datesInMonth(value, year, i, lang).every(disabledDate)) return getValidDateOfMonth(value, year, i, lang, disabledDate);
	return value;
};
const correctlyParseUserInput = (value, format, lang, defaultFormat) => {
	if ((0, _vue_shared.isArray)(value)) return value.map((v) => correctlyParseUserInput(v, format, lang, defaultFormat));
	if ((0, _vue_shared.isString)(value)) {
		const dayjsValue = defaultFormat?.value ? (0, dayjs.default)(value) : (0, dayjs.default)(value, format);
		if (!dayjsValue.isValid()) return dayjsValue;
	}
	return (0, dayjs.default)(value, format).locale(lang);
};

//#endregion
exports.buildPickerTable = buildPickerTable;
exports.correctlyParseUserInput = correctlyParseUserInput;
exports.datesInMonth = datesInMonth;
exports.getDefaultValue = getDefaultValue;
exports.getValidDateOfMonth = getValidDateOfMonth;
exports.getValidDateOfYear = getValidDateOfYear;
exports.isValidRange = isValidRange;
//# sourceMappingURL=utils.js.map