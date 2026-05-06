Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_row = require('./src/row.js');
const require_constants = require('./src/constants.js');
const require_row$1 = require('./src/row2.js');

//#region ../../packages/components/row/index.ts
const ElRow = require_install.withInstall(require_row$1.default);

//#endregion
exports.ElRow = ElRow;
exports.default = ElRow;
exports.RowAlign = require_row.RowAlign;
exports.RowJustify = require_row.RowJustify;
exports.rowContextKey = require_constants.rowContextKey;
exports.rowProps = require_row.rowProps;
//# sourceMappingURL=index.js.map