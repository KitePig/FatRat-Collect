import { ButtonGroupProps } from "./button-group.js";
import * as vue from "vue";

//#region ../../packages/components/button/src/button-group.vue.d.ts
declare var __VLS_1: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: vue.DefineComponent<ButtonGroupProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<ButtonGroupProps> & Readonly<{}>, {
  type: "" | "default" | "info" | "primary" | "success" | "warning" | "text" | "danger";
  direction: "horizontal" | "vertical";
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