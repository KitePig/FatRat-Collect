import { isObject, isString } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/calendar/src/select-controller.ts
/**
*  @deprecated Removed after 3.0.0, Use `SelectControllerProps` instead.
*/
const selectControllerProps = buildProps({
	date: {
		type: definePropType(Object),
		required: true
	},
	formatter: { type: definePropType(Function) }
});
const selectControllerEmits = { "date-change": (date) => isObject(date) || isString(date) };

//#endregion
export { selectControllerEmits, selectControllerProps };
//# sourceMappingURL=select-controller.mjs.map