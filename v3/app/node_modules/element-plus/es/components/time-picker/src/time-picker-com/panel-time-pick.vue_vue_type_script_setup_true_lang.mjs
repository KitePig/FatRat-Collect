import { EVENT_CODE } from "../../../../constants/aria.mjs";
import { getEventCode } from "../../../../utils/dom/event.mjs";
import { isUndefined } from "../../../../utils/types.mjs";
import { useLocale } from "../../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { PICKER_BASE_INJECTION_KEY } from "../constants.mjs";
import { panelTimePickerProps } from "../props/panel-time-picker.mjs";
import { useTimePanel } from "../composables/use-time-panel.mjs";
import { buildAvailableTimeSlotGetter, useOldValue } from "../composables/use-time-picker.mjs";
import basic_time_spinner_default from "./basic-time-spinner.mjs";
import { Transition, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, inject, nextTick, normalizeClass, openBlock, ref, toDisplayString, unref, withCtx } from "vue";
import dayjs from "dayjs";

//#region ../../packages/components/time-picker/src/time-picker-com/panel-time-pick.vue?vue&type=script&setup=true&lang.ts
var panel_time_pick_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "panel-time-pick",
	props: panelTimePickerProps,
	emits: [
		"pick",
		"select-range",
		"set-picker-option"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const pickerBase = inject(PICKER_BASE_INJECTION_KEY);
		const { arrowControl, disabledHours, disabledMinutes, disabledSeconds, defaultValue } = pickerBase.props;
		const { getAvailableHours, getAvailableMinutes, getAvailableSeconds } = buildAvailableTimeSlotGetter(disabledHours, disabledMinutes, disabledSeconds);
		const ns = useNamespace("time");
		const { t, lang } = useLocale();
		const selectionRange = ref([0, 2]);
		const oldValue = useOldValue(props, {
			modelValue: computed(() => pickerBase.props.modelValue),
			valueOnClear: computed(() => pickerBase?.emptyValues ? pickerBase.emptyValues.valueOnClear.value : null)
		});
		const transitionName = computed(() => {
			return isUndefined(props.actualVisible) ? `${ns.namespace.value}-zoom-in-top` : "";
		});
		const showSeconds = computed(() => {
			return props.format.includes("ss");
		});
		const amPmMode = computed(() => {
			if (props.format.includes("A")) return "A";
			if (props.format.includes("a")) return "a";
			return "";
		});
		const isValidValue = (_date) => {
			const parsedDate = dayjs(_date).locale(lang.value);
			const result = getRangeAvailableTime(parsedDate);
			return parsedDate.isSame(result);
		};
		const handleCancel = () => {
			const old = oldValue.value;
			emit("pick", old, false);
			nextTick(() => {
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
			const code = getEventCode(event);
			const { left, right, up, down } = EVENT_CODE;
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
		const { timePickerOptions, onSetOption, getAvailableTime } = useTimePanel({
			getAvailableHours,
			getAvailableMinutes,
			getAvailableSeconds
		});
		const getRangeAvailableTime = (date) => {
			return getAvailableTime(date, props.datetimeRole || "", true);
		};
		const parseUserInput = (value) => {
			if (!value) return null;
			return dayjs(value, props.format).locale(lang.value);
		};
		const getDefaultValue = () => {
			return dayjs(defaultValue).locale(lang.value);
		};
		emit("set-picker-option", ["isValidValue", isValidValue]);
		emit("set-picker-option", ["parseUserInput", parseUserInput]);
		emit("set-picker-option", ["handleKeydownInput", handleKeydown]);
		emit("set-picker-option", ["getRangeAvailableTime", getRangeAvailableTime]);
		emit("set-picker-option", ["getDefaultValue", getDefaultValue]);
		emit("set-picker-option", ["handleCancel", handleCancel]);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Transition, { name: transitionName.value }, {
				default: withCtx(() => [_ctx.actualVisible || _ctx.visible ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: normalizeClass(unref(ns).b("panel"))
				}, [createElementVNode("div", { class: normalizeClass([unref(ns).be("panel", "content"), { "has-seconds": showSeconds.value }]) }, [createVNode(basic_time_spinner_default, {
					ref: "spinner",
					role: _ctx.datetimeRole || "start",
					"arrow-control": unref(arrowControl),
					"show-seconds": showSeconds.value,
					"am-pm-mode": amPmMode.value,
					"spinner-date": _ctx.parsedValue,
					"disabled-hours": unref(disabledHours),
					"disabled-minutes": unref(disabledMinutes),
					"disabled-seconds": unref(disabledSeconds),
					onChange: handleChange,
					onSetOption: unref(onSetOption),
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
				])], 2), createElementVNode("div", { class: normalizeClass(unref(ns).be("panel", "footer")) }, [createElementVNode("button", {
					type: "button",
					class: normalizeClass([unref(ns).be("panel", "btn"), "cancel"]),
					onClick: handleCancel
				}, toDisplayString(unref(t)("el.datepicker.cancel")), 3), createElementVNode("button", {
					type: "button",
					class: normalizeClass([unref(ns).be("panel", "btn"), "confirm"]),
					onClick: _cache[0] || (_cache[0] = ($event) => handleConfirm())
				}, toDisplayString(unref(t)("el.datepicker.confirm")), 3)], 2)], 2)) : createCommentVNode("v-if", true)]),
				_: 1
			}, 8, ["name"]);
		};
	}
});

//#endregion
export { panel_time_pick_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=panel-time-pick.vue_vue_type_script_setup_true_lang.mjs.map