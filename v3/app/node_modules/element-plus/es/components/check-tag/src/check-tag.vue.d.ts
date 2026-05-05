import { CheckTagProps } from "./check-tag.js";
import * as vue from "vue";

//#region ../../packages/components/check-tag/src/check-tag.vue.d.ts
declare var __VLS_1: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: vue.DefineComponent<CheckTagProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  change: (value: boolean) => void;
  "update:checked": (value: boolean) => void;
}, string, vue.PublicProps, Readonly<CheckTagProps> & Readonly<{
  onChange?: ((value: boolean) => any) | undefined;
  "onUpdate:checked"?: ((value: boolean) => any) | undefined;
}>, {
  type: "primary" | "success" | "info" | "warning" | "danger";
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