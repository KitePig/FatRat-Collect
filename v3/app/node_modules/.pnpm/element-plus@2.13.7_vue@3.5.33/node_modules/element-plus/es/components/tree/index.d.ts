import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { TreeEmits, treeEmits, treeProps } from "./src/tree.js";
import { DragEvents } from "./src/model/useDragNode.js";
import { AllowDragFunction, AllowDropFunction, AllowDropType, CheckedInfo, FakeNode, FilterNodeMethodFunction, FilterValue, LoadFunction, NodeDropType, RenderContentContext, RenderContentFunction, RootTreeType, TreeComponentProps, TreeData, TreeKey, TreeNodeChildState, TreeNodeData, TreeNodeLoadedDefaultProps, TreeNodeOptions, TreeOptionProps, TreeStoreNodesMap, TreeStoreOptions, hType } from "./src/tree.type.js";
import { _default } from "./src/tree.vue.js";
import { TreeInstance } from "./src/instance.js";
import { NODE_INSTANCE_INJECTION_KEY, ROOT_TREE_INJECTION_KEY, TREE_NODE_MAP_INJECTION_KEY } from "./src/tokens.js";

//#region ../../packages/components/tree/index.d.ts
declare const ElTree: SFCWithInstall<typeof _default>;
//#endregion
export { AllowDragFunction, AllowDropFunction, AllowDropType, CheckedInfo, DragEvents, ElTree, ElTree as default, FakeNode, FilterNodeMethodFunction, FilterValue, LoadFunction, NODE_INSTANCE_INJECTION_KEY, NodeDropType, ROOT_TREE_INJECTION_KEY, RenderContentContext, RenderContentFunction, RootTreeType, TREE_NODE_MAP_INJECTION_KEY, TreeComponentProps, TreeData, TreeEmits, TreeInstance, TreeKey, TreeNodeChildState, TreeNodeData, TreeNodeLoadedDefaultProps, TreeNodeOptions, TreeOptionProps, TreeStoreNodesMap, TreeStoreOptions, hType, treeEmits, treeProps };