Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
let _popperjs_core = require("@popperjs/core");

//#region ../../packages/components/slider/src/button.ts
const sliderButtonProps = require_runtime$1.buildProps({
	modelValue: {
		type: Number,
		default: 0
	},
	vertical: Boolean,
	tooltipClass: String,
	placement: {
		type: String,
		values: _popperjs_core.placements,
		default: "top"
	}
});
const sliderButtonEmits = { [require_event.UPDATE_MODEL_EVENT]: (value) => require_types.isNumber(value) };

//#endregion
exports.sliderButtonEmits = sliderButtonEmits;
exports.sliderButtonProps = sliderButtonProps;
//# sourceMappingURL=button.js.map