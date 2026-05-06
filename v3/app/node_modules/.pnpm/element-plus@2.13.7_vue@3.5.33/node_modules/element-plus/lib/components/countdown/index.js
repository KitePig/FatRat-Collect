Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_countdown = require('./src/countdown.js');
const require_countdown$1 = require('./src/countdown2.js');

//#region ../../packages/components/countdown/index.ts
const ElCountdown = require_install.withInstall(require_countdown$1.default);

//#endregion
exports.ElCountdown = ElCountdown;
exports.default = ElCountdown;
exports.countdownEmits = require_countdown.countdownEmits;
exports.countdownProps = require_countdown.countdownProps;
//# sourceMappingURL=index.js.map