import { DescriptionProps } from "./description.js";
import * as vue from "vue";

//#region ../../packages/components/descriptions/src/description.vue.d.ts
declare var __VLS_1: {}, __VLS_3: {};
type __VLS_Slots = {} & {
  title?: (props: typeof __VLS_1) => any;
} & {
  extra?: (props: typeof __VLS_3) => any;
};
declare const __VLS_base: vue.DefineComponent<DescriptionProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<DescriptionProps> & Readonly<{}>, {
  title: string;
  column: number;
  direction: "horizontal" | "vertical";
  extra: string;
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