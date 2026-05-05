Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/calendar/src/calendar.ts
const isValidRange = (range) => (0, _vue_shared.isArray)(range) && range.length === 2 && range.every((item) => (0, _vue_shared.isDate)(item));
/**
* @deprecated Removed after 3.0.0, Use `CalendarProps` instead.
*/
const calendarProps = require_runtime$1.buildProps({
	modelValue: { type: Date },
	range: {
		type: require_runtime$1.definePropType(Array),
		validator: isValidRange
	},
	controllerType: {
		type: String,
		values: ["button", "select"],
		default: "button"
	},
	formatter: { type: require_runtime$1.definePropType(Function) }
});
const calendarEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (value) => (0, _vue_shared.isDate)(value),
	[require_event.INPUT_EVENT]: (value) => (0, _vue_shared.isDate)(value)
};

//#endregion
exports.calendarEmits = calendarEmits;
exports.calendarProps = calendarProps;
//# sourceMappingURL=calendar.js.map