Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_install = require('../../utils/vue/install.js');
const require_constants = require('./src/constants.js');
const require_private = require('./src/private.js');
const require_row = require('./src/row.js');
const require_table = require('./src/table.js');
const require_table_v2 = require('./src/table-v2.js');
const require_auto_resizer = require('./src/auto-resizer.js');
const require_auto_resizer$1 = require('./src/components/auto-resizer.js');

//#region ../../packages/components/table-v2/index.ts
const ElTableV2 = require_install.withInstall(require_table_v2.default);
const ElAutoResizer = require_install.withInstall(require_auto_resizer$1.default);

//#endregion
exports.ElAutoResizer = ElAutoResizer;
exports.ElTableV2 = ElTableV2;
exports.TableV2 = require_table_v2.default;
exports.TableV2Alignment = require_constants.Alignment;
exports.TableV2FixedDir = require_constants.FixedDir;
exports.TableV2Placeholder = require_private.placeholderSign;
exports.TableV2SortOrder = require_constants.SortOrder;
exports.autoResizerProps = require_auto_resizer.autoResizerProps;
exports.tableV2Props = require_table.tableV2Props;
exports.tableV2RowProps = require_row.tableV2RowProps;
//# sourceMappingURL=index.js.map