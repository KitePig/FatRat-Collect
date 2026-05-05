import { CHANGE_EVENT } from "../../../constants/event.mjs";
import { isNumber } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/countdown/src/countdown.ts
/**
* @deprecated Removed after 3.0.0, Use `CountdownProps` instead.
*/
const countdownProps = buildProps({
	format: {
		type: String,
		default: "HH:mm:ss"
	},
	prefix: String,
	suffix: String,
	title: String,
	value: {
		type: definePropType([Number, Object]),
		default: 0
	},
	valueStyle: { type: definePropType([
		String,
		Object,
		Array
	]) }
});
const countdownEmits = {
	finish: () => true,
	[CHANGE_EVENT]: (value) => isNumber(value)
};

//#endregion
export { countdownEmits, countdownProps };
//# sourceMappingURL=countdown.mjs.map