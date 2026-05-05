import { CheckboxValueType } from "../../checkbox/src/checkbox.js";
import { Alignment } from "../../virtual-list/src/types.js";
import "../../virtual-list/index.js";
import { TreeNodeData } from "../../tree/src/tree.type.js";
import { CheckedInfo, TreeData, TreeKey, TreeNode, TreeNodeData as TreeNodeData$1, TreeOptionProps, TreeProps } from "./types.js";
import "../../../index.js";
import * as vue from "vue";

//#region ../../packages/components/tree-v2/src/tree.vue.d.ts
declare var __VLS_20: {};
type __VLS_Slots = {} & {
  empty?: (props: typeof __VLS_20) => any;
};
declare const __VLS_base: vue.DefineComponent<TreeProps, {
  toggleCheckbox: (node: TreeNode, isChecked: CheckboxValueType, nodeClick?: boolean, immediateUpdate?: boolean) => void;
  getCurrentNode: () => TreeNodeData$1 | undefined;
  getCurrentKey: () => TreeKey | undefined;
  setCurrentKey: (key: TreeKey) => void;
  getCheckedKeys: (leafOnly?: boolean) => TreeKey[];
  getCheckedNodes: (leafOnly?: boolean) => TreeNodeData$1[];
  getHalfCheckedKeys: () => TreeKey[];
  getHalfCheckedNodes: () => TreeNodeData$1[];
  setChecked: (key: TreeKey, isChecked: boolean) => void;
  setCheckedKeys: (keys: TreeKey[]) => void;
  filter: (query: string) => void;
  setData: (data: TreeData) => void;
  getNode: (data: TreeKey | TreeNodeData$1) => TreeNode | undefined;
  expandNode: (node: TreeNode) => void;
  collapseNode: (node: TreeNode) => void;
  setExpandedKeys: (keys: TreeKey[]) => void;
  scrollToNode: (key: TreeKey, strategy?: Alignment) => void;
  scrollTo: (offset: number) => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  "current-change": (data: TreeNodeData, node: TreeNode) => void;
  "node-expand": (data: TreeNodeData, node: TreeNode) => void;
  "node-click": (data: TreeNodeData, node: TreeNode, e: MouseEvent) => void;
  "node-drop": (data: TreeNodeData, node: TreeNode, e: DragEvent) => void;
  "node-collapse": (data: TreeNodeData, node: TreeNode) => void;
  check: (data: TreeNodeData, checkedInfo: CheckedInfo) => void;
  "check-change": (data: TreeNodeData, checked: boolean) => void;
  "node-contextmenu": (evt: Event, data: TreeNodeData, node: TreeNode) => void;
}, string, vue.PublicProps, Readonly<TreeProps> & Readonly<{
  "onCurrent-change"?: ((data: TreeNodeData, node: TreeNode) => any) | undefined;
  "onNode-expand"?: ((data: TreeNodeData, node: TreeNode) => any) | undefined;
  "onCheck-change"?: ((data: TreeNodeData, checked: boolean) => any) | undefined;
  "onNode-click"?: ((data: TreeNodeData, node: TreeNode, e: MouseEvent) => any) | undefined;
  "onNode-contextmenu"?: ((evt: Event, data: TreeNodeData, node: TreeNode) => any) | undefined;
  "onNode-collapse"?: ((data: TreeNodeData, node: TreeNode) => any) | undefined;
  onCheck?: ((data: TreeNodeData, checkedInfo: CheckedInfo) => any) | undefined;
  "onNode-drop"?: ((data: TreeNodeData, node: TreeNode, e: DragEvent) => any) | undefined;
}>, {
  props: TreeOptionProps;
  height: number;
  data: TreeData;
  checkOnClickLeaf: boolean;
  indent: number;
  perfMode: boolean;
  itemSize: number;
  expandOnClickNode: boolean;
  defaultCheckedKeys: TreeKey[];
  defaultExpandedKeys: TreeKey[];
}, {}, {}, {}, string, vue.ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default };