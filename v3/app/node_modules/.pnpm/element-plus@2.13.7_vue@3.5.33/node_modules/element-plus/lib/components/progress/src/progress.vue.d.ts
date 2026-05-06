import { ProgressColor, ProgressFn, ProgressProps } from "./progress.js";
import * as vue from "vue";

//#region ../../packages/components/progress/src/progress.vue.d.ts
declare var __VLS_1: {
    percentage: number;
  }, __VLS_3: {
    percentage: number;
  };
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
} & {
  default?: (props: typeof __VLS_3) => any;
};
declare const __VLS_base: vue.DefineComponent<ProgressProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<ProgressProps> & Readonly<{}>, {
  type: "line" | "circle" | "dashboard";
  color: string | ProgressColor[] | ProgressFn;
  strokeLinecap: NonNullable<vue.SVGAttributes["stroke-linecap"]>;
  strokeWidth: number;
  width: number;
  format: ProgressFn;
  percentage: number;
  status: "" | "success" | "exception" | "warning";
  duration: number;
  showText: boolean;
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