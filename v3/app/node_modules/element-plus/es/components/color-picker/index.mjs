import { withInstall } from "../../utils/vue/install.mjs";
import { colorPickerEmits, colorPickerProps, colorPickerPropsDefaults } from "./src/color-picker.mjs";
import color_picker_default from "./src/color-picker2.mjs";

//#region ../../packages/components/color-picker/index.ts
const ElColorPicker = withInstall(color_picker_default);

//#endregion
export { ElColorPicker, ElColorPicker as default, colorPickerEmits, colorPickerProps, colorPickerPropsDefaults };
//# sourceMappingURL=index.mjs.map