import ClickOutside from "../../../../directives/click-outside/index.mjs";
import { useLocale } from "../../../../hooks/use-locale/index.mjs";
import { ElIcon } from "../../../icon/index.mjs";
import { useFormDisabled } from "../../../form/src/hooks/use-form-common-props.mjs";
import { ElInput } from "../../../input/index.mjs";
import { ElButton } from "../../../button/index.mjs";
import { DEFAULT_FORMATS_DATE, DEFAULT_FORMATS_TIME, PICKER_BASE_INJECTION_KEY } from "../../../time-picker/src/constants.mjs";
import { extractDateFormat, extractTimeFormat } from "../../../time-picker/src/utils.mjs";
import panel_time_pick_default from "../../../time-picker/src/time-picker-com/panel-time-pick.mjs";
import { ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY } from "../constants.mjs";
import { correctlyParseUserInput, getDefaultValue, isValidRange } from "../utils.mjs";
import basic_date_table_default from "./basic-date-table.mjs";
import basic_month_table_default from "./basic-month-table.mjs";
import basic_year_table_default from "./basic-year-table.mjs";
import { panelDateRangeProps } from "../props/panel-date-range.mjs";
import { useRangePicker } from "../composables/use-range-picker.mjs";
import { usePanelDateRange } from "../composables/use-panel-date-range.mjs";
import { ArrowLeft, ArrowRight, DArrowLeft, DArrowRight } from "@element-plus/icons-vue";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, inject, nextTick, normalizeClass, openBlock, ref, renderList, renderSlot, toDisplayString, toRef, unref, vShow, watch, withCtx, withDirectives, withKeys } from "vue";
import dayjs from "dayjs";

//#region ../../packages/components/date-picker-panel/src/date-picker-com/panel-date-range.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["disabled", "onClick"];
const _hoisted_2 = ["aria-label", "disabled"];
const _hoisted_3 = ["aria-label", "disabled"];
const _hoisted_4 = ["disabled", "aria-label"];
const _hoisted_5 = ["disabled", "aria-label"];
const _hoisted_6 = ["tabindex", "aria-disabled"];
const _hoisted_7 = ["tabindex", "aria-disabled"];
const _hoisted_8 = ["disabled", "aria-label"];
const _hoisted_9 = ["disabled", "aria-label"];
const _hoisted_10 = ["aria-label", "disabled"];
const _hoisted_11 = ["disabled", "aria-label"];
const _hoisted_12 = ["tabindex", "aria-disabled"];
const _hoisted_13 = ["tabindex", "aria-disabled"];
const unit = "month";
var panel_date_range_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "panel-date-range",
	props: panelDateRangeProps,
	emits: [
		"pick",
		"set-picker-option",
		"calendar-change",
		"panel-change",
		"clear"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const pickerBase = inject(PICKER_BASE_INJECTION_KEY);
		const isDefaultFormat = inject(ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY, void 0);
		const { disabledDate, cellClassName, defaultTime, clearable } = pickerBase.props;
		const format = toRef(pickerBase.props, "format");
		const shortcuts = toRef(pickerBase.props, "shortcuts");
		const defaultValue = toRef(pickerBase.props, "defaultValue");
		const { lang } = useLocale();
		const leftDate = ref(dayjs().locale(lang.value));
		const rightDate = ref(dayjs().locale(lang.value).add(1, unit));
		const { minDate, maxDate, rangeState, ppNs, drpNs, handleChangeRange, handleRangeConfirm, handleShortcutClick, onSelect, parseValue, t } = useRangePicker(props, {
			defaultValue,
			defaultTime,
			leftDate,
			rightDate,
			unit,
			sortDates
		});
		watch(() => props.visible, (visible) => {
			if (!visible && rangeState.value.selecting) {
				parseValue(props.parsedValue);
				onSelect(false);
			}
		});
		const dateUserInput = ref({
			min: null,
			max: null
		});
		const timeUserInput = ref({
			min: null,
			max: null
		});
		const { leftCurrentView, rightCurrentView, leftCurrentViewRef, rightCurrentViewRef, leftYear, rightYear, leftMonth, rightMonth, leftYearLabel, rightYearLabel, showLeftPicker, showRightPicker, handleLeftYearPick, handleRightYearPick, handleLeftMonthPick, handleRightMonthPick, handlePanelChange, adjustDateByView } = usePanelDateRange(props, emit, leftDate, rightDate);
		const hasShortcuts = computed(() => !!shortcuts.value.length);
		const minVisibleDate = computed(() => {
			if (dateUserInput.value.min !== null) return dateUserInput.value.min;
			if (minDate.value) return minDate.value.format(dateFormat.value);
			return "";
		});
		const maxVisibleDate = computed(() => {
			if (dateUserInput.value.max !== null) return dateUserInput.value.max;
			if (maxDate.value || minDate.value) return (maxDate.value || minDate.value).format(dateFormat.value);
			return "";
		});
		const minVisibleTime = computed(() => {
			if (timeUserInput.value.min !== null) return timeUserInput.value.min;
			if (minDate.value) return minDate.value.format(timeFormat.value);
			return "";
		});
		const maxVisibleTime = computed(() => {
			if (timeUserInput.value.max !== null) return timeUserInput.value.max;
			if (maxDate.value || minDate.value) return (maxDate.value || minDate.value).format(timeFormat.value);
			return "";
		});
		const timeFormat = computed(() => {
			return props.timeFormat || extractTimeFormat(format.value || "") || DEFAULT_FORMATS_TIME;
		});
		const dateFormat = computed(() => {
			return props.dateFormat || extractDateFormat(format.value || "") || DEFAULT_FORMATS_DATE;
		});
		const isValidValue = (date) => {
			return isValidRange(date) && (disabledDate ? !disabledDate(date[0].toDate()) && !disabledDate(date[1].toDate()) : true);
		};
		const leftPrevYear = () => {
			leftDate.value = adjustDateByView(leftCurrentView.value, leftDate.value, false);
			if (!props.unlinkPanels) rightDate.value = leftDate.value.add(1, "month");
			handlePanelChange("year");
		};
		const leftPrevMonth = () => {
			leftDate.value = leftDate.value.subtract(1, "month");
			if (!props.unlinkPanels) rightDate.value = leftDate.value.add(1, "month");
			handlePanelChange("month");
		};
		const rightNextYear = () => {
			if (!props.unlinkPanels) {
				leftDate.value = adjustDateByView(rightCurrentView.value, leftDate.value, true);
				rightDate.value = leftDate.value.add(1, "month");
			} else rightDate.value = adjustDateByView(rightCurrentView.value, rightDate.value, true);
			handlePanelChange("year");
		};
		const rightNextMonth = () => {
			if (!props.unlinkPanels) {
				leftDate.value = leftDate.value.add(1, "month");
				rightDate.value = leftDate.value.add(1, "month");
			} else rightDate.value = rightDate.value.add(1, "month");
			handlePanelChange("month");
		};
		const leftNextYear = () => {
			leftDate.value = adjustDateByView(leftCurrentView.value, leftDate.value, true);
			handlePanelChange("year");
		};
		const leftNextMonth = () => {
			leftDate.value = leftDate.value.add(1, "month");
			handlePanelChange("month");
		};
		const rightPrevYear = () => {
			rightDate.value = adjustDateByView(rightCurrentView.value, rightDate.value, false);
			handlePanelChange("year");
		};
		const rightPrevMonth = () => {
			rightDate.value = rightDate.value.subtract(1, "month");
			handlePanelChange("month");
		};
		const enableMonthArrow = computed(() => {
			const nextMonth = (leftMonth.value + 1) % 12;
			const yearOffset = leftMonth.value + 1 >= 12 ? 1 : 0;
			return props.unlinkPanels && new Date(leftYear.value + yearOffset, nextMonth) < new Date(rightYear.value, rightMonth.value);
		});
		const enableYearArrow = computed(() => {
			return props.unlinkPanels && rightYear.value * 12 + rightMonth.value - (leftYear.value * 12 + leftMonth.value + 1) >= 12;
		});
		const dateRangeDisabled = useFormDisabled();
		const btnDisabled = computed(() => {
			return !(minDate.value && maxDate.value && !rangeState.value.selecting && isValidRange([minDate.value, maxDate.value]) && !dateRangeDisabled.value);
		});
		const showTime = computed(() => props.type === "datetime" || props.type === "datetimerange");
		const formatEmit = (emitDayjs, index) => {
			if (!emitDayjs) return;
			if (defaultTime) return dayjs(defaultTime[index] || defaultTime).locale(lang.value).year(emitDayjs.year()).month(emitDayjs.month()).date(emitDayjs.date());
			return emitDayjs;
		};
		const handleRangePick = (val, close = true) => {
			const min_ = val.minDate;
			const max_ = val.maxDate;
			const minDate_ = formatEmit(min_, 0);
			const maxDate_ = formatEmit(max_, 1);
			if (maxDate.value === maxDate_ && minDate.value === minDate_) return;
			emit("calendar-change", [min_.toDate(), max_ && max_.toDate()]);
			maxDate.value = maxDate_;
			minDate.value = minDate_;
			if (!showTime.value && close) close = !minDate_ || !maxDate_;
			handleRangeConfirm(close);
		};
		const minTimePickerVisible = ref(false);
		const maxTimePickerVisible = ref(false);
		const handleMinTimeClose = () => {
			minTimePickerVisible.value = false;
		};
		const handleMaxTimeClose = () => {
			maxTimePickerVisible.value = false;
		};
		const handleDateInput = (value, type) => {
			dateUserInput.value[type] = value;
			const parsedValueD = dayjs(value, dateFormat.value).locale(lang.value);
			if (parsedValueD.isValid()) {
				if (disabledDate && disabledDate(parsedValueD.toDate())) return;
				if (type === "min") {
					leftDate.value = parsedValueD;
					minDate.value = (minDate.value || leftDate.value).year(parsedValueD.year()).month(parsedValueD.month()).date(parsedValueD.date());
					if (!props.unlinkPanels && (!maxDate.value || maxDate.value.isBefore(minDate.value))) {
						rightDate.value = parsedValueD.add(1, "month");
						maxDate.value = minDate.value.add(1, "month");
					}
				} else {
					rightDate.value = parsedValueD;
					maxDate.value = (maxDate.value || rightDate.value).year(parsedValueD.year()).month(parsedValueD.month()).date(parsedValueD.date());
					if (!props.unlinkPanels && (!minDate.value || minDate.value.isAfter(maxDate.value))) {
						leftDate.value = parsedValueD.subtract(1, "month");
						minDate.value = maxDate.value.subtract(1, "month");
					}
				}
				sortDates(minDate.value, maxDate.value);
				handleRangeConfirm(true);
			}
		};
		const handleDateChange = (_, type) => {
			dateUserInput.value[type] = null;
		};
		const handleTimeInput = (value, type) => {
			timeUserInput.value[type] = value;
			const parsedValueD = dayjs(value, timeFormat.value).locale(lang.value);
			if (parsedValueD.isValid()) if (type === "min") {
				minTimePickerVisible.value = true;
				minDate.value = (minDate.value || leftDate.value).hour(parsedValueD.hour()).minute(parsedValueD.minute()).second(parsedValueD.second());
				leftDate.value = minDate.value;
			} else {
				maxTimePickerVisible.value = true;
				maxDate.value = (maxDate.value || rightDate.value).hour(parsedValueD.hour()).minute(parsedValueD.minute()).second(parsedValueD.second());
				rightDate.value = maxDate.value;
			}
		};
		const handleTimeChange = (_value, type) => {
			timeUserInput.value[type] = null;
			if (type === "min") {
				leftDate.value = minDate.value;
				minTimePickerVisible.value = false;
				if (!maxDate.value || maxDate.value.isBefore(minDate.value)) maxDate.value = minDate.value;
			} else {
				rightDate.value = maxDate.value;
				maxTimePickerVisible.value = false;
				if (maxDate.value && maxDate.value.isBefore(minDate.value)) minDate.value = maxDate.value;
			}
			handleRangeConfirm(true);
		};
		const handleMinTimePick = (value, visible, first) => {
			if (timeUserInput.value.min) return;
			if (value) minDate.value = (minDate.value || leftDate.value).hour(value.hour()).minute(value.minute()).second(value.second());
			if (!first) minTimePickerVisible.value = visible;
			if (!maxDate.value || maxDate.value.isBefore(minDate.value)) {
				maxDate.value = minDate.value;
				rightDate.value = value;
				nextTick(() => {
					parseValue(props.parsedValue);
				});
			}
			handleRangeConfirm(true);
		};
		const handleMaxTimePick = (value, visible, first) => {
			if (timeUserInput.value.max) return;
			if (value) maxDate.value = (maxDate.value || rightDate.value).hour(value.hour()).minute(value.minute()).second(value.second());
			if (!first) maxTimePickerVisible.value = visible;
			if (maxDate.value && maxDate.value.isBefore(minDate.value)) minDate.value = maxDate.value;
			handleRangeConfirm(true);
		};
		const onClear = () => {
			handleClear();
			emit("clear");
		};
		const handleClear = () => {
			let valueOnClear = null;
			if (pickerBase?.emptyValues) valueOnClear = pickerBase.emptyValues.valueOnClear.value;
			leftDate.value = getDefaultValue(unref(defaultValue), {
				lang: unref(lang),
				unit: "month",
				unlinkPanels: props.unlinkPanels
			})[0];
			rightDate.value = leftDate.value.add(1, "month");
			maxDate.value = void 0;
			minDate.value = void 0;
			handleRangeConfirm(true);
			emit("pick", valueOnClear);
		};
		const parseUserInput = (value) => {
			return correctlyParseUserInput(value, format.value || "", lang.value, isDefaultFormat);
		};
		function sortDates(minDate, maxDate) {
			if (props.unlinkPanels && maxDate) {
				const minDateYear = minDate?.year() || 0;
				const minDateMonth = minDate?.month() || 0;
				const maxDateYear = maxDate.year();
				const maxDateMonth = maxDate.month();
				rightDate.value = minDateYear === maxDateYear && minDateMonth === maxDateMonth ? maxDate.add(1, unit) : maxDate;
			} else {
				rightDate.value = leftDate.value.add(1, unit);
				if (maxDate) rightDate.value = rightDate.value.hour(maxDate.hour()).minute(maxDate.minute()).second(maxDate.second());
			}
		}
		emit("set-picker-option", ["isValidValue", isValidValue]);
		emit("set-picker-option", ["parseUserInput", parseUserInput]);
		emit("set-picker-option", ["handleClear", handleClear]);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass([
				unref(ppNs).b(),
				unref(drpNs).b(),
				unref(ppNs).is("border", _ctx.border),
				unref(ppNs).is("disabled", unref(dateRangeDisabled)),
				{
					"has-sidebar": _ctx.$slots.sidebar || hasShortcuts.value,
					"has-time": showTime.value
				}
			]) }, [createElementVNode("div", { class: normalizeClass(unref(ppNs).e("body-wrapper")) }, [
				renderSlot(_ctx.$slots, "sidebar", { class: normalizeClass(unref(ppNs).e("sidebar")) }),
				hasShortcuts.value ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: normalizeClass(unref(ppNs).e("sidebar"))
				}, [(openBlock(true), createElementBlock(Fragment, null, renderList(shortcuts.value, (shortcut, key) => {
					return openBlock(), createElementBlock("button", {
						key,
						type: "button",
						disabled: unref(dateRangeDisabled),
						class: normalizeClass(unref(ppNs).e("shortcut")),
						onClick: ($event) => unref(handleShortcutClick)(shortcut)
					}, toDisplayString(shortcut.text), 11, _hoisted_1);
				}), 128))], 2)) : createCommentVNode("v-if", true),
				createElementVNode("div", { class: normalizeClass(unref(ppNs).e("body")) }, [
					showTime.value ? (openBlock(), createElementBlock("div", {
						key: 0,
						class: normalizeClass(unref(drpNs).e("time-header"))
					}, [
						createElementVNode("span", { class: normalizeClass(unref(drpNs).e("editors-wrap")) }, [createElementVNode("span", { class: normalizeClass(unref(drpNs).e("time-picker-wrap")) }, [createVNode(unref(ElInput), {
							size: "small",
							disabled: unref(rangeState).selecting || unref(dateRangeDisabled),
							placeholder: unref(t)("el.datepicker.startDate"),
							class: normalizeClass(unref(drpNs).e("editor")),
							"model-value": minVisibleDate.value,
							"validate-event": false,
							readonly: !_ctx.editable,
							onInput: _cache[0] || (_cache[0] = (val) => handleDateInput(val, "min")),
							onChange: _cache[1] || (_cache[1] = (val) => handleDateChange(val, "min"))
						}, null, 8, [
							"disabled",
							"placeholder",
							"class",
							"model-value",
							"readonly"
						])], 2), withDirectives((openBlock(), createElementBlock("span", { class: normalizeClass(unref(drpNs).e("time-picker-wrap")) }, [createVNode(unref(ElInput), {
							size: "small",
							class: normalizeClass(unref(drpNs).e("editor")),
							disabled: unref(rangeState).selecting || unref(dateRangeDisabled),
							placeholder: unref(t)("el.datepicker.startTime"),
							"model-value": minVisibleTime.value,
							"validate-event": false,
							readonly: !_ctx.editable,
							onFocus: _cache[2] || (_cache[2] = ($event) => minTimePickerVisible.value = true),
							onInput: _cache[3] || (_cache[3] = (val) => handleTimeInput(val, "min")),
							onChange: _cache[4] || (_cache[4] = (val) => handleTimeChange(val, "min"))
						}, null, 8, [
							"class",
							"disabled",
							"placeholder",
							"model-value",
							"readonly"
						]), createVNode(unref(panel_time_pick_default), {
							visible: minTimePickerVisible.value,
							format: timeFormat.value,
							"datetime-role": "start",
							"parsed-value": unref(minDate) || leftDate.value,
							onPick: handleMinTimePick
						}, null, 8, [
							"visible",
							"format",
							"parsed-value"
						])], 2)), [[unref(ClickOutside), handleMinTimeClose]])], 2),
						createElementVNode("span", null, [createVNode(unref(ElIcon), null, {
							default: withCtx(() => [createVNode(unref(ArrowRight))]),
							_: 1
						})]),
						createElementVNode("span", { class: normalizeClass([unref(drpNs).e("editors-wrap"), "is-right"]) }, [createElementVNode("span", { class: normalizeClass(unref(drpNs).e("time-picker-wrap")) }, [createVNode(unref(ElInput), {
							size: "small",
							class: normalizeClass(unref(drpNs).e("editor")),
							disabled: unref(rangeState).selecting || unref(dateRangeDisabled),
							placeholder: unref(t)("el.datepicker.endDate"),
							"model-value": maxVisibleDate.value,
							readonly: !unref(minDate) || !_ctx.editable,
							"validate-event": false,
							onInput: _cache[5] || (_cache[5] = (val) => handleDateInput(val, "max")),
							onChange: _cache[6] || (_cache[6] = (val) => handleDateChange(val, "max"))
						}, null, 8, [
							"class",
							"disabled",
							"placeholder",
							"model-value",
							"readonly"
						])], 2), withDirectives((openBlock(), createElementBlock("span", { class: normalizeClass(unref(drpNs).e("time-picker-wrap")) }, [createVNode(unref(ElInput), {
							size: "small",
							class: normalizeClass(unref(drpNs).e("editor")),
							disabled: unref(rangeState).selecting || unref(dateRangeDisabled),
							placeholder: unref(t)("el.datepicker.endTime"),
							"model-value": maxVisibleTime.value,
							readonly: !unref(minDate) || !_ctx.editable,
							"validate-event": false,
							onFocus: _cache[7] || (_cache[7] = ($event) => unref(minDate) && (maxTimePickerVisible.value = true)),
							onInput: _cache[8] || (_cache[8] = (val) => handleTimeInput(val, "max")),
							onChange: _cache[9] || (_cache[9] = (val) => handleTimeChange(val, "max"))
						}, null, 8, [
							"class",
							"disabled",
							"placeholder",
							"model-value",
							"readonly"
						]), createVNode(unref(panel_time_pick_default), {
							"datetime-role": "end",
							visible: maxTimePickerVisible.value,
							format: timeFormat.value,
							"parsed-value": unref(maxDate) || rightDate.value,
							onPick: handleMaxTimePick
						}, null, 8, [
							"visible",
							"format",
							"parsed-value"
						])], 2)), [[unref(ClickOutside), handleMaxTimeClose]])], 2)
					], 2)) : createCommentVNode("v-if", true),
					createElementVNode("div", { class: normalizeClass([[unref(ppNs).e("content"), unref(drpNs).e("content")], "is-left"]) }, [
						createElementVNode("div", { class: normalizeClass(unref(drpNs).e("header")) }, [
							createElementVNode("button", {
								type: "button",
								class: normalizeClass([unref(ppNs).e("icon-btn"), "d-arrow-left"]),
								"aria-label": unref(t)(`el.datepicker.prevYear`),
								disabled: unref(dateRangeDisabled),
								onClick: leftPrevYear
							}, [renderSlot(_ctx.$slots, "prev-year", {}, () => [createVNode(unref(ElIcon), null, {
								default: withCtx(() => [createVNode(unref(DArrowLeft))]),
								_: 1
							})])], 10, _hoisted_2),
							withDirectives(createElementVNode("button", {
								type: "button",
								class: normalizeClass([unref(ppNs).e("icon-btn"), "arrow-left"]),
								"aria-label": unref(t)(`el.datepicker.prevMonth`),
								disabled: unref(dateRangeDisabled),
								onClick: leftPrevMonth
							}, [renderSlot(_ctx.$slots, "prev-month", {}, () => [createVNode(unref(ElIcon), null, {
								default: withCtx(() => [createVNode(unref(ArrowLeft))]),
								_: 1
							})])], 10, _hoisted_3), [[vShow, unref(leftCurrentView) === "date"]]),
							_ctx.unlinkPanels ? (openBlock(), createElementBlock("button", {
								key: 0,
								type: "button",
								disabled: !enableYearArrow.value || unref(dateRangeDisabled),
								class: normalizeClass([[unref(ppNs).e("icon-btn"), unref(ppNs).is("disabled", !enableYearArrow.value || unref(dateRangeDisabled))], "d-arrow-right"]),
								"aria-label": unref(t)(`el.datepicker.nextYear`),
								onClick: leftNextYear
							}, [renderSlot(_ctx.$slots, "next-year", {}, () => [createVNode(unref(ElIcon), null, {
								default: withCtx(() => [createVNode(unref(DArrowRight))]),
								_: 1
							})])], 10, _hoisted_4)) : createCommentVNode("v-if", true),
							_ctx.unlinkPanels && unref(leftCurrentView) === "date" ? (openBlock(), createElementBlock("button", {
								key: 1,
								type: "button",
								disabled: !enableMonthArrow.value || unref(dateRangeDisabled),
								class: normalizeClass([[unref(ppNs).e("icon-btn"), unref(ppNs).is("disabled", !enableMonthArrow.value || unref(dateRangeDisabled))], "arrow-right"]),
								"aria-label": unref(t)(`el.datepicker.nextMonth`),
								onClick: leftNextMonth
							}, [renderSlot(_ctx.$slots, "next-month", {}, () => [createVNode(unref(ElIcon), null, {
								default: withCtx(() => [createVNode(unref(ArrowRight))]),
								_: 1
							})])], 10, _hoisted_5)) : createCommentVNode("v-if", true),
							createElementVNode("div", null, [createElementVNode("span", {
								role: "button",
								class: normalizeClass(unref(drpNs).e("header-label")),
								"aria-live": "polite",
								tabindex: _ctx.disabled ? void 0 : 0,
								"aria-disabled": _ctx.disabled,
								onKeydown: _cache[10] || (_cache[10] = withKeys(($event) => unref(showLeftPicker)("year"), ["enter"])),
								onClick: _cache[11] || (_cache[11] = ($event) => unref(showLeftPicker)("year"))
							}, toDisplayString(unref(leftYearLabel)), 43, _hoisted_6), withDirectives(createElementVNode("span", {
								role: "button",
								"aria-live": "polite",
								tabindex: _ctx.disabled ? void 0 : 0,
								"aria-disabled": _ctx.disabled,
								class: normalizeClass([unref(drpNs).e("header-label"), { active: unref(leftCurrentView) === "month" }]),
								onKeydown: _cache[12] || (_cache[12] = withKeys(($event) => unref(showLeftPicker)("month"), ["enter"])),
								onClick: _cache[13] || (_cache[13] = ($event) => unref(showLeftPicker)("month"))
							}, toDisplayString(unref(t)(`el.datepicker.month${leftDate.value.month() + 1}`)), 43, _hoisted_7), [[vShow, unref(leftCurrentView) === "date"]])])
						], 2),
						unref(leftCurrentView) === "date" ? (openBlock(), createBlock(basic_date_table_default, {
							key: 0,
							ref_key: "leftCurrentViewRef",
							ref: leftCurrentViewRef,
							"selection-mode": "range",
							date: leftDate.value,
							"min-date": unref(minDate),
							"max-date": unref(maxDate),
							"range-state": unref(rangeState),
							"disabled-date": unref(disabledDate),
							"cell-class-name": unref(cellClassName),
							"show-week-number": _ctx.showWeekNumber,
							disabled: unref(dateRangeDisabled),
							onChangerange: unref(handleChangeRange),
							onPick: handleRangePick,
							onSelect: unref(onSelect)
						}, null, 8, [
							"date",
							"min-date",
							"max-date",
							"range-state",
							"disabled-date",
							"cell-class-name",
							"show-week-number",
							"disabled",
							"onChangerange",
							"onSelect"
						])) : createCommentVNode("v-if", true),
						unref(leftCurrentView) === "year" ? (openBlock(), createBlock(basic_year_table_default, {
							key: 1,
							ref_key: "leftCurrentViewRef",
							ref: leftCurrentViewRef,
							"selection-mode": "year",
							date: leftDate.value,
							"disabled-date": unref(disabledDate),
							"parsed-value": _ctx.parsedValue,
							disabled: unref(dateRangeDisabled),
							onPick: unref(handleLeftYearPick)
						}, null, 8, [
							"date",
							"disabled-date",
							"parsed-value",
							"disabled",
							"onPick"
						])) : createCommentVNode("v-if", true),
						unref(leftCurrentView) === "month" ? (openBlock(), createBlock(basic_month_table_default, {
							key: 2,
							ref_key: "leftCurrentViewRef",
							ref: leftCurrentViewRef,
							"selection-mode": "month",
							date: leftDate.value,
							"parsed-value": _ctx.parsedValue,
							"disabled-date": unref(disabledDate),
							disabled: unref(dateRangeDisabled),
							onPick: unref(handleLeftMonthPick)
						}, null, 8, [
							"date",
							"parsed-value",
							"disabled-date",
							"disabled",
							"onPick"
						])) : createCommentVNode("v-if", true)
					], 2),
					createElementVNode("div", { class: normalizeClass([[unref(ppNs).e("content"), unref(drpNs).e("content")], "is-right"]) }, [
						createElementVNode("div", { class: normalizeClass(unref(drpNs).e("header")) }, [
							_ctx.unlinkPanels ? (openBlock(), createElementBlock("button", {
								key: 0,
								type: "button",
								disabled: !enableYearArrow.value || unref(dateRangeDisabled),
								class: normalizeClass([[unref(ppNs).e("icon-btn"), unref(ppNs).is("disabled", !enableYearArrow.value || unref(dateRangeDisabled))], "d-arrow-left"]),
								"aria-label": unref(t)(`el.datepicker.prevYear`),
								onClick: rightPrevYear
							}, [renderSlot(_ctx.$slots, "prev-year", {}, () => [createVNode(unref(ElIcon), null, {
								default: withCtx(() => [createVNode(unref(DArrowLeft))]),
								_: 1
							})])], 10, _hoisted_8)) : createCommentVNode("v-if", true),
							_ctx.unlinkPanels && unref(rightCurrentView) === "date" ? (openBlock(), createElementBlock("button", {
								key: 1,
								type: "button",
								disabled: !enableMonthArrow.value || unref(dateRangeDisabled),
								class: normalizeClass([[unref(ppNs).e("icon-btn"), unref(ppNs).is("disabled", !enableMonthArrow.value || unref(dateRangeDisabled))], "arrow-left"]),
								"aria-label": unref(t)(`el.datepicker.prevMonth`),
								onClick: rightPrevMonth
							}, [renderSlot(_ctx.$slots, "prev-month", {}, () => [createVNode(unref(ElIcon), null, {
								default: withCtx(() => [createVNode(unref(ArrowLeft))]),
								_: 1
							})])], 10, _hoisted_9)) : createCommentVNode("v-if", true),
							createElementVNode("button", {
								type: "button",
								"aria-label": unref(t)(`el.datepicker.nextYear`),
								class: normalizeClass([unref(ppNs).e("icon-btn"), "d-arrow-right"]),
								disabled: unref(dateRangeDisabled),
								onClick: rightNextYear
							}, [renderSlot(_ctx.$slots, "next-year", {}, () => [createVNode(unref(ElIcon), null, {
								default: withCtx(() => [createVNode(unref(DArrowRight))]),
								_: 1
							})])], 10, _hoisted_10),
							withDirectives(createElementVNode("button", {
								type: "button",
								class: normalizeClass([unref(ppNs).e("icon-btn"), "arrow-right"]),
								disabled: unref(dateRangeDisabled),
								"aria-label": unref(t)(`el.datepicker.nextMonth`),
								onClick: rightNextMonth
							}, [renderSlot(_ctx.$slots, "next-month", {}, () => [createVNode(unref(ElIcon), null, {
								default: withCtx(() => [createVNode(unref(ArrowRight))]),
								_: 1
							})])], 10, _hoisted_11), [[vShow, unref(rightCurrentView) === "date"]]),
							createElementVNode("div", null, [createElementVNode("span", {
								role: "button",
								class: normalizeClass(unref(drpNs).e("header-label")),
								"aria-live": "polite",
								tabindex: _ctx.disabled ? void 0 : 0,
								"aria-disabled": _ctx.disabled,
								onKeydown: _cache[14] || (_cache[14] = withKeys(($event) => unref(showRightPicker)("year"), ["enter"])),
								onClick: _cache[15] || (_cache[15] = ($event) => unref(showRightPicker)("year"))
							}, toDisplayString(unref(rightYearLabel)), 43, _hoisted_12), withDirectives(createElementVNode("span", {
								role: "button",
								"aria-live": "polite",
								tabindex: _ctx.disabled ? void 0 : 0,
								"aria-disabled": _ctx.disabled,
								class: normalizeClass([unref(drpNs).e("header-label"), { active: unref(rightCurrentView) === "month" }]),
								onKeydown: _cache[16] || (_cache[16] = withKeys(($event) => unref(showRightPicker)("month"), ["enter"])),
								onClick: _cache[17] || (_cache[17] = ($event) => unref(showRightPicker)("month"))
							}, toDisplayString(unref(t)(`el.datepicker.month${rightDate.value.month() + 1}`)), 43, _hoisted_13), [[vShow, unref(rightCurrentView) === "date"]])])
						], 2),
						unref(rightCurrentView) === "date" ? (openBlock(), createBlock(basic_date_table_default, {
							key: 0,
							ref_key: "rightCurrentViewRef",
							ref: rightCurrentViewRef,
							"selection-mode": "range",
							date: rightDate.value,
							"min-date": unref(minDate),
							"max-date": unref(maxDate),
							"range-state": unref(rangeState),
							"disabled-date": unref(disabledDate),
							"cell-class-name": unref(cellClassName),
							"show-week-number": _ctx.showWeekNumber,
							disabled: unref(dateRangeDisabled),
							onChangerange: unref(handleChangeRange),
							onPick: handleRangePick,
							onSelect: unref(onSelect)
						}, null, 8, [
							"date",
							"min-date",
							"max-date",
							"range-state",
							"disabled-date",
							"cell-class-name",
							"show-week-number",
							"disabled",
							"onChangerange",
							"onSelect"
						])) : createCommentVNode("v-if", true),
						unref(rightCurrentView) === "year" ? (openBlock(), createBlock(basic_year_table_default, {
							key: 1,
							ref_key: "rightCurrentViewRef",
							ref: rightCurrentViewRef,
							"selection-mode": "year",
							date: rightDate.value,
							"disabled-date": unref(disabledDate),
							"parsed-value": _ctx.parsedValue,
							disabled: unref(dateRangeDisabled),
							onPick: unref(handleRightYearPick)
						}, null, 8, [
							"date",
							"disabled-date",
							"parsed-value",
							"disabled",
							"onPick"
						])) : createCommentVNode("v-if", true),
						unref(rightCurrentView) === "month" ? (openBlock(), createBlock(basic_month_table_default, {
							key: 2,
							ref_key: "rightCurrentViewRef",
							ref: rightCurrentViewRef,
							"selection-mode": "month",
							date: rightDate.value,
							"parsed-value": _ctx.parsedValue,
							"disabled-date": unref(disabledDate),
							disabled: unref(dateRangeDisabled),
							onPick: unref(handleRightMonthPick)
						}, null, 8, [
							"date",
							"parsed-value",
							"disabled-date",
							"disabled",
							"onPick"
						])) : createCommentVNode("v-if", true)
					], 2)
				], 2)
			], 2), _ctx.showFooter && showTime.value && (_ctx.showConfirm || unref(clearable)) ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: normalizeClass(unref(ppNs).e("footer"))
			}, [unref(clearable) ? (openBlock(), createBlock(unref(ElButton), {
				key: 0,
				text: "",
				size: "small",
				class: normalizeClass(unref(ppNs).e("link-btn")),
				onClick: onClear
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("el.datepicker.clear")), 1)]),
				_: 1
			}, 8, ["class"])) : createCommentVNode("v-if", true), _ctx.showConfirm ? (openBlock(), createBlock(unref(ElButton), {
				key: 1,
				plain: "",
				size: "small",
				class: normalizeClass(unref(ppNs).e("link-btn")),
				disabled: btnDisabled.value,
				onClick: _cache[18] || (_cache[18] = ($event) => unref(handleRangeConfirm)(false))
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("el.datepicker.confirm")), 1)]),
				_: 1
			}, 8, ["class", "disabled"])) : createCommentVNode("v-if", true)], 2)) : createCommentVNode("v-if", true)], 2);
		};
	}
});

//#endregion
export { panel_date_range_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=panel-date-range.vue_vue_type_script_setup_true_lang.mjs.map