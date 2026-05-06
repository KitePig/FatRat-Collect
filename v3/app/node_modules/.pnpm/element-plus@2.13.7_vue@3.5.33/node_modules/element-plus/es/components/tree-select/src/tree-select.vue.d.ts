import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { PopperEffect } from "../../popper/src/popper.js";
import { TagTooltipProps } from "../../select/src/select.js";
import "../../select/index.js";
import { AllowDragFunction, AllowDropFunction, FilterNodeMethodFunction, LoadFunction, RenderContentFunction, TreeData, TreeKey, TreeOptionProps } from "../../tree/src/tree.type.js";
import "../../tree/index.js";
import "../../../index.js";
import { Options, Placement } from "../../popper/index.js";
import * as vue from "vue";

//#region ../../packages/components/tree-select/src/tree-select.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: vue.DefineComponent<vue.ExtractPropTypes<{
  /**
   * @description The cached data of the lazy node, the structure is the same as the data, used to get the label of the unloaded data
   */
  cacheData: {
    type: ArrayConstructor;
    default: () => never[];
  };
  data: EpPropFinalized<(new (...args: any[]) => TreeData) | (() => TreeData) | (((new (...args: any[]) => TreeData) | (() => TreeData)) | null)[], unknown, unknown, () => never[], boolean>;
  emptyText: {
    readonly type: vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  renderAfterExpand: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  nodeKey: StringConstructor;
  checkStrictly: BooleanConstructor;
  defaultExpandAll: BooleanConstructor;
  expandOnClickNode: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  checkOnClickNode: BooleanConstructor;
  checkOnClickLeaf: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  checkDescendants: BooleanConstructor;
  autoExpandParent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  defaultCheckedKeys: {
    readonly type: vue.PropType<TreeKey[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  defaultExpandedKeys: {
    readonly type: vue.PropType<TreeKey[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  currentNodeKey: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  renderContent: {
    readonly type: vue.PropType<RenderContentFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  showCheckbox: BooleanConstructor;
  draggable: BooleanConstructor;
  allowDrag: {
    readonly type: vue.PropType<AllowDragFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  allowDrop: {
    readonly type: vue.PropType<AllowDropFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  props: EpPropFinalized<(new (...args: any[]) => TreeOptionProps) | (() => TreeOptionProps) | (((new (...args: any[]) => TreeOptionProps) | (() => TreeOptionProps)) | null)[], unknown, unknown, () => {
    children: string;
    label: string;
    disabled: string;
  }, boolean>;
  lazy: BooleanConstructor;
  highlightCurrent: BooleanConstructor;
  load: {
    readonly type: vue.PropType<LoadFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  filterNodeMethod: {
    readonly type: vue.PropType<FilterNodeMethodFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  accordion: BooleanConstructor;
  indent: EpPropFinalized<NumberConstructor, unknown, unknown, 18, boolean>;
  icon: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  ariaLabel: StringConstructor;
  emptyValues: ArrayConstructor;
  valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
  name: StringConstructor;
  id: StringConstructor;
  modelValue: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Record<string, any> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[]) | (() => EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[] | null) | (((new (...args: any[]) => string | number | boolean | Record<string, any> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[]) | (() => EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[] | null)) | null)[], unknown, unknown, undefined, boolean>;
  autocomplete: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  automaticDropdown: BooleanConstructor;
  size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  effect: EpPropFinalized<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown, string, boolean>;
  disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  clearable: BooleanConstructor;
  filterable: BooleanConstructor;
  allowCreate: BooleanConstructor;
  loading: BooleanConstructor;
  popperClass: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  popperStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | vue.CSSProperties) | (() => string | vue.CSSProperties) | (((new (...args: any[]) => string | vue.CSSProperties) | (() => string | vue.CSSProperties)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => Partial<Options>, boolean>;
  remote: BooleanConstructor;
  debounce: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  loadingText: StringConstructor;
  noMatchText: StringConstructor;
  noDataText: StringConstructor;
  remoteMethod: {
    readonly type: vue.PropType<(query: string) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  filterMethod: {
    readonly type: vue.PropType<(query: string) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  multiple: BooleanConstructor;
  multipleLimit: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  placeholder: {
    readonly type: vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  defaultFirstOption: BooleanConstructor;
  reserveKeyword: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  valueKey: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  collapseTags: BooleanConstructor;
  collapseTagsTooltip: BooleanConstructor;
  tagTooltip: EpPropFinalized<(new (...args: any[]) => TagTooltipProps) | (() => TagTooltipProps) | (((new (...args: any[]) => TagTooltipProps) | (() => TagTooltipProps)) | null)[], unknown, unknown, () => {}, boolean>;
  maxCollapseTags: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  clearIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  fitInputWidth: BooleanConstructor;
  suffixIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  tagType: {
    default: string;
    type: vue.PropType<EpPropMergeType<StringConstructor, "info" | "primary" | "success" | "warning" | "danger", unknown>>;
    required: false;
    validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  tagEffect: {
    default: string;
    type: vue.PropType<EpPropMergeType<StringConstructor, "light" | "dark" | "plain", unknown>>;
    required: false;
    validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  remoteShowSuffix: BooleanConstructor;
  showArrow: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  offset: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  placement: EpPropFinalized<(new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], Placement, unknown, string, boolean>;
  fallbackPlacements: EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | (((new (...args: any[]) => Placement[]) | (() => Placement[])) | null)[], unknown, unknown, string[], boolean>;
  tabindex: EpPropFinalized<(NumberConstructor | StringConstructor)[], unknown, unknown, number, boolean>;
  appendTo: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>) | (((new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  options: {
    readonly type: vue.PropType<Record<string, any>[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
  [key: string]: any;
}>, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  /**
   * @description The cached data of the lazy node, the structure is the same as the data, used to get the label of the unloaded data
   */
  cacheData: {
    type: ArrayConstructor;
    default: () => never[];
  };
  data: EpPropFinalized<(new (...args: any[]) => TreeData) | (() => TreeData) | (((new (...args: any[]) => TreeData) | (() => TreeData)) | null)[], unknown, unknown, () => never[], boolean>;
  emptyText: {
    readonly type: vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  renderAfterExpand: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  nodeKey: StringConstructor;
  checkStrictly: BooleanConstructor;
  defaultExpandAll: BooleanConstructor;
  expandOnClickNode: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  checkOnClickNode: BooleanConstructor;
  checkOnClickLeaf: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  checkDescendants: BooleanConstructor;
  autoExpandParent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  defaultCheckedKeys: {
    readonly type: vue.PropType<TreeKey[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  defaultExpandedKeys: {
    readonly type: vue.PropType<TreeKey[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  currentNodeKey: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  renderContent: {
    readonly type: vue.PropType<RenderContentFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  showCheckbox: BooleanConstructor;
  draggable: BooleanConstructor;
  allowDrag: {
    readonly type: vue.PropType<AllowDragFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  allowDrop: {
    readonly type: vue.PropType<AllowDropFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  props: EpPropFinalized<(new (...args: any[]) => TreeOptionProps) | (() => TreeOptionProps) | (((new (...args: any[]) => TreeOptionProps) | (() => TreeOptionProps)) | null)[], unknown, unknown, () => {
    children: string;
    label: string;
    disabled: string;
  }, boolean>;
  lazy: BooleanConstructor;
  highlightCurrent: BooleanConstructor;
  load: {
    readonly type: vue.PropType<LoadFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  filterNodeMethod: {
    readonly type: vue.PropType<FilterNodeMethodFunction>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  accordion: BooleanConstructor;
  indent: EpPropFinalized<NumberConstructor, unknown, unknown, 18, boolean>;
  icon: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  ariaLabel: StringConstructor;
  emptyValues: ArrayConstructor;
  valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
  name: StringConstructor;
  id: StringConstructor;
  modelValue: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Record<string, any> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[]) | (() => EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[] | null) | (((new (...args: any[]) => string | number | boolean | Record<string, any> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[]) | (() => EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[] | null)) | null)[], unknown, unknown, undefined, boolean>;
  autocomplete: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  automaticDropdown: BooleanConstructor;
  size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  effect: EpPropFinalized<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown, string, boolean>;
  disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  clearable: BooleanConstructor;
  filterable: BooleanConstructor;
  allowCreate: BooleanConstructor;
  loading: BooleanConstructor;
  popperClass: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  popperStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | vue.CSSProperties) | (() => string | vue.CSSProperties) | (((new (...args: any[]) => string | vue.CSSProperties) | (() => string | vue.CSSProperties)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => Partial<Options>, boolean>;
  remote: BooleanConstructor;
  debounce: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  loadingText: StringConstructor;
  noMatchText: StringConstructor;
  noDataText: StringConstructor;
  remoteMethod: {
    readonly type: vue.PropType<(query: string) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  filterMethod: {
    readonly type: vue.PropType<(query: string) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  multiple: BooleanConstructor;
  multipleLimit: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  placeholder: {
    readonly type: vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  defaultFirstOption: BooleanConstructor;
  reserveKeyword: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  valueKey: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  collapseTags: BooleanConstructor;
  collapseTagsTooltip: BooleanConstructor;
  tagTooltip: EpPropFinalized<(new (...args: any[]) => TagTooltipProps) | (() => TagTooltipProps) | (((new (...args: any[]) => TagTooltipProps) | (() => TagTooltipProps)) | null)[], unknown, unknown, () => {}, boolean>;
  maxCollapseTags: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  clearIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  fitInputWidth: BooleanConstructor;
  suffixIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  tagType: {
    default: string;
    type: vue.PropType<EpPropMergeType<StringConstructor, "info" | "primary" | "success" | "warning" | "danger", unknown>>;
    required: false;
    validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  tagEffect: {
    default: string;
    type: vue.PropType<EpPropMergeType<StringConstructor, "light" | "dark" | "plain", unknown>>;
    required: false;
    validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  remoteShowSuffix: BooleanConstructor;
  showArrow: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  offset: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  placement: EpPropFinalized<(new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], Placement, unknown, string, boolean>;
  fallbackPlacements: EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | (((new (...args: any[]) => Placement[]) | (() => Placement[])) | null)[], unknown, unknown, string[], boolean>;
  tabindex: EpPropFinalized<(NumberConstructor | StringConstructor)[], unknown, unknown, number, boolean>;
  appendTo: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>) | (((new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  options: {
    readonly type: vue.PropType<Record<string, any>[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>> & Readonly<{}>, {
  lazy: boolean;
  offset: number;
  teleported: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  props: TreeOptionProps;
  effect: EpPropMergeType<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown>;
  disabled: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  modelValue: EpPropMergeType<(new (...args: any[]) => string | number | boolean | Record<string, any> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[]) | (() => EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[] | null) | (((new (...args: any[]) => string | number | boolean | Record<string, any> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[]) | (() => EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[] | null)) | null)[], unknown, unknown>;
  autocomplete: string;
  clearable: boolean;
  clearIcon: EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>;
  suffixIcon: EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>;
  tabindex: EpPropMergeType<(NumberConstructor | StringConstructor)[], unknown, unknown>;
  validateEvent: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  multiple: boolean;
  popperClass: string;
  fallbackPlacements: Placement[];
  placement: EpPropMergeType<(new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], Placement, unknown>;
  popperOptions: Partial<Options>;
  showArrow: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  persistent: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  data: TreeData;
  valueKey: string;
  debounce: number;
  fitInputWidth: boolean;
  loading: boolean;
  valueOnClear: EpPropMergeType<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown>;
  checkStrictly: boolean;
  checkOnClickNode: boolean;
  checkOnClickLeaf: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  filterable: boolean;
  collapseTags: boolean;
  maxCollapseTags: number;
  collapseTagsTooltip: boolean;
  tagType: EpPropMergeType<StringConstructor, "info" | "primary" | "success" | "warning" | "danger", unknown>;
  tagEffect: EpPropMergeType<StringConstructor, "light" | "dark" | "plain", unknown>;
  accordion: boolean;
  automaticDropdown: boolean;
  draggable: boolean;
  allowCreate: boolean;
  remote: boolean;
  multipleLimit: number;
  defaultFirstOption: boolean;
  reserveKeyword: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  tagTooltip: TagTooltipProps;
  remoteShowSuffix: boolean;
  defaultExpandAll: boolean;
  indent: number;
  renderAfterExpand: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  showCheckbox: boolean;
  expandOnClickNode: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  autoExpandParent: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  checkDescendants: boolean;
  highlightCurrent: boolean;
  cacheData: unknown[];
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default };