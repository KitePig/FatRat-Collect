Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_props = require('./src/props.js');
const require_date_picker = require('./src/date-picker.js');

//#region ../../packages/components/date-picker/index.ts
const ElDatePicker = require_install.withInstall(require_date_picker.default);

//#endregion
exports.ElDatePicker = ElDatePicker;
exports.default = ElDatePicker;
exports.datePickerProps = require_props.datePickerProps;
//# sourceMappingURL=index.js.map