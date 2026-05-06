import { Arrayable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { FormItemProp } from "./form-item.js";
import { FormItemContext, FormValidateCallback, FormValidationResult } from "./types.js";
import { FormProps } from "./form.js";
import * as vue from "vue";

//#region ../../packages/components/form/src/form.vue.d.ts
declare var __VLS_1: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: vue.DefineComponent<FormProps, {
  /**
   * @description Validate the whole form. Receives a callback or returns `Promise`.
   */
  validate: (callback?: FormValidateCallback) => FormValidationResult;
  /**
   * @description Validate specified fields.
   */
  validateField: (props?: Arrayable<FormItemProp>, callback?: FormValidateCallback) => FormValidationResult;
  /**
   * @description Reset specified fields and remove validation result.
   */
  resetFields: (props?: Arrayable<FormItemProp>) => void;
  /**
   * @description Clear validation message for specified fields.
   */
  clearValidate: (props?: Arrayable<FormItemProp>) => void;
  /**
   * @description Scroll to the specified fields.
   */
  scrollToField: (prop: FormItemProp) => void;
  /**
   * @description Get a field context.
   */
  getField: (prop: FormItemProp) => FormItemContext | undefined;
  /**
   * @description All fields context.
   */
  fields: vue.Reactive<FormItemContext[]>;
  /**
   * @description Set initial values for form fields. When `resetFields` is called, fields will reset to these values.
   */
  setInitialValues: (initModel: Record<string, any>) => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  validate: (prop: FormItemProp, isValid: boolean, message: string) => void;
}, string, vue.PublicProps, Readonly<FormProps> & Readonly<{
  onValidate?: ((prop: FormItemProp, isValid: boolean, message: string) => any) | undefined;
}>, {
  labelWidth: string | number;
  labelPosition: "left" | "right" | "top";
  requireAsteriskPosition: "left" | "right";
  labelSuffix: string;
  showMessage: boolean;
  validateOnRuleChange: boolean;
  scrollIntoViewOptions: ScrollIntoViewOptions | boolean;
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