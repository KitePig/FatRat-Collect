import { useLocale } from "../../../../hooks/use-locale/index.mjs";
import { ElIcon } from "../../../icon/index.mjs";
import { useFormDisabled } from "../../../form/src/hooks/use-form-common-props.mjs";
import { PICKER_BASE_INJECTION_KEY } from "../../../time-picker/src/constants.mjs";
import { ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY } from "../constants.mjs";
import { correctlyParseUserInput, getDefaultValue, isValidRange } from "../utils.mjs";
import basic_month_table_default from "./basic-month-table.mjs";
import { useRangePicker } from "../composables/use-range-picker.mjs";
import { panelMonthRangeEmits, panelMonthRangeProps } from "../props/panel-month-range.mjs";
import { useMonthRangeHeader } from "../composables/use-month-range-header.mjs";
import { DArrowLeft, DArrowRight } from "@element-plus/icons-vue";
import { Fragment, computed, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, inject, normalizeClass, openBlock, ref, renderList, renderSlot, toDisplayString, toRef, unref, watch, withCtx } from "vue";
import dayjs from "dayjs";

//#region ../../packages/components/date-picker-panel/src/date-picker-com/panel-month-range.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["disabled", "onClick"];
const _hoisted_2 = ["disabled"];
const _hoisted_3 = ["disabled"];
const _hoisted_4 = ["disabled"];
const _hoisted_5 = ["disabled"];
const unit = "year";
var panel_month_range_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "DatePickerMonthRange",
	__name: "panel-month-range",
	props: panelMonthRangeProps,
	emits: panelMonthRangeEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { lang } = useLocale();
		const pickerBase = inject(PICKER_BASE_INJECTION_KEY);
		const isDefaultFormat = inject(ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY, void 0);
		const { shortcuts, disabledDate, cellClassName } = pickerBase.props;
		const format = toRef(pickerBase.props, "format");
		const defaultValue = toRef(pickerBase.props, "defaultValue");
		const leftDate = ref(dayjs().locale(lang.value));
		const rightDate = ref(dayjs().locale(lang.value).add(1, unit));
		const { minDate, maxDate, rangeState, ppNs, drpNs, handleChangeRange, handleRangeConfirm, handleShortcutClick, onSelect, parseValue } = useRangePicker(props, {
			defaultValue,
			leftDate,
			rightDate,
			unit,
			sortDates
		});
		const hasShortcuts = computed(() => !!shortcuts.length);
		const { leftPrevYear, rightNextYear, leftNextYear, rightPrevYear, leftLabel, rightLabel, leftYear, rightYear } = useMonthRangeHeader({
			unlinkPanels: toRef(props, "unlinkPanels"),
			leftDate,
			rightDate
		});
		const enableYearArrow = computed(() => {
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
			leftDate.value = getDefaultValue(unref(defaultValue), {
				lang: unref(lang),
				unit: "year",
				unlinkPanels: props.unlinkPanels
			})[0];
			rightDate.value = leftDate.value.add(1, "year");
			emit("pick", valueOnClear);
		};
		const parseUserInput = (value) => {
			return correctlyParseUserInput(value, format.value, lang.value, isDefaultFormat);
		};
		function sortDates(minDate, maxDate) {
			if (props.unlinkPanels && maxDate) rightDate.value = (minDate?.year() || 0) === maxDate.year() ? maxDate.add(1, unit) : maxDate;
			else rightDate.value = leftDate.value.add(1, unit);
		}
		const monthRangeDisabled = useFormDisabled();
		watch(() => props.visible, (visible) => {
			if (!visible && rangeState.value.selecting) {
				parseValue(props.parsedValue);
				onSelect(false);
			}
		});
		emit("set-picker-option", ["isValidValue", isValidRange]);
		emit("set-picker-option", ["parseUserInput", parseUserInput]);
		emit("set-picker-option", ["handleClear", handleClear]);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass([
				unref(ppNs).b(),
				unref(drpNs).b(),
				unref(ppNs).is("border", _ctx.border),
				unref(ppNs).is("disabled", unref(monthRangeDisabled)),
				{ "has-sidebar": Boolean(_ctx.$slots.sidebar) || hasShortcuts.value }
			]) }, [createElementVNode("div", { class: normalizeClass(unref(ppNs).e("body-wrapper")) }, [
				renderSlot(_ctx.$slots, "sidebar", { class: normalizeClass(unref(ppNs).e("sidebar")) }),
				hasShortcuts.value ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: normalizeClass(unref(ppNs).e("sidebar"))
				}, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(shortcuts), (shortcut, key) => {
					return openBlock(), createElementBlock("button", {
						key,
						type: "button",
						class: normalizeClass(unref(ppNs).e("shortcut")),
						disabled: unref(monthRangeDisabled),
						onClick: ($event) => unref(handleShortcutClick)(shortcut)
					}, toDisplayString(shortcut.text), 11, _hoisted_1);
				}), 128))], 2)) : createCommentVNode("v-if", true),
				createElementVNode("div", { class: normalizeClass(unref(ppNs).e("body")) }, [createElementVNode("div", { class: normalizeClass([[unref(ppNs).e("content"), unref(drpNs).e("content")], "is-left"]) }, [createElementVNode("div", { class: normalizeClass(unref(drpNs).e("header")) }, [
					createElementVNode("button", {
						type: "button",
						class: normalizeClass([unref(ppNs).e("icon-btn"), "d-arrow-left"]),
						disabled: unref(monthRangeDisabled),
						onClick: _cache[0] || (_cache[0] = (...args) => unref(leftPrevYear) && unref(leftPrevYear)(...args))
					}, [renderSlot(_ctx.$slots, "prev-year", {}, () => [createVNode(unref(ElIcon), null, {
						default: withCtx(() => [createVNode(unref(DArrowLeft))]),
						_: 1
					})])], 10, _hoisted_2),
					_ctx.unlinkPanels ? (openBlock(), createElementBlock("button", {
						key: 0,
						type: "button",
						disabled: !enableYearArrow.value || unref(monthRangeDisabled),
						class: normalizeClass([[unref(ppNs).e("icon-btn"), unref(ppNs).is("disabled", !enableYearArrow.value || unref(monthRangeDisabled))], "d-arrow-right"]),
						onClick: _cache[1] || (_cache[1] = (...args) => unref(leftNextYear) && unref(leftNextYear)(...args))
					}, [renderSlot(_ctx.$slots, "next-year", {}, () => [createVNode(unref(ElIcon), null, {
						default: withCtx(() => [createVNode(unref(DArrowRight))]),
						_: 1
					})])], 10, _hoisted_3)) : createCommentVNode("v-if", true),
					createElementVNode("div", null, toDisplayString(unref(leftLabel)), 1)
				], 2), createVNode(basic_month_table_default, {
					"selection-mode": "range",
					date: leftDate.value,
					"min-date": unref(minDate),
					"max-date": unref(maxDate),
					"range-state": unref(rangeState),
					"disabled-date": unref(disabledDate),
					disabled: unref(monthRangeDisabled),
					"cell-class-name": unref(cellClassName),
					onChangerange: unref(handleChangeRange),
					onPick: handleRangePick,
					onSelect: unref(onSelect)
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
				])], 2), createElementVNode("div", { class: normalizeClass([[unref(ppNs).e("content"), unref(drpNs).e("content")], "is-right"]) }, [createElementVNode("div", { class: normalizeClass(unref(drpNs).e("header")) }, [
					_ctx.unlinkPanels ? (openBlock(), createElementBlock("button", {
						key: 0,
						type: "button",
						disabled: !enableYearArrow.value || unref(monthRangeDisabled),
						class: normalizeClass([[unref(ppNs).e("icon-btn"), unref(ppNs).is("disabled", !enableYearArrow.value || unref(monthRangeDisabled))], "d-arrow-left"]),
						onClick: _cache[2] || (_cache[2] = (...args) => unref(rightPrevYear) && unref(rightPrevYear)(...args))
					}, [renderSlot(_ctx.$slots, "prev-year", {}, () => [createVNode(unref(ElIcon), null, {
						default: withCtx(() => [createVNode(unref(DArrowLeft))]),
						_: 1
					})])], 10, _hoisted_4)) : createCommentVNode("v-if", true),
					createElementVNode("button", {
						type: "button",
						class: normalizeClass([unref(ppNs).e("icon-btn"), "d-arrow-right"]),
						disabled: unref(monthRangeDisabled),
						onClick: _cache[3] || (_cache[3] = (...args) => unref(rightNextYear) && unref(rightNextYear)(...args))
					}, [renderSlot(_ctx.$slots, "next-year", {}, () => [createVNode(unref(ElIcon), null, {
						default: withCtx(() => [createVNode(unref(DArrowRight))]),
						_: 1
					})])], 10, _hoisted_5),
					createElementVNode("div", null, toDisplayString(unref(rightLabel)), 1)
				], 2), createVNode(basic_month_table_default, {
					"selection-mode": "range",
					date: rightDate.value,
					"min-date": unref(minDate),
					"max-date": unref(maxDate),
					"range-state": unref(rangeState),
					"disabled-date": unref(disabledDate),
					disabled: unref(monthRangeDisabled),
					"cell-class-name": unref(cellClassName),
					onChangerange: unref(handleChangeRange),
					onPick: handleRangePick,
					onSelect: unref(onSelect)
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
export { panel_month_range_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=panel-month-range.vue_vue_type_script_setup_true_lang.mjs.map