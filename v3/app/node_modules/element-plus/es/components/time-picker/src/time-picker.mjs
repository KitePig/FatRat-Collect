import { UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { DEFAULT_FORMATS_TIME, PICKER_POPPER_OPTIONS_INJECTION_KEY } from "./constants.mjs";
import { timePickerDefaultProps } from "./common/props.mjs";
import picker_default from "./common/picker.mjs";
import panel_time_pick_default from "./time-picker-com/panel-time-pick.mjs";
import panel_time_range_default from "./time-picker-com/panel-time-range.mjs";
import { createVNode, defineComponent, mergeProps, provide, ref } from "vue";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

//#region ../../packages/components/time-picker/src/time-picker.tsx
dayjs.extend(customParseFormat);
var time_picker_default = /* @__PURE__ */ defineComponent({
	name: "ElTimePicker",
	install: null,
	props: {
		...timePickerDefaultProps,
		isRange: Boolean
	},
	emits: [UPDATE_MODEL_EVENT],
	setup(props, ctx) {
		const commonPicker = ref();
		const [type, Panel] = props.isRange ? ["timerange", panel_time_range_default] : ["time", panel_time_pick_default];
		const modelUpdater = (value) => ctx.emit(UPDATE_MODEL_EVENT, value);
		provide(PICKER_POPPER_OPTIONS_INJECTION_KEY, props.popperOptions);
		ctx.expose({
			focus: () => {
				commonPicker.value?.focus();
			},
			blur: () => {
				commonPicker.value?.blur();
			},
			handleOpen: () => {
				commonPicker.value?.handleOpen();
			},
			handleClose: () => {
				commonPicker.value?.handleClose();
			}
		});
		return () => {
			const format = props.format ?? DEFAULT_FORMATS_TIME;
			return createVNode(picker_default, mergeProps(props, {
				"ref": commonPicker,
				"type": type,
				"format": format,
				"onUpdate:modelValue": modelUpdater
			}), { default: (props) => createVNode(Panel, props, null) });
		};
	}
});

//#endregion
export { time_picker_default as default };
//# sourceMappingURL=time-picker.mjs.map