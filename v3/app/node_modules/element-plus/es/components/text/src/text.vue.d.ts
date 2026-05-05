import { ComponentSize } from "../../../constants/size.js";
import { TextProps } from "./text.js";
import "../../../index.js";
import * as vue from "vue";

//#region ../../packages/components/text/src/text.vue.d.ts
declare var __VLS_9: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_9) => any;
};
declare const __VLS_base: vue.DefineComponent<TextProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<TextProps> & Readonly<{}>, {
  type: "primary" | "success" | "info" | "warning" | "danger" | "";
  size: ComponentSize;
  tag: string;
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