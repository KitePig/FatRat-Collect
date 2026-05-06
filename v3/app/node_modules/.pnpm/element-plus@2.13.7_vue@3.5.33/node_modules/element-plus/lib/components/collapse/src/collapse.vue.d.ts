import { CollapseActiveName, CollapseIconPositionType, CollapseModelValue, CollapseProps } from "./collapse.js";
import * as vue from "vue";

//#region ../../packages/components/collapse/src/collapse.vue.d.ts
declare var __VLS_1: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: vue.DefineComponent<CollapseProps, {
  /** @description active names */activeNames: vue.Ref<(string | number)[], (string | number)[]>; /** @description set active names */
  setActiveNames: (_activeNames: CollapseActiveName[]) => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  change: (value: CollapseModelValue) => void;
  "update:modelValue": (value: CollapseModelValue) => void;
}, string, vue.PublicProps, Readonly<CollapseProps> & Readonly<{
  onChange?: ((value: CollapseModelValue) => any) | undefined;
  "onUpdate:modelValue"?: ((value: CollapseModelValue) => any) | undefined;
}>, {
  modelValue: CollapseModelValue;
  expandIconPosition: CollapseIconPositionType;
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