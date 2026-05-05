import { TreeStore } from "./model/tree-store.js";
import { Node } from "./model/node.js";
import { treeEmits } from "./tree.js";
import { DragEvents } from "./model/useDragNode.js";
import { Component, ComponentInternalInstance, Ref, SetupContext, VNode, h } from "vue";

//#region ../../packages/components/tree/src/tree.type.d.ts
interface RootTreeType {
  ctx: SetupContext<typeof treeEmits>;
  props: TreeComponentProps;
  store: Ref<TreeStore>;
  root: Ref<Node>;
  currentNode: Ref<Node>;
  instance: ComponentInternalInstance;
}
type hType = typeof h;
type TreeData = TreeNodeData[];
type TreeKey = string | number;
interface FakeNode {
  data: TreeNodeData;
}
type TreeNodeData = Record<string, any>;
interface TreeNodeLoadedDefaultProps {
  checked?: boolean;
}
interface TreeNodeChildState {
  all: boolean;
  none: boolean;
  allWithoutDisable: boolean;
  half: boolean;
  isEffectivelyChecked: boolean;
}
interface TreeNodeOptions {
  data: TreeNodeData;
  store: TreeStore;
  parent?: Node;
}
interface TreeStoreNodesMap {
  [key: string]: Node;
}
interface TreeStoreOptions {
  key?: TreeKey;
  data: TreeData;
  lazy: boolean;
  props: TreeOptionProps;
  load?: LoadFunction;
  currentNodeKey?: TreeKey;
  checkStrictly: boolean;
  checkDescendants: boolean;
  defaultCheckedKeys?: TreeKey[];
  defaultExpandedKeys?: TreeKey[];
  autoExpandParent: boolean;
  defaultExpandAll: boolean;
  filterNodeMethod?: FilterNodeMethodFunction;
}
interface TreeOptionProps {
  children?: string;
  label?: string | ((data: TreeNodeData, node: Node) => string);
  disabled?: string | ((data: TreeNodeData, node: Node) => boolean);
  isLeaf?: string | ((data: TreeNodeData, node: Node) => boolean);
  class?: (data: TreeNodeData, node: Node) => string | {
    [key: string]: boolean;
  };
}
type RenderContentFunction = (h: hType, context: RenderContentContext) => VNode | VNode[];
interface RenderContentContext {
  _self: ComponentInternalInstance;
  node: Node;
  data: TreeNodeData;
  store: TreeStore;
}
type AllowDragFunction = (node: Node) => boolean;
type AllowDropType = 'inner' | 'prev' | 'next';
type AllowDropFunction = (draggingNode: Node, dropNode: Node, type: AllowDropType) => boolean;
type LoadFunction = (rootNode: Node, loadedCallback: (data: TreeData) => void, stopLoading: () => void) => void;
type FilterValue = any;
type FilterNodeMethodFunction = (value: FilterValue, data: TreeNodeData, child: Node) => boolean;
interface TreeComponentProps {
  data: TreeData;
  emptyText: string;
  renderAfterExpand: boolean;
  nodeKey: string;
  checkStrictly: boolean;
  expandOnClickNode: boolean;
  defaultExpandAll: boolean;
  checkOnClickNode: boolean;
  checkOnClickLeaf: boolean;
  checkDescendants: boolean;
  autoExpandParent: boolean;
  defaultCheckedKeys: TreeKey[];
  defaultExpandedKeys: TreeKey[];
  currentNodeKey: TreeKey;
  renderContent: RenderContentFunction;
  showCheckbox: boolean;
  draggable: boolean;
  allowDrag: AllowDragFunction;
  allowDrop: AllowDropFunction;
  props: TreeOptionProps;
  lazy: boolean;
  highlightCurrent: boolean;
  load: LoadFunction;
  filterNodeMethod: FilterNodeMethodFunction;
  accordion: boolean;
  indent: number;
  icon: string | Component;
}
type NodeDropType = 'before' | 'after' | 'inner' | 'none';
interface CheckedInfo {
  checkedKeys: TreeKey[];
  checkedNodes: TreeData;
  halfCheckedKeys: TreeKey[];
  halfCheckedNodes: TreeData;
}
//#endregion
export { AllowDragFunction, AllowDropFunction, AllowDropType, CheckedInfo, FakeNode, FilterNodeMethodFunction, FilterValue, LoadFunction, NodeDropType, RenderContentContext, RenderContentFunction, RootTreeType, TreeComponentProps, TreeData, TreeKey, TreeNodeChildState, TreeNodeData, TreeNodeLoadedDefaultProps, TreeNodeOptions, TreeOptionProps, TreeStoreNodesMap, TreeStoreOptions, hType };