Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_rate = require('./src/rate.js');
const require_rate$1 = require('./src/rate2.js');

//#region ../../packages/components/rate/index.ts
const ElRate = require_install.withInstall(require_rate$1.default);

//#endregion
exports.ElRate = ElRate;
exports.default = ElRate;
exports.rateEmits = require_rate.rateEmits;
exports.rateProps = require_rate.rateProps;
//# sourceMappingURL=index.js.map