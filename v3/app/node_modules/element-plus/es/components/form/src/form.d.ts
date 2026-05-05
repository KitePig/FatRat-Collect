import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ComponentSize } from "../../../constants/size.js";
import { Arrayable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { FormItemProp } from "./form-item.js";
import { FormItemRule, FormRules } from "./types.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/form/src/form.d.ts
interface FormMetaProps {
  /**
   * @description Control the size of components in this form.
   */
  size?: ComponentSize;
  /**
   * @description Whether to disable all components in this form. If set to `true`, it will override the `disabled` prop of the inner component.
   */
  disabled?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `FormMetaProps` instead.
 */
declare const formMetaProps: {
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabled: BooleanConstructor;
};
interface FormProps extends FormMetaProps {
  /**
   * @description Data of form component.
   */
  model?: Record<string, any>;
  /**
   * @description Validation rules of form.
   */
  rules?: FormRules;
  /**
   * @description Position of label. If set to `'left'` or `'right'`, `label-width` prop is also required.
   */
  labelPosition?: 'left' | 'right' | 'top';
  /**
   * @description Position of asterisk.
   */
  requireAsteriskPosition?: 'left' | 'right';
  /**
   * @description Width of label, e.g. `'50px'`. All its direct child form items will inherit this value. `auto` is supported.
   */
  labelWidth?: string | number;
  /**
   * @description Suffix of the label.
   */
  labelSuffix?: string;
  /**
   * @description Whether the form is inline.
   */
  inline?: boolean;
  /**
   * @description Whether to display the error message inline with the form item.
   */
  inlineMessage?: boolean;
  /**
   * @description Whether to display an icon indicating the validation result.
   */
  statusIcon?: boolean;
  /**
   * @description Whether to show the error message.
   */
  showMessage?: boolean;
  /**
   * @description Whether to trigger validation when the `rules` prop is changed.
   */
  validateOnRuleChange?: boolean;
  /**
   * @description Whether to hide required fields should have a red asterisk (star) beside their labels.
   */
  hideRequiredAsterisk?: boolean;
  /**
   * @description When validation fails, scroll to the first error form entry.
   */
  scrollToError?: boolean;
  /**
   * @description When validation fails, it scrolls to the first error item based on the scrollIntoView option.
   */
  scrollIntoViewOptions?: ScrollIntoViewOptions | boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `FormProps` instead.
 */
declare const formProps: {
  readonly model: ObjectConstructor;
  readonly rules: {
    readonly type: vue.PropType<Partial<Record<string, Record<string, any> | Arrayable<FormItemRule>>>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly labelPosition: EpPropFinalized<StringConstructor, "top" | "left" | "right", unknown, "right", boolean>;
  readonly requireAsteriskPosition: EpPropFinalized<StringConstructor, "left" | "right", unknown, "left", boolean>;
  readonly labelWidth: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, "", boolean>;
  readonly labelSuffix: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly inline: BooleanConstructor;
  readonly inlineMessage: BooleanConstructor;
  readonly statusIcon: BooleanConstructor;
  readonly showMessage: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly validateOnRuleChange: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly hideRequiredAsterisk: BooleanConstructor;
  readonly scrollToError: BooleanConstructor;
  readonly scrollIntoViewOptions: EpPropFinalized<(new (...args: any[]) => boolean | ScrollIntoViewOptions) | (() => boolean | ScrollIntoViewOptions) | (((new (...args: any[]) => boolean | ScrollIntoViewOptions) | (() => boolean | ScrollIntoViewOptions)) | null)[], unknown, unknown, true, boolean>;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabled: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `FormProps` instead.
 */
type FormPropsPublic = ExtractPublicPropTypes<typeof formProps>;
/**
 * @deprecated Removed after 3.0.0, Use `FormMetaProps` instead.
 */
type FormMetaPropsPublic = ExtractPublicPropTypes<typeof formMetaProps>;
declare const formEmits: {
  validate: (prop: FormItemProp, isValid: boolean, message: string) => boolean;
};
type FormEmits = typeof formEmits;
//#endregion
export { FormEmits, FormMetaProps, FormMetaPropsPublic, FormProps, FormPropsPublic, formEmits, formMetaProps, formProps };