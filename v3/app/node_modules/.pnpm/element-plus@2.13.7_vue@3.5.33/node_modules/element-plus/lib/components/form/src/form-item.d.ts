import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ComponentSize } from "../../../constants/size.js";
import { Arrayable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { FormItemRule } from "./types.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/form/src/form-item.d.ts
declare const formItemValidateStates: readonly ["", "error", "validating", "success"];
type FormItemValidateState = (typeof formItemValidateStates)[number];
type FormItemProp = Arrayable<string>;
interface FormItemProps {
  /**
   * @description Label text.
   */
  label?: string;
  /**
   * @description Width of label, e.g. `'50px'`. `'auto'` is supported.
   */
  labelWidth?: string | number;
  /**
   * @description Position of label. If set to `'left'` or `'right'`, `label-width` prop is also required. The default is extend from `form label-position`.
   */
  labelPosition?: 'left' | 'right' | 'top' | '';
  /**
   * @description  A key of `model`. It could be an array of property paths (e.g `['a', 'b', '0']`). In the use of `validate` and `resetFields` method, the attribute is required.
   */
  prop?: FormItemProp;
  /**
   * @description Whether the field is required or not, will be determined by validation rules if omitted.
   */
  required?: boolean;
  /**
   * @description Validation rules of form, see the [following table](#formitemrule), more advanced usage at [async-validator](https://github.com/yiminghe/async-validator).
   */
  rules?: Arrayable<FormItemRule>;
  /**
   * @description Field error message, set its value and the field will validate error and show this message immediately.
   */
  error?: string;
  /**
   * @description Validation state of formItem.
   */
  validateStatus?: FormItemValidateState;
  /**
   * @description Same as for in native label.
   */
  for?: string;
  /**
   * @description Inline style validate message.
   */
  inlineMessage?: boolean;
  /**
   * @description Whether to show the error message.
   */
  showMessage?: boolean;
  /**
   * @description Control the size of components in this form-item.
   */
  size?: ComponentSize;
}
/**
 * @deprecated Removed after 3.0.0, Use `FormItemProps` instead.
 */
declare const formItemProps: {
  readonly label: StringConstructor;
  readonly labelWidth: {
    readonly type: vue.PropType<EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly labelPosition: EpPropFinalized<StringConstructor, "" | "top" | "left" | "right", unknown, "", boolean>;
  readonly prop: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | string[]) | (() => FormItemProp) | (((new (...args: any[]) => string | string[]) | (() => FormItemProp)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly required: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly rules: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => FormItemRule | FormItemRule[]) | (() => Arrayable<FormItemRule>) | (((new (...args: any[]) => FormItemRule | FormItemRule[]) | (() => Arrayable<FormItemRule>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly error: StringConstructor;
  readonly validateStatus: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "error" | "success" | "validating", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly for: StringConstructor;
  readonly inlineMessage: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly showMessage: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `FormItemProps` instead.
 */
type FormItemPropsPublic = ExtractPublicPropTypes<typeof formItemProps>;
//#endregion
export { FormItemProp, FormItemProps, FormItemPropsPublic, FormItemValidateState, formItemProps, formItemValidateStates };