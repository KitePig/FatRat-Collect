Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_token = require('./src/token.js');
const require_select = require('./src/select.js');

//#region ../../packages/components/select-v2/index.ts
const ElSelectV2 = require_install.withInstall(require_select.default);

//#endregion
exports.ElSelectV2 = ElSelectV2;
exports.default = ElSelectV2;
exports.selectV2InjectionKey = require_token.selectV2InjectionKey;
//# sourceMappingURL=index.js.map