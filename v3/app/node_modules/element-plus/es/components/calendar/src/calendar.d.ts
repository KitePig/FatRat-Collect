import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/calendar/src/calendar.d.ts
type CalendarDateType = 'prev-month' | 'next-month' | 'prev-year' | 'next-year' | 'today';
interface CalendarProps {
  /**
   * @description binding value
   */
  modelValue?: Date;
  /**
   * @description time range, including start time and end time.
   *   Start time must be start day of week, end time must be end day of week, the time span cannot exceed two months.
   */
  range?: [Date, Date];
  /**
   * @description type of the controller for the Calendar header
   */
  controllerType?: 'button' | 'select';
  /**
   * @description format label when `controller-type` is 'select'
   */
  formatter?: (value: number, type: 'year' | 'month') => string | number;
}
/**
 * @deprecated Removed after 3.0.0, Use `CalendarProps` instead.
 */
declare const calendarProps: {
  readonly modelValue: {
    readonly type: vue.PropType<Date>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly range: {
    readonly type: vue.PropType<[Date, Date]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly controllerType: EpPropFinalized<StringConstructor, "select" | "button", unknown, "button", boolean>;
  readonly formatter: {
    readonly type: vue.PropType<(value: number, type: "year" | "month") => string | number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 *  @deprecated Removed after 3.0.0, Use `CalendarProps` instead.
 */
type CalendarPropsPublic = ExtractPublicPropTypes<typeof calendarProps>;
declare const calendarEmits: {
  "update:modelValue": (value: Date) => boolean;
  input: (value: Date) => boolean;
};
type CalendarEmits = typeof calendarEmits;
//#endregion
export { CalendarDateType, CalendarEmits, CalendarProps, CalendarPropsPublic, calendarEmits, calendarProps };