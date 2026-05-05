import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./statistic.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes, StyleValue } from "vue";
import { Dayjs } from "dayjs";

//#region ../../packages/components/statistic/src/statistic.d.ts
interface StatisticProps {
  /**
   * @description Setting the decimal point
   */
  decimalSeparator?: string;
  /**
   * @description Sets the thousandth identifier
   */
  groupSeparator?: string;
  /**
   * @description numerical precision
   */
  precision?: number;
  /**
   * @description Custom numerical presentation
   */
  formatter?: (...args: any[]) => string | number;
  /**
   * @description Numerical content
   */
  value?: number | Dayjs;
  /**
   * @description Sets the prefix of a number
   */
  prefix?: string;
  /**
   * @description  Sets the suffix of a number
   */
  suffix?: string;
  /**
   * @description Numeric titles
   */
  title?: string;
  /**
   * @description Styles numeric values
   */
  valueStyle?: StyleValue;
}
/**
 * @deprecated Removed after 3.0.0, Use `StatisticProps` instead.
 */
declare const statisticProps: {
  readonly decimalSeparator: EpPropFinalized<StringConstructor, unknown, unknown, ".", boolean>;
  readonly groupSeparator: EpPropFinalized<StringConstructor, unknown, unknown, ",", boolean>;
  readonly precision: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly formatter: FunctionConstructor;
  readonly value: EpPropFinalized<(new (...args: any[]) => number | Dayjs) | (() => number | Dayjs) | (((new (...args: any[]) => number | Dayjs) | (() => number | Dayjs)) | null)[], unknown, unknown, 0, boolean>;
  readonly prefix: StringConstructor;
  readonly suffix: StringConstructor;
  readonly title: StringConstructor;
  readonly valueStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `StatisticProps` instead.
 */
type StatisticPropsPublic = ExtractPublicPropTypes<typeof statisticProps>;
type StatisticInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { StatisticInstance, StatisticProps, StatisticPropsPublic, statisticProps };