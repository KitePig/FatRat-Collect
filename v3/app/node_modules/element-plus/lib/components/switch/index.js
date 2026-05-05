Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_switch = require('./src/switch.js');
const require_switch$1 = require('./src/switch2.js');

//#region ../../packages/components/switch/index.ts
const ElSwitch = require_install.withInstall(require_switch$1.default);

//#endregion
exports.ElSwitch = ElSwitch;
exports.default = ElSwitch;
exports.switchEmits = require_switch.switchEmits;
exports.switchProps = require_switch.switchProps;
//# sourceMappingURL=index.js.map