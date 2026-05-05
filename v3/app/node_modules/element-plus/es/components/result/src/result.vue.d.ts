import { ResultProps } from "./result.js";
import * as vue from "vue";

//#region ../../packages/components/result/src/result.vue.d.ts
declare var __VLS_1: {}, __VLS_8: {}, __VLS_10: {}, __VLS_12: {};
type __VLS_Slots = {} & {
  icon?: (props: typeof __VLS_1) => any;
} & {
  title?: (props: typeof __VLS_8) => any;
} & {
  'sub-title'?: (props: typeof __VLS_10) => any;
} & {
  extra?: (props: typeof __VLS_12) => any;
};
declare const __VLS_base: vue.DefineComponent<ResultProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<ResultProps> & Readonly<{}>, {
  title: string;
  icon: "primary" | "success" | "warning" | "info" | "error";
  subTitle: string;
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