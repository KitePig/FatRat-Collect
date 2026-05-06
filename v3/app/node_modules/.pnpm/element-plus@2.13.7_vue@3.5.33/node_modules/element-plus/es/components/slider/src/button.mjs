import { UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isNumber } from "../../../utils/types.mjs";
import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { placements } from "@popperjs/core";

//#region ../../packages/components/slider/src/button.ts
const sliderButtonProps = buildProps({
	modelValue: {
		type: Number,
		default: 0
	},
	vertical: Boolean,
	tooltipClass: String,
	placement: {
		type: String,
		values: placements,
		default: "top"
	}
});
const sliderButtonEmits = { [UPDATE_MODEL_EVENT]: (value) => isNumber(value) };

//#endregion
export { sliderButtonEmits, sliderButtonProps };
//# sourceMappingURL=button.mjs.map