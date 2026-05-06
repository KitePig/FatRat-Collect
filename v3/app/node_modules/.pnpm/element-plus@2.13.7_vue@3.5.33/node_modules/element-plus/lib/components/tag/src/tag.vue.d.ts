import { TagProps } from "./tag.js";
import * as vue from "vue";

//#region ../../packages/components/tag/src/tag.vue.d.ts
declare var __VLS_1: {}, __VLS_22: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
} & {
  default?: (props: typeof __VLS_22) => any;
};
declare const __VLS_base: vue.DefineComponent<TagProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  click: (evt: MouseEvent) => void;
  close: (evt: MouseEvent) => void;
}, string, vue.PublicProps, Readonly<TagProps> & Readonly<{
  onClick?: ((evt: MouseEvent) => any) | undefined;
  onClose?: ((evt: MouseEvent) => any) | undefined;
}>, {
  type: "primary" | "success" | "info" | "warning" | "danger";
  effect: "dark" | "light" | "plain";
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