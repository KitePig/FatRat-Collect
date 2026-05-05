import { EmptyProps } from "./empty.js";
import * as vue from "vue";

//#region ../../packages/components/empty/src/empty.vue.d.ts
declare var __VLS_1: {}, __VLS_8: {}, __VLS_10: {};
type __VLS_Slots = {} & {
  image?: (props: typeof __VLS_1) => any;
} & {
  description?: (props: typeof __VLS_8) => any;
} & {
  default?: (props: typeof __VLS_10) => any;
};
declare const __VLS_base: vue.DefineComponent<EmptyProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<EmptyProps> & Readonly<{}>, {
  description: string;
  image: string;
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