//#region ../../packages/constants/date.d.ts
declare const datePickTypes: readonly ["year", "years", "month", "months", "date", "dates", "week", "datetime", "datetimerange", "daterange", "monthrange", "yearrange"];
declare const WEEK_DAYS: readonly ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
type DatePickType = (typeof datePickTypes)[number];
//#endregion
export { DatePickType, WEEK_DAYS, datePickTypes };