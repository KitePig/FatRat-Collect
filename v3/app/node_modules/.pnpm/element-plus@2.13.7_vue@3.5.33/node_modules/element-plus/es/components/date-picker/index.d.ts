import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { _default } from "./src/date-picker.js";
import { DatePickerProps, DatePickerPropsPublic, datePickerProps } from "./src/props.js";
import { DatePickerInstance } from "./src/instance.js";

//#region ../../packages/components/date-picker/index.d.ts
declare const ElDatePicker: SFCWithInstall<typeof _default>;
//#endregion
export { type DatePickerInstance, DatePickerProps, DatePickerPropsPublic, ElDatePicker, ElDatePicker as default, datePickerProps };