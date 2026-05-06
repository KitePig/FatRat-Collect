const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../../constants/aria.js');
const require_event = require('../../../../utils/dom/event.js');
const require_types = require('../../../../utils/types.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../../hooks/use-namespace/index.js');
const require_constants = require('../constants.js');
const require_panel_time_picker = require('../props/panel-time-picker.js');
const require_use_time_panel = require('../composables/use-time-panel.js');
const require_use_time_picker = require('../composables/use-time-picker.js');
const require_basic_time_spinner = require('./basic-time-spinner.js');
let vue = require("vue");
let dayjs = require("dayjs");
dayjs = require_runtime.__toESM(dayjs);

//#region ../../packages/components/time-picker/src/time-picker-com/panel-time-pick.vue?vue&type=script&setup=true&lang.ts
var panel_time_pick_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	__name: "panel-time-pick",
	props: require_panel_time_picker.panelTimePickerProps,
	emits: [
		"pick",
		"select-range",
		"set-picker-option"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const pickerBase = (0, vue.inject)(require_constants.PICKER_BASE_INJECTION_KEY);
		const { arrowControl, disabledHours, disabledMinutes, disabledSeconds, defaultValue } = pickerBase.props;
		const { getAvailableHours, getAvailableMinutes, getAvailableSeconds } = require_use_time_picker.buildAvailableTimeSlotGetter(disabledHours, disabledMinutes, disabledSeconds);
		const ns = require_index$1.useNamespace("time");
		const { t, lang } = require_index.useLocale();
		const selectionRange = (0, vue.ref)([0, 2]);
		const oldValue = require_use_time_picker.useOldValue(props, {
			modelValue: (0, vue.computed)(() => pickerBase.props.modelValue),
			valueOnClear: (0, vue.computed)(() => pickerBase?.emptyValues ? pickerBase.emptyValues.valueOnClear.value : null)
		});
		const transitionName = (0, vue.computed)(() => {
			return require_types.isUndefined(props.actualVisible) ? `${ns.namespace.value}-zoom-in-top` : "";
		});
		const showSeconds = (0, vue.computed)(() => {
			return props.format.includes("ss");
		});
		const amPmMode = (0, vue.computed)(() => {
			if (props.format.includes("A")) return "A";
			if (props.format.includes("a")) return "a";
			return "";
		});
		const isValidValue = (_date) => {
			const parsedDate = (0, dayjs.default)(_date).locale(lang.value);
			const result = getRangeAvailableTime(parsedDate);
			return parsedDate.isSame(result);
		};
		const handleCancel = () => {
			const old = oldValue.value;
			emit("pick", old, false);
			(0, vue.nextTick)(() => {
				oldValue.value = old;
			});
		};
		const handleConfirm = (visible = false, first = false) => {
			if (first) return;
			emit("pick", props.parsedValue, visible);
		};
		const handleChange = (_date) => {
			if (!props.visible) return;
			emit("pick", getRangeAvailableTime(_date).millisecond(0), true);
		};
		const setSelectionRange = (start, end) => {
			emit("select-range", start, end);
			selectionRange.value = [start, end];
		};
		const changeSelectionRange = (step) => {
			const actualFormat = props.format;
			const hourIndex = actualFormat.indexOf("HH");
			const minuteIndex = actualFormat.indexOf("mm");
			const secondIndex = actualFormat.indexOf("ss");
			const list = [];
			const mapping = [];
			if (hourIndex !== -1) {
				list.push(hourIndex);
				mapping.push("hours");
			}
			if (minuteIndex !== -1) {
				list.push(minuteIndex);
				mapping.push("minutes");
			}
			if (secondIndex !== -1 && showSeconds.value) {
				list.push(secondIndex);
				mapping.push("seconds");
			}
			const next = (list.indexOf(selectionRange.value[0]) + step + list.length) % list.length;
			timePickerOptions["start_emitSelectRange"](mapping[next]);
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
				timePickerOptions["start_scrollDown"](step);
				event.preventDefault();
				return;
			}
		};
		const { timePickerOptions, onSetOption, getAvailableTime } = require_use_time_panel.useTimePanel({
			getAvailableHours,
			getAvailableMinutes,
			getAvailableSeconds
		});
		const getRangeAvailableTime = (date) => {
			return getAvailableTime(date, props.datetimeRole || "", true);
		};
		const parseUserInput = (value) => {
			if (!value) return null;
			return (0, dayjs.default)(value, props.format).locale(lang.value);
		};
		const getDefaultValue = () => {
			return (0, dayjs.default)(defaultValue).locale(lang.value);
		};
		emit("set-picker-option", ["isValidValue", isValidValue]);
		emit("set-picker-option", ["parseUserInput", parseUserInput]);
		emit("set-picker-option", ["handleKeydownInput", handleKeydown]);
		emit("set-picker-option", ["getRangeAvailableTime", getRangeAvailableTime]);
		emit("set-picker-option", ["getDefaultValue", getDefaultValue]);
		emit("set-picker-option", ["handleCancel", handleCancel]);
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)(vue.Transition, { name: transitionName.value }, {
				default: (0, vue.withCtx)(() => [_ctx.actualVisible || _ctx.visible ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).b("panel"))
				}, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).be("panel", "content"), { "has-seconds": showSeconds.value }]) }, [(0, vue.createVNode)(require_basic_time_spinner.default, {
					ref: "spinner",
					role: _ctx.datetimeRole || "start",
					"arrow-control": (0, vue.unref)(arrowControl),
					"show-seconds": showSeconds.value,
					"am-pm-mode": amPmMode.value,
					"spinner-date": _ctx.parsedValue,
					"disabled-hours": (0, vue.unref)(disabledHours),
					"disabled-minutes": (0, vue.unref)(disabledMinutes),
					"disabled-seconds": (0, vue.unref)(disabledSeconds),
					onChange: handleChange,
					onSetOption: (0, vue.unref)(onSetOption),
					onSelectRange: setSelectionRange
				}, null, 8, [
					"role",
					"arrow-control",
					"show-seconds",
					"am-pm-mode",
					"spinner-date",
					"disabled-hours",
					"disabled-minutes",
					"disabled-seconds",
					"onSetOption"
				])], 2), (0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("panel", "footer")) }, [(0, vue.createElementVNode)("button", {
					type: "button",
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).be("panel", "btn"), "cancel"]),
					onClick: handleCancel
				}, (0, vue.toDisplayString)((0, vue.unref)(t)("el.datepicker.cancel")), 3), (0, vue.createElementVNode)("button", {
					type: "button",
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).be("panel", "btn"), "confirm"]),
					onClick: _cache[0] || (_cache[0] = ($event) => handleConfirm())
				}, (0, vue.toDisplayString)((0, vue.unref)(t)("el.datepicker.confirm")), 3)], 2)], 2)) : (0, vue.createCommentVNode)("v-if", true)]),
				_: 1
			}, 8, ["name"]);
		};
	}
});

//#endregion
exports.default = panel_time_pick_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=panel-time-pick.vue_vue_type_script_setup_true_lang.js.map