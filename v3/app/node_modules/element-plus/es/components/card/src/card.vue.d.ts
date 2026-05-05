import { CardProps } from "./card.js";
import * as vue from "vue";

//#region ../../packages/components/card/src/card.vue.d.ts
declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {};
type __VLS_Slots = {} & {
  header?: (props: typeof __VLS_1) => any;
} & {
  default?: (props: typeof __VLS_3) => any;
} & {
  footer?: (props: typeof __VLS_5) => any;
};
declare const __VLS_base: vue.DefineComponent<CardProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<CardProps> & Readonly<{}>, {
  header: string;
  footer: string;
  bodyStyle: string | false | vue.CSSProperties | vue.StyleValue[] | null;
  shadow: "always" | "hover" | "never";
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