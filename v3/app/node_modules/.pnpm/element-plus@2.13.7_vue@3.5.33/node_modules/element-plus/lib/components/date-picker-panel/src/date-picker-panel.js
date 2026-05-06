const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_constants = require('../../time-picker/src/constants.js');
const require_use_common_picker = require('../../time-picker/src/composables/use-common-picker.js');
const require_date_picker_panel = require('./props/date-picker-panel.js');
const require_constants$1 = require('./constants.js');
const require_panel_utils = require('./panel-utils.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let dayjs = require("dayjs");
dayjs = require_runtime.__toESM(dayjs);
let dayjs_plugin_customParseFormat_js = require("dayjs/plugin/customParseFormat.js");
dayjs_plugin_customParseFormat_js = require_runtime.__toESM(dayjs_plugin_customParseFormat_js);
let dayjs_plugin_localeData_js = require("dayjs/plugin/localeData.js");
dayjs_plugin_localeData_js = require_runtime.__toESM(dayjs_plugin_localeData_js);
let dayjs_plugin_advancedFormat_js = require("dayjs/plugin/advancedFormat.js");
dayjs_plugin_advancedFormat_js = require_runtime.__toESM(dayjs_plugin_advancedFormat_js);
let dayjs_plugin_weekOfYear_js = require("dayjs/plugin/weekOfYear.js");
dayjs_plugin_weekOfYear_js = require_runtime.__toESM(dayjs_plugin_weekOfYear_js);
let dayjs_plugin_weekYear_js = require("dayjs/plugin/weekYear.js");
dayjs_plugin_weekYear_js = require_runtime.__toESM(dayjs_plugin_weekYear_js);
let dayjs_plugin_dayOfYear_js = require("dayjs/plugin/dayOfYear.js");
dayjs_plugin_dayOfYear_js = require_runtime.__toESM(dayjs_plugin_dayOfYear_js);
let dayjs_plugin_isSameOrAfter_js = require("dayjs/plugin/isSameOrAfter.js");
dayjs_plugin_isSameOrAfter_js = require_runtime.__toESM(dayjs_plugin_isSameOrAfter_js);
let dayjs_plugin_isSameOrBefore_js = require("dayjs/plugin/isSameOrBefore.js");
dayjs_plugin_isSameOrBefore_js = require_runtime.__toESM(dayjs_plugin_isSameOrBefore_js);

//#region ../../packages/components/date-picker-panel/src/date-picker-panel.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !(0, vue.isVNode)(s);
}
dayjs.default.extend(dayjs_plugin_localeData_js.default);
dayjs.default.extend(dayjs_plugin_advancedFormat_js.default);
dayjs.default.extend(dayjs_plugin_customParseFormat_js.default);
dayjs.default.extend(dayjs_plugin_weekOfYear_js.default);
dayjs.default.extend(dayjs_plugin_weekYear_js.default);
dayjs.default.extend(dayjs_plugin_dayOfYear_js.default);
dayjs.default.extend(dayjs_plugin_isSameOrAfter_js.default);
dayjs.default.extend(dayjs_plugin_isSameOrBefore_js.default);
var date_picker_panel_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElDatePickerPanel",
	install: null,
	inheritAttrs: false,
	props: require_date_picker_panel.datePickerPanelProps,
	emits: [
		require_event.UPDATE_MODEL_EVENT,
		"calendar-change",
		"panel-change",
		"visible-change",
		"clear"
	],
	setup(props, { slots, emit, attrs }) {
		const ns = require_index.useNamespace("picker-panel");
		if (require_types.isUndefined((0, vue.inject)(require_constants.PICKER_BASE_INJECTION_KEY, void 0))) (0, vue.provide)(require_constants.PICKER_BASE_INJECTION_KEY, { props: (0, vue.reactive)({ ...(0, vue.toRefs)(props) }) });
		(0, vue.provide)(require_constants$1.ROOT_PICKER_INJECTION_KEY, {
			slots,
			pickerNs: ns
		});
		const { parsedValue, onCalendarChange, onPanelChange, onSetPickerOption, onPick } = (0, vue.inject)(require_constants.ROOT_COMMON_PICKER_INJECTION_KEY, () => require_use_common_picker.useCommonPicker(props, emit), true);
		return () => {
			return (0, vue.createVNode)(require_panel_utils.getPanel(props.type), (0, vue.mergeProps)((0, lodash_unified.omit)(attrs, "onPick"), props, {
				"parsedValue": parsedValue.value,
				"onSet-picker-option": onSetPickerOption,
				"onCalendar-change": onCalendarChange,
				"onPanel-change": onPanelChange,
				"onClear": () => emit("clear"),
				"onPick": onPick
			}), _isSlot(slots) ? slots : { default: () => [slots] });
		};
	}
});

//#endregion
exports.default = date_picker_panel_default;
//# sourceMappingURL=date-picker-panel.js.map