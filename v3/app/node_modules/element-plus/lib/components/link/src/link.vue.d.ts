import { LinkProps } from "./link.js";
import * as vue from "vue";

//#region ../../packages/components/link/src/link.vue.d.ts
declare var __VLS_12: {}, __VLS_14: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_12) => any;
} & {
  icon?: (props: typeof __VLS_14) => any;
};
declare const __VLS_base: vue.DefineComponent<LinkProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  click: (evt: MouseEvent) => void;
}, string, vue.PublicProps, Readonly<LinkProps> & Readonly<{
  onClick?: ((evt: MouseEvent) => any) | undefined;
}>, {
  target: "_blank" | "_parent" | "_self" | "_top" | (string & NonNullable<unknown>);
  type: "primary" | "success" | "warning" | "info" | "danger" | "default";
  underline: boolean | "always" | "never" | "hover";
  href: string;
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