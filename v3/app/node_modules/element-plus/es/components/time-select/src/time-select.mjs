import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { useEmptyValuesProps } from "../../../hooks/use-empty-values/index.mjs";
import { CircleClose, Clock } from "@element-plus/icons-vue";

//#region ../../packages/components/time-select/src/time-select.ts
const DEFAULT_STEP = "00:30";
/**
* @deprecated Removed after 3.0.0, Use `TimeSelectProps` instead.
*/
const timeSelectProps = buildProps({
	format: {
		type: String,
		default: "HH:mm"
	},
	modelValue: { type: definePropType(String) },
	disabled: {
		type: Boolean,
		default: void 0
	},
	editable: {
		type: Boolean,
		default: true
	},
	effect: {
		type: definePropType(String),
		default: "light"
	},
	clearable: {
		type: Boolean,
		default: true
	},
	size: useSizeProp,
	placeholder: String,
	start: {
		type: String,
		default: "09:00"
	},
	end: {
		type: String,
		default: "18:00"
	},
	step: {
		type: String,
		default: DEFAULT_STEP
	},
	minTime: { type: definePropType(String) },
	maxTime: { type: definePropType(String) },
	includeEndTime: Boolean,
	name: String,
	prefixIcon: {
		type: definePropType([String, Object]),
		default: () => Clock
	},
	clearIcon: {
		type: definePropType([String, Object]),
		default: () => CircleClose
	},
	popperClass: {
		type: String,
		default: ""
	},
	popperStyle: { type: definePropType([String, Object]) },
	...useEmptyValuesProps
});

//#endregion
export { DEFAULT_STEP, timeSelectProps };
//# sourceMappingURL=time-select.mjs.map