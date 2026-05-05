import { ColProps, ColSize } from "./col.js";
import * as vue from "vue";

//#region ../../packages/components/col/src/col.vue.d.ts
declare var __VLS_8: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_8) => any;
};
declare const __VLS_base: vue.DefineComponent<ColProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<ColProps> & Readonly<{}>, {
  offset: number;
  push: number;
  tag: string;
  span: number;
  pull: number;
  xs: ColSize;
  sm: ColSize;
  md: ColSize;
  lg: ColSize;
  xl: ColSize;
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