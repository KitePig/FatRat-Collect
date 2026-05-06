import { CalendarDateCellType, DateTableProps } from "./date-table.js";
import * as vue from "vue";
import * as dayjs$1 from "dayjs";

//#region ../../packages/components/calendar/src/date-table.vue.d.ts
declare var __VLS_1: {
  data: {
    isSelected: boolean;
    type: string;
    day: string;
    date: Date;
  };
};
type __VLS_Slots = {} & {
  'date-cell'?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: vue.DefineComponent<DateTableProps, {
  /** @description toggle date panel */getFormattedDate: (day: number, type: CalendarDateCellType) => dayjs$1.Dayjs;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  pick: (value: dayjs$1.Dayjs) => void;
}, string, vue.PublicProps, Readonly<DateTableProps> & Readonly<{
  onPick?: ((value: dayjs$1.Dayjs) => any) | undefined;
}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default };