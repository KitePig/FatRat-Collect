Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_time_select = require('./src/time-select.js');
const require_time_select$1 = require('./src/time-select2.js');

//#region ../../packages/components/time-select/index.ts
const ElTimeSelect = require_install.withInstall(require_time_select$1.default);

//#endregion
exports.DEFAULT_STEP = require_time_select.DEFAULT_STEP;
exports.ElTimeSelect = ElTimeSelect;
exports.default = ElTimeSelect;
exports.timeSelectProps = require_time_select.timeSelectProps;
//# sourceMappingURL=index.js.map