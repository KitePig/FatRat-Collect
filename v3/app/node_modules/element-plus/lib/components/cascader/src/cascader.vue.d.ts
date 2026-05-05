import { IconPropType } from "../../../utils/vue/icon.js";
import "../../../utils/index.js";
import { PopperEffect } from "../../popper/src/popper.js";
import { Node } from "../../cascader-panel/src/node.js";
import { CascaderNodePathValue, CascaderNodeValue, CascaderOption, CascaderProps, CascaderValue } from "../../cascader-panel/src/types.js";
import { CascaderPanelInstance } from "../../cascader-panel/src/instance.js";
import "../../cascader-panel/index.js";
import { CascaderComponentProps } from "./cascader.js";
import { Placement } from "../../popper/index.js";
import * as vue from "vue";
import { ComputedRef, StyleValue } from "vue";

//#region ../../packages/components/cascader/src/cascader.vue.d.ts
declare const __VLS_base: vue.DefineComponent<CascaderComponentProps, {
  /**
   * @description get an array of currently selected node,(leafOnly) whether only return the leaf checked nodes, default is `false`
   */
  getCheckedNodes: (leafOnly: boolean) => Node[] | undefined;
  /**
   * @description cascader panel ref
   */
  cascaderPanelRef: vue.Ref<CascaderPanelInstance | undefined, CascaderPanelInstance | undefined>;
  /**
   * @description toggle the visible of popper
   */
  togglePopperVisible: (visible?: boolean) => void;
  /**
   * @description cascader content ref
   */
  contentRef: ComputedRef<HTMLElement | undefined>;
  /**
   * @description selected content text
   */
  presentText: ComputedRef<string>; /** @description focus the input element */
  focus: () => void; /** @description blur the input element */
  blur: () => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  blur: (evt: FocusEvent) => void;
  focus: (evt: FocusEvent) => void;
  change: (value: CascaderValue | null | undefined) => void;
  "update:modelValue": (value: CascaderValue | null | undefined) => void;
  clear: () => void;
  visibleChange: (val: boolean) => void;
  expandChange: (val: CascaderValue) => void;
  removeTag: (val: CascaderNodeValue | CascaderNodePathValue) => void;
}, string, vue.PublicProps, Readonly<CascaderComponentProps> & Readonly<{
  onBlur?: ((evt: FocusEvent) => any) | undefined;
  onChange?: ((value: CascaderValue | null | undefined) => any) | undefined;
  onFocus?: ((evt: FocusEvent) => any) | undefined;
  "onUpdate:modelValue"?: ((value: CascaderValue | null | undefined) => any) | undefined;
  onClear?: (() => any) | undefined;
  onVisibleChange?: ((val: boolean) => any) | undefined;
  onExpandChange?: ((val: CascaderValue) => any) | undefined;
  onRemoveTag?: ((val: CascaderNodeValue | CascaderNodePathValue) => any) | undefined;
}>, {
  teleported: boolean;
  props: CascaderProps;
  effect: PopperEffect;
  disabled: boolean;
  clearIcon: IconPropType;
  validateEvent: boolean;
  separator: string;
  popperStyle: string | false | vue.CSSProperties | StyleValue[] | null;
  fallbackPlacements: Placement[];
  placement: Placement;
  persistent: boolean;
  options: CascaderOption[];
  debounce: number;
  valueOnClear: string | number | boolean | Function | null;
  showPrefix: boolean;
  filterMethod: (node: Node, keyword: string) => boolean;
  showAllLevels: boolean;
  maxCollapseTags: number;
  beforeFilter: (value: string) => boolean | Promise<any>;
  tagType: "info" | "primary" | "success" | "warning" | "danger";
  tagEffect: "light" | "dark" | "plain";
  showCheckedStrategy: "parent" | "child";
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