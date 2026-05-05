import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./countdown.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes, StyleValue } from "vue";
import { Dayjs } from "dayjs";

//#region ../../packages/components/countdown/src/countdown.d.ts
interface CountdownProps {
  /**
   * @description Formatting the countdown display
   */
  format?: string;
  /**
   * @description Sets the prefix of a countdown
   */
  prefix?: string;
  /**
   * @description Sets the suffix of a countdown
   */
  suffix?: string;
  /**
   * @description countdown titles
   */
  title?: string;
  /**
   * @description target time
   */
  value?: number | Dayjs;
  /**
   * @description Styles countdown values
   */
  valueStyle?: StyleValue;
}
/**
 * @deprecated Removed after 3.0.0, Use `CountdownProps` instead.
 */
declare const countdownProps: {
  readonly format: EpPropFinalized<StringConstructor, unknown, unknown, "HH:mm:ss", boolean>;
  readonly prefix: StringConstructor;
  readonly suffix: StringConstructor;
  readonly title: StringConstructor;
  readonly value: EpPropFinalized<(new (...args: any[]) => number | Dayjs) | (() => number | Dayjs) | (((new (...args: any[]) => number | Dayjs) | (() => number | Dayjs)) | null)[], unknown, unknown, 0, boolean>;
  readonly valueStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `CountdownProps` instead.
 */
type CountdownPropsPublic = ExtractPublicPropTypes<typeof countdownProps>;
declare const countdownEmits: {
  finish: () => boolean;
  change: (value: number) => boolean;
};
type CountdownEmits = typeof countdownEmits;
type CountdownInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { CountdownEmits, CountdownInstance, CountdownProps, CountdownPropsPublic, countdownEmits, countdownProps };