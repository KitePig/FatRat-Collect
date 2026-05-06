Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/progress/src/progress.ts
/**
* @deprecated Removed after 3.0.0, Use `ProgressProps` instead.
*/
const progressProps = require_runtime.buildProps({
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
		type: require_runtime.definePropType(String),
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
		type: require_runtime.definePropType([
			String,
			Array,
			Function
		]),
		default: ""
	},
	striped: Boolean,
	stripedFlow: Boolean,
	format: {
		type: require_runtime.definePropType(Function),
		default: (percentage) => `${percentage}%`
	}
});

//#endregion
exports.progressProps = progressProps;
//# sourceMappingURL=progress.js.map