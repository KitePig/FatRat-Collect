Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_color_picker = require('./src/color-picker.js');
const require_color_picker$1 = require('./src/color-picker2.js');

//#region ../../packages/components/color-picker/index.ts
const ElColorPicker = require_install.withInstall(require_color_picker$1.default);

//#endregion
exports.ElColorPicker = ElColorPicker;
exports.default = ElColorPicker;
exports.colorPickerEmits = require_color_picker.colorPickerEmits;
exports.colorPickerProps = require_color_picker.colorPickerProps;
exports.colorPickerPropsDefaults = require_color_picker.colorPickerPropsDefaults;
//# sourceMappingURL=index.js.map