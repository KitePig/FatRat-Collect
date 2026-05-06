import { FormItemProps } from "./form-item.js";
import { FormValidateCallback, FormValidationResult } from "./types.js";
import * as vue from "vue";

//#region ../../packages/components/form/src/form-item.vue.d.ts
declare var __VLS_13: {
    label: string;
  }, __VLS_15: {}, __VLS_23: {
    error: string;
  };
type __VLS_Slots = {} & {
  label?: (props: typeof __VLS_13) => any;
} & {
  default?: (props: typeof __VLS_15) => any;
} & {
  error?: (props: typeof __VLS_23) => any;
};
declare const __VLS_base: vue.DefineComponent<FormItemProps, {
  /**
   * @description Form item size.
   */
  size: vue.ComputedRef<"" | "default" | "small" | "large">;
  /**
   * @description Validation message.
   */
  validateMessage: vue.Ref<string, string>;
  /**
   * @description Validation state.
   */
  validateState: vue.Ref<"" | "error" | "success" | "validating", "" | "error" | "success" | "validating">;
  /**
   * @description Validate form item.
   */
  validate: (trigger: string, callback?: FormValidateCallback) => FormValidationResult;
  /**
   * @description Remove validation status of the field.
   */
  clearValidate: () => void;
  /**
   * @description Reset current field and remove validation result.
   */
  resetField: () => void;
  /**
   * @description Set initial value for this field. When `resetField` is called, the field will reset to this value.
   */
  setInitialValue: (value: any) => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<FormItemProps> & Readonly<{}>, {
  required: boolean;
  labelPosition: "left" | "right" | "top" | "";
  inlineMessage: boolean;
  showMessage: boolean;
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