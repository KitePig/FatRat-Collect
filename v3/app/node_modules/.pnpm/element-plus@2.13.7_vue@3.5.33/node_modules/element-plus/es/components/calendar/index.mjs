import { withInstall } from "../../utils/vue/install.mjs";
import { calendarEmits, calendarProps } from "./src/calendar.mjs";
import calendar_default from "./src/calendar2.mjs";

//#region ../../packages/components/calendar/index.ts
const ElCalendar = withInstall(calendar_default);

//#endregion
export { ElCalendar, ElCalendar as default, calendarEmits, calendarProps };
//# sourceMappingURL=index.mjs.map