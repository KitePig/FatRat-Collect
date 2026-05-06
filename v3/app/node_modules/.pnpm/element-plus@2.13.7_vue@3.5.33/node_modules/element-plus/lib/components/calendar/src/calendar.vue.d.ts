import { CalendarDateType, CalendarProps } from "./calendar.js";
import * as vue from "vue";
import * as dayjs$1 from "dayjs";

//#region ../../packages/components/calendar/src/calendar.vue.d.ts
declare var __VLS_1: {
    date: string;
  }, __VLS_49: {
    data: {
      isSelected: boolean;
      type: string;
      day: string;
      date: Date;
    };
  }, __VLS_60: {
    data: {
      isSelected: boolean;
      type: string;
      day: string;
      date: Date;
    };
  };
type __VLS_Slots = {} & {
  header?: (props: typeof __VLS_1) => any;
} & {
  'date-cell'?: (props: typeof __VLS_49) => any;
} & {
  'date-cell'?: (props: typeof __VLS_60) => any;
};
declare const __VLS_base: vue.DefineComponent<CalendarProps, {
  /** @description currently selected date */selectedDay: vue.WritableComputedRef<dayjs$1.Dayjs | undefined, dayjs$1.Dayjs | undefined>; /** @description select a specific date */
  pickDay: (day: dayjs$1.Dayjs) => void; /** @description select date */
  selectDate: (type: CalendarDateType) => void; /** @description Calculate the validate date range according to the start and end dates */
  calculateValidatedDateRange: (startDayjs: dayjs$1.Dayjs, endDayjs: dayjs$1.Dayjs) => [dayjs$1.Dayjs, dayjs$1.Dayjs][];
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  "update:modelValue": (value: Date) => void;
  input: (value: Date) => void;
}, string, vue.PublicProps, Readonly<CalendarProps> & Readonly<{
  onInput?: ((value: Date) => any) | undefined;
  "onUpdate:modelValue"?: ((value: Date) => any) | undefined;
}>, {
  controllerType: "button" | "select";
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