Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_input_number = require('./src/input-number.js');
const require_input_number$1 = require('./src/input-number2.js');

//#region ../../packages/components/input-number/index.ts
const ElInputNumber = require_install.withInstall(require_input_number$1.default);

//#endregion
exports.ElInputNumber = ElInputNumber;
exports.default = ElInputNumber;
exports.inputNumberEmits = require_input_number.inputNumberEmits;
exports.inputNumberProps = require_input_number.inputNumberProps;
//# sourceMappingURL=index.js.map