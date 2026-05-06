import { IconPropType } from "../../../utils/vue/icon.js";
import "../../../utils/index.js";
import "./steps.js";
import { StepProps } from "./item.js";
import * as vue from "vue";
import { ComputedRef, Ref, VNode } from "vue";

//#region ../../packages/components/steps/src/item.vue.d.ts
declare var __VLS_1: {}, __VLS_36: {}, __VLS_38: {};
type __VLS_Slots = {} & {
  icon?: (props: typeof __VLS_1) => any;
} & {
  title?: (props: typeof __VLS_36) => any;
} & {
  description?: (props: typeof __VLS_38) => any;
};
declare const __VLS_base: vue.DefineComponent<StepProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<StepProps> & Readonly<{}>, {
  title: string;
  description: string;
  icon: IconPropType;
  status: "" | "wait" | "process" | "finish" | "error" | "success";
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