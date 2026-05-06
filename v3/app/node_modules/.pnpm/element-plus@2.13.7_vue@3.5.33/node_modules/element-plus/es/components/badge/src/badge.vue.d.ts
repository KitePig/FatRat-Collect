import { BadgeProps } from "./badge.js";
import * as vue from "vue";
import { StyleValue } from "vue";

//#region ../../packages/components/badge/src/badge.vue.d.ts
declare var __VLS_1: {}, __VLS_9: {
    value: string;
  };
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
} & {
  content?: (props: typeof __VLS_9) => any;
};
declare const __VLS_base: vue.DefineComponent<BadgeProps, {
  /** @description badge content */content: vue.ComputedRef<string>;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<BadgeProps> & Readonly<{}>, {
  offset: [number, number];
  type: "primary" | "success" | "warning" | "info" | "danger";
  value: string | number;
  max: number;
  showZero: boolean;
  badgeStyle: string | false | vue.CSSProperties | StyleValue[] | null;
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