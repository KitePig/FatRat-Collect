import { AnchorProps } from "./anchor.js";
import * as vue from "vue";

//#region ../../packages/components/anchor/src/anchor.vue.d.ts
declare var __VLS_1: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: vue.DefineComponent<AnchorProps, {
  scrollTo: (href?: string) => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  change: (href: string) => void;
  click: (e: MouseEvent, href?: string | undefined) => void;
}, string, vue.PublicProps, Readonly<AnchorProps> & Readonly<{
  onChange?: ((href: string) => any) | undefined;
  onClick?: ((e: MouseEvent, href?: string | undefined) => any) | undefined;
}>, {
  offset: number;
  type: "default" | "underline";
  direction: "vertical" | "horizontal";
  marker: boolean;
  duration: number;
  bound: number;
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