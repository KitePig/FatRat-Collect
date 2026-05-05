import { CHANGE_EVENT } from "../../../constants/event.mjs";
import { isNumber } from "../../../utils/types.mjs";
import { buildProps } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/steps/src/steps.ts
/**
* @deprecated Removed after 3.0.0, Use `StepsProps` instead.
*/
const stepsProps = buildProps({
	space: {
		type: [Number, String],
		default: ""
	},
	active: {
		type: Number,
		default: 0
	},
	direction: {
		type: String,
		default: "horizontal",
		values: ["horizontal", "vertical"]
	},
	alignCenter: { type: Boolean },
	simple: { type: Boolean },
	finishStatus: {
		type: String,
		values: [
			"wait",
			"process",
			"finish",
			"error",
			"success"
		],
		default: "finish"
	},
	processStatus: {
		type: String,
		values: [
			"wait",
			"process",
			"finish",
			"error",
			"success"
		],
		default: "process"
	}
});
const stepsEmits = { [CHANGE_EVENT]: (newVal, oldVal) => [newVal, oldVal].every(isNumber) };

//#endregion
export { stepsEmits, stepsProps };
//# sourceMappingURL=steps.mjs.map