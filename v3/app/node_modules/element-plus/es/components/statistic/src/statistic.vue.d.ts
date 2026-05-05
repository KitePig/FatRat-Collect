import { StatisticProps } from "./statistic.js";
import * as vue from "vue";
import * as dayjs$1 from "dayjs";

//#region ../../packages/components/statistic/src/statistic.vue.d.ts
declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {};
type __VLS_Slots = {} & {
  title?: (props: typeof __VLS_1) => any;
} & {
  prefix?: (props: typeof __VLS_3) => any;
} & {
  suffix?: (props: typeof __VLS_5) => any;
};
declare const __VLS_base: vue.DefineComponent<StatisticProps, {
  /**
   * @description current display value
   */
  displayValue: vue.ComputedRef<string | number | dayjs$1.Dayjs>;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<StatisticProps> & Readonly<{}>, {
  value: number | dayjs$1.Dayjs;
  precision: number;
  decimalSeparator: string;
  groupSeparator: string;
  valueStyle: string | false | vue.CSSProperties | vue.StyleValue[] | null;
}, {}, {}, {}, string, vue.ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default };