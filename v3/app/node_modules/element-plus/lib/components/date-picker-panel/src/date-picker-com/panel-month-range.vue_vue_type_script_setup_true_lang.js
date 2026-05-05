const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../icon/index.js');
const require_use_form_common_props = require('../../../form/src/hooks/use-form-common-props.js');
const require_constants = require('../../../time-picker/src/constants.js');
const require_constants$1 = require('../constants.js');
const require_utils = require('../utils.js');
const require_basic_month_table = require('./basic-month-table.js');
const require_use_range_picker = require('../composables/use-range-picker.js');
const require_panel_month_range = require('../props/panel-month-range.js');
const require_use_month_range_header = require('../composables/use-month-range-header.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
let dayjs = require("dayjs");
dayjs = require_runtime.__toESM(dayjs);

//#region ../../packages/components/date-picker-panel/src/date-picker-com/panel-month-range.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["disabled", "onClick"];
const _hoisted_2 = ["disabled"];
const _hoisted_3 = ["disabled"];
const _hoisted_4 = ["disabled"];
const _hoisted_5 = ["disabled"];
const unit = "year";
var panel_month_range_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "DatePickerMonthRange",
	__name: "panel-month-range",
	props: require_panel_month_range.panelMonthRangeProps,
	emits: require_panel_month_range.panelMonthRangeEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { lang } = require_index.useLocale();
		const pickerBase = (0, vue.inject)(require_constants.PICKER_BASE_INJECTION_KEY);
		const isDefaultFormat = (0, vue.inject)(require_constants$1.ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY, void 0);
		const { shortcuts, disabledDate, cellClassName } = pickerBase.props;
		const format = (0, vue.toRef)(pickerBase.props, "format");
		const defaultValue = (0, vue.toRef)(pickerBase.props, "defaultValue");
		const leftDate = (0, vue.ref)((0, dayjs.default)().locale(lang.value));
		const rightDate = (0, vue.ref)((0, dayjs.default)().locale(lang.value).add(1, unit));
		const { minDate, maxDate, rangeState, ppNs, drpNs, handleChangeRange, handleRangeConfirm, handleShortcutClick, onSelect, parseValue } = require_use_range_picker.useRangePicker(props, {
			defaultValue,
			leftDate,
			rightDate,
			unit,
			sortDates
		});
		const hasShortcuts = (0, vue.computed)(() => !!shortcuts.length);
		const { leftPrevYear, rightNextYear, leftNextYear, rightPrevYear, leftLabel, rightLabel, leftYear, rightYear } = require_use_month_range_header.useMonthRangeHeader({
			unlinkPanels: (0, vue.toRef)(props, "unlinkPanels"),
			leftDate,
			rightDate
		});
		const enableYearArrow = (0, vue.computed)(() => {
			return props.unlinkPanels && rightYear.value > leftYear.value + 1;
		});
		const handleRangePick = (val, close = true) => {
			const minDate_ = val.minDate;
			const maxDate_ = val.maxDate;
			if (maxDate.value === maxDate_ && minDate.value === minDate_) return;
			emit("calendar-change", [minDate_.toDate(), maxDate_ && maxDate_.toDate()]);
			maxDate.value = maxDate_;
			minDate.value = minDate_;
			if (!close) return;
			handleRangeConfirm();
		};
		const handleClear = () => {
			let valueOnClear = null;
			if (pickerBase?.emptyValues) valueOnClear = pickerBase.emptyValues.valueOnClear.value;
			leftDate.value = require_utils.getDefaultValue((0, vue.unref)(defaultValue), {
				lang: (0, vue.unref)(lang),
				unit: "year",
				unlinkPanels: props.unlinkPanels
			})[0];
			rightDate.value = leftDate.value.add(1, "year");
			emit("pick", valueOnClear);
		};
		const parseUserInput = (value) => {
			return require_utils.correctlyParseUserInput(value, format.value, lang.value, isDefaultFormat);
		};
		function sortDates(minDate, maxDate) {
			if (props.unlinkPanels && maxDate) rightDate.value = (minDate?.year() || 0) === maxDate.year() ? maxDate.add(1, unit) : maxDate;
			else rightDate.value = leftDate.value.add(1, unit);
		}
		const monthRangeDisabled = require_use_form_common_props.useFormDisabled();
		(0, vue.watch)(() => props.visible, (visible) => {
			if (!visible && rangeState.value.selecting) {
				parseValue(props.parsedValue);
				onSelect(false);
			}
		});
		emit("set-picker-option", ["isValidValue", require_utils.isValidRange]);
		emit("set-picker-option", ["parseUserInput", parseUserInput]);
		emit("set-picker-option", ["handleClear", handleClear]);
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)([
				(0, vue.unref)(ppNs).b(),
				(0, vue.unref)(drpNs).b(),
				(0, vue.unref)(ppNs).is("border", _ctx.border),
				(0, vue.unref)(ppNs).is("disabled", (0, vue.unref)(monthRangeDisabled)),
				{ "has-sidebar": Boolean(_ctx.$slots.sidebar) || hasShortcuts.value }
			]) }, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("body-wrapper")) }, [
				(0, vue.renderSlot)(_ctx.$slots, "sidebar", { class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("sidebar")) }),
				hasShortcuts.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("sidebar"))
				}, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(shortcuts), (shortcut, key) => {
					return (0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
						key,
						type: "button",
						class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("shortcut")),
						disabled: (0, vue.unref)(monthRangeDisabled),
						onClick: ($event) => (0, vue.unref)(handleShortcutClick)(shortcut)
					}, (0, vue.toDisplayString)(shortcut.text), 11, _hoisted_1);
				}), 128))], 2)) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ppNs).e("body")) }, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)([[(0, vue.unref)(ppNs).e("content"), (0, vue.unref)(drpNs).e("content")], "is-left"]) }, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(drpNs).e("header")) }, [
					(0, vue.createElementVNode)("button", {
						type: "button",
						class: (0, vue.normalizeClass)([(0, vue.unref)(ppNs).e("icon-btn"), "d-arrow-left"]),
						disabled: (0, vue.unref)(monthRangeDisabled),
						onClick: _cache[0] || (_cache[0] = (...args) => (0, vue.unref)(leftPrevYear) && (0, vue.unref)(leftPrevYear)(...args))
					}, [(0, vue.renderSlot)(_ctx.$slots, "prev-year", {}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$1.ElIcon), null, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.DArrowLeft))]),
						_: 1
					})])], 10, _hoisted_2),
					_ctx.unlinkPanels ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
						key: 0,
						type: "button",
						disabled: !enableYearArrow.value || (0, vue.unref)(monthRangeDisabled),
						class: (0, vue.normalizeClass)([[(0, vue.unref)(ppNs).e("icon-btn"), (0, vue.unref)(ppNs).is("disabled", !enableYearArrow.value || (0, vue.unref)(monthRangeDisabled))], "d-arrow-right"]),
						onClick: _cache[1] || (_cache[1] = (...args) => (0, vue.unref)(leftNextYear) && (0, vue.unref)(leftNextYear)(...args))
					}, [(0, vue.renderSlot)(_ctx.$slots, "next-year", {}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$1.ElIcon), null, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.DArrowRight))]),
						_: 1
					})])], 10, _hoisted_3)) : (0, vue.createCommentVNode)("v-if", true),
					(0, vue.createElementVNode)("div", null, (0, vue.toDisplayString)((0, vue.unref)(leftLabel)), 1)
				], 2), (0, vue.createVNode)(require_basic_month_table.default, {
					"selection-mode": "range",
					date: leftDate.value,
					"min-date": (0, vue.unref)(minDate),
					"max-date": (0, vue.unref)(maxDate),
					"range-state": (0, vue.unref)(rangeState),
					"disabled-date": (0, vue.unref)(disabledDate),
					disabled: (0, vue.unref)(monthRangeDisabled),
					"cell-class-name": (0, vue.unref)(cellClassName),
					onChangerange: (0, vue.unref)(handleChangeRange),
					onPick: handleRangePick,
					onSelect: (0, vue.unref)(onSelect)
				}, null, 8, [
					"date",
					"min-date",
					"max-date",
					"range-state",
					"disabled-date",
					"disabled",
					"cell-class-name",
					"onChangerange",
					"onSelect"
				])], 2), (0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)([[(0, vue.unref)(ppNs).e("content"), (0, vue.unref)(drpNs).e("content")], "is-right"]) }, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(drpNs).e("header")) }, [
					_ctx.unlinkPanels ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
						key: 0,
						type: "button",
						disabled: !enableYearArrow.value || (0, vue.unref)(monthRangeDisabled),
						class: (0, vue.normalizeClass)([[(0, vue.unref)(ppNs).e("icon-btn"), (0, vue.unref)(ppNs).is("disabled", !enableYearArrow.value || (0, vue.unref)(monthRangeDisabled))], "d-arrow-left"]),
						onClick: _cache[2] || (_cache[2] = (...args) => (0, vue.unref)(rightPrevYear) && (0, vue.unref)(rightPrevYear)(...args))
					}, [(0, vue.renderSlot)(_ctx.$slots, "prev-year", {}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$1.ElIcon), null, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.DArrowLeft))]),
						_: 1
					})])], 10, _hoisted_4)) : (0, vue.createCommentVNode)("v-if", true),
					(0, vue.createElementVNode)("button", {
						type: "button",
						class: (0, vue.normalizeClass)([(0, vue.unref)(ppNs).e("icon-btn"), "d-arrow-right"]),
						disabled: (0, vue.unref)(monthRangeDisabled),
						onClick: _cache[3] || (_cache[3] = (...args) => (0, vue.unref)(rightNextYear) && (0, vue.unref)(rightNextYear)(...args))
					}, [(0, vue.renderSlot)(_ctx.$slots, "next-year", {}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$1.ElIcon), null, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.DArrowRight))]),
						_: 1
					})])], 10, _hoisted_5),
					(0, vue.createElementVNode)("div", null, (0, vue.toDisplayString)((0, vue.unref)(rightLabel)), 1)
				], 2), (0, vue.createVNode)(require_basic_month_table.default, {
					"selection-mode": "range",
					date: rightDate.value,
					"min-date": (0, vue.unref)(minDate),
					"max-date": (0, vue.unref)(maxDate),
					"range-state": (0, vue.unref)(rangeState),
					"disabled-date": (0, vue.unref)(disabledDate),
					disabled: (0, vue.unref)(monthRangeDisabled),
					"cell-class-name": (0, vue.unref)(cellClassName),
					onChangerange: (0, vue.unref)(handleChangeRange),
					onPick: handleRangePick,
					onSelect: (0, vue.unref)(onSelect)
				}, null, 8, [
					"date",
					"min-date",
					"max-date",
					"range-state",
					"disabled-date",
					"disabled",
					"cell-class-name",
					"onChangerange",
					"onSelect"
				])], 2)], 2)
			], 2)], 2);
		};
	}
});

//#endregion
exports.default = panel_month_range_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=panel-month-range.vue_vue_type_script_setup_true_lang.js.map