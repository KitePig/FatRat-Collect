import { BreadcrumbItemProps } from "./breadcrumb-item.js";
import * as vue from "vue";
import * as vue_router0 from "vue-router";

//#region ../../packages/components/breadcrumb/src/breadcrumb-item.vue.d.ts
declare var __VLS_1: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: vue.DefineComponent<BreadcrumbItemProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<BreadcrumbItemProps> & Readonly<{}>, {
  to: vue_router0.RouteLocationRaw;
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