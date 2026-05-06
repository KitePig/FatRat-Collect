import { UPDATE_MODEL_EVENT } from "../../../../constants/event.mjs";
import Color from "../utils/color.mjs";
import { reactive, watch } from "vue";

//#region ../../packages/components/color-picker-panel/src/composables/use-common-color.ts
const useCommonColor = (props, emit) => {
	const color = reactive(new Color({
		enableAlpha: props.showAlpha,
		format: props.colorFormat || "",
		value: props.modelValue
	}));
	watch(() => [props.colorFormat, props.showAlpha], () => {
		color.enableAlpha = props.showAlpha;
		color.format = props.colorFormat || color.format;
		color.doOnChange();
		emit(UPDATE_MODEL_EVENT, color.value);
	});
	return { color };
};

//#endregion
export { useCommonColor };
//# sourceMappingURL=use-common-color.mjs.map