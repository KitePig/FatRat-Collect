Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/steps/src/steps.ts
/**
* @deprecated Removed after 3.0.0, Use `StepsProps` instead.
*/
const stepsProps = require_runtime.buildProps({
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
const stepsEmits = { [require_event.CHANGE_EVENT]: (newVal, oldVal) => [newVal, oldVal].every(require_types.isNumber) };

//#endregion
exports.stepsEmits = stepsEmits;
exports.stepsProps = stepsProps;
//# sourceMappingURL=steps.js.map