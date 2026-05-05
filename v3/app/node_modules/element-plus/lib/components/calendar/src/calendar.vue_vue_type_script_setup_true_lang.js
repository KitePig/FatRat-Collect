const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../button/index.js');
const require_calendar = require('./calendar.js');
const require_date_table = require('./date-table2.js');
const require_use_calendar = require('./use-calendar.js');
const require_select_controller = require('./select-controller2.js');
let vue = require("vue");

//#region ../../packages/components/calendar/src/calendar.vue?vue&type=script&setup=true&lang.ts
const COMPONENT_NAME = "ElCalendar";
var calendar_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: COMPONENT_NAME,
	__name: "calendar",
	props: require_calendar.calendarProps,
	emits: require_calendar.calendarEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const ns = require_index$1.useNamespace("calendar");
		const { calculateValidatedDateRange, date, pickDay, realSelectedDay, selectDate, validatedRange, handleDateChange } = require_use_calendar.useCalendar(__props, __emit, COMPONENT_NAME);
		const { t } = require_index.useLocale();
		const i18nDate = (0, vue.computed)(() => {
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
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).b()) }, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("header")) }, [(0, vue.renderSlot)(_ctx.$slots, "header", { date: i18nDate.value }, () => [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("title")) }, (0, vue.toDisplayString)(i18nDate.value), 3), (0, vue.unref)(validatedRange).length === 0 && __props.controllerType === "button" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 0,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("button-group"))
			}, [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElButtonGroup), null, {
				default: (0, vue.withCtx)(() => [
					(0, vue.createVNode)((0, vue.unref)(require_index$2.ElButton), {
						size: "small",
						onClick: _cache[0] || (_cache[0] = ($event) => (0, vue.unref)(selectDate)("prev-month"))
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("el.datepicker.prevMonth")), 1)]),
						_: 1
					}),
					(0, vue.createVNode)((0, vue.unref)(require_index$2.ElButton), {
						size: "small",
						onClick: _cache[1] || (_cache[1] = ($event) => (0, vue.unref)(selectDate)("today"))
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("el.datepicker.today")), 1)]),
						_: 1
					}),
					(0, vue.createVNode)((0, vue.unref)(require_index$2.ElButton), {
						size: "small",
						onClick: _cache[2] || (_cache[2] = ($event) => (0, vue.unref)(selectDate)("next-month"))
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("el.datepicker.nextMonth")), 1)]),
						_: 1
					})
				]),
				_: 1
			})], 2)) : (0, vue.unref)(validatedRange).length === 0 && __props.controllerType === "select" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 1,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("select-controller"))
			}, [(0, vue.createVNode)(require_select_controller.default, {
				date: (0, vue.unref)(date),
				formatter: __props.formatter,
				onDateChange: (0, vue.unref)(handleDateChange)
			}, null, 8, [
				"date",
				"formatter",
				"onDateChange"
			])], 2)) : (0, vue.createCommentVNode)("v-if", true)])], 2), (0, vue.unref)(validatedRange).length === 0 ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 0,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("body"))
			}, [(0, vue.createVNode)(require_date_table.default, {
				date: (0, vue.unref)(date),
				"selected-day": (0, vue.unref)(realSelectedDay),
				onPick: (0, vue.unref)(pickDay)
			}, (0, vue.createSlots)({ _: 2 }, [_ctx.$slots["date-cell"] ? {
				name: "date-cell",
				fn: (0, vue.withCtx)((data) => [(0, vue.renderSlot)(_ctx.$slots, "date-cell", (0, vue.normalizeProps)((0, vue.guardReactiveProps)(data)))]),
				key: "0"
			} : void 0]), 1032, [
				"date",
				"selected-day",
				"onPick"
			])], 2)) : ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 1,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("body"))
			}, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(validatedRange), (range_, index) => {
				return (0, vue.openBlock)(), (0, vue.createBlock)(require_date_table.default, {
					key: index,
					date: range_[0],
					"selected-day": (0, vue.unref)(realSelectedDay),
					range: range_,
					"hide-header": index !== 0,
					onPick: (0, vue.unref)(pickDay)
				}, (0, vue.createSlots)({ _: 2 }, [_ctx.$slots["date-cell"] ? {
					name: "date-cell",
					fn: (0, vue.withCtx)((data) => [(0, vue.renderSlot)(_ctx.$slots, "date-cell", (0, vue.mergeProps)({ ref_for: true }, data))]),
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
exports.default = calendar_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=calendar.vue_vue_type_script_setup_true_lang.js.map