import { withInstall } from "../../utils/vue/install.mjs";
import { datePickerPanelProps } from "./src/props/date-picker-panel.mjs";
import { ROOT_PICKER_INJECTION_KEY, ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY } from "./src/constants.mjs";
import date_picker_panel_default from "./src/date-picker-panel.mjs";

//#region ../../packages/components/date-picker-panel/index.ts
const ElDatePickerPanel = withInstall(date_picker_panel_default);

//#endregion
export { ElDatePickerPanel, ElDatePickerPanel as default, ROOT_PICKER_INJECTION_KEY, ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY, datePickerPanelProps };
//# sourceMappingURL=index.mjs.map