Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_table = require('./src/table.js');
const require_tableColumn = require('./src/tableColumn.js');

//#region ../../packages/components/table/index.ts
const ElTable = require_install.withInstall(require_table.default, { TableColumn: require_tableColumn.default });
const ElTableColumn = require_install.withNoopInstall(require_tableColumn.default);

//#endregion
exports.ElTable = ElTable;
exports.default = ElTable;
exports.ElTableColumn = ElTableColumn;
//# sourceMappingURL=index.js.map