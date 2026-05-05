import { CheckboxValueType } from "./checkbox.js";
import { CheckboxGroupProps, CheckboxGroupValueType } from "./checkbox-group.js";
import "../../../index.js";
import * as vue from "vue";

//#region ../../packages/components/checkbox/src/checkbox-group.vue.d.ts
declare var __VLS_8: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_8) => any;
};
declare const __VLS_base: vue.DefineComponent<CheckboxGroupProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  change: (val: CheckboxValueType[]) => void;
  "update:modelValue": (val: CheckboxGroupValueType) => void;
}, string, vue.PublicProps, Readonly<CheckboxGroupProps> & Readonly<{
  onChange?: ((val: CheckboxValueType[]) => any) | undefined;
  "onUpdate:modelValue"?: ((val: CheckboxGroupValueType) => any) | undefined;
}>, {
  props: {
    value?: string;
    label?: string;
    disabled?: string;
  };
  type: "checkbox" | "button";
  disabled: boolean;
  modelValue: CheckboxGroupValueType;
  validateEvent: boolean;
  tag: string;
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