Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_alert = require('./src/alert.js');
const require_alert$1 = require('./src/alert2.js');

//#region ../../packages/components/alert/index.ts
const ElAlert = require_install.withInstall(require_alert$1.default);

//#endregion
exports.ElAlert = ElAlert;
exports.default = ElAlert;
exports.alertEffects = require_alert.alertEffects;
exports.alertEmits = require_alert.alertEmits;
exports.alertProps = require_alert.alertProps;
//# sourceMappingURL=index.js.map