const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../../constants/aria.js');
const require_event = require('../../../../utils/dom/event.js');
const require_arrays = require('../../../../utils/arrays.js');
const require_index = require('../../../../directives/click-outside/index.js');
const require_index$1 = require('../../../../hooks/use-locale/index.js');
const require_index$2 = require('../../../../hooks/use-namespace/index.js');
const require_index$3 = require('../../../icon/index.js');
const require_use_form_common_props = require('../../../form/src/hooks/use-form-common-props.js');
const require_index$4 = require('../../../input/index.js');
const require_index$5 = require('../../../button/index.js');
const require_constants = require('../../../time-picker/src/constants.js');
const require_utils = require('../../../time-picker/src/utils.js');
const require_panel_time_pick = require('../../../time-picker/src/time-picker-com/panel-time-pick.js');
const require_constants$1 = require('../constants.js');
const require_panel_date_pick = require('../props/panel-date-pick.js');
const require_utils$1 = require('../utils.js');
const require_basic_date_table = require('./basic-date-table.js');
const require_basic_month_table = require('./basic-month-table.js');
const require_basic_year_table = require('./basic-year-table.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
let dayjs = require("dayjs");
dayjs = require_runtime.__toESM(dayjs);
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/date-picker-panel/src/date-picker-com/panel-date-pick.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["disabled", "onClick"];
const _hoisted_2 = ["aria-label", "disabled"];
const _hoisted_3 = ["aria-label", "disabled"];
const _hoisted_4 = ["tabindex", "aria-disabled"];
const _hoisted_5 = ["tabindex", "aria-disabled"];
const _hoisted_6 = ["aria-label", "disabled"];
const _hoisted_7 = ["aria-label", "disabled"];
var panel_date_pick_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	__name: "panel-date-pick",
	props: require_panel_date_pick.panelDatePickProps,
	emits: [
		"pick",
		"set-picker-option",
		"panel-change"
	],
	setup(__props, { emit: __emit }) {
		const timeWithinRange = (_, __, ___) => true;
		const props = __props;
		const contextEmit = __emit;
		const ppNs = require_index$2.useNamespace("picker-panel");
		const dpNs = require_index$2.useNamespace("date-picker");
		const attrs = (0, vue.useAttrs)();
		const slots = (0, vue.useSlots)();
		const { t, lang } = require_index$1.useLocale();
		const pickerBase = (0, vue.inject)(require_constants.PICKER_BASE_INJECTION_KEY);
		const isDefaultFormat = (0, vue.inject)(require_constants$1.ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY, void 0);
		const { shortcuts, disabledDate, cellClassName, defaultTime } = pickerBase.props;
		const defaultValue = (0, vue.toRef)(pickerBase.props, "defaultValue");
		const currentViewRef = (0, vue.ref)();
		const innerDate = (0, vue.ref)((0, dayjs.default)().locale(lang.value));
		const isChangeToNow = (0, vue.ref)(false);
		let isShortcut = false;
		const defaultTimeD = (0, vue.computed)(() => {
			return (0, dayjs.default)(defaultTime).locale(lang.value);
		});
		const month = (0, vue.computed)(() => {
			return innerDate.value.month();
		});
		const year = (0, vue.computed)(() => {
			return innerDate.value.year();
		});
		const selectableRange = (0, vue.ref)([]);
		const userInputDate = (0, vue.ref)(null);
		const userInputTime = (0, vue.ref)(null);
		const checkDateWithinRange = (date) => {
			return selectableRange.value.length > 0 ? timeWithinRange(date, selectableRange.value, props.format || require_constants.DEFAULT_FORMATS_TIME) : true;
		};
		const formatEmit = (emitDayjs) => {
			if (defaultTime && !visibleTime.value && !isChangeToNow.value && !isShortcut) return defaultTimeD.value.year(emitDayjs.year()).month(emitDayjs.month()).date(emitDayjs.date());
			if (showTime.value) return emitDayjs.millisecond(0);
			return emitDayjs.startOf("day");
		};
		const emit = (value, ...args) => {
			if (!value) contextEmit("pick", value, ...args);
			else if ((0, _vue_shared.isArray)(value)) contextEmit("pick", value.map(formatEmit), ...args);
			else contextEmit("pick", formatEmit(value), ...args);
			userInputDate.value = null;
			userInputTime.value = null;
			isChangeToNow.value = false;
			isShortcut = false;
		};
		const handleDatePick = async (value, keepOpen) => {
			if (selectionMode.value === "date" && dayjs.default.isDayjs(value)) {
				const parsedDateValue = require_arrays.extractFirst(props.parsedValue);
				let newDate = parsedDateValue ? parsedDateValue.year(value.year()).month(value.month()).date(value.date()) : value;
				if (!checkDateWithinRange(newDate)) newDate = selectableRange.value[0][0].year(value.year()).month(value.month()).date(value.date());
				innerDate.value = newDate;
				emit(newDate, showTime.value || keepOpen);
			} else if (selectionMode.value === "week") emit(value.date);
			else if (selectionMode.value === "dates") emit(value, true);
		};
		const moveByMonth = (forward) => {
			const action = forward ? "add" : "subtract";
			innerDate.value = innerDate.value[action](1, "month");
			handlePanelChange("month");
		};
		const moveByYear = (forward) => {
			const currentDate = innerDate.value;
			const action = forward ? "add" : "subtract";
			innerDate.value = currentView.value === "year" ? currentDate[action](10, "year") : currentDate[action](1, "year");
			handlePanelChange("year");
		};
		const currentView = (0, vue.ref)("date");
		const yearLabel = (0, vue.computed)(() => {
			const yearTranslation = t("el.datepicker.year");
			if (currentView.value === "year") {
				const startYear = Math.floor(year.value / 10) * 10;
				if (yearTranslation) return `${startYear} ${yearTranslation} - ${startYear + 9} ${yearTranslation}`;
				return `${startYear} - ${startYear + 9}`;
			}
			return `${year.value} ${yearTranslation}`;
		});
		const handleShortcutClick = (shortcut) => {
			const shortcutValue = (0, _vue_shared.isFunction)(shortcut.value) ? shortcut.value() : shortcut.value;
			if (shortcutValue) {
				isShortcut = true;
				emit((0, dayjs.default)(shortcutValue).locale(lang.value));
				return;
			}
			if (shortcut.onClick) shortcut.onClick({
				attrs,
				slots,
				emit: contextEmit
			});
		};
		const selectionMode = (0, vue.computed)(() => {
			const { type } = props;
			if ([
				"week",
				"month",
				"months",
				"year",
				"years",
				"dates"
			].includes(type)) return type;
			return "date";
		});
		const isMultipleType = (0, vue.computed)(() => {
			return selectionMode.value === "dates" || selectionMode.value === "months" || selectionMode.value === "years";
		});
		const keyboardMode = (0, vue.computed)(() => {
			return selectionMode.value === "date" ? currentView.value : selectionMode.value;
		});
		const hasShortcuts = (0, vue.computed)(() => !!shortcuts.length);
		const handleMonthPick = async (month, keepOpen) => {
			if (selectionMode.value === "month") {
				innerDate.value = require_utils$1.getValidDateOfMonth(innerDate.value, innerDate.value.year(), month, lang.value, disabledDate);
				emit(innerDate.value, false);
			} else if (selectionMode.value === "months") emit(month, keepOpen ?? true);
			else {
				innerDate.value = require_utils$1.getValidDateOfMonth(innerDate.value, innerDate.value.year(), month, lang.value, disabledDate);
				currentView.value = "date";
				if ([
					"month",
					"year",
					"date",
					"week"
				].includes(selectionMode.value)) {
					emit(innerDate.value, true);
					await (0, vue.nextTick)();
					handleFocusPicker();
				}
			}
			handlePanelChange("month");
		};
		const handleYearPick = async (year, keepOpen) => {
			if (selectionMode.value === "year") {
				innerDate.value = require_utils$1.getValidDateOfYear(innerDate.value.startOf("year").year(year), lang.value, disabledDate);
				emit(innerDate.value, false);
			} else if (selectionMode.value === "years") emit(year, keepOpen ?? true);
			else {
				innerDate.value = require_utils$1.getValidDateOfYear(innerDate.value.year(year), lang.value, disabledDate);
				currentView.value = "month";
				if ([
					"month",
					"year",
					"date",
					"week"
				].includes(selectionMode.value)) {
					emit(innerDate.value, true);
					await (0, vue.nextTick)();
					handleFocusPicker();
				}
			}
			handlePanelChange("year");
		};
		const dateDisabled = require_use_form_common_props.useFormDisabled();
		const showPicker = async (view) => {
			if (dateDisabled.value) return;
			currentView.value = view;
			await (0, vue.nextTick)();
			handleFocusPicker();
		};
		const showTime = (0, vue.computed)(() => props.type === "datetime" || props.type === "datetimerange");
		const footerVisible = (0, vue.computed)(() => {
			const showDateFooter = showTime.value || selectionMode.value === "dates";
			const showYearFooter = selectionMode.value === "years";
			const showMonthFooter = selectionMode.value === "months";
			const isDateView = currentView.value === "date";
			const isYearView = currentView.value === "year";
			const isMonthView = currentView.value === "month";
			return showDateFooter && isDateView || showYearFooter && isYearView || showMonthFooter && isMonthView;
		});
		const footerFilled = (0, vue.computed)(() => !isMultipleType.value && props.showNow || props.showConfirm);
		const disabledConfirm = (0, vue.computed)(() => {
			if (!disabledDate) return false;
			if (!props.parsedValue) return true;
			if ((0, _vue_shared.isArray)(props.parsedValue)) return disabledDate(props.parsedValue[0].toDate());
			return disabledDate(props.parsedValue.toDate());
		});
		const onConfirm = () => {
			if (isMultipleType.value) emit(props.parsedValue);
			else {
				let result = require_arrays.extractFirst(props.parsedValue);
				if (!result) {
					const defaultTimeD = (0, dayjs.default)(defaultTime).locale(lang.value);
					const defaultValueD = getDefaultValue();
					result = defaultTimeD.year(defaultValueD.year()).month(defaultValueD.month()).date(defaultValueD.date());
				}
				innerDate.value = result;
				emit(result);
			}
		};
		const disabledNow = (0, vue.computed)(() => {
			if (!disabledDate) return false;
			return disabledDate((0, dayjs.default)().locale(lang.value).toDate());
		});
		const changeToNow = () => {
			const nowDate = (0, dayjs.default)().locale(lang.value).toDate();
			isChangeToNow.value = true;
			if ((!disabledDate || !disabledDate(nowDate)) && checkDateWithinRange(nowDate)) {
				innerDate.value = (0, dayjs.default)().locale(lang.value);
				emit(innerDate.value);
			}
		};
		const timeFormat = (0, vue.computed)(() => {
			return props.timeFormat || require_utils.extractTimeFormat(props.format) || require_constants.DEFAULT_FORMATS_TIME;
		});
		const dateFormat = (0, vue.computed)(() => {
			return props.dateFormat || require_utils.extractDateFormat(props.format) || require_constants.DEFAULT_FORMATS_DATE;
		});
		const visibleTime = (0, vue.computed)(() => {
			if (userInputTime.value) return userInputTime.value;
			if (!props.parsedValue && !defaultValue.value) return;
			return (require_arrays.extractFirst(props.parsedValue) || innerDate.value).format(timeFormat.value);
		});
		const visibleDate = (0, vue.computed)(() => {
			if (userInputDate.value) return userInputDate.value;
			if (!props.parsedValue && !defaultValue.value) return;
			return (require_arrays.extractFirst(props.parsedValue) || innerDate.value).format(dateFormat.value);
		});
		const timePickerVisible = (0, vue.ref)(false);
		const onTimePickerInputFocus = () => {
			timePickerVisible.value = true;
		};
		const handleTimePickClose = () => {
			timePickerVisible.value = false;
		};
		const getUnits = (date) => {
			return {
				hour: date.hour(),
				minute: date.minute(),
				second: date.second(),
				year: date.year(),
				month: date.month(),
				date: date.date()
			};
		};
		const handleTimePick = (value, visible, first) => {
			const { hour, minute, second } = getUnits(value);
			const parsedDateValue = require_arrays.extractFirst(props.parsedValue);
			innerDate.value = parsedDateValue ? parsedDateValue.hour(hour).minute(minute).second(second) : value;
			emit(innerDate.value, true);
			if (!first) timePickerVisible.value = visible;
		};
		const handleVisibleTimeChange = (value) => {
			const newDate = (0, dayjs.default)(value, timeFormat.value).locale(lang.value);
			if (newDate.isValid() && checkDateWithinRange(newDate)) {
				const { year, month, date } = getUnits(innerDate.value);
				innerDate.value = newDate.year(year).month(month).date(date);
				userInputTime.value = null;
				timePickerVisible.value = false;
				emit(innerDate.value, true);
			}
		};
		const handleVisibleDateChange = (value) => {
			const newDate = require_utils$1.correctlyParseUserInput(value, dateFormat.value, lang.value, isDefaultFormat);
			if (newDate.isValid()) {
				if (disabledDate && disabledDate(newDate.toDate())) return;
				const { hour, minute, second } = getUnits(innerDate.value);
				innerDate.value = newDate.hour(hour).minute(minute).second(second);
				userInputDate.value = null;
				emit(innerDate.value, true);
			}
		};
		const isValidValue = (date) => {
			return dayjs.default.isDayjs(date) && date.isValid() && (disabledDate ? !disabledDate(date.toDate()) : true);
		};
		const parseUserInput = (value) => {
			return require_utils$1.correctlyParseUserInput(value, props.format, lang.value, isDefaultFormat);
		};
		const getDefaultValue = () => {
			const parseDate = (0, dayjs.default)(defaultValue.value).locale(lang.value);
			if (!defaultValue.value) {
				const defaultTimeDValue = defaultTimeD.value;
				return (0, dayjs.default)().hour(defaultTimeDValue.hour()).minute(defaultTimeDValue.minute()).second(defaultTimeDValue.second()).locale(lang.value);
			}
			return parseDate;
		};
		const handleFocusPicker = () => {
			if ([
				"week",
				"month",
				"year",
				"date"
			].includes(selectionMode.value)) currentViewRef.value?.focus();
		};
		const _handleFocusPicker = () => {
			handleFocusPicker();
			if (selectionMode.value === "week") handleKeyControl(require_aria.EVENT_CODE.down);
		};
		const handleKeydownTable = (event) => {
			const code = require_event.getEventCode(event);
			if ([
				require_aria.EVENT_CODE.up,
				require_aria.EVENT_CODE.down,
				require_aria.EVENT_CODE.left,
				require_aria.EVENT_CODE.right,
				require_aria.EVENT_CODE.home,
				require_aria.EVENT_CODE.end,
				require_aria.EVENT_CODE.pageUp,
				require_aria.EVENT_CODE.pageDown
			].includes(code)) {
				handleKeyControl(code);
				event.stopPropagation();
				event.preventDefault();
			}
			if ([
				require_aria.EVENT_CODE.enter,
				require_aria.EVENT_CODE.space,
				require_aria.EVENT_CODE.numpadEnter
			].includes(code) && userInputDate.value === null && userInputTime.value === null) {
				event.preventDefault();
				emit(innerDate.value, false);
			}
		};
		const handleKeyControl = (code) => {
			const { up, down, left, right, home, end, pageUp, pageDown } = require_aria.EVENT_CODE;
			const mapping = {
				year: {
					[up]: -4,
					[down]: 4,
					[left]: -1,
					[right]: 1,
					offset: (date, step) => date.setFullYear(date.getFullYear() + step)
				},
				month: {
					[up]: -4,
					[down]: 4,
					[left]: -1,
					[right]: 1,
					offset: (date, step) => date.setMonth(date.getMonth() + step)
				},
				week: {
					[up]: -1,
					[down]: 1,
					[left]: -1,
					[right]: 1,
					offset: (date, step) => date.setDate(date.getDate() + step * 7)
				},
				date: {
					[up]: -7,
					[down]: 7,
					[left]: -1,
					[right]: 1,
					[home]: (date) => -date.getDay(),
					[end]: (date) => -date.getDay() + 6,
					[pageUp]: (date) => -new Date(date.getFullYear(), date.getMonth(), 0).getDate(),
					[pageDown]: (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
					offset: (date, step) => date.setDate(date.getDate() + step)
				}
			};
			const newDate = innerDate.value.toDate();
			while (Math.abs(innerDate.value.diff(newDate, "year", true)) < 1) {
				const map = mapping[keyboardMode.value];
				if (!map) return;
				map.offset(newDate, (0, _vue_shared.isFunction)(map[code]) ? map[code](newDate) : map[code] ?? 0);
				if (disabledDate && disabledDate(newDate)) break;
				const result = (0, dayjs.default)(newDate).locale(lang.value);
				innerDate.value = result;
				contextEmit("pick", result, true);
				break;
			}
		};
		const handlePanelChange = (mode) => {
			contextEmit("panel-change", innerDate.value.toDate(), mode, currentView.value);
		};
		(0, vue.watch)(() => selectionMode.value, (val) => {
			if (["month", "year"].includes(val)) {
				currentView.value = val;
				return;
			} else if (val === "years") {
				currentView.value = "year";
				return;
			} else if (val === "months") {
				currentView.value = "month";
				return;
			}
			currentView.value = "date";
		}, { immediate: true });
		(0, vue.watch)(() => defaultValue.value, (val) => {
			if (val) innerDate.value = getDefaultValue();
		}, { immediate: true });
		(0, vue.watch)(() => props.parsedValue, (val) => {
			if (val) {
				if (isMultipleType.value) return;
				if ((0, _vue_shared.isArray)(val)) return;
				innerDate.value = val;
			} else innerDate.value = getDefaultValue();
		}, { immediate: true });
		contextEmit("set-picker-option", ["isValidValue", isValidValue]);
		contextEmit("set-picker-option", ["parseUserInput", parseUserInput]);
		contextEmit("set-picker-option", ["handleFocusPicker", _handleFocusPicker]);
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)([
				(0, vue.unref)(ppNs).b(),
				(0, vue.unref)(dpNs).b(),
				(0, vue.unref)(ppNs).is("border", _ctx.border),
				(0, vue.unref)(ppNs).is("disabled", (0, vue.unref)(dateDisabled)),
				{
					"has-sidebar": _ctx.$slots.sidebar || hasShortcuts.value,
					"has-time": showTime.value
				}
			]) }, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("body-wrapper")) }, [
				(0, vue.renderSlot)(_ctx.$slots, "sidebar", { class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("sidebar")) }),
				hasShortcuts.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("sidebar"))
				}, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(shortcuts), (shortcut, key) => {
					return (0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
						key,
						type: "button",
						disabled: (0, vue.unref)(dateDisabled),
						class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("shortcut")),
						onClick: ($event) => handleShortcutClick(shortcut)
					}, (0, vue.toDisplayString)(shortcut.text), 11, _hoisted_1);
				}), 128))], 2)) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("body")) }, [
					showTime.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 0,
						class: (0, vue.normalizeClass)((0, vue.unref)(dpNs).e("time-header"))
					}, [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(dpNs).e("editor-wrap")) }, [(0, vue.createVNode)((0, vue.unref)(require_index$4.ElInput), {
						placeholder: (0, vue.unref)(t)("el.datepicker.selectDate"),
						"model-value": visibleDate.value,
						size: "small",
						"validate-event": false,
						disabled: (0, vue.unref)(dateDisabled),
						readonly: !_ctx.editable,
						onInput: _cache[0] || (_cache[0] = (val) => userInputDate.value = val),
						onChange: handleVisibleDateChange
					}, null, 8, [
						"placeholder",
						"model-value",
						"disabled",
						"readonly"
					])], 2), (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(dpNs).e("editor-wrap")) }, [(0, vue.createVNode)((0, vue.unref)(require_index$4.ElInput), {
						placeholder: (0, vue.unref)(t)("el.datepicker.selectTime"),
						"model-value": visibleTime.value,
						size: "small",
						"validate-event": false,
						disabled: (0, vue.unref)(dateDisabled),
						readonly: !_ctx.editable,
						onFocus: onTimePickerInputFocus,
						onInput: _cache[1] || (_cache[1] = (val) => userInputTime.value = val),
						onChange: handleVisibleTimeChange
					}, null, 8, [
						"placeholder",
						"model-value",
						"disabled",
						"readonly"
					]), (0, vue.createVNode)((0, vue.unref)(require_panel_time_pick.default), {
						visible: timePickerVisible.value,
						format: timeFormat.value,
						"parsed-value": innerDate.value,
						onPick: handleTimePick
					}, null, 8, [
						"visible",
						"format",
						"parsed-value"
					])], 2)), [[(0, vue.unref)(require_index.default), handleTimePickClose]])], 2)) : (0, vue.createCommentVNode)("v-if", true),
					(0, vue.withDirectives)((0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)([(0, vue.unref)(dpNs).e("header"), (currentView.value === "year" || currentView.value === "month") && (0, vue.unref)(dpNs).em("header", "bordered")]) }, [
						(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(dpNs).e("prev-btn")) }, [(0, vue.createElementVNode)("button", {
							type: "button",
							"aria-label": (0, vue.unref)(t)(`el.datepicker.prevYear`),
							class: (0, vue.normalizeClass)(["d-arrow-left", (0, vue.unref)(ppNs).e("icon-btn")]),
							disabled: (0, vue.unref)(dateDisabled),
							onClick: _cache[2] || (_cache[2] = ($event) => moveByYear(false))
						}, [(0, vue.renderSlot)(_ctx.$slots, "prev-year", {}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$3.ElIcon), null, {
							default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.DArrowLeft))]),
							_: 1
						})])], 10, _hoisted_2), (0, vue.withDirectives)((0, vue.createElementVNode)("button", {
							type: "button",
							"aria-label": (0, vue.unref)(t)(`el.datepicker.prevMonth`),
							class: (0, vue.normalizeClass)([(0, vue.unref)(ppNs).e("icon-btn"), "arrow-left"]),
							disabled: (0, vue.unref)(dateDisabled),
							onClick: _cache[3] || (_cache[3] = ($event) => moveByMonth(false))
						}, [(0, vue.renderSlot)(_ctx.$slots, "prev-month", {}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$3.ElIcon), null, {
							default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ArrowLeft))]),
							_: 1
						})])], 10, _hoisted_3), [[vue.vShow, currentView.value === "date"]])], 2),
						(0, vue.createElementVNode)("span", {
							role: "button",
							class: (0, vue.normalizeClass)((0, vue.unref)(dpNs).e("header-label")),
							"aria-live": "polite",
							tabindex: _ctx.disabled ? void 0 : 0,
							"aria-disabled": _ctx.disabled,
							onKeydown: _cache[4] || (_cache[4] = (0, vue.withKeys)(($event) => showPicker("year"), ["enter"])),
							onClick: _cache[5] || (_cache[5] = ($event) => showPicker("year"))
						}, (0, vue.toDisplayString)(yearLabel.value), 43, _hoisted_4),
						(0, vue.withDirectives)((0, vue.createElementVNode)("span", {
							role: "button",
							"aria-live": "polite",
							tabindex: _ctx.disabled ? void 0 : 0,
							"aria-disabled": _ctx.disabled,
							class: (0, vue.normalizeClass)([(0, vue.unref)(dpNs).e("header-label"), { active: currentView.value === "month" }]),
							onKeydown: _cache[6] || (_cache[6] = (0, vue.withKeys)(($event) => showPicker("month"), ["enter"])),
							onClick: _cache[7] || (_cache[7] = ($event) => showPicker("month"))
						}, (0, vue.toDisplayString)((0, vue.unref)(t)(`el.datepicker.month${month.value + 1}`)), 43, _hoisted_5), [[vue.vShow, currentView.value === "date"]]),
						(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(dpNs).e("next-btn")) }, [(0, vue.withDirectives)((0, vue.createElementVNode)("button", {
							type: "button",
							"aria-label": (0, vue.unref)(t)(`el.datepicker.nextMonth`),
							class: (0, vue.normalizeClass)([(0, vue.unref)(ppNs).e("icon-btn"), "arrow-right"]),
							disabled: (0, vue.unref)(dateDisabled),
							onClick: _cache[8] || (_cache[8] = ($event) => moveByMonth(true))
						}, [(0, vue.renderSlot)(_ctx.$slots, "next-month", {}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$3.ElIcon), null, {
							default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ArrowRight))]),
							_: 1
						})])], 10, _hoisted_6), [[vue.vShow, currentView.value === "date"]]), (0, vue.createElementVNode)("button", {
							type: "button",
							"aria-label": (0, vue.unref)(t)(`el.datepicker.nextYear`),
							class: (0, vue.normalizeClass)([(0, vue.unref)(ppNs).e("icon-btn"), "d-arrow-right"]),
							disabled: (0, vue.unref)(dateDisabled),
							onClick: _cache[9] || (_cache[9] = ($event) => moveByYear(true))
						}, [(0, vue.renderSlot)(_ctx.$slots, "next-year", {}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$3.ElIcon), null, {
							default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.DArrowRight))]),
							_: 1
						})])], 10, _hoisted_7)], 2)
					], 2), [[vue.vShow, currentView.value !== "time"]]),
					(0, vue.createElementVNode)("div", {
						class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("content")),
						onKeydown: handleKeydownTable
					}, [
						currentView.value === "date" ? ((0, vue.openBlock)(), (0, vue.createBlock)(require_basic_date_table.default, {
							key: 0,
							ref_key: "currentViewRef",
							ref: currentViewRef,
							"selection-mode": selectionMode.value,
							date: innerDate.value,
							"parsed-value": _ctx.parsedValue,
							"disabled-date": (0, vue.unref)(disabledDate),
							disabled: (0, vue.unref)(dateDisabled),
							"cell-class-name": (0, vue.unref)(cellClassName),
							"show-week-number": _ctx.showWeekNumber,
							onPick: handleDatePick
						}, null, 8, [
							"selection-mode",
							"date",
							"parsed-value",
							"disabled-date",
							"disabled",
							"cell-class-name",
							"show-week-number"
						])) : (0, vue.createCommentVNode)("v-if", true),
						currentView.value === "year" ? ((0, vue.openBlock)(), (0, vue.createBlock)(require_basic_year_table.default, {
							key: 1,
							ref_key: "currentViewRef",
							ref: currentViewRef,
							"selection-mode": selectionMode.value,
							date: innerDate.value,
							"disabled-date": (0, vue.unref)(disabledDate),
							disabled: (0, vue.unref)(dateDisabled),
							"parsed-value": _ctx.parsedValue,
							"cell-class-name": (0, vue.unref)(cellClassName),
							onPick: handleYearPick
						}, null, 8, [
							"selection-mode",
							"date",
							"disabled-date",
							"disabled",
							"parsed-value",
							"cell-class-name"
						])) : (0, vue.createCommentVNode)("v-if", true),
						currentView.value === "month" ? ((0, vue.openBlock)(), (0, vue.createBlock)(require_basic_month_table.default, {
							key: 2,
							ref_key: "currentViewRef",
							ref: currentViewRef,
							"selection-mode": selectionMode.value,
							date: innerDate.value,
							"parsed-value": _ctx.parsedValue,
							"disabled-date": (0, vue.unref)(disabledDate),
							disabled: (0, vue.unref)(dateDisabled),
							"cell-class-name": (0, vue.unref)(cellClassName),
							onPick: handleMonthPick
						}, null, 8, [
							"selection-mode",
							"date",
							"parsed-value",
							"disabled-date",
							"disabled",
							"cell-class-name"
						])) : (0, vue.createCommentVNode)("v-if", true)
					], 34)
				], 2)
			], 2), _ctx.showFooter && footerVisible.value && footerFilled.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 0,
				class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("footer"))
			}, [(0, vue.withDirectives)((0, vue.createVNode)((0, vue.unref)(require_index$5.ElButton), {
				text: "",
				size: "small",
				class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("link-btn")),
				disabled: disabledNow.value,
				onClick: changeToNow
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("el.datepicker.now")), 1)]),
				_: 1
			}, 8, ["class", "disabled"]), [[vue.vShow, !isMultipleType.value && _ctx.showNow]]), _ctx.showConfirm ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$5.ElButton), {
				key: 0,
				plain: "",
				size: "small",
				class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("link-btn")),
				disabled: disabledConfirm.value,
				onClick: onConfirm
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("el.datepicker.confirm")), 1)]),
				_: 1
			}, 8, ["class", "disabled"])) : (0, vue.createCommentVNode)("v-if", true)], 2)) : (0, vue.createCommentVNode)("v-if", true)], 2);
		};
	}
});

//#endregion
exports.default = panel_date_pick_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=panel-date-pick.vue_vue_type_script_setup_true_lang.js.map