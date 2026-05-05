import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { _default } from "./src/date-picker-panel.js";
import { ROOT_PICKER_INJECTION_KEY, ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY } from "./src/constants.js";
import { DateCell, DatePickerType } from "./src/types.js";
import { DatePickerPanelProps, DatePickerPanelPropsPublic, datePickerPanelProps } from "./src/props/date-picker-panel.js";
import { DatePickerPanelInstance } from "./src/instance.js";

//#region ../../packages/components/date-picker-panel/index.d.ts
declare const ElDatePickerPanel: SFCWithInstall<typeof _default>;
//#endregion
export { DateCell, type DatePickerPanelInstance, DatePickerPanelProps, DatePickerPanelPropsPublic, DatePickerType, ElDatePickerPanel, ElDatePickerPanel as default, ROOT_PICKER_INJECTION_KEY, ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY, datePickerPanelProps };