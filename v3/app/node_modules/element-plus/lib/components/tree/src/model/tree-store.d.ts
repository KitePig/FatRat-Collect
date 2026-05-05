import { Node } from "./node.js";
import { FilterNodeMethodFunction, FilterValue, LoadFunction, TreeData, TreeKey, TreeNodeData, TreeOptionProps, TreeStoreNodesMap, TreeStoreOptions } from "../tree.type.js";

//#region ../../packages/components/tree/src/model/tree-store.d.ts
declare class TreeStore {
  currentNode: Node | null;
  currentNodeKey: TreeKey | null;
  nodesMap: TreeStoreNodesMap;
  root: Node;
  data: TreeData;
  lazy: boolean;
  load?: LoadFunction;
  filterNodeMethod?: FilterNodeMethodFunction;
  key: TreeKey;
  defaultCheckedKeys?: TreeKey[];
  checkStrictly: boolean;
  defaultExpandedKeys?: TreeKey[];
  autoExpandParent: boolean;
  defaultExpandAll: boolean;
  checkDescendants: boolean;
  props: TreeOptionProps;
  constructor(options: TreeStoreOptions);
  initialize(): void;
  filter(value: FilterValue): void;
  setData(newVal: TreeData): void;
  getNode(data: TreeKey | TreeNodeData | Node): Node;
  insertBefore(data: TreeNodeData, refData: TreeKey | TreeNodeData | Node): void;
  insertAfter(data: TreeNodeData, refData: TreeKey | TreeNodeData | Node): void;
  remove(data: TreeNodeData | Node): void;
  append(data: TreeNodeData, parentData: TreeNodeData | TreeKey | Node): void;
  _initDefaultCheckedNodes(): void;
  _initDefaultCheckedNode(node: Node): void;
  setDefaultCheckedKey(newVal: TreeKey[]): void;
  registerNode(node: Node): void;
  deregisterNode(node: Node): void;
  getCheckedNodes(leafOnly?: boolean, includeHalfChecked?: boolean): TreeNodeData[];
  getCheckedKeys(leafOnly?: boolean): TreeKey[];
  getHalfCheckedNodes(): TreeNodeData[];
  getHalfCheckedKeys(): TreeKey[];
  _getAllNodes(): Node[];
  updateChildren(key: TreeKey, data: TreeData): void;
  _setCheckedKeys(key: TreeKey, leafOnly: boolean | undefined, checkedKeys: {
    [key: string]: boolean;
  }): void;
  setCheckedNodes(array: Node[], leafOnly?: boolean): void;
  setCheckedKeys(keys: TreeKey[], leafOnly?: boolean): void;
  setDefaultExpandedKeys(keys: TreeKey[]): void;
  setChecked(data: TreeKey | TreeNodeData, checked: boolean, deep: boolean): void;
  getCurrentNode(): Node | null;
  setCurrentNode(currentNode: Node): void;
  setUserCurrentNode(node: Node, shouldAutoExpandParent?: boolean): void;
  setCurrentNodeKey(key: TreeKey | null, shouldAutoExpandParent?: boolean): void;
}
//#endregion
export { TreeStore };