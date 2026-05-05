Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_color_picker_panel = require('./src/color-picker-panel.js');
const require_color_picker_panel$1 = require('./src/color-picker-panel2.js');

//#region ../../packages/components/color-picker-panel/index.ts
const ElColorPickerPanel = require_install.withInstall(require_color_picker_panel$1.default);

//#endregion
exports.ElColorPickerPanel = ElColorPickerPanel;
exports.default = ElColorPickerPanel;
exports.ROOT_COMMON_COLOR_INJECTION_KEY = require_color_picker_panel.ROOT_COMMON_COLOR_INJECTION_KEY;
exports.colorPickerPanelContextKey = require_color_picker_panel.colorPickerPanelContextKey;
exports.colorPickerPanelEmits = require_color_picker_panel.colorPickerPanelEmits;
exports.colorPickerPanelProps = require_color_picker_panel.colorPickerPanelProps;
//# sourceMappingURL=index.js.map