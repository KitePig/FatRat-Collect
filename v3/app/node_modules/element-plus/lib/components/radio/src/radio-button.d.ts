import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { RadioPropsBase } from "./radio.js";
import { _default } from "./radio-button.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/radio/src/radio-button.d.ts
interface RadioButtonProps extends RadioPropsBase {}
/**
 * @deprecated Removed after 3.0.0, Use `RadioButtonProps` instead.
 */
declare const radioButtonProps: {
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
/**
 * @deprecated Removed after 3.0.0, Use `RadioButtonProps` instead.
 */
type RadioButtonPropsPublic = ExtractPublicPropTypes<typeof radioButtonProps>;
type RadioButtonInstance = InstanceType<typeof _default> & unknown;
/**
 * @description default values for RadioButtonProps
 */
declare const radioButtonPropsDefaults: {
  readonly modelValue: undefined;
  readonly disabled: undefined;
  readonly label: undefined;
  readonly value: undefined;
  readonly name: undefined;
};
//#endregion
export { RadioButtonInstance, RadioButtonProps, RadioButtonPropsPublic, radioButtonProps, radioButtonPropsDefaults };