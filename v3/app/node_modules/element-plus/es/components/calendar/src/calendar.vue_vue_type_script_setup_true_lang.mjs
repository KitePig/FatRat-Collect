import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElButton, ElButtonGroup } from "../../button/index.mjs";
import { calendarEmits, calendarProps } from "./calendar.mjs";
import date_table_default from "./date-table2.mjs";
import { useCalendar } from "./use-calendar.mjs";
import select_controller_default from "./select-controller2.mjs";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createSlots, createTextVNode, createVNode, defineComponent, guardReactiveProps, mergeProps, normalizeClass, normalizeProps, openBlock, renderList, renderSlot, toDisplayString, unref, withCtx } from "vue";

//#region ../../packages/components/calendar/src/calendar.vue?vue&type=script&setup=true&lang.ts
const COMPONENT_NAME = "ElCalendar";
var calendar_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: COMPONENT_NAME,
	__name: "calendar",
	props: calendarProps,
	emits: calendarEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const ns = useNamespace("calendar");
		const { calculateValidatedDateRange, date, pickDay, realSelectedDay, selectDate, validatedRange, handleDateChange } = useCalendar(__props, __emit, COMPONENT_NAME);
		const { t } = useLocale();
		const i18nDate = computed(() => {
			const pickedMonth = `el.datepicker.month${date.value.format("M")}`;
			return `${date.value.year()} ${t("el.datepicker.year")} ${t(pickedMonth)}`;
		});
		__expose({
			selectedDay: realSelectedDay,
			pickDay,
			selectDate,
			calculateValidatedDateRange
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(ns).b()) }, [createElementVNode("div", { class: normalizeClass(unref(ns).e("header")) }, [renderSlot(_ctx.$slots, "header", { date: i18nDate.value }, () => [createElementVNode("div", { class: normalizeClass(unref(ns).e("title")) }, toDisplayString(i18nDate.value), 3), unref(validatedRange).length === 0 && __props.controllerType === "button" ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: normalizeClass(unref(ns).e("button-group"))
			}, [createVNode(unref(ElButtonGroup), null, {
				default: withCtx(() => [
					createVNode(unref(ElButton), {
						size: "small",
						onClick: _cache[0] || (_cache[0] = ($event) => unref(selectDate)("prev-month"))
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("el.datepicker.prevMonth")), 1)]),
						_: 1
					}),
					createVNode(unref(ElButton), {
						size: "small",
						onClick: _cache[1] || (_cache[1] = ($event) => unref(selectDate)("today"))
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("el.datepicker.today")), 1)]),
						_: 1
					}),
					createVNode(unref(ElButton), {
						size: "small",
						onClick: _cache[2] || (_cache[2] = ($event) => unref(selectDate)("next-month"))
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("el.datepicker.nextMonth")), 1)]),
						_: 1
					})
				]),
				_: 1
			})], 2)) : unref(validatedRange).length === 0 && __props.controllerType === "select" ? (openBlock(), createElementBlock("div", {
				key: 1,
				class: normalizeClass(unref(ns).e("select-controller"))
			}, [createVNode(select_controller_default, {
				date: unref(date),
				formatter: __props.formatter,
				onDateChange: unref(handleDateChange)
			}, null, 8, [
				"date",
				"formatter",
				"onDateChange"
			])], 2)) : createCommentVNode("v-if", true)])], 2), unref(validatedRange).length === 0 ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: normalizeClass(unref(ns).e("body"))
			}, [createVNode(date_table_default, {
				date: unref(date),
				"selected-day": unref(realSelectedDay),
				onPick: unref(pickDay)
			}, createSlots({ _: 2 }, [_ctx.$slots["date-cell"] ? {
				name: "date-cell",
				fn: withCtx((data) => [renderSlot(_ctx.$slots, "date-cell", normalizeProps(guardReactiveProps(data)))]),
				key: "0"
			} : void 0]), 1032, [
				"date",
				"selected-day",
				"onPick"
			])], 2)) : (openBlock(), createElementBlock("div", {
				key: 1,
				class: normalizeClass(unref(ns).e("body"))
			}, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(validatedRange), (range_, index) => {
				return openBlock(), createBlock(date_table_default, {
					key: index,
					date: range_[0],
					"selected-day": unref(realSelectedDay),
					range: range_,
					"hide-header": index !== 0,
					onPick: unref(pickDay)
				}, createSlots({ _: 2 }, [_ctx.$slots["date-cell"] ? {
					name: "date-cell",
					fn: withCtx((data) => [renderSlot(_ctx.$slots, "date-cell", mergeProps({ ref_for: true }, data))]),
					key: "0"
				} : void 0]), 1032, [
					"date",
					"selected-day",
					"range",
					"hide-header",
					"onPick"
				]);
			}), 128))], 2))], 2);
		};
	}
});

//#endregion
export { calendar_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=calendar.vue_vue_type_script_setup_true_lang.mjs.map