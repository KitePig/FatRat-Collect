const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../directives/click-outside/index.js');
const require_index$1 = require('../../../../hooks/use-locale/index.js');
const require_index$2 = require('../../../icon/index.js');
const require_use_form_common_props = require('../../../form/src/hooks/use-form-common-props.js');
const require_index$3 = require('../../../input/index.js');
const require_index$4 = require('../../../button/index.js');
const require_constants = require('../../../time-picker/src/constants.js');
const require_utils = require('../../../time-picker/src/utils.js');
const require_panel_time_pick = require('../../../time-picker/src/time-picker-com/panel-time-pick.js');
const require_constants$1 = require('../constants.js');
const require_utils$1 = require('../utils.js');
const require_basic_date_table = require('./basic-date-table.js');
const require_basic_month_table = require('./basic-month-table.js');
const require_basic_year_table = require('./basic-year-table.js');
const require_panel_date_range = require('../props/panel-date-range.js');
const require_use_range_picker = require('../composables/use-range-picker.js');
const require_use_panel_date_range = require('../composables/use-panel-date-range.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
let dayjs = require("dayjs");
dayjs = require_runtime.__toESM(dayjs);

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
var panel_date_range_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	__name: "panel-date-range",
	props: require_panel_date_range.panelDateRangeProps,
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
		const pickerBase = (0, vue.inject)(require_constants.PICKER_BASE_INJECTION_KEY);
		const isDefaultFormat = (0, vue.inject)(require_constants$1.ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY, void 0);
		const { disabledDate, cellClassName, defaultTime, clearable } = pickerBase.props;
		const format = (0, vue.toRef)(pickerBase.props, "format");
		const shortcuts = (0, vue.toRef)(pickerBase.props, "shortcuts");
		const defaultValue = (0, vue.toRef)(pickerBase.props, "defaultValue");
		const { lang } = require_index$1.useLocale();
		const leftDate = (0, vue.ref)((0, dayjs.default)().locale(lang.value));
		const rightDate = (0, vue.ref)((0, dayjs.default)().locale(lang.value).add(1, unit));
		const { minDate, maxDate, rangeState, ppNs, drpNs, handleChangeRange, handleRangeConfirm, handleShortcutClick, onSelect, parseValue, t } = require_use_range_picker.useRangePicker(props, {
			defaultValue,
			defaultTime,
			leftDate,
			rightDate,
			unit,
			sortDates
		});
		(0, vue.watch)(() => props.visible, (visible) => {
			if (!visible && rangeState.value.selecting) {
				parseValue(props.parsedValue);
				onSelect(false);
			}
		});
		const dateUserInput = (0, vue.ref)({
			min: null,
			max: null
		});
		const timeUserInput = (0, vue.ref)({
			min: null,
			max: null
		});
		const { leftCurrentView, rightCurrentView, leftCurrentViewRef, rightCurrentViewRef, leftYear, rightYear, leftMonth, rightMonth, leftYearLabel, rightYearLabel, showLeftPicker, showRightPicker, handleLeftYearPick, handleRightYearPick, handleLeftMonthPick, handleRightMonthPick, handlePanelChange, adjustDateByView } = require_use_panel_date_range.usePanelDateRange(props, emit, leftDate, rightDate);
		const hasShortcuts = (0, vue.computed)(() => !!shortcuts.value.length);
		const minVisibleDate = (0, vue.computed)(() => {
			if (dateUserInput.value.min !== null) return dateUserInput.value.min;
			if (minDate.value) return minDate.value.format(dateFormat.value);
			return "";
		});
		const maxVisibleDate = (0, vue.computed)(() => {
			if (dateUserInput.value.max !== null) return dateUserInput.value.max;
			if (maxDate.value || minDate.value) return (maxDate.value || minDate.value).format(dateFormat.value);
			return "";
		});
		const minVisibleTime = (0, vue.computed)(() => {
			if (timeUserInput.value.min !== null) return timeUserInput.value.min;
			if (minDate.value) return minDate.value.format(timeFormat.value);
			return "";
		});
		const maxVisibleTime = (0, vue.computed)(() => {
			if (timeUserInput.value.max !== null) return timeUserInput.value.max;
			if (maxDate.value || minDate.value) return (maxDate.value || minDate.value).format(timeFormat.value);
			return "";
		});
		const timeFormat = (0, vue.computed)(() => {
			return props.timeFormat || require_utils.extractTimeFormat(format.value || "") || require_constants.DEFAULT_FORMATS_TIME;
		});
		const dateFormat = (0, vue.computed)(() => {
			return props.dateFormat || require_utils.extractDateFormat(format.value || "") || require_constants.DEFAULT_FORMATS_DATE;
		});
		const isValidValue = (date) => {
			return require_utils$1.isValidRange(date) && (disabledDate ? !disabledDate(date[0].toDate()) && !disabledDate(date[1].toDate()) : true);
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
		const enableMonthArrow = (0, vue.computed)(() => {
			const nextMonth = (leftMonth.value + 1) % 12;
			const yearOffset = leftMonth.value + 1 >= 12 ? 1 : 0;
			return props.unlinkPanels && new Date(leftYear.value + yearOffset, nextMonth) < new Date(rightYear.value, rightMonth.value);
		});
		const enableYearArrow = (0, vue.computed)(() => {
			return props.unlinkPanels && rightYear.value * 12 + rightMonth.value - (leftYear.value * 12 + leftMonth.value + 1) >= 12;
		});
		const dateRangeDisabled = require_use_form_common_props.useFormDisabled();
		const btnDisabled = (0, vue.computed)(() => {
			return !(minDate.value && maxDate.value && !rangeState.value.selecting && require_utils$1.isValidRange([minDate.value, maxDate.value]) && !dateRangeDisabled.value);
		});
		const showTime = (0, vue.computed)(() => props.type === "datetime" || props.type === "datetimerange");
		const formatEmit = (emitDayjs, index) => {
			if (!emitDayjs) return;
			if (defaultTime) return (0, dayjs.default)(defaultTime[index] || defaultTime).locale(lang.value).year(emitDayjs.year()).month(emitDayjs.month()).date(emitDayjs.date());
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
		const minTimePickerVisible = (0, vue.ref)(false);
		const maxTimePickerVisible = (0, vue.ref)(false);
		const handleMinTimeClose = () => {
			minTimePickerVisible.value = false;
		};
		const handleMaxTimeClose = () => {
			maxTimePickerVisible.value = false;
		};
		const handleDateInput = (value, type) => {
			dateUserInput.value[type] = value;
			const parsedValueD = (0, dayjs.default)(value, dateFormat.value).locale(lang.value);
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
			const parsedValueD = (0, dayjs.default)(value, timeFormat.value).locale(lang.value);
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
				(0, vue.nextTick)(() => {
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
			leftDate.value = require_utils$1.getDefaultValue((0, vue.unref)(defaultValue), {
				lang: (0, vue.unref)(lang),
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
			return require_utils$1.correctlyParseUserInput(value, format.value || "", lang.value, isDefaultFormat);
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
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)([
				(0, vue.unref)(ppNs).b(),
				(0, vue.unref)(drpNs).b(),
				(0, vue.unref)(ppNs).is("border", _ctx.border),
				(0, vue.unref)(ppNs).is("disabled", (0, vue.unref)(dateRangeDisabled)),
				{
					"has-sidebar": _ctx.$slots.sidebar || hasShortcuts.value,
					"has-time": showTime.value
				}
			]) }, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("body-wrapper")) }, [
				(0, vue.renderSlot)(_ctx.$slots, "sidebar", { class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("sidebar")) }),
				hasShortcuts.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("sidebar"))
				}, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(shortcuts.value, (shortcut, key) => {
					return (0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
						key,
						type: "button",
						disabled: (0, vue.unref)(dateRangeDisabled),
						class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("shortcut")),
						onClick: ($event) => (0, vue.unref)(handleShortcutClick)(shortcut)
					}, (0, vue.toDisplayString)(shortcut.text), 11, _hoisted_1);
				}), 128))], 2)) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("body")) }, [
					showTime.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 0,
						class: (0, vue.normalizeClass)((0, vue.unref)(drpNs).e("time-header"))
					}, [
						(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(drpNs).e("editors-wrap")) }, [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(drpNs).e("time-picker-wrap")) }, [(0, vue.createVNode)((0, vue.unref)(require_index$3.ElInput), {
							size: "small",
							disabled: (0, vue.unref)(rangeState).selecting || (0, vue.unref)(dateRangeDisabled),
							placeholder: (0, vue.unref)(t)("el.datepicker.startDate"),
							class: (0, vue.normalizeClass)((0, vue.unref)(drpNs).e("editor")),
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
						])], 2), (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(drpNs).e("time-picker-wrap")) }, [(0, vue.createVNode)((0, vue.unref)(require_index$3.ElInput), {
							size: "small",
							class: (0, vue.normalizeClass)((0, vue.unref)(drpNs).e("editor")),
							disabled: (0, vue.unref)(rangeState).selecting || (0, vue.unref)(dateRangeDisabled),
							placeholder: (0, vue.unref)(t)("el.datepicker.startTime"),
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
						]), (0, vue.createVNode)((0, vue.unref)(require_panel_time_pick.default), {
							visible: minTimePickerVisible.value,
							format: timeFormat.value,
							"datetime-role": "start",
							"parsed-value": (0, vue.unref)(minDate) || leftDate.value,
							onPick: handleMinTimePick
						}, null, 8, [
							"visible",
							"format",
							"parsed-value"
						])], 2)), [[(0, vue.unref)(require_index.default), handleMinTimeClose]])], 2),
						(0, vue.createElementVNode)("span", null, [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElIcon), null, {
							default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ArrowRight))]),
							_: 1
						})]),
						(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)([(0, vue.unref)(drpNs).e("editors-wrap"), "is-right"]) }, [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(drpNs).e("time-picker-wrap")) }, [(0, vue.createVNode)((0, vue.unref)(require_index$3.ElInput), {
							size: "small",
							class: (0, vue.normalizeClass)((0, vue.unref)(drpNs).e("editor")),
							disabled: (0, vue.unref)(rangeState).selecting || (0, vue.unref)(dateRangeDisabled),
							placeholder: (0, vue.unref)(t)("el.datepicker.endDate"),
							"model-value": maxVisibleDate.value,
							readonly: !(0, vue.unref)(minDate) || !_ctx.editable,
							"validate-event": false,
							onInput: _cache[5] || (_cache[5] = (val) => handleDateInput(val, "max")),
							onChange: _cache[6] || (_cache[6] = (val) => handleDateChange(val, "max"))
						}, null, 8, [
							"class",
							"disabled",
							"placeholder",
							"model-value",
							"readonly"
						])], 2), (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(drpNs).e("time-picker-wrap")) }, [(0, vue.createVNode)((0, vue.unref)(require_index$3.ElInput), {
							size: "small",
							class: (0, vue.normalizeClass)((0, vue.unref)(drpNs).e("editor")),
							disabled: (0, vue.unref)(rangeState).selecting || (0, vue.unref)(dateRangeDisabled),
							placeholder: (0, vue.unref)(t)("el.datepicker.endTime"),
							"model-value": maxVisibleTime.value,
							readonly: !(0, vue.unref)(minDate) || !_ctx.editable,
							"validate-event": false,
							onFocus: _cache[7] || (_cache[7] = ($event) => (0, vue.unref)(minDate) && (maxTimePickerVisible.value = true)),
							onInput: _cache[8] || (_cache[8] = (val) => handleTimeInput(val, "max")),
							onChange: _cache[9] || (_cache[9] = (val) => handleTimeChange(val, "max"))
						}, null, 8, [
							"class",
							"disabled",
							"placeholder",
							"model-value",
							"readonly"
						]), (0, vue.createVNode)((0, vue.unref)(require_panel_time_pick.default), {
							"datetime-role": "end",
							visible: maxTimePickerVisible.value,
							format: timeFormat.value,
							"parsed-value": (0, vue.unref)(maxDate) || rightDate.value,
							onPick: handleMaxTimePick
						}, null, 8, [
							"visible",
							"format",
							"parsed-value"
						])], 2)), [[(0, vue.unref)(require_index.default), handleMaxTimeClose]])], 2)
					], 2)) : (0, vue.createCommentVNode)("v-if", true),
					(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)([[(0, vue.unref)(ppNs).e("content"), (0, vue.unref)(drpNs).e("content")], "is-left"]) }, [
						(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(drpNs).e("header")) }, [
							(0, vue.createElementVNode)("button", {
								type: "button",
								class: (0, vue.normalizeClass)([(0, vue.unref)(ppNs).e("icon-btn"), "d-arrow-left"]),
								"aria-label": (0, vue.unref)(t)(`el.datepicker.prevYear`),
								disabled: (0, vue.unref)(dateRangeDisabled),
								onClick: leftPrevYear
							}, [(0, vue.renderSlot)(_ctx.$slots, "prev-year", {}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElIcon), null, {
								default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.DArrowLeft))]),
								_: 1
							})])], 10, _hoisted_2),
							(0, vue.withDirectives)((0, vue.createElementVNode)("button", {
								type: "button",
								class: (0, vue.normalizeClass)([(0, vue.unref)(ppNs).e("icon-btn"), "arrow-left"]),
								"aria-label": (0, vue.unref)(t)(`el.datepicker.prevMonth`),
								disabled: (0, vue.unref)(dateRangeDisabled),
								onClick: leftPrevMonth
							}, [(0, vue.renderSlot)(_ctx.$slots, "prev-month", {}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElIcon), null, {
								default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ArrowLeft))]),
								_: 1
							})])], 10, _hoisted_3), [[vue.vShow, (0, vue.unref)(leftCurrentView) === "date"]]),
							_ctx.unlinkPanels ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
								key: 0,
								type: "button",
								disabled: !enableYearArrow.value || (0, vue.unref)(dateRangeDisabled),
								class: (0, vue.normalizeClass)([[(0, vue.unref)(ppNs).e("icon-btn"), (0, vue.unref)(ppNs).is("disabled", !enableYearArrow.value || (0, vue.unref)(dateRangeDisabled))], "d-arrow-right"]),
								"aria-label": (0, vue.unref)(t)(`el.datepicker.nextYear`),
								onClick: leftNextYear
							}, [(0, vue.renderSlot)(_ctx.$slots, "next-year", {}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElIcon), null, {
								default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.DArrowRight))]),
								_: 1
							})])], 10, _hoisted_4)) : (0, vue.createCommentVNode)("v-if", true),
							_ctx.unlinkPanels && (0, vue.unref)(leftCurrentView) === "date" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
								key: 1,
								type: "button",
								disabled: !enableMonthArrow.value || (0, vue.unref)(dateRangeDisabled),
								class: (0, vue.normalizeClass)([[(0, vue.unref)(ppNs).e("icon-btn"), (0, vue.unref)(ppNs).is("disabled", !enableMonthArrow.value || (0, vue.unref)(dateRangeDisabled))], "arrow-right"]),
								"aria-label": (0, vue.unref)(t)(`el.datepicker.nextMonth`),
								onClick: leftNextMonth
							}, [(0, vue.renderSlot)(_ctx.$slots, "next-month", {}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElIcon), null, {
								default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ArrowRight))]),
								_: 1
							})])], 10, _hoisted_5)) : (0, vue.createCommentVNode)("v-if", true),
							(0, vue.createElementVNode)("div", null, [(0, vue.createElementVNode)("span", {
								role: "button",
								class: (0, vue.normalizeClass)((0, vue.unref)(drpNs).e("header-label")),
								"aria-live": "polite",
								tabindex: _ctx.disabled ? void 0 : 0,
								"aria-disabled": _ctx.disabled,
								onKeydown: _cache[10] || (_cache[10] = (0, vue.withKeys)(($event) => (0, vue.unref)(showLeftPicker)("year"), ["enter"])),
								onClick: _cache[11] || (_cache[11] = ($event) => (0, vue.unref)(showLeftPicker)("year"))
							}, (0, vue.toDisplayString)((0, vue.unref)(leftYearLabel)), 43, _hoisted_6), (0, vue.withDirectives)((0, vue.createElementVNode)("span", {
								role: "button",
								"aria-live": "polite",
								tabindex: _ctx.disabled ? void 0 : 0,
								"aria-disabled": _ctx.disabled,
								class: (0, vue.normalizeClass)([(0, vue.unref)(drpNs).e("header-label"), { active: (0, vue.unref)(leftCurrentView) === "month" }]),
								onKeydown: _cache[12] || (_cache[12] = (0, vue.withKeys)(($event) => (0, vue.unref)(showLeftPicker)("month"), ["enter"])),
								onClick: _cache[13] || (_cache[13] = ($event) => (0, vue.unref)(showLeftPicker)("month"))
							}, (0, vue.toDisplayString)((0, vue.unref)(t)(`el.datepicker.month${leftDate.value.month() + 1}`)), 43, _hoisted_7), [[vue.vShow, (0, vue.unref)(leftCurrentView) === "date"]])])
						], 2),
						(0, vue.unref)(leftCurrentView) === "date" ? ((0, vue.openBlock)(), (0, vue.createBlock)(require_basic_date_table.default, {
							key: 0,
							ref_key: "leftCurrentViewRef",
							ref: leftCurrentViewRef,
							"selection-mode": "range",
							date: leftDate.value,
							"min-date": (0, vue.unref)(minDate),
							"max-date": (0, vue.unref)(maxDate),
							"range-state": (0, vue.unref)(rangeState),
							"disabled-date": (0, vue.unref)(disabledDate),
							"cell-class-name": (0, vue.unref)(cellClassName),
							"show-week-number": _ctx.showWeekNumber,
							disabled: (0, vue.unref)(dateRangeDisabled),
							onChangerange: (0, vue.unref)(handleChangeRange),
							onPick: handleRangePick,
							onSelect: (0, vue.unref)(onSelect)
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
						])) : (0, vue.createCommentVNode)("v-if", true),
						(0, vue.unref)(leftCurrentView) === "year" ? ((0, vue.openBlock)(), (0, vue.createBlock)(require_basic_year_table.default, {
							key: 1,
							ref_key: "leftCurrentViewRef",
							ref: leftCurrentViewRef,
							"selection-mode": "year",
							date: leftDate.value,
							"disabled-date": (0, vue.unref)(disabledDate),
							"parsed-value": _ctx.parsedValue,
							disabled: (0, vue.unref)(dateRangeDisabled),
							onPick: (0, vue.unref)(handleLeftYearPick)
						}, null, 8, [
							"date",
							"disabled-date",
							"parsed-value",
							"disabled",
							"onPick"
						])) : (0, vue.createCommentVNode)("v-if", true),
						(0, vue.unref)(leftCurrentView) === "month" ? ((0, vue.openBlock)(), (0, vue.createBlock)(require_basic_month_table.default, {
							key: 2,
							ref_key: "leftCurrentViewRef",
							ref: leftCurrentViewRef,
							"selection-mode": "month",
							date: leftDate.value,
							"parsed-value": _ctx.parsedValue,
							"disabled-date": (0, vue.unref)(disabledDate),
							disabled: (0, vue.unref)(dateRangeDisabled),
							onPick: (0, vue.unref)(handleLeftMonthPick)
						}, null, 8, [
							"date",
							"parsed-value",
							"disabled-date",
							"disabled",
							"onPick"
						])) : (0, vue.createCommentVNode)("v-if", true)
					], 2),
					(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)([[(0, vue.unref)(ppNs).e("content"), (0, vue.unref)(drpNs).e("content")], "is-right"]) }, [
						(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(drpNs).e("header")) }, [
							_ctx.unlinkPanels ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
								key: 0,
								type: "button",
								disabled: !enableYearArrow.value || (0, vue.unref)(dateRangeDisabled),
								class: (0, vue.normalizeClass)([[(0, vue.unref)(ppNs).e("icon-btn"), (0, vue.unref)(ppNs).is("disabled", !enableYearArrow.value || (0, vue.unref)(dateRangeDisabled))], "d-arrow-left"]),
								"aria-label": (0, vue.unref)(t)(`el.datepicker.prevYear`),
								onClick: rightPrevYear
							}, [(0, vue.renderSlot)(_ctx.$slots, "prev-year", {}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElIcon), null, {
								default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.DArrowLeft))]),
								_: 1
							})])], 10, _hoisted_8)) : (0, vue.createCommentVNode)("v-if", true),
							_ctx.unlinkPanels && (0, vue.unref)(rightCurrentView) === "date" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
								key: 1,
								type: "button",
								disabled: !enableMonthArrow.value || (0, vue.unref)(dateRangeDisabled),
								class: (0, vue.normalizeClass)([[(0, vue.unref)(ppNs).e("icon-btn"), (0, vue.unref)(ppNs).is("disabled", !enableMonthArrow.value || (0, vue.unref)(dateRangeDisabled))], "arrow-left"]),
								"aria-label": (0, vue.unref)(t)(`el.datepicker.prevMonth`),
								onClick: rightPrevMonth
							}, [(0, vue.renderSlot)(_ctx.$slots, "prev-month", {}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElIcon), null, {
								default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ArrowLeft))]),
								_: 1
							})])], 10, _hoisted_9)) : (0, vue.createCommentVNode)("v-if", true),
							(0, vue.createElementVNode)("button", {
								type: "button",
								"aria-label": (0, vue.unref)(t)(`el.datepicker.nextYear`),
								class: (0, vue.normalizeClass)([(0, vue.unref)(ppNs).e("icon-btn"), "d-arrow-right"]),
								disabled: (0, vue.unref)(dateRangeDisabled),
								onClick: rightNextYear
							}, [(0, vue.renderSlot)(_ctx.$slots, "next-year", {}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElIcon), null, {
								default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.DArrowRight))]),
								_: 1
							})])], 10, _hoisted_10),
							(0, vue.withDirectives)((0, vue.createElementVNode)("button", {
								type: "button",
								class: (0, vue.normalizeClass)([(0, vue.unref)(ppNs).e("icon-btn"), "arrow-right"]),
								disabled: (0, vue.unref)(dateRangeDisabled),
								"aria-label": (0, vue.unref)(t)(`el.datepicker.nextMonth`),
								onClick: rightNextMonth
							}, [(0, vue.renderSlot)(_ctx.$slots, "next-month", {}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElIcon), null, {
								default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ArrowRight))]),
								_: 1
							})])], 10, _hoisted_11), [[vue.vShow, (0, vue.unref)(rightCurrentView) === "date"]]),
							(0, vue.createElementVNode)("div", null, [(0, vue.createElementVNode)("span", {
								role: "button",
								class: (0, vue.normalizeClass)((0, vue.unref)(drpNs).e("header-label")),
								"aria-live": "polite",
								tabindex: _ctx.disabled ? void 0 : 0,
								"aria-disabled": _ctx.disabled,
								onKeydown: _cache[14] || (_cache[14] = (0, vue.withKeys)(($event) => (0, vue.unref)(showRightPicker)("year"), ["enter"])),
								onClick: _cache[15] || (_cache[15] = ($event) => (0, vue.unref)(showRightPicker)("year"))
							}, (0, vue.toDisplayString)((0, vue.unref)(rightYearLabel)), 43, _hoisted_12), (0, vue.withDirectives)((0, vue.createElementVNode)("span", {
								role: "button",
								"aria-live": "polite",
								tabindex: _ctx.disabled ? void 0 : 0,
								"aria-disabled": _ctx.disabled,
								class: (0, vue.normalizeClass)([(0, vue.unref)(drpNs).e("header-label"), { active: (0, vue.unref)(rightCurrentView) === "month" }]),
								onKeydown: _cache[16] || (_cache[16] = (0, vue.withKeys)(($event) => (0, vue.unref)(showRightPicker)("month"), ["enter"])),
								onClick: _cache[17] || (_cache[17] = ($event) => (0, vue.unref)(showRightPicker)("month"))
							}, (0, vue.toDisplayString)((0, vue.unref)(t)(`el.datepicker.month${rightDate.value.month() + 1}`)), 43, _hoisted_13), [[vue.vShow, (0, vue.unref)(rightCurrentView) === "date"]])])
						], 2),
						(0, vue.unref)(rightCurrentView) === "date" ? ((0, vue.openBlock)(), (0, vue.createBlock)(require_basic_date_table.default, {
							key: 0,
							ref_key: "rightCurrentViewRef",
							ref: rightCurrentViewRef,
							"selection-mode": "range",
							date: rightDate.value,
							"min-date": (0, vue.unref)(minDate),
							"max-date": (0, vue.unref)(maxDate),
							"range-state": (0, vue.unref)(rangeState),
							"disabled-date": (0, vue.unref)(disabledDate),
							"cell-class-name": (0, vue.unref)(cellClassName),
							"show-week-number": _ctx.showWeekNumber,
							disabled: (0, vue.unref)(dateRangeDisabled),
							onChangerange: (0, vue.unref)(handleChangeRange),
							onPick: handleRangePick,
							onSelect: (0, vue.unref)(onSelect)
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
						])) : (0, vue.createCommentVNode)("v-if", true),
						(0, vue.unref)(rightCurrentView) === "year" ? ((0, vue.openBlock)(), (0, vue.createBlock)(require_basic_year_table.default, {
							key: 1,
							ref_key: "rightCurrentViewRef",
							ref: rightCurrentViewRef,
							"selection-mode": "year",
							date: rightDate.value,
							"disabled-date": (0, vue.unref)(disabledDate),
							"parsed-value": _ctx.parsedValue,
							disabled: (0, vue.unref)(dateRangeDisabled),
							onPick: (0, vue.unref)(handleRightYearPick)
						}, null, 8, [
							"date",
							"disabled-date",
							"parsed-value",
							"disabled",
							"onPick"
						])) : (0, vue.createCommentVNode)("v-if", true),
						(0, vue.unref)(rightCurrentView) === "month" ? ((0, vue.openBlock)(), (0, vue.createBlock)(require_basic_month_table.default, {
							key: 2,
							ref_key: "rightCurrentViewRef",
							ref: rightCurrentViewRef,
							"selection-mode": "month",
							date: rightDate.value,
							"parsed-value": _ctx.parsedValue,
							"disabled-date": (0, vue.unref)(disabledDate),
							disabled: (0, vue.unref)(dateRangeDisabled),
							onPick: (0, vue.unref)(handleRightMonthPick)
						}, null, 8, [
							"date",
							"parsed-value",
							"disabled-date",
							"disabled",
							"onPick"
						])) : (0, vue.createCommentVNode)("v-if", true)
					], 2)
				], 2)
			], 2), _ctx.showFooter && showTime.value && (_ctx.showConfirm || (0, vue.unref)(clearable)) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 0,
				class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("footer"))
			}, [(0, vue.unref)(clearable) ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$4.ElButton), {
				key: 0,
				text: "",
				size: "small",
				class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("link-btn")),
				onClick: onClear
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("el.datepicker.clear")), 1)]),
				_: 1
			}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true), _ctx.showConfirm ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$4.ElButton), {
				key: 1,
				plain: "",
				size: "small",
				class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("link-btn")),
				disabled: btnDisabled.value,
				onClick: _cache[18] || (_cache[18] = ($event) => (0, vue.unref)(handleRangeConfirm)(false))
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("el.datepicker.confirm")), 1)]),
				_: 1
			}, 8, ["class", "disabled"])) : (0, vue.createCommentVNode)("v-if", true)], 2)) : (0, vue.createCommentVNode)("v-if", true)], 2);
		};
	}
});

//#endregion
exports.default = panel_date_range_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=panel-date-range.vue_vue_type_script_setup_true_lang.js.map