import { withInstall } from "../../utils/vue/install.mjs";
import { NODE_INSTANCE_INJECTION_KEY, ROOT_TREE_INJECTION_KEY, TREE_NODE_MAP_INJECTION_KEY } from "./src/tokens.mjs";
import { treeEmits, treeProps } from "./src/tree.mjs";
import tree_default from "./src/tree2.mjs";

//#region ../../packages/components/tree/index.ts
const ElTree = withInstall(tree_default);

//#endregion
export { ElTree, ElTree as default, NODE_INSTANCE_INJECTION_KEY, ROOT_TREE_INJECTION_KEY, TREE_NODE_MAP_INJECTION_KEY, treeEmits, treeProps };
//# sourceMappingURL=index.mjs.map