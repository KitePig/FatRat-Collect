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
export { DEFAULT_FORMATS_DATE, DEFAULT_FORMATS_DATEPICKER, DEFAULT_FORMATS_TIME, PICKER_BASE_INJECTION_KEY, PICKER_POPPER_OPTIONS_INJECTION_KEY, ROOT_COMMON_PICKER_INJECTION_KEY, timeUnits };
//# sourceMappingURL=constants.mjs.map