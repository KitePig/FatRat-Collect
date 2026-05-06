import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { CalendarDateType, CalendarEmits, CalendarProps, CalendarPropsPublic, calendarEmits, calendarProps } from "./src/calendar.js";
import { _default } from "./src/calendar.vue.js";
import { CalendarDateTableInstance, CalendarInstance, DateTableInstance } from "./src/instance.js";

//#region ../../packages/components/calendar/index.d.ts
declare const ElCalendar: SFCWithInstall<typeof _default>;
//#endregion
export { type CalendarDateTableInstance, CalendarDateType, CalendarEmits, type CalendarInstance, CalendarProps, CalendarPropsPublic, type DateTableInstance, ElCalendar, ElCalendar as default, calendarEmits, calendarProps };