Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_transfer = require('./src/transfer.js');
const require_transfer$1 = require('./src/transfer2.js');

//#region ../../packages/components/transfer/index.ts
const ElTransfer = require_install.withInstall(require_transfer$1.default);

//#endregion
exports.ElTransfer = ElTransfer;
exports.default = ElTransfer;
exports.LEFT_CHECK_CHANGE_EVENT = require_transfer.LEFT_CHECK_CHANGE_EVENT;
exports.RIGHT_CHECK_CHANGE_EVENT = require_transfer.RIGHT_CHECK_CHANGE_EVENT;
exports.transferCheckedChangeFn = require_transfer.transferCheckedChangeFn;
exports.transferEmits = require_transfer.transferEmits;
exports.transferProps = require_transfer.transferProps;
//# sourceMappingURL=index.js.map