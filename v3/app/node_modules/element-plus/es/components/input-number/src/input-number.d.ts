import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ComponentSize } from "../../../constants/size.js";
import "../../../utils/index.js";
import { _default } from "./input-number.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes, HTMLAttributes } from "vue";

//#region ../../packages/components/input-number/src/input-number.d.ts
/**
 * @description input-number component props
 */
interface InputNumberProps {
  /**
   * @description same as `id` in native input
   */
  id?: string;
  /**
   * @description incremental step
   */
  step?: number;
  /**
   * @description whether input value can only be multiple of step
   */
  stepStrictly?: boolean;
  /**
   * @description the maximum allowed value
   */
  max?: number;
  /**
   * @description the minimum allowed value
   */
  min?: number;
  /**
   * @description binding value
   */
  modelValue?: number | null;
  /**
   * @description same as `readonly` in native input
   */
  readonly?: boolean;
  /**
   * @description whether the component is disabled
   */
  disabled?: boolean;
  /**
   * @description size of the component
   */
  size?: ComponentSize;
  /**
   * @description whether to enable the control buttons
   */
  controls?: boolean;
  /**
   * @description position of the control buttons
   */
  controlsPosition?: '' | 'right';
  /**
   * @description value should be set when input box is cleared
   */
  valueOnClear?: 'min' | 'max' | number | null;
  /**
   * @description same as `name` in native input
   */
  name?: string;
  /**
   * @description same as `placeholder` in native input
   */
  placeholder?: string;
  /**
   * @description precision of input value
   */
  precision?: number;
  /**
   * @description whether to trigger form validation
   */
  validateEvent?: boolean;
  /**
   * @description native aria-label attribute
   */
  ariaLabel?: string;
  /**
   * @description native input mode for virtual keyboards
   */
  inputmode?: HTMLAttributes['inputmode'];
  /**
   * @description alignment for the inner input text
   */
  align?: 'left' | 'right' | 'center';
  /**
   * @description whether to disable scientific notation input (e.g. 'e', 'E')
   */
  disabledScientific?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `InputNumberProps` instead.
 */
declare const inputNumberProps: {
  readonly inputmode: EpPropFinalized<(new (...args: any[]) => "text" | "email" | "search" | "tel" | "url" | "none" | "numeric" | "decimal") | (() => "text" | "email" | "search" | "tel" | "url" | "none" | "numeric" | "decimal" | undefined) | (((new (...args: any[]) => "text" | "email" | "search" | "tel" | "url" | "none" | "numeric" | "decimal") | (() => "text" | "email" | "search" | "tel" | "url" | "none" | "numeric" | "decimal" | undefined)) | null)[], unknown, unknown, undefined, boolean>;
  readonly align: EpPropFinalized<(new (...args: any[]) => "center" | "left" | "right") | (() => "center" | "left" | "right") | (((new (...args: any[]) => "center" | "left" | "right") | (() => "center" | "left" | "right")) | null)[], unknown, unknown, "center", boolean>;
  readonly disabledScientific: BooleanConstructor;
  readonly ariaLabel: StringConstructor;
  readonly id: EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
  readonly step: EpPropFinalized<NumberConstructor, unknown, unknown, 1, boolean>;
  readonly stepStrictly: BooleanConstructor;
  readonly max: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  readonly min: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  readonly modelValue: {
    readonly type: vue.PropType<EpPropMergeType<readonly [NumberConstructor, null], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly readonly: BooleanConstructor;
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly controls: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly controlsPosition: EpPropFinalized<StringConstructor, "" | "right", unknown, "", boolean>;
  readonly valueOnClear: EpPropFinalized<(new (...args: any[]) => number | "max" | "min") | (() => number | "max" | "min" | null) | (((new (...args: any[]) => number | "max" | "min") | (() => number | "max" | "min" | null)) | null)[], unknown, unknown, null, boolean>;
  readonly name: StringConstructor;
  readonly placeholder: StringConstructor;
  readonly precision: {
    readonly type: vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `InputNumberProps` instead.
 */
type InputNumberPropsPublic = ExtractPublicPropTypes<typeof inputNumberProps>;
declare const inputNumberEmits: {
  change: (cur: number | undefined, prev: number | undefined) => boolean;
  blur: (e: FocusEvent) => boolean;
  focus: (e: FocusEvent) => boolean;
  input: (val: number | null | undefined) => boolean;
  "update:modelValue": (val: number | undefined) => boolean;
};
type InputNumberEmits = typeof inputNumberEmits;
type InputNumberInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { InputNumberEmits, InputNumberInstance, InputNumberProps, InputNumberPropsPublic, inputNumberEmits, inputNumberProps };