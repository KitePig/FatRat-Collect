Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_tokens = require('./src/tokens.js');
const require_tree = require('./src/tree.js');
const require_tree$1 = require('./src/tree2.js');

//#region ../../packages/components/tree/index.ts
const ElTree = require_install.withInstall(require_tree$1.default);

//#endregion
exports.ElTree = ElTree;
exports.default = ElTree;
exports.NODE_INSTANCE_INJECTION_KEY = require_tokens.NODE_INSTANCE_INJECTION_KEY;
exports.ROOT_TREE_INJECTION_KEY = require_tokens.ROOT_TREE_INJECTION_KEY;
exports.TREE_NODE_MAP_INJECTION_KEY = require_tokens.TREE_NODE_MAP_INJECTION_KEY;
exports.treeEmits = require_tree.treeEmits;
exports.treeProps = require_tree.treeProps;
//# sourceMappingURL=index.js.map