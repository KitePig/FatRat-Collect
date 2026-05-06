import { CheckboxProps, CheckboxValueType } from "./checkbox.js";
import * as vue from "vue";

//#region ../../packages/components/checkbox/src/checkbox.vue.d.ts
declare var __VLS_10: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_10) => any;
};
declare const __VLS_base: vue.DefineComponent<CheckboxProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  change: (val: CheckboxValueType) => void;
  "update:modelValue": (val: CheckboxValueType) => void;
}, string, vue.PublicProps, Readonly<CheckboxProps> & Readonly<{
  onChange?: ((val: CheckboxValueType) => any) | undefined;
  "onUpdate:modelValue"?: ((val: CheckboxValueType) => any) | undefined;
}>, {
  id: string;
  disabled: boolean;
  modelValue: number | string | boolean;
  validateEvent: boolean;
  name: string;
  value: string | boolean | number | object;
  label: string | boolean | number | object;
  trueValue: string | number;
  falseValue: string | number;
  trueLabel: string | number;
  falseLabel: string | number;
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