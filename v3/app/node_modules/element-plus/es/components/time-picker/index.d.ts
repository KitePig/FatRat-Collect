import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { DateModelType, DateOrDates, DayOrDays, GetDisabledHours, GetDisabledMinutes, GetDisabledSeconds, ModelValueType, PickerOptions, SingleOrRange, TimePickerDefaultProps, TimePickerDefaultPropsPublic, UserInput, timePickerDefaultProps, timePickerRangeTriggerProps, timePickerRngeTriggerProps } from "./src/common/props.js";
import { _default as _default$2 } from "./src/time-picker.js";
import { _default } from "./src/common/picker.vue.js";
import { _default as _default$1 } from "./src/time-picker-com/panel-time-pick.vue.js";
import { TimeList, buildTimeList, dateEquals, dayOrDaysToDate, extractDateFormat, extractTimeFormat, formatter, makeList, parseDate, rangeArr, valueEquals } from "./src/utils.js";
import { DEFAULT_FORMATS_DATE, DEFAULT_FORMATS_DATEPICKER, DEFAULT_FORMATS_TIME, PICKER_BASE_INJECTION_KEY, PICKER_POPPER_OPTIONS_INJECTION_KEY, ROOT_COMMON_PICKER_INJECTION_KEY, TimeUnit, timeUnits } from "./src/constants.js";

//#region ../../packages/components/time-picker/index.d.ts
type TimePickerInstance = InstanceType<typeof _default$2> & TimePickerExpose;
type TimePickerExpose = {
  focus: () => void;
  blur: () => void;
  handleOpen: () => void;
  handleClose: () => void;
};
declare const ElTimePicker: SFCWithInstall<typeof _default$2>;
//#endregion
export { _default as CommonPicker, DEFAULT_FORMATS_DATE, DEFAULT_FORMATS_DATEPICKER, DEFAULT_FORMATS_TIME, DateModelType, DateOrDates, DayOrDays, ElTimePicker, ElTimePicker as default, GetDisabledHours, GetDisabledMinutes, GetDisabledSeconds, ModelValueType, PICKER_BASE_INJECTION_KEY, PICKER_POPPER_OPTIONS_INJECTION_KEY, PickerOptions, ROOT_COMMON_PICKER_INJECTION_KEY, SingleOrRange, TimeList, _default$1 as TimePickPanel, TimePickerDefaultProps, TimePickerDefaultPropsPublic, TimePickerExpose, TimePickerInstance, TimeUnit, UserInput, buildTimeList, dateEquals, dayOrDaysToDate, extractDateFormat, extractTimeFormat, formatter, makeList, parseDate, rangeArr, timePickerDefaultProps, timePickerRangeTriggerProps, timePickerRngeTriggerProps, timeUnits, valueEquals };