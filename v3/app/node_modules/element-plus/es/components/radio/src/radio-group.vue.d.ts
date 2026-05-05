import { RadioGroupProps, radioOptionProp } from "./radio-group.js";
import * as vue from "vue";

//#region ../../packages/components/radio/src/radio-group.vue.d.ts
declare var __VLS_1: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: vue.DefineComponent<RadioGroupProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  change: (val: string | number | boolean | undefined) => void;
  "update:modelValue": (val: string | number | boolean | undefined) => void;
}, string, vue.PublicProps, Readonly<RadioGroupProps> & Readonly<{
  onChange?: ((val: string | number | boolean | undefined) => any) | undefined;
  "onUpdate:modelValue"?: ((val: string | number | boolean | undefined) => any) | undefined;
}>, {
  fill: string;
  props: radioOptionProp;
  type: "radio" | "button";
  id: string;
  disabled: boolean;
  modelValue: string | number | boolean;
  validateEvent: boolean;
  name: string;
  textColor: string;
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