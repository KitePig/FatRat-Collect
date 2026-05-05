import { SwitchProps } from "./switch.js";
import * as vue from "vue";

//#region ../../packages/components/switch/src/switch.vue.d.ts
declare var __VLS_1: {}, __VLS_14: {}, __VLS_27: {}, __VLS_51: {}, __VLS_64: {}, __VLS_77: {};
type __VLS_Slots = {} & {
  inactive?: (props: typeof __VLS_1) => any;
} & {
  inactive?: (props: typeof __VLS_14) => any;
} & {
  active?: (props: typeof __VLS_27) => any;
} & {
  'active-action'?: (props: typeof __VLS_51) => any;
} & {
  'inactive-action'?: (props: typeof __VLS_64) => any;
} & {
  active?: (props: typeof __VLS_77) => any;
};
declare const __VLS_base: vue.DefineComponent<SwitchProps, {
  /**
   *  @description manual focus to the switch component
   **/
  focus: () => void;
  /**
   * @description whether Switch is checked
   */
  checked: vue.ComputedRef<boolean>;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  change: (val: string | number | boolean) => void;
  "update:modelValue": (val: string | number | boolean) => void;
  input: (val: string | number | boolean) => void;
}, string, vue.PublicProps, Readonly<SwitchProps> & Readonly<{
  onChange?: ((val: string | number | boolean) => any) | undefined;
  onInput?: ((val: string | number | boolean) => any) | undefined;
  "onUpdate:modelValue"?: ((val: string | number | boolean) => any) | undefined;
}>, {
  disabled: boolean;
  modelValue: boolean | string | number;
  validateEvent: boolean;
  name: string;
  width: string | number;
  activeText: string;
  inactiveText: string;
  activeValue: boolean | string | number;
  inactiveValue: boolean | string | number;
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