import { Nullable } from "../../../../utils/typescript.js";
import "../../../../utils/index.js";
import { TreeStore } from "./tree-store.js";
import { FakeNode, TreeKey, TreeNodeData, TreeNodeLoadedDefaultProps, TreeNodeOptions } from "../tree.type.js";

//#region ../../packages/components/tree/src/model/node.d.ts
declare class Node {
  id: number;
  text: string | null;
  checked: boolean;
  indeterminate: boolean;
  data: TreeNodeData;
  expanded: boolean;
  parent: Node | null;
  visible: boolean;
  isCurrent: boolean;
  store: TreeStore;
  isLeafByUser: boolean | undefined;
  isLeaf: boolean | undefined;
  canFocus: boolean;
  level: number;
  loaded: boolean;
  childNodes: Node[];
  loading: boolean;
  /**
   * Determines whether the current tree node is effectively checked.
   *
   * Rules:
   * 1. A disabled leaf node is always considered checked.
   * 2. A non-disabled leaf node reflects its actual checked state.
   * 3. A non-leaf node is considered checked only when:
   *    - All of its child nodes are effectively checked, and
   *    - Each child follows the same evaluation rules:
   *      - Disabled leaf nodes follow rule #1.
   *      - Non-leaf child nodes are recursively evaluated under this rule (#3).
   */
  isEffectivelyChecked: boolean;
  constructor(options: TreeNodeOptions);
  initialize(): void;
  setData(data: TreeNodeData): void;
  get label(): string;
  get key(): TreeKey | null | undefined;
  get disabled(): boolean;
  get nextSibling(): Nullable<Node>;
  get previousSibling(): Nullable<Node>;
  contains(target: Node, deep?: boolean): boolean;
  remove(): void;
  insertChild(child?: FakeNode | Node, index?: number, batch?: boolean): void;
  insertBefore(child: FakeNode | Node, ref: Node): void;
  insertAfter(child: FakeNode | Node, ref: Node): void;
  removeChild(child: Node): void;
  removeChildByData(data: TreeNodeData | null): void;
  expand(callback?: (() => void) | null, expandParent?: boolean): void;
  doCreateChildren(array: TreeNodeData[], defaultProps?: TreeNodeLoadedDefaultProps): void;
  collapse(): void;
  shouldLoadData(): boolean;
  updateLeafState(): void;
  setChecked(value?: boolean | string, deep?: boolean, recursion?: boolean, passValue?: boolean): void;
  getChildren(forceInit?: boolean): TreeNodeData | TreeNodeData[] | null;
  updateChildren(): void;
  loadData(callback: (data?: TreeNodeData[]) => void, defaultProps?: TreeNodeLoadedDefaultProps): void;
  eachNode(callback: (node: Node) => void): void;
  reInitChecked(): void;
}
//#endregion
export { Node };