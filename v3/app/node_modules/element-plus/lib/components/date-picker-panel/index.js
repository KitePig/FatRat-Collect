Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_date_picker_panel = require('./src/props/date-picker-panel.js');
const require_constants = require('./src/constants.js');
const require_date_picker_panel$1 = require('./src/date-picker-panel.js');

//#region ../../packages/components/date-picker-panel/index.ts
const ElDatePickerPanel = require_install.withInstall(require_date_picker_panel$1.default);

//#endregion
exports.ElDatePickerPanel = ElDatePickerPanel;
exports.default = ElDatePickerPanel;
exports.ROOT_PICKER_INJECTION_KEY = require_constants.ROOT_PICKER_INJECTION_KEY;
exports.ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY = require_constants.ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY;
exports.datePickerPanelProps = require_date_picker_panel.datePickerPanelProps;
//# sourceMappingURL=index.js.map