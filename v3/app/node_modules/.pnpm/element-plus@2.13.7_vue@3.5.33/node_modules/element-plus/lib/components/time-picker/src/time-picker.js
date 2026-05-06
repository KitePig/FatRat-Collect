const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_constants = require('./constants.js');
const require_props = require('./common/props.js');
const require_picker = require('./common/picker.js');
const require_panel_time_pick = require('./time-picker-com/panel-time-pick.js');
const require_panel_time_range = require('./time-picker-com/panel-time-range.js');
let vue = require("vue");
let dayjs = require("dayjs");
dayjs = require_runtime.__toESM(dayjs);
let dayjs_plugin_customParseFormat_js = require("dayjs/plugin/customParseFormat.js");
dayjs_plugin_customParseFormat_js = require_runtime.__toESM(dayjs_plugin_customParseFormat_js);

//#region ../../packages/components/time-picker/src/time-picker.tsx
dayjs.default.extend(dayjs_plugin_customParseFormat_js.default);
var time_picker_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTimePicker",
	install: null,
	props: {
		...require_props.timePickerDefaultProps,
		isRange: Boolean
	},
	emits: [require_event.UPDATE_MODEL_EVENT],
	setup(props, ctx) {
		const commonPicker = (0, vue.ref)();
		const [type, Panel] = props.isRange ? ["timerange", require_panel_time_range.default] : ["time", require_panel_time_pick.default];
		const modelUpdater = (value) => ctx.emit(require_event.UPDATE_MODEL_EVENT, value);
		(0, vue.provide)(require_constants.PICKER_POPPER_OPTIONS_INJECTION_KEY, props.popperOptions);
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
			const format = props.format ?? require_constants.DEFAULT_FORMATS_TIME;
			return (0, vue.createVNode)(require_picker.default, (0, vue.mergeProps)(props, {
				"ref": commonPicker,
				"type": type,
				"format": format,
				"onUpdate:modelValue": modelUpdater
			}), { default: (props) => (0, vue.createVNode)(Panel, props, null) });
		};
	}
});

//#endregion
exports.default = time_picker_default;
//# sourceMappingURL=time-picker.js.map