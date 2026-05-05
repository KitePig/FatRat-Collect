import { useLocale } from "../../../../hooks/use-locale/index.mjs";
import { ElIcon } from "../../../icon/index.mjs";
import { useFormDisabled } from "../../../form/src/hooks/use-form-common-props.mjs";
import { PICKER_BASE_INJECTION_KEY } from "../../../time-picker/src/constants.mjs";
import { ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY } from "../constants.mjs";
import { correctlyParseUserInput, getDefaultValue, isValidRange } from "../utils.mjs";
import basic_year_table_default from "./basic-year-table.mjs";
import { useRangePicker } from "../composables/use-range-picker.mjs";
import { panelYearRangeEmits, panelYearRangeProps } from "../props/panel-year-range.mjs";
import { useYearRangeHeader } from "../composables/use-year-range-header.mjs";
import { DArrowLeft, DArrowRight } from "@element-plus/icons-vue";
import { Fragment, computed, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, inject, normalizeClass, openBlock, ref, renderList, renderSlot, toDisplayString, toRef, unref, useSlots, watch, withCtx } from "vue";
import dayjs from "dayjs";

//#region ../../packages/components/date-picker-panel/src/date-picker-com/panel-year-range.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["disabled", "onClick"];
const _hoisted_2 = ["disabled"];
const _hoisted_3 = ["disabled"];
const _hoisted_4 = ["disabled"];
const _hoisted_5 = ["disabled"];
const step = 10;
const unit = "year";
var panel_year_range_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "DatePickerYearRange",
	__name: "panel-year-range",
	props: panelYearRangeProps,
	emits: panelYearRangeEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { lang } = useLocale();
		const leftDate = ref(dayjs().locale(lang.value));
		const rightDate = ref(dayjs().locale(lang.value).add(step, unit));
		const isDefaultFormat = inject(ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY, void 0);
		const pickerBase = inject(PICKER_BASE_INJECTION_KEY);
		const { shortcuts, disabledDate, cellClassName } = pickerBase.props;
		const format = toRef(pickerBase.props, "format");
		const defaultValue = toRef(pickerBase.props, "defaultValue");
		const { minDate, maxDate, rangeState, ppNs, drpNs, handleChangeRange, handleRangeConfirm, handleShortcutClick, onSelect, parseValue } = useRangePicker(props, {
			defaultValue,
			leftDate,
			rightDate,
			step,
			unit,
			sortDates
		});
		const { leftPrevYear, rightNextYear, leftNextYear, rightPrevYear, leftLabel, rightLabel, leftYear, rightYear } = useYearRangeHeader({
			unlinkPanels: toRef(props, "unlinkPanels"),
			leftDate,
			rightDate
		});
		const yearRangeDisabled = useFormDisabled();
		const hasShortcuts = computed(() => !!shortcuts.length);
		const panelKls = computed(() => [
			ppNs.b(),
			drpNs.b(),
			ppNs.is("border", props.border),
			ppNs.is("disabled", yearRangeDisabled.value),
			{ "has-sidebar": Boolean(useSlots().sidebar) || hasShortcuts.value }
		]);
		const leftPanelKls = computed(() => {
			return {
				content: [
					ppNs.e("content"),
					drpNs.e("content"),
					"is-left"
				],
				arrowLeftBtn: [ppNs.e("icon-btn"), "d-arrow-left"],
				arrowRightBtn: [
					ppNs.e("icon-btn"),
					ppNs.is("disabled", !enableYearArrow.value || yearRangeDisabled.value),
					"d-arrow-right"
				]
			};
		});
		const rightPanelKls = computed(() => {
			return {
				content: [
					ppNs.e("content"),
					drpNs.e("content"),
					"is-right"
				],
				arrowLeftBtn: [
					ppNs.e("icon-btn"),
					ppNs.is("disabled", !enableYearArrow.value || yearRangeDisabled.value),
					"d-arrow-left"
				],
				arrowRightBtn: [ppNs.e("icon-btn"), "d-arrow-right"]
			};
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
		const parseUserInput = (value) => {
			return correctlyParseUserInput(value, format.value, lang.value, isDefaultFormat);
		};
		const isValidValue = (date) => {
			return isValidRange(date) && (disabledDate ? !disabledDate(date[0].toDate()) && !disabledDate(date[1].toDate()) : true);
		};
		const handleClear = () => {
			let valueOnClear = null;
			if (pickerBase?.emptyValues) valueOnClear = pickerBase.emptyValues.valueOnClear.value;
			const defaultArr = getDefaultValue(unref(defaultValue), {
				lang: unref(lang),
				step,
				unit,
				unlinkPanels: props.unlinkPanels
			});
			leftDate.value = defaultArr[0];
			rightDate.value = defaultArr[1];
			emit("pick", valueOnClear);
		};
		function sortDates(minDate, maxDate) {
			if (props.unlinkPanels && maxDate) {
				const minDateYear = minDate?.year() || 0;
				const maxDateYear = maxDate.year();
				rightDate.value = minDateYear + step > maxDateYear ? maxDate.add(step, unit) : maxDate;
			} else rightDate.value = leftDate.value.add(step, unit);
		}
		watch(() => props.visible, (visible) => {
			if (!visible && rangeState.value.selecting) {
				parseValue(props.parsedValue);
				onSelect(false);
			}
		});
		emit("set-picker-option", ["isValidValue", isValidValue]);
		emit("set-picker-option", ["parseUserInput", parseUserInput]);
		emit("set-picker-option", ["handleClear", handleClear]);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(panelKls.value) }, [createElementVNode("div", { class: normalizeClass(unref(ppNs).e("body-wrapper")) }, [
				renderSlot(_ctx.$slots, "sidebar", { class: normalizeClass(unref(ppNs).e("sidebar")) }),
				hasShortcuts.value ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: normalizeClass(unref(ppNs).e("sidebar"))
				}, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(shortcuts), (shortcut, key) => {
					return openBlock(), createElementBlock("button", {
						key,
						type: "button",
						class: normalizeClass(unref(ppNs).e("shortcut")),
						disabled: unref(yearRangeDisabled),
						onClick: ($event) => unref(handleShortcutClick)(shortcut)
					}, toDisplayString(shortcut.text), 11, _hoisted_1);
				}), 128))], 2)) : createCommentVNode("v-if", true),
				createElementVNode("div", { class: normalizeClass(unref(ppNs).e("body")) }, [createElementVNode("div", { class: normalizeClass(leftPanelKls.value.content) }, [createElementVNode("div", { class: normalizeClass(unref(drpNs).e("header")) }, [
					createElementVNode("button", {
						type: "button",
						class: normalizeClass(leftPanelKls.value.arrowLeftBtn),
						disabled: unref(yearRangeDisabled),
						onClick: _cache[0] || (_cache[0] = (...args) => unref(leftPrevYear) && unref(leftPrevYear)(...args))
					}, [renderSlot(_ctx.$slots, "prev-year", {}, () => [createVNode(unref(ElIcon), null, {
						default: withCtx(() => [createVNode(unref(DArrowLeft))]),
						_: 1
					})])], 10, _hoisted_2),
					_ctx.unlinkPanels ? (openBlock(), createElementBlock("button", {
						key: 0,
						type: "button",
						disabled: !enableYearArrow.value || unref(yearRangeDisabled),
						class: normalizeClass(leftPanelKls.value.arrowRightBtn),
						onClick: _cache[1] || (_cache[1] = (...args) => unref(leftNextYear) && unref(leftNextYear)(...args))
					}, [renderSlot(_ctx.$slots, "next-year", {}, () => [createVNode(unref(ElIcon), null, {
						default: withCtx(() => [createVNode(unref(DArrowRight))]),
						_: 1
					})])], 10, _hoisted_3)) : createCommentVNode("v-if", true),
					createElementVNode("div", null, toDisplayString(unref(leftLabel)), 1)
				], 2), createVNode(basic_year_table_default, {
					"selection-mode": "range",
					date: leftDate.value,
					"min-date": unref(minDate),
					"max-date": unref(maxDate),
					"range-state": unref(rangeState),
					"disabled-date": unref(disabledDate),
					disabled: unref(yearRangeDisabled),
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
				])], 2), createElementVNode("div", { class: normalizeClass(rightPanelKls.value.content) }, [createElementVNode("div", { class: normalizeClass(unref(drpNs).e("header")) }, [
					_ctx.unlinkPanels ? (openBlock(), createElementBlock("button", {
						key: 0,
						type: "button",
						disabled: !enableYearArrow.value || unref(yearRangeDisabled),
						class: normalizeClass(rightPanelKls.value.arrowLeftBtn),
						onClick: _cache[2] || (_cache[2] = (...args) => unref(rightPrevYear) && unref(rightPrevYear)(...args))
					}, [renderSlot(_ctx.$slots, "prev-year", {}, () => [createVNode(unref(ElIcon), null, {
						default: withCtx(() => [createVNode(unref(DArrowLeft))]),
						_: 1
					})])], 10, _hoisted_4)) : createCommentVNode("v-if", true),
					createElementVNode("button", {
						type: "button",
						class: normalizeClass(rightPanelKls.value.arrowRightBtn),
						disabled: unref(yearRangeDisabled),
						onClick: _cache[3] || (_cache[3] = (...args) => unref(rightNextYear) && unref(rightNextYear)(...args))
					}, [renderSlot(_ctx.$slots, "next-year", {}, () => [createVNode(unref(ElIcon), null, {
						default: withCtx(() => [createVNode(unref(DArrowRight))]),
						_: 1
					})])], 10, _hoisted_5),
					createElementVNode("div", null, toDisplayString(unref(rightLabel)), 1)
				], 2), createVNode(basic_year_table_default, {
					"selection-mode": "range",
					date: rightDate.value,
					"min-date": unref(minDate),
					"max-date": unref(maxDate),
					"range-state": unref(rangeState),
					"disabled-date": unref(disabledDate),
					disabled: unref(yearRangeDisabled),
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
export { panel_year_range_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=panel-year-range.vue_vue_type_script_setup_true_lang.mjs.map