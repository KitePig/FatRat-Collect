Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_calendar = require('./src/calendar.js');
const require_calendar$1 = require('./src/calendar2.js');

//#region ../../packages/components/calendar/index.ts
const ElCalendar = require_install.withInstall(require_calendar$1.default);

//#endregion
exports.ElCalendar = ElCalendar;
exports.default = ElCalendar;
exports.calendarEmits = require_calendar.calendarEmits;
exports.calendarProps = require_calendar.calendarProps;
//# sourceMappingURL=index.js.map