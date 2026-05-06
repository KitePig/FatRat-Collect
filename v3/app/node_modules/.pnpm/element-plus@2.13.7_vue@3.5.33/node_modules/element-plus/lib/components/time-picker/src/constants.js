Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

//#region ../../packages/components/time-picker/src/constants.ts
const timeUnits = [
	"hours",
	"minutes",
	"seconds"
];
const PICKER_BASE_INJECTION_KEY = "EP_PICKER_BASE";
const PICKER_POPPER_OPTIONS_INJECTION_KEY = "ElPopperOptions";
const ROOT_COMMON_PICKER_INJECTION_KEY = Symbol("commonPickerContextKey");
const DEFAULT_FORMATS_TIME = "HH:mm:ss";
const DEFAULT_FORMATS_DATE = "YYYY-MM-DD";
const DEFAULT_FORMATS_DATEPICKER = {
	date: DEFAULT_FORMATS_DATE,
	dates: DEFAULT_FORMATS_DATE,
	week: "gggg[w]ww",
	year: "YYYY",
	years: "YYYY",
	month: "YYYY-MM",
	months: "YYYY-MM",
	datetime: `${DEFAULT_FORMATS_DATE} ${DEFAULT_FORMATS_TIME}`,
	monthrange: "YYYY-MM",
	yearrange: "YYYY",
	daterange: DEFAULT_FORMATS_DATE,
	datetimerange: `${DEFAULT_FORMATS_DATE} ${DEFAULT_FORMATS_TIME}`
};

//#endregion
exports.DEFAULT_FORMATS_DATE = DEFAULT_FORMATS_DATE;
exports.DEFAULT_FORMATS_DATEPICKER = DEFAULT_FORMATS_DATEPICKER;
exports.DEFAULT_FORMATS_TIME = DEFAULT_FORMATS_TIME;
exports.PICKER_BASE_INJECTION_KEY = PICKER_BASE_INJECTION_KEY;
exports.PICKER_POPPER_OPTIONS_INJECTION_KEY = PICKER_POPPER_OPTIONS_INJECTION_KEY;
exports.ROOT_COMMON_PICKER_INJECTION_KEY = ROOT_COMMON_PICKER_INJECTION_KEY;
exports.timeUnits = timeUnits;
//# sourceMappingURL=constants.js.map