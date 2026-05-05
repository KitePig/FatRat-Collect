import { BorderStyle, DividerProps } from "./divider.js";
import * as vue from "vue";

//#region ../../packages/components/divider/src/divider.vue.d.ts
declare var __VLS_1: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: vue.DefineComponent<DividerProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<DividerProps> & Readonly<{}>, {
  borderStyle: BorderStyle;
  direction: "horizontal" | "vertical";
  contentPosition: "left" | "center" | "right";
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