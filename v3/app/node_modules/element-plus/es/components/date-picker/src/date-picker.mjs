import { UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { DEFAULT_FORMATS_DATE, DEFAULT_FORMATS_DATEPICKER, PICKER_POPPER_OPTIONS_INJECTION_KEY } from "../../time-picker/src/constants.mjs";
import picker_default from "../../time-picker/src/common/picker.mjs";
import { ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY } from "../../date-picker-panel/src/constants.mjs";
import { ElDatePickerPanel } from "../../date-picker-panel/index.mjs";
import { datePickerProps } from "./props.mjs";
import { computed, createVNode, defineComponent, isVNode, mergeProps, provide, reactive, ref, toRef } from "vue";

//#region ../../packages/components/date-picker/src/date-picker.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var date_picker_default = /* @__PURE__ */ defineComponent({
	name: "ElDatePicker",
	install: null,
	props: datePickerProps,
	emits: [UPDATE_MODEL_EVENT],
	setup(props, { expose, emit, slots }) {
		provide(ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY, computed(() => {
			return !props.format;
		}));
		provide(PICKER_POPPER_OPTIONS_INJECTION_KEY, reactive(toRef(props, "popperOptions")));
		const commonPicker = ref();
		expose({
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
		const onModelValueUpdated = (val) => {
			emit(UPDATE_MODEL_EVENT, val);
		};
		return () => {
			const format = props.format ?? (DEFAULT_FORMATS_DATEPICKER[props.type] || DEFAULT_FORMATS_DATE);
			return createVNode(picker_default, mergeProps(props, {
				"format": format,
				"type": props.type,
				"ref": commonPicker,
				"onUpdate:modelValue": onModelValueUpdated
			}), {
				default: (scopedProps) => createVNode(ElDatePickerPanel, mergeProps({
					"disabled": props.disabled,
					"editable": props.editable,
					"border": false
				}, scopedProps), _isSlot(slots) ? slots : { default: () => [slots] }),
				"range-separator": slots["range-separator"]
			});
		};
	}
});

//#endregion
export { date_picker_default as default };
//# sourceMappingURL=date-picker.mjs.map