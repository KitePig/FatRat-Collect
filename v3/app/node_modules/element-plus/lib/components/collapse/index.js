Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_collapse = require('./src/collapse.js');
const require_constants = require('./src/constants.js');
const require_collapse$1 = require('./src/collapse2.js');
const require_collapse_item = require('./src/collapse-item.js');
const require_collapse_item$1 = require('./src/collapse-item2.js');

//#region ../../packages/components/collapse/index.ts
const ElCollapse = require_install.withInstall(require_collapse$1.default, { CollapseItem: require_collapse_item$1.default });
const ElCollapseItem = require_install.withNoopInstall(require_collapse_item$1.default);

//#endregion
exports.ElCollapse = ElCollapse;
exports.default = ElCollapse;
exports.ElCollapseItem = ElCollapseItem;
exports.collapseContextKey = require_constants.collapseContextKey;
exports.collapseEmits = require_collapse.collapseEmits;
exports.collapseItemProps = require_collapse_item.collapseItemProps;
exports.collapseProps = require_collapse.collapseProps;
exports.emitChangeFn = require_collapse.emitChangeFn;
//# sourceMappingURL=index.js.map