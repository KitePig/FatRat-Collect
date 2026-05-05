import { withInstall } from "../../utils/vue/install.mjs";
import { ROOT_COMMON_COLOR_INJECTION_KEY, colorPickerPanelContextKey, colorPickerPanelEmits, colorPickerPanelProps } from "./src/color-picker-panel.mjs";
import color_picker_panel_default from "./src/color-picker-panel2.mjs";

//#region ../../packages/components/color-picker-panel/index.ts
const ElColorPickerPanel = withInstall(color_picker_panel_default);

//#endregion
export { ElColorPickerPanel, ElColorPickerPanel as default, ROOT_COMMON_COLOR_INJECTION_KEY, colorPickerPanelContextKey, colorPickerPanelEmits, colorPickerPanelProps };
//# sourceMappingURL=index.mjs.map