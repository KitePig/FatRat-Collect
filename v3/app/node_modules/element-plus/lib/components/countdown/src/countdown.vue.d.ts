import { CountdownProps } from "./countdown.js";
import * as vue from "vue";
import * as dayjs$1 from "dayjs";

//#region ../../packages/components/countdown/src/countdown.vue.d.ts
declare var __VLS_10: string, __VLS_11: {};
type __VLS_Slots = {} & { [K in NonNullable<typeof __VLS_10>]?: (props: typeof __VLS_11) => any };
declare const __VLS_base: vue.DefineComponent<CountdownProps, {
  /**
   * @description current display value
   */
  displayValue: vue.ComputedRef<string>;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  change: (value: number) => void;
  finish: () => void;
}, string, vue.PublicProps, Readonly<CountdownProps> & Readonly<{
  onChange?: ((value: number) => any) | undefined;
  onFinish?: (() => any) | undefined;
}>, {
  value: number | dayjs$1.Dayjs;
  format: string;
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