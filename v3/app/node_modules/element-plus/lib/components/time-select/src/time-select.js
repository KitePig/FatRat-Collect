Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_index = require('../../../hooks/use-size/index.js');
const require_index$1 = require('../../../hooks/use-empty-values/index.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");

//#region ../../packages/components/time-select/src/time-select.ts
const DEFAULT_STEP = "00:30";
/**
* @deprecated Removed after 3.0.0, Use `TimeSelectProps` instead.
*/
const timeSelectProps = require_runtime$1.buildProps({
	format: {
		type: String,
		default: "HH:mm"
	},
	modelValue: { type: require_runtime$1.definePropType(String) },
	disabled: {
		type: Boolean,
		default: void 0
	},
	editable: {
		type: Boolean,
		default: true
	},
	effect: {
		type: require_runtime$1.definePropType(String),
		default: "light"
	},
	clearable: {
		type: Boolean,
		default: true
	},
	size: require_index.useSizeProp,
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
	minTime: { type: require_runtime$1.definePropType(String) },
	maxTime: { type: require_runtime$1.definePropType(String) },
	includeEndTime: Boolean,
	name: String,
	prefixIcon: {
		type: require_runtime$1.definePropType([String, Object]),
		default: () => _element_plus_icons_vue.Clock
	},
	clearIcon: {
		type: require_runtime$1.definePropType([String, Object]),
		default: () => _element_plus_icons_vue.CircleClose
	},
	popperClass: {
		type: String,
		default: ""
	},
	popperStyle: { type: require_runtime$1.definePropType([String, Object]) },
	...require_index$1.useEmptyValuesProps
});

//#endregion
exports.DEFAULT_STEP = DEFAULT_STEP;
exports.timeSelectProps = timeSelectProps;
//# sourceMappingURL=time-select.js.map