import { PopperProps, roleTypes } from "./popper.js";
import { ElPopperInjectionContext } from "./constants.js";
import * as vue from "vue";

//#region ../../packages/components/popper/src/popper.vue.d.ts
declare var __VLS_1: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: vue.DefineComponent<PopperProps, ElPopperInjectionContext, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<PopperProps> & Readonly<{}>, {
  role: typeof roleTypes[number];
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