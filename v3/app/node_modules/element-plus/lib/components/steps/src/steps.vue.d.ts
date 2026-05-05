import { StepsProps, StepsStatus } from "./steps.js";
import * as vue from "vue";

//#region ../../packages/components/steps/src/steps.vue.d.ts
declare var __VLS_1: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: vue.DefineComponent<StepsProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  change: (newVal: number, oldVal: number) => void;
}, string, vue.PublicProps, Readonly<StepsProps> & Readonly<{
  onChange?: ((newVal: number, oldVal: number) => any) | undefined;
}>, {
  space: number | string;
  active: number;
  direction: "horizontal" | "vertical";
  finishStatus: StepsStatus;
  processStatus: StepsStatus;
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