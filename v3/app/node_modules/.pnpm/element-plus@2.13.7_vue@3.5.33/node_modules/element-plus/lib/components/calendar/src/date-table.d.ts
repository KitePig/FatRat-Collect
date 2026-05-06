import "../../../utils/index.js";
import { ExtractPublicPropTypes } from "vue";
import { Dayjs } from "dayjs";

//#region ../../packages/components/calendar/src/date-table.d.ts
type CalendarDateCellType = 'next' | 'prev' | 'current';
interface DateTableProps {
  selectedDay?: Dayjs;
  range?: [Dayjs, Dayjs];
  date: Dayjs;
  hideHeader?: boolean;
}
//#endregion
export { CalendarDateCellType, DateTableProps };