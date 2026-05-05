import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ComponentSize } from "../../../constants/size.js";
import "../../../utils/index.js";
import { _default } from "./radio-group.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/radio/src/radio-group.d.ts
type radioOptionProp = {
  value?: string;
  label?: string;
  disabled?: string;
};
declare const radioDefaultProps: Required<radioOptionProp>;
type radioOption = Record<string, any>;
interface RadioGroupProps {
  /**
   * @description native `id` attribute
   */
  id?: string;
  /**
   * @description the size of radio buttons or bordered radios
   */
  size?: ComponentSize;
  /**
   * @description whether the nesting radios are disabled
   */
  disabled?: boolean;
  /**
   * @description binding value
   */
  modelValue?: string | number | boolean;
  /**
   * @description border and background color when button is active
   */
  fill?: string;
  /**
   * @description font color when button is active
   */
  textColor?: string;
  /**
   * @description native `name` attribute
   */
  name?: string;
  /**
   * @description whether to trigger form validation
   */
  validateEvent?: boolean;
  /**
   * @description radio options
   */
  options?: radioOption[];
  /**
   * @description custom prop names for options
   */
  props?: radioOptionProp;
  /**
   * @description radio type
   */
  type?: 'radio' | 'button';
  /**
   * @description native `aria-label` attribute
   */
  ariaLabel?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `RadioGroupProps` instead.
 */
declare const radioGroupProps: {
  readonly ariaLabel: StringConstructor;
  readonly id: EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly modelValue: EpPropFinalized<readonly [StringConstructor, NumberConstructor, BooleanConstructor], unknown, unknown, undefined, boolean>;
  readonly fill: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly textColor: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly name: EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
  readonly validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly options: {
    readonly type: vue.PropType<radioOption[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly props: EpPropFinalized<(new (...args: any[]) => radioOptionProp) | (() => radioOptionProp) | (((new (...args: any[]) => radioOptionProp) | (() => radioOptionProp)) | null)[], unknown, unknown, () => Required<radioOptionProp>, boolean>;
  readonly type: EpPropFinalized<StringConstructor, "button" | "radio", unknown, "radio", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `RadioGroupProps` instead.
 */
type RadioGroupPropsPublic = ExtractPublicPropTypes<typeof radioGroupProps>;
declare const radioGroupEmits: {
  "update:modelValue": (val: string | number | boolean | undefined) => val is string | number | boolean;
  change: (val: string | number | boolean | undefined) => val is string | number | boolean;
};
type RadioGroupEmits = typeof radioGroupEmits;
type RadioGroupInstance = InstanceType<typeof _default> & unknown;
/**
 * @description default values for RadioGroupProps
 */
declare const radioGroupPropsDefaults: {
  readonly id: undefined;
  readonly disabled: undefined;
  readonly modelValue: undefined;
  readonly fill: "";
  readonly textColor: "";
  readonly name: undefined;
  readonly validateEvent: true;
  readonly props: () => Required<radioOptionProp>;
  readonly type: "radio";
};
//#endregion
export { RadioGroupEmits, RadioGroupInstance, RadioGroupProps, RadioGroupPropsPublic, radioDefaultProps, radioGroupEmits, radioGroupProps, radioGroupPropsDefaults, radioOption, radioOptionProp };