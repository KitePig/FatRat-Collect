import { EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ComponentSize } from "../../../constants/size.js";
import "../../../utils/index.js";
import { AriaProps } from "../../../hooks/use-aria/index.js";
import "../../../hooks/index.js";
import { _default } from "./checkbox.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/checkbox/src/checkbox.d.ts
type CheckboxValueType = string | number | boolean;
interface CheckboxProps extends Pick<AriaProps, 'ariaLabel' | 'ariaControls'> {
  /**
   * @description binding value
   */
  modelValue?: number | string | boolean;
  /**
   * @description label of the Checkbox when used inside a `checkbox-group`
   */
  label?: string | boolean | number | object;
  /**
   * @description value of the Checkbox when used inside a `checkbox-group`
   */
  value?: string | boolean | number | object;
  /**
   * @description Set indeterminate state, only responsible for style control
   */
  indeterminate?: boolean;
  /**
   * @description whether the Checkbox is disabled
   */
  disabled?: boolean;
  /**
   * @description if the Checkbox is checked
   */
  checked?: boolean;
  /**
   * @description native 'name' attribute
   */
  name?: string;
  /**
   * @description value of the Checkbox if it's checked
   */
  trueValue?: string | number;
  /**
   * @description value of the Checkbox if it's not checked
   */
  falseValue?: string | number;
  /**
   * @deprecated use `trueValue` instead
   * @description value of the Checkbox if it's checked
   */
  trueLabel?: string | number;
  /**
   * @deprecated use `falseValue` instead
   * @description value of the Checkbox if it's not checked
   */
  falseLabel?: string | number;
  /**
   * @description input id
   */
  id?: string;
  /**
   * @description whether to add a border around Checkbox
   */
  border?: boolean;
  /**
   * @description size of the Checkbox
   */
  size?: ComponentSize;
  /**
   * @description input tabindex
   */
  tabindex?: string | number;
  /**
   * @description whether to trigger form validation
   */
  validateEvent?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `CheckboxProps` instead.
 */
declare const checkboxProps: {
  ariaControls: StringConstructor;
  /**
   * @description binding value
   */
  modelValue: {
    type: (BooleanConstructor | NumberConstructor | StringConstructor)[];
    default: undefined;
  };
  /**
   * @description label of the Checkbox when used inside a `checkbox-group`
   */
  label: {
    type: (BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[];
    default: undefined;
  };
  /**
   * @description value of the Checkbox when used inside a `checkbox-group`
   */
  value: {
    type: (BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[];
    default: undefined;
  };
  /**
   * @description Set indeterminate state, only responsible for style control
   */
  indeterminate: BooleanConstructor;
  /**
   * @description whether the Checkbox is disabled
   */
  disabled: {
    type: BooleanConstructor;
    default: undefined;
  };
  /**
   * @description if the Checkbox is checked
   */
  checked: BooleanConstructor;
  /**
   * @description native 'name' attribute
   */
  name: {
    type: StringConstructor;
    default: undefined;
  };
  /**
   * @description value of the Checkbox if it's checked
   */
  trueValue: {
    type: (NumberConstructor | StringConstructor)[];
    default: undefined;
  };
  /**
   * @description value of the Checkbox if it's not checked
   */
  falseValue: {
    type: (NumberConstructor | StringConstructor)[];
    default: undefined;
  };
  /**
   * @deprecated use `trueValue` instead
   * @description value of the Checkbox if it's checked
   */
  trueLabel: {
    type: (NumberConstructor | StringConstructor)[];
    default: undefined;
  };
  /**
   * @deprecated use `falseValue` instead
   * @description value of the Checkbox if it's not checked
   */
  falseLabel: {
    type: (NumberConstructor | StringConstructor)[];
    default: undefined;
  };
  /**
   * @description input id
   */
  id: {
    type: StringConstructor;
    default: undefined;
  };
  /**
   * @description whether to add a border around Checkbox
   */
  border: BooleanConstructor;
  /**
   * @description size of the Checkbox
   */
  size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  /**
   * @description input tabindex
   */
  tabindex: (NumberConstructor | StringConstructor)[];
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: BooleanConstructor;
    default: boolean;
  };
  ariaLabel: StringConstructor;
};
declare const checkboxEmits: {
  "update:modelValue": (val: CheckboxValueType) => val is string | number | boolean;
  change: (val: CheckboxValueType) => val is string | number | boolean;
};
/**
 * @deprecated Removed after 3.0.0, Use `CheckboxProps` instead.
 */
type CheckboxPropsPublic = ExtractPublicPropTypes<typeof checkboxProps>;
type CheckboxEmits = typeof checkboxEmits;
type CheckboxInstance = InstanceType<typeof _default> & unknown;
declare const checkboxPropsDefaults: {
  readonly modelValue: undefined;
  readonly label: undefined;
  readonly value: undefined;
  readonly disabled: undefined;
  readonly name: undefined;
  readonly trueValue: undefined;
  readonly falseValue: undefined;
  readonly trueLabel: undefined;
  readonly falseLabel: undefined;
  readonly id: undefined;
  readonly validateEvent: true;
};
//#endregion
export { CheckboxEmits, CheckboxInstance, CheckboxProps, CheckboxPropsPublic, CheckboxValueType, checkboxEmits, checkboxProps, checkboxPropsDefaults };