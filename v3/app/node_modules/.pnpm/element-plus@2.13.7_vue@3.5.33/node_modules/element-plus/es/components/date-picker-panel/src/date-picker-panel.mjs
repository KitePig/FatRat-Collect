import { UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isUndefined as isUndefined$1 } from "../../../utils/types.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { PICKER_BASE_INJECTION_KEY, ROOT_COMMON_PICKER_INJECTION_KEY } from "../../time-picker/src/constants.mjs";
import { useCommonPicker } from "../../time-picker/src/composables/use-common-picker.mjs";
import { datePickerPanelProps } from "./props/date-picker-panel.mjs";
import { ROOT_PICKER_INJECTION_KEY } from "./constants.mjs";
import { getPanel } from "./panel-utils.mjs";
import { omit } from "lodash-unified";
import { createVNode, defineComponent, inject, isVNode, mergeProps, provide, reactive, toRefs } from "vue";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import localeData from "dayjs/plugin/localeData.js";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import weekOfYear from "dayjs/plugin/weekOfYear.js";
import weekYear from "dayjs/plugin/weekYear.js";
import dayOfYear from "dayjs/plugin/dayOfYear.js";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter.js";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";

//#region ../../packages/components/date-picker-panel/src/date-picker-panel.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(dayOfYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
var date_picker_panel_default = /* @__PURE__ */ defineComponent({
	name: "ElDatePickerPanel",
	install: null,
	inheritAttrs: false,
	props: datePickerPanelProps,
	emits: [
		UPDATE_MODEL_EVENT,
		"calendar-change",
		"panel-change",
		"visible-change",
		"clear"
	],
	setup(props, { slots, emit, attrs }) {
		const ns = useNamespace("picker-panel");
		if (isUndefined$1(inject(PICKER_BASE_INJECTION_KEY, void 0))) provide(PICKER_BASE_INJECTION_KEY, { props: reactive({ ...toRefs(props) }) });
		provide(ROOT_PICKER_INJECTION_KEY, {
			slots,
			pickerNs: ns
		});
		const { parsedValue, onCalendarChange, onPanelChange, onSetPickerOption, onPick } = inject(ROOT_COMMON_PICKER_INJECTION_KEY, () => useCommonPicker(props, emit), true);
		return () => {
			return createVNode(getPanel(props.type), mergeProps(omit(attrs, "onPick"), props, {
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
export { date_picker_panel_default as default };
//# sourceMappingURL=date-picker-panel.mjs.map