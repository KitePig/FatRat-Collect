const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_constants = require('../../time-picker/src/constants.js');
const require_picker = require('../../time-picker/src/common/picker.js');
const require_constants$1 = require('../../date-picker-panel/src/constants.js');
const require_index = require('../../date-picker-panel/index.js');
const require_props = require('./props.js');
let vue = require("vue");

//#region ../../packages/components/date-picker/src/date-picker.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !(0, vue.isVNode)(s);
}
var date_picker_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElDatePicker",
	install: null,
	props: require_props.datePickerProps,
	emits: [require_event.UPDATE_MODEL_EVENT],
	setup(props, { expose, emit, slots }) {
		(0, vue.provide)(require_constants$1.ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY, (0, vue.computed)(() => {
			return !props.format;
		}));
		(0, vue.provide)(require_constants.PICKER_POPPER_OPTIONS_INJECTION_KEY, (0, vue.reactive)((0, vue.toRef)(props, "popperOptions")));
		const commonPicker = (0, vue.ref)();
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
			emit(require_event.UPDATE_MODEL_EVENT, val);
		};
		return () => {
			const format = props.format ?? (require_constants.DEFAULT_FORMATS_DATEPICKER[props.type] || require_constants.DEFAULT_FORMATS_DATE);
			return (0, vue.createVNode)(require_picker.default, (0, vue.mergeProps)(props, {
				"format": format,
				"type": props.type,
				"ref": commonPicker,
				"onUpdate:modelValue": onModelValueUpdated
			}), {
				default: (scopedProps) => (0, vue.createVNode)(require_index.ElDatePickerPanel, (0, vue.mergeProps)({
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
exports.default = date_picker_default;
//# sourceMappingURL=date-picker.js.map