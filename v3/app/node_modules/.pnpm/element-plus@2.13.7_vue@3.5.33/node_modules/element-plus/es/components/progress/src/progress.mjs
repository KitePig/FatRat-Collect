import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/progress/src/progress.ts
/**
* @deprecated Removed after 3.0.0, Use `ProgressProps` instead.
*/
const progressProps = buildProps({
	type: {
		type: String,
		default: "line",
		values: [
			"line",
			"circle",
			"dashboard"
		]
	},
	percentage: {
		type: Number,
		default: 0,
		validator: (val) => val >= 0 && val <= 100
	},
	status: {
		type: String,
		default: "",
		values: [
			"",
			"success",
			"exception",
			"warning"
		]
	},
	indeterminate: Boolean,
	duration: {
		type: Number,
		default: 3
	},
	strokeWidth: {
		type: Number,
		default: 6
	},
	strokeLinecap: {
		type: definePropType(String),
		default: "round"
	},
	textInside: Boolean,
	width: {
		type: Number,
		default: 126
	},
	showText: {
		type: Boolean,
		default: true
	},
	color: {
		type: definePropType([
			String,
			Array,
			Function
		]),
		default: ""
	},
	striped: Boolean,
	stripedFlow: Boolean,
	format: {
		type: definePropType(Function),
		default: (percentage) => `${percentage}%`
	}
});

//#endregion
export { progressProps };
//# sourceMappingURL=progress.mjs.map