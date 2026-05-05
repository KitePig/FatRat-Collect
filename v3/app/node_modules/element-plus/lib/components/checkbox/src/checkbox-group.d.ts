import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ComponentSize } from "../../../constants/size.js";
import "../../../utils/index.js";
import { AriaProps } from "../../../hooks/use-aria/index.js";
import "../../../hooks/index.js";
import { CheckboxProps, CheckboxValueType } from "./checkbox.js";
import { _default } from "./checkbox-group.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/checkbox/src/checkbox-group.d.ts
type CheckboxGroupValueType = Exclude<CheckboxValueType, boolean>[];
interface CheckboxGroupProps extends Pick<AriaProps, 'ariaLabel'> {
  /**
   * @description binding value
   */
  modelValue?: CheckboxGroupValueType;
  /**
   * @description whether the nesting checkboxes are disabled
   */
  disabled?: boolean;
  /**
   * @description minimum number of checkbox checked
   */
  min?: number;
  /**
   * @description maximum number of checkbox checked
   */
  max?: number;
  /**
   * @description size of checkbox
   */
  size?: ComponentSize;
  /**
   * @description border and background color when button is active
   */
  fill?: string;
  /**
   * @description font color when button is active
   */
  textColor?: string;
  /**
   * @description element tag of the checkbox group
   */
  tag?: string;
  /**
   * @description whether to trigger form validation
   */
  validateEvent?: boolean;
  /**
   * @description data of the options, the key of `value` and `label` and `disabled` can be customize by `props`
   */
  options?: CheckboxOption[];
  /**
   * @description configuration options
   */
  props?: CheckboxOptionProps;
  /**
   * @description component type to render options (e.g. `'button'`)
   */
  type?: 'checkbox' | 'button';
}
/**
 * @deprecated Removed after 3.0.0, Use `CheckboxGroupProps` instead.
 */
declare const checkboxGroupProps: {
  readonly ariaLabel: StringConstructor;
  readonly modelValue: EpPropFinalized<(new (...args: any[]) => CheckboxGroupValueType) | (() => CheckboxGroupValueType) | (((new (...args: any[]) => CheckboxGroupValueType) | (() => CheckboxGroupValueType)) | null)[], unknown, unknown, () => never[], boolean>;
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly min: NumberConstructor;
  readonly max: NumberConstructor;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly fill: StringConstructor;
  readonly textColor: StringConstructor;
  readonly tag: EpPropFinalized<StringConstructor, unknown, unknown, "div", boolean>;
  readonly validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly options: {
    readonly type: vue.PropType<CheckboxOption[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly props: EpPropFinalized<(new (...args: any[]) => CheckboxOptionProps) | (() => CheckboxOptionProps) | (((new (...args: any[]) => CheckboxOptionProps) | (() => CheckboxOptionProps)) | null)[], unknown, unknown, () => Required<CheckboxOptionProps>, boolean>;
  readonly type: EpPropFinalized<StringConstructor, "button" | "checkbox", unknown, "checkbox", boolean>;
};
declare const checkboxGroupEmits: {
  "update:modelValue": (val: CheckboxGroupValueType) => boolean;
  change: (val: CheckboxValueType[]) => boolean;
};
/**
 * @deprecated Removed after 3.0.0, Use `CheckboxGroupProps` instead.
 */
type CheckboxGroupPropsPublic = ExtractPublicPropTypes<typeof checkboxGroupProps>;
type CheckboxGroupEmits = typeof checkboxGroupEmits;
type CheckboxGroupInstance = InstanceType<typeof _default> & unknown;
type CheckboxOption = CheckboxProps & Record<string, any>;
type CheckboxOptionProps = {
  value?: string;
  label?: string;
  disabled?: string;
};
declare const checkboxDefaultProps: Required<CheckboxOptionProps>;
//#endregion
export { CheckboxGroupEmits, CheckboxGroupInstance, CheckboxGroupProps, CheckboxGroupPropsPublic, CheckboxGroupValueType, CheckboxOption, checkboxDefaultProps, checkboxGroupEmits, checkboxGroupProps };