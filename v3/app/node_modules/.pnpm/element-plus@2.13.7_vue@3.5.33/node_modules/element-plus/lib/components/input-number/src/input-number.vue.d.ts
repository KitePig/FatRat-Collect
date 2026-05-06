import { InputNumberProps } from "./input-number.js";
import * as vue from "vue";

//#region ../../packages/components/input-number/src/input-number.vue.d.ts
declare var __VLS_1: {}, __VLS_19: {}, __VLS_52: {}, __VLS_55: {};
type __VLS_Slots = {} & {
  'decrease-icon'?: (props: typeof __VLS_1) => any;
} & {
  'increase-icon'?: (props: typeof __VLS_19) => any;
} & {
  prefix?: (props: typeof __VLS_52) => any;
} & {
  suffix?: (props: typeof __VLS_55) => any;
};
declare const __VLS_base: vue.DefineComponent<InputNumberProps, {
  /** @description get focus the input component */focus: () => void; /** @description remove focus the input component */
  blur: () => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  blur: (e: FocusEvent) => void;
  focus: (e: FocusEvent) => void;
  change: (cur: number | undefined, prev: number | undefined) => void;
  "update:modelValue": (val: number | undefined) => void;
  input: (val: number | null | undefined) => void;
}, string, vue.PublicProps, Readonly<InputNumberProps> & Readonly<{
  onBlur?: ((e: FocusEvent) => any) | undefined;
  onChange?: ((cur: number | undefined, prev: number | undefined) => any) | undefined;
  onFocus?: ((e: FocusEvent) => any) | undefined;
  onInput?: ((val: number | null | undefined) => any) | undefined;
  "onUpdate:modelValue"?: ((val: number | undefined) => any) | undefined;
}>, {
  id: string;
  disabled: boolean;
  readonly: boolean;
  validateEvent: boolean;
  inputmode: "text" | "email" | "search" | "tel" | "url" | "none" | "numeric" | "decimal";
  max: number;
  valueOnClear: "min" | "max" | number | null;
  min: number;
  align: "left" | "right" | "center";
  step: number;
  stepStrictly: boolean;
  controls: boolean;
  controlsPosition: "" | "right";
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