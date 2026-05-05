import { DateOrDates, DayOrDays } from "./common/props.js";
import dayjs, { Dayjs } from "dayjs";

//#region ../../packages/components/time-picker/src/utils.d.ts
type TimeList = [number | undefined, number, undefined | number];
declare const buildTimeList: (value: number, bound: number) => TimeList;
declare const rangeArr: (n: number) => number[];
declare const extractDateFormat: (format: string) => string;
declare const extractTimeFormat: (format: string) => string;
declare const dateEquals: (a: Date | unknown, b: Date | unknown) => boolean;
declare const valueEquals: (a: Array<Date> | unknown, b: Array<Date> | unknown) => boolean;
declare const parseDate: (date: string | number | Date, format: string | undefined, lang: string) => dayjs.Dayjs | undefined;
declare const formatter: (date: string | number | Date | Dayjs, format: string | undefined, lang: string) => string | number | Date | dayjs.Dayjs;
declare const makeList: (total: number, method?: () => number[]) => boolean[];
declare const dayOrDaysToDate: (dayOrDays: DayOrDays) => DateOrDates;
//#endregion
export { TimeList, buildTimeList, dateEquals, dayOrDaysToDate, extractDateFormat, extractTimeFormat, formatter, makeList, parseDate, rangeArr, valueEquals };