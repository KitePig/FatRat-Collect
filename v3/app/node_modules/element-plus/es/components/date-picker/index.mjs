import { withInstall } from "../../utils/vue/install.mjs";
import { datePickerProps } from "./src/props.mjs";
import date_picker_default from "./src/date-picker.mjs";

//#region ../../packages/components/date-picker/index.ts
const ElDatePicker = withInstall(date_picker_default);

//#endregion
export { ElDatePicker, ElDatePicker as default, datePickerProps };
//# sourceMappingURL=index.mjs.map