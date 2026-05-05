import { IconPropType } from "../../../utils/vue/icon.js";
import "../../../utils/index.js";
import { PopperEffect } from "../../popper/src/popper.js";
import { TimeSelectProps } from "./time-select.js";
import "../../../index.js";
import * as vue from "vue";

//#region ../../packages/components/time-select/src/time-select.vue.d.ts
declare const __VLS_export: vue.DefineComponent<TimeSelectProps, {
  /**
   * @description blur the Input component
   */
  blur: () => void;
  /**
   * @description focus the Input component
   */
  focus: () => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  blur: (...args: any[]) => void;
  change: (...args: any[]) => void;
  focus: (...args: any[]) => void;
  "update:modelValue": (...args: any[]) => void;
  clear: (...args: any[]) => void;
}, string, vue.PublicProps, Readonly<TimeSelectProps> & Readonly<{
  onBlur?: ((...args: any[]) => any) | undefined;
  onChange?: ((...args: any[]) => any) | undefined;
  onFocus?: ((...args: any[]) => any) | undefined;
  "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
  onClear?: ((...args: any[]) => any) | undefined;
}>, {
  effect: PopperEffect;
  disabled: boolean;
  clearable: boolean;
  clearIcon: IconPropType;
  prefixIcon: IconPropType;
  end: string;
  start: string;
  popperClass: string;
  popperStyle: string | vue.CSSProperties;
  valueOnClear: string | number | boolean | Function | null;
  editable: boolean;
  format: string;
  step: string;
}, {}, {}, {}, string, vue.ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
//#endregion
export { _default };