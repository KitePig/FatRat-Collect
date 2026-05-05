import { Dayjs } from "dayjs";

//#region ../../packages/components/date-picker-panel/src/types.d.ts
type DatePickerType = 'year' | 'years' | 'month' | 'months' | 'date' | 'dates' | 'week' | 'datetime' | 'datetimerange' | 'daterange' | 'monthrange' | 'yearrange';
type DateCellType = 'normal' | 'today' | 'week' | 'next-month' | 'prev-month';
interface DateCell {
  column?: number;
  customClass?: string;
  disabled?: boolean;
  end?: boolean;
  inRange?: boolean;
  row?: number;
  selected?: Dayjs;
  isCurrent?: boolean;
  isSelected?: boolean;
  start?: boolean;
  text?: number;
  renderText?: string;
  timestamp?: number;
  date?: Date;
  dayjs?: Dayjs;
  type?: DateCellType;
}
//#endregion
export { DateCell, DatePickerType };