const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../../constants/aria.js');
const require_event = require('../../../../utils/dom/event.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../../hooks/use-namespace/index.js');
const require_constants = require('../constants.js');
const require_use_time_panel = require('../composables/use-time-panel.js');
const require_use_time_picker = require('../composables/use-time-picker.js');
const require_basic_time_spinner = require('./basic-time-spinner.js');
const require_panel_time_range = require('../props/panel-time-range.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let dayjs = require("dayjs");
dayjs = require_runtime.__toESM(dayjs);
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/time-picker/src/time-picker-com/panel-time-range.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["disabled"];
var panel_time_range_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	__name: "panel-time-range",
	props: require_panel_time_range.panelTimeRangeProps,
	emits: [
		"pick",
		"select-range",
		"set-picker-option"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const makeSelectRange = (start, end) => {
			const result = [];
			for (let i = start; i <= end; i++) result.push(i);
			return result;
		};
		const { t, lang } = require_index.useLocale();
		const nsTime = require_index$1.useNamespace("time");
		const nsPicker = require_index$1.useNamespace("picker");
		const pickerBase = (0, vue.inject)(require_constants.PICKER_BASE_INJECTION_KEY);
		const { arrowControl, disabledHours, disabledMinutes, disabledSeconds, defaultValue } = pickerBase.props;
		const startContainerKls = (0, vue.computed)(() => [
			nsTime.be("range-picker", "body"),
			nsTime.be("panel", "content"),
			nsTime.is("arrow", arrowControl),
			showSeconds.value ? "has-seconds" : ""
		]);
		const endContainerKls = (0, vue.computed)(() => [
			nsTime.be("range-picker", "body"),
			nsTime.be("panel", "content"),
			nsTime.is("arrow", arrowControl),
			showSeconds.value ? "has-seconds" : ""
		]);
		const startTime = (0, vue.computed)(() => props.parsedValue[0]);
		const endTime = (0, vue.computed)(() => props.parsedValue[1]);
		const oldValue = require_use_time_picker.useOldValue(props, {
			modelValue: (0, vue.computed)(() => pickerBase.props.modelValue),
			valueOnClear: (0, vue.computed)(() => pickerBase?.emptyValues ? pickerBase.emptyValues.valueOnClear.value : null)
		});
		const handleCancel = () => {
			const old = oldValue.value;
			emit("pick", old, false);
			(0, vue.nextTick)(() => {
				oldValue.value = old;
			});
		};
		const showSeconds = (0, vue.computed)(() => {
			return props.format.includes("ss");
		});
		const amPmMode = (0, vue.computed)(() => {
			if (props.format.includes("A")) return "A";
			if (props.format.includes("a")) return "a";
			return "";
		});
		const handleConfirm = (visible = false) => {
			emit("pick", [startTime.value, endTime.value], visible);
		};
		const handleMinChange = (date) => {
			handleChange(date.millisecond(0), endTime.value);
		};
		const handleMaxChange = (date) => {
			handleChange(startTime.value, date.millisecond(0));
		};
		const isValidValue = (_date) => {
			const parsedDate = _date.map((_) => (0, dayjs.default)(_).locale(lang.value));
			const result = getRangeAvailableTime(parsedDate);
			return parsedDate[0].isSame(result[0]) && parsedDate[1].isSame(result[1]);
		};
		const handleChange = (start, end) => {
			if (!props.visible) return;
			emit("pick", [start, end], true);
		};
		const btnConfirmDisabled = (0, vue.computed)(() => {
			return startTime.value > endTime.value;
		});
		const selectionRange = (0, vue.ref)([0, 2]);
		const setMinSelectionRange = (start, end) => {
			emit("select-range", start, end, "min");
			selectionRange.value = [start, end];
		};
		const offset = (0, vue.computed)(() => showSeconds.value ? 11 : 8);
		const setMaxSelectionRange = (start, end) => {
			emit("select-range", start, end, "max");
			const _offset = (0, vue.unref)(offset);
			selectionRange.value = [start + _offset, end + _offset];
		};
		const changeSelectionRange = (step) => {
			const list = showSeconds.value ? [
				0,
				3,
				6,
				11,
				14,
				17
			] : [
				0,
				3,
				8,
				11
			];
			const mapping = ["hours", "minutes"].concat(showSeconds.value ? ["seconds"] : []);
			const next = (list.indexOf(selectionRange.value[0]) + step + list.length) % list.length;
			const half = list.length / 2;
			if (next < half) timePickerOptions["start_emitSelectRange"](mapping[next]);
			else timePickerOptions["end_emitSelectRange"](mapping[next - half]);
		};
		const handleKeydown = (event) => {
			const code = require_event.getEventCode(event);
			const { left, right, up, down } = require_aria.EVENT_CODE;
			if ([left, right].includes(code)) {
				changeSelectionRange(code === left ? -1 : 1);
				event.preventDefault();
				return;
			}
			if ([up, down].includes(code)) {
				const step = code === up ? -1 : 1;
				timePickerOptions[`${selectionRange.value[0] < offset.value ? "start" : "end"}_scrollDown`](step);
				event.preventDefault();
				return;
			}
		};
		const disabledHours_ = (role, compare) => {
			const defaultDisable = disabledHours ? disabledHours(role) : [];
			const isStart = role === "start";
			const compareHour = (compare || (isStart ? endTime.value : startTime.value)).hour();
			return (0, lodash_unified.union)(defaultDisable, isStart ? makeSelectRange(compareHour + 1, 23) : makeSelectRange(0, compareHour - 1));
		};
		const disabledMinutes_ = (hour, role, compare) => {
			const defaultDisable = disabledMinutes ? disabledMinutes(hour, role) : [];
			const isStart = role === "start";
			const compareDate = compare || (isStart ? endTime.value : startTime.value);
			if (hour !== compareDate.hour()) return defaultDisable;
			const compareMinute = compareDate.minute();
			return (0, lodash_unified.union)(defaultDisable, isStart ? makeSelectRange(compareMinute + 1, 59) : makeSelectRange(0, compareMinute - 1));
		};
		const disabledSeconds_ = (hour, minute, role, compare) => {
			const defaultDisable = disabledSeconds ? disabledSeconds(hour, minute, role) : [];
			const isStart = role === "start";
			const compareDate = compare || (isStart ? endTime.value : startTime.value);
			const compareHour = compareDate.hour();
			const compareMinute = compareDate.minute();
			if (hour !== compareHour || minute !== compareMinute) return defaultDisable;
			const compareSecond = compareDate.second();
			return (0, lodash_unified.union)(defaultDisable, isStart ? makeSelectRange(compareSecond + 1, 59) : makeSelectRange(0, compareSecond - 1));
		};
		const getRangeAvailableTime = ([start, end]) => {
			return [getAvailableTime(start, "start", true, end), getAvailableTime(end, "end", false, start)];
		};
		const { getAvailableHours, getAvailableMinutes, getAvailableSeconds } = require_use_time_picker.buildAvailableTimeSlotGetter(disabledHours_, disabledMinutes_, disabledSeconds_);
		const { timePickerOptions, getAvailableTime, onSetOption } = require_use_time_panel.useTimePanel({
			getAvailableHours,
			getAvailableMinutes,
			getAvailableSeconds
		});
		const parseUserInput = (days) => {
			if (!days) return null;
			if ((0, _vue_shared.isArray)(days)) return days.map((d) => (0, dayjs.default)(d, props.format).locale(lang.value));
			return (0, dayjs.default)(days, props.format).locale(lang.value);
		};
		const getDefaultValue = () => {
			if ((0, _vue_shared.isArray)(defaultValue)) return defaultValue.map((d) => (0, dayjs.default)(d).locale(lang.value));
			const defaultDay = (0, dayjs.default)(defaultValue).locale(lang.value);
			return [defaultDay, defaultDay.add(60, "m")];
		};
		emit("set-picker-option", ["parseUserInput", parseUserInput]);
		emit("set-picker-option", ["isValidValue", isValidValue]);
		emit("set-picker-option", ["handleKeydownInput", handleKeydown]);
		emit("set-picker-option", ["getDefaultValue", getDefaultValue]);
		emit("set-picker-option", ["getRangeAvailableTime", getRangeAvailableTime]);
		emit("set-picker-option", ["handleCancel", handleCancel]);
		return (_ctx, _cache) => {
			return _ctx.actualVisible ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 0,
				class: (0, vue.normalizeClass)([(0, vue.unref)(nsTime).b("range-picker"), (0, vue.unref)(nsPicker).b("panel")])
			}, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(nsTime).be("range-picker", "content")) }, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(nsTime).be("range-picker", "cell")) }, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(nsTime).be("range-picker", "header")) }, (0, vue.toDisplayString)((0, vue.unref)(t)("el.datepicker.startTime")), 3), (0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)(startContainerKls.value) }, [(0, vue.createVNode)(require_basic_time_spinner.default, {
				ref: "minSpinner",
				role: "start",
				"show-seconds": showSeconds.value,
				"am-pm-mode": amPmMode.value,
				"arrow-control": (0, vue.unref)(arrowControl),
				"spinner-date": startTime.value,
				"disabled-hours": disabledHours_,
				"disabled-minutes": disabledMinutes_,
				"disabled-seconds": disabledSeconds_,
				onChange: handleMinChange,
				onSetOption: (0, vue.unref)(onSetOption),
				onSelectRange: setMinSelectionRange
			}, null, 8, [
				"show-seconds",
				"am-pm-mode",
				"arrow-control",
				"spinner-date",
				"onSetOption"
			])], 2)], 2), (0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(nsTime).be("range-picker", "cell")) }, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(nsTime).be("range-picker", "header")) }, (0, vue.toDisplayString)((0, vue.unref)(t)("el.datepicker.endTime")), 3), (0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)(endContainerKls.value) }, [(0, vue.createVNode)(require_basic_time_spinner.default, {
				ref: "maxSpinner",
				role: "end",
				"show-seconds": showSeconds.value,
				"am-pm-mode": amPmMode.value,
				"arrow-control": (0, vue.unref)(arrowControl),
				"spinner-date": endTime.value,
				"disabled-hours": disabledHours_,
				"disabled-minutes": disabledMinutes_,
				"disabled-seconds": disabledSeconds_,
				onChange: handleMaxChange,
				onSetOption: (0, vue.unref)(onSetOption),
				onSelectRange: setMaxSelectionRange
			}, null, 8, [
				"show-seconds",
				"am-pm-mode",
				"arrow-control",
				"spinner-date",
				"onSetOption"
			])], 2)], 2)], 2), (0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(nsTime).be("panel", "footer")) }, [(0, vue.createElementVNode)("button", {
				type: "button",
				class: (0, vue.normalizeClass)([(0, vue.unref)(nsTime).be("panel", "btn"), "cancel"]),
				onClick: _cache[0] || (_cache[0] = ($event) => handleCancel())
			}, (0, vue.toDisplayString)((0, vue.unref)(t)("el.datepicker.cancel")), 3), (0, vue.createElementVNode)("button", {
				type: "button",
				class: (0, vue.normalizeClass)([(0, vue.unref)(nsTime).be("panel", "btn"), "confirm"]),
				disabled: btnConfirmDisabled.value,
				onClick: _cache[1] || (_cache[1] = ($event) => handleConfirm())
			}, (0, vue.toDisplayString)((0, vue.unref)(t)("el.datepicker.confirm")), 11, _hoisted_1)], 2)], 2)) : (0, vue.createCommentVNode)("v-if", true);
		};
	}
});

//#endregion
exports.default = panel_time_range_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=panel-time-range.vue_vue_type_script_setup_true_lang.js.map