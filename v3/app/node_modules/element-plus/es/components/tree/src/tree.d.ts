import { EmitFn } from "../../../utils/vue/typescript.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { Node } from "./model/node.js";
import { AllowDragFunction, AllowDropFunction, CheckedInfo, FilterNodeMethodFunction, LoadFunction, NodeDropType, RenderContentFunction, TreeData, TreeKey, TreeOptionProps } from "./tree.type.js";
import * as vue from "vue";
import { ComponentInternalInstance, PropType } from "vue";

//#region ../../packages/components/tree/src/tree.d.ts
declare const treeProps: {
  readonly data: EpPropFinalized<(new (...args: any[]) => TreeData) | (() => TreeData) | (((new (...args: any[]) => TreeData) | (() => TreeData)) | null)[], unknown, unknown, () => never[], boolean>;
  readonly emptyText: {
    readonly type: PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly renderAfterExpand: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly nodeKey: StringConstructor;
  readonly checkStrictly: BooleanConstructor;
  readonly defaultExpandAll: BooleanConstructor;
  readonly expandOnClickNode: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly checkOnClickNode: BooleanConstructor;
  readonly checkOnClickLeaf: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly checkDescendants: BooleanConstructor;
  readonly autoExpandParent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly defaultCheckedKeys: {
    readonly type: PropType<TreeKey[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly defaultExpandedKeys: {
    readonly type: PropType<TreeKey[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly currentNodeKey: {
    readonly type: PropType<EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly renderContent: {
    readonly type: PropType<RenderContentFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly showCheckbox: BooleanConstructor;
  readonly draggable: BooleanConstructor;
  readonly allowDrag: {
    readonly type: PropType<AllowDragFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly allowDrop: {
    readonly type: PropType<AllowDropFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly props: EpPropFinalized<(new (...args: any[]) => TreeOptionProps) | (() => TreeOptionProps) | (((new (...args: any[]) => TreeOptionProps) | (() => TreeOptionProps)) | null)[], unknown, unknown, () => {
    children: string;
    label: string;
    disabled: string;
  }, boolean>;
  readonly lazy: BooleanConstructor;
  readonly highlightCurrent: BooleanConstructor;
  readonly load: {
    readonly type: PropType<LoadFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly filterNodeMethod: {
    readonly type: PropType<FilterNodeMethodFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly accordion: BooleanConstructor;
  readonly indent: EpPropFinalized<NumberConstructor, unknown, unknown, 18, boolean>;
  readonly icon: {
    readonly type: PropType<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
declare const treeEmits: {
  'check-change': (data: any, checked: boolean, indeterminate: boolean) => any;
  'current-change': (data: any | null, node: Node | null) => boolean;
  'node-click': (data: any, node: Node, nodeInstance: ComponentInternalInstance | null, evt: MouseEvent) => any;
  'node-contextmenu': (evt: Event, data: any, node: Node, nodeInstance: ComponentInternalInstance | null) => any;
  'node-collapse': (data: any, node: Node, nodeInstance: ComponentInternalInstance | null) => any;
  'node-expand': (data: any, node: Node, nodeInstance: ComponentInternalInstance | null) => any;
  check: (data: any, checkedInfo: CheckedInfo) => any;
  'node-drag-start': (node: Node, evt: DragEvent) => DragEvent;
  'node-drag-end': (draggingNode: Node, dropNode: Node | null, dropType: NodeDropType, evt: DragEvent) => DragEvent;
  'node-drop': (draggingNode: Node, dropNode: Node, dropType: Exclude<NodeDropType, "none">, evt: DragEvent) => DragEvent;
  'node-drag-leave': (draggingNode: Node, oldDropNode: Node, evt: DragEvent) => DragEvent;
  'node-drag-enter': (draggingNode: Node, dropNode: Node, evt: DragEvent) => DragEvent;
  'node-drag-over': (draggingNode: Node, dropNode: Node, evt: DragEvent) => DragEvent;
};
type TreeEmits = EmitFn<typeof treeEmits>;
//#endregion
export { TreeEmits, treeEmits, treeProps };