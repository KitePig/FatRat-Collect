import { CommonPickerContext } from "./composables/use-common-picker.js";
import { InjectionKey } from "vue";

//#region ../../packages/components/time-picker/src/constants.d.ts
declare const timeUnits: readonly ["hours", "minutes", "seconds"];
declare const PICKER_BASE_INJECTION_KEY = "EP_PICKER_BASE";
declare const PICKER_POPPER_OPTIONS_INJECTION_KEY = "ElPopperOptions";
declare const ROOT_COMMON_PICKER_INJECTION_KEY: InjectionKey<CommonPickerContext>;
declare const DEFAULT_FORMATS_TIME = "HH:mm:ss";
declare const DEFAULT_FORMATS_DATE = "YYYY-MM-DD";
declare const DEFAULT_FORMATS_DATEPICKER: {
  date: string;
  dates: string;
  week: string;
  year: string;
  years: string;
  month: string;
  months: string;
  datetime: string;
  monthrange: string;
  yearrange: string;
  daterange: string;
  datetimerange: string;
};
type TimeUnit = (typeof timeUnits)[number];
//#endregion
export { DEFAULT_FORMATS_DATE, DEFAULT_FORMATS_DATEPICKER, DEFAULT_FORMATS_TIME, PICKER_BASE_INJECTION_KEY, PICKER_POPPER_OPTIONS_INJECTION_KEY, ROOT_COMMON_PICKER_INJECTION_KEY, TimeUnit, timeUnits };