Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
let dayjs = require("dayjs");
dayjs = require_runtime.__toESM(dayjs);
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/time-picker/src/utils.ts
const buildTimeList = (value, bound) => {
	return [
		value > 0 ? value - 1 : void 0,
		value,
		value < bound ? value + 1 : void 0
	];
};
const rangeArr = (n) => Array.from(Array.from({ length: n }).keys());
const extractDateFormat = (format) => {
	return format.replace(/\W?m{1,2}|\W?ZZ/g, "").replace(/\W?h{1,2}|\W?s{1,3}|\W?a/gi, "").trim();
};
const extractTimeFormat = (format) => {
	return format.replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?Y{2,4}/g, "").trim();
};
const dateEquals = function(a, b) {
	const aIsDate = (0, _vue_shared.isDate)(a);
	const bIsDate = (0, _vue_shared.isDate)(b);
	if (aIsDate && bIsDate) return a.getTime() === b.getTime();
	if (!aIsDate && !bIsDate) return a === b;
	return false;
};
const valueEquals = function(a, b) {
	const aIsArray = (0, _vue_shared.isArray)(a);
	const bIsArray = (0, _vue_shared.isArray)(b);
	if (aIsArray && bIsArray) {
		if (a.length !== b.length) return false;
		return a.every((item, index) => dateEquals(item, b[index]));
	}
	if (!aIsArray && !bIsArray) return dateEquals(a, b);
	return false;
};
const parseDate = function(date, format, lang) {
	const day = require_types.isEmpty(format) || format === "x" ? (0, dayjs.default)(date).locale(lang) : (0, dayjs.default)(date, format).locale(lang);
	return day.isValid() ? day : void 0;
};
const formatter = function(date, format, lang) {
	if (require_types.isEmpty(format)) return date;
	if (format === "x") return +date;
	return (0, dayjs.default)(date).locale(lang).format(format);
};
const makeList = (total, method) => {
	const arr = [];
	const disabledArr = method?.();
	for (let i = 0; i < total; i++) arr.push(disabledArr?.includes(i) ?? false);
	return arr;
};
const dayOrDaysToDate = (dayOrDays) => {
	return (0, _vue_shared.isArray)(dayOrDays) ? dayOrDays.map((d) => d.toDate()) : dayOrDays.toDate();
};

//#endregion
exports.buildTimeList = buildTimeList;
exports.dateEquals = dateEquals;
exports.dayOrDaysToDate = dayOrDaysToDate;
exports.extractDateFormat = extractDateFormat;
exports.extractTimeFormat = extractTimeFormat;
exports.formatter = formatter;
exports.makeList = makeList;
exports.parseDate = parseDate;
exports.rangeArr = rangeArr;
exports.valueEquals = valueEquals;
//# sourceMappingURL=utils.js.map