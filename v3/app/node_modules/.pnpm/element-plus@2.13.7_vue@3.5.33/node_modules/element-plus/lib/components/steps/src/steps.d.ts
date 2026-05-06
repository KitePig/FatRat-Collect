import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./steps.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/steps/src/steps.d.ts
type StepsStatus = 'wait' | 'process' | 'finish' | 'error' | 'success';
interface StepsProps {
  /**
   * @description the spacing of each step, will be responsive if omitted. Supports percentage.
   * @default ''
   */
  space?: number | string;
  /**
   * @description current activation step
   * @default 0
   */
  active?: number;
  /**
   * @description display direction
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * @description center title and description
   */
  alignCenter?: boolean;
  /**
   * @description whether to apply simple theme
   */
  simple?: boolean;
  /**
   * @description status of end step
   * @default 'finish'
   */
  finishStatus?: StepsStatus;
  /**
   * @description status of current step
   * @default 'process'
   */
  processStatus?: StepsStatus;
}
/**
 * @deprecated Removed after 3.0.0, Use `StepsProps` instead.
 */
declare const stepsProps: {
  readonly space: EpPropFinalized<readonly [NumberConstructor, StringConstructor], unknown, unknown, "", boolean>;
  readonly active: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly direction: EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "horizontal", boolean>;
  readonly alignCenter: {
    readonly type: vue.PropType<EpPropMergeType<BooleanConstructor, unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly simple: {
    readonly type: vue.PropType<EpPropMergeType<BooleanConstructor, unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly finishStatus: EpPropFinalized<StringConstructor, "error" | "success" | "wait" | "finish" | "process", unknown, "finish", boolean>;
  readonly processStatus: EpPropFinalized<StringConstructor, "error" | "success" | "wait" | "finish" | "process", unknown, "process", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `StepsProps` instead.
 */
type StepsPropsPublic = ExtractPublicPropTypes<typeof stepsProps>;
declare const stepsEmits: {
  change: (newVal: number, oldVal: number) => boolean;
};
type StepsEmits = typeof stepsEmits;
type StepsInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { StepsEmits, StepsInstance, StepsProps, StepsPropsPublic, StepsStatus, stepsEmits, stepsProps };