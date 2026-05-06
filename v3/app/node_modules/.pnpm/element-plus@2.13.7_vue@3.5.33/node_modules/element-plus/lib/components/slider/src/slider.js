Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_index = require('../../../hooks/use-size/index.js');
const require_index$1 = require('../../../hooks/use-aria/index.js');
let _popperjs_core = require("@popperjs/core");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/slider/src/slider.ts
const sliderProps = require_runtime$1.buildProps({
	modelValue: {
		type: require_runtime$1.definePropType([Number, Array]),
		default: 0
	},
	id: {
		type: String,
		default: void 0
	},
	min: {
		type: Number,
		default: 0
	},
	max: {
		type: Number,
		default: 100
	},
	step: {
		type: require_runtime$1.definePropType([Number, String]),
		default: 1
	},
	showInput: Boolean,
	showInputControls: {
		type: Boolean,
		default: true
	},
	size: require_index.useSizeProp,
	inputSize: require_index.useSizeProp,
	showStops: Boolean,
	showTooltip: {
		type: Boolean,
		default: true
	},
	formatTooltip: {
		type: require_runtime$1.definePropType(Function),
		default: void 0
	},
	disabled: {
		type: Boolean,
		default: void 0
	},
	range: Boolean,
	vertical: Boolean,
	height: String,
	rangeStartLabel: {
		type: String,
		default: void 0
	},
	rangeEndLabel: {
		type: String,
		default: void 0
	},
	formatValueText: {
		type: require_runtime$1.definePropType(Function),
		default: void 0
	},
	tooltipClass: {
		type: String,
		default: void 0
	},
	placement: {
		type: String,
		values: _popperjs_core.placements,
		default: "top"
	},
	marks: { type: require_runtime$1.definePropType(Object) },
	validateEvent: {
		type: Boolean,
		default: true
	},
	persistent: {
		type: Boolean,
		default: true
	},
	...require_index$1.useAriaProps(["ariaLabel"])
});
const isValidValue = (value) => require_types.isNumber(value) || (0, _vue_shared.isArray)(value) && value.every(require_types.isNumber);
const sliderEmits = {
	[require_event.UPDATE_MODEL_EVENT]: isValidValue,
	[require_event.INPUT_EVENT]: isValidValue,
	[require_event.CHANGE_EVENT]: isValidValue
};

//#endregion
exports.sliderEmits = sliderEmits;
exports.sliderProps = sliderProps;
//# sourceMappingURL=slider.js.map