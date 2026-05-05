Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../../constants/event.js');
const require_color = require('../utils/color.js');
let vue = require("vue");

//#region ../../packages/components/color-picker-panel/src/composables/use-common-color.ts
const useCommonColor = (props, emit) => {
	const color = (0, vue.reactive)(new require_color.default({
		enableAlpha: props.showAlpha,
		format: props.colorFormat || "",
		value: props.modelValue
	}));
	(0, vue.watch)(() => [props.colorFormat, props.showAlpha], () => {
		color.enableAlpha = props.showAlpha;
		color.format = props.colorFormat || color.format;
		color.doOnChange();
		emit(require_event.UPDATE_MODEL_EVENT, color.value);
	});
	return { color };
};

//#endregion
exports.useCommonColor = useCommonColor;
//# sourceMappingURL=use-common-color.js.map