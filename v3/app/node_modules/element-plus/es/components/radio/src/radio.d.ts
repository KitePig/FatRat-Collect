import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ComponentSize } from "../../../constants/size.js";
import "../../../utils/index.js";
import { _default } from "./radio.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/radio/src/radio.d.ts
interface RadioPropsBase {
  /**
   * @description binding value
   */
  modelValue?: string | number | boolean;
  /**
   * @description size of the Radio
   */
  size?: ComponentSize;
  /**
   * @description whether Radio is disabled
   */
  disabled?: boolean;
  /**
   * @description the label of Radio
   */
  label?: string | number | boolean;
  /**
   * @description the value of Radio
   */
  value?: string | number | boolean;
  /**
   * @description native `name` attribute
   */
  name?: string;
}
interface RadioProps extends RadioPropsBase {
  /**
   * @description whether to add a border around Radio
   */
  border?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `RadioPropsBase` instead.
 */
declare const radioPropsBase: {
  modelValue: EpPropFinalized<(BooleanConstructor | NumberConstructor | StringConstructor)[], unknown, unknown, undefined, boolean>;
  size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  label: EpPropFinalized<(BooleanConstructor | NumberConstructor | StringConstructor)[], unknown, unknown, undefined, boolean>;
  value: EpPropFinalized<(BooleanConstructor | NumberConstructor | StringConstructor)[], unknown, unknown, undefined, boolean>;
  name: EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `RadioProps` instead.
 */
declare const radioProps: {
  readonly border: BooleanConstructor;
  readonly modelValue: EpPropFinalized<(BooleanConstructor | NumberConstructor | StringConstructor)[], unknown, unknown, undefined, boolean>;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly label: EpPropFinalized<(BooleanConstructor | NumberConstructor | StringConstructor)[], unknown, unknown, undefined, boolean>;
  readonly value: EpPropFinalized<(BooleanConstructor | NumberConstructor | StringConstructor)[], unknown, unknown, undefined, boolean>;
  readonly name: EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
};
declare const radioEmits: {
  "update:modelValue": (val: string | number | boolean | undefined) => val is string | number | boolean;
  change: (val: string | number | boolean | undefined) => val is string | number | boolean;
};
/**
 * @deprecated Removed after 3.0.0, Use `RadioProps` instead.
 */
type RadioPropsPublic = ExtractPublicPropTypes<typeof radioProps>;
type RadioEmits = typeof radioEmits;
type RadioInstance = InstanceType<typeof _default> & unknown;
/**
 * @description default values for RadioProps
 */
declare const radioPropsDefaults: {
  readonly modelValue: undefined;
  readonly disabled: undefined;
  readonly label: undefined;
  readonly value: undefined;
  readonly name: undefined;
  readonly border: false;
};
//#endregion
export { RadioEmits, RadioInstance, RadioProps, RadioPropsBase, RadioPropsPublic, radioEmits, radioProps, radioPropsBase, radioPropsDefaults };