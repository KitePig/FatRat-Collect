import { INPUT_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isArray, isDate } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/calendar/src/calendar.ts
const isValidRange = (range) => isArray(range) && range.length === 2 && range.every((item) => isDate(item));
/**
* @deprecated Removed after 3.0.0, Use `CalendarProps` instead.
*/
const calendarProps = buildProps({
	modelValue: { type: Date },
	range: {
		type: definePropType(Array),
		validator: isValidRange
	},
	controllerType: {
		type: String,
		values: ["button", "select"],
		default: "button"
	},
	formatter: { type: definePropType(Function) }
});
const calendarEmits = {
	[UPDATE_MODEL_EVENT]: (value) => isDate(value),
	[INPUT_EVENT]: (value) => isDate(value)
};

//#endregion
export { calendarEmits, calendarProps };
//# sourceMappingURL=calendar.mjs.map