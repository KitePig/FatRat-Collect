const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../button/index.js');
const require_select_controller = require('./select-controller.js');
const require_index$3 = require('../../select/index.js');
let vue = require("vue");
let dayjs = require("dayjs");
dayjs = require_runtime.__toESM(dayjs);
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/calendar/src/select-controller.vue?vue&type=script&setup=true&lang.ts
var select_controller_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "SelectController",
	__name: "select-controller",
	props: require_select_controller.selectControllerProps,
	emits: require_select_controller.selectControllerEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const nsSelect = require_index$1.useNamespace("calendar-select");
		const { t, lang } = require_index.useLocale();
		const monthOptions = Array.from({ length: 12 }, (_, index) => {
			const actualMonth = index + 1;
			return {
				value: actualMonth,
				label: (0, _vue_shared.isFunction)(props.formatter) ? props.formatter(actualMonth, "month") : actualMonth
			};
		});
		const yearValue = (0, vue.computed)(() => props.date.year());
		const monthValue = (0, vue.computed)(() => props.date.month() + 1);
		const yearOptions = (0, vue.computed)(() => {
			const years = [];
			for (let i = -10; i < 10; i++) {
				const year = yearValue.value + i;
				if (year > 0) {
					const label = (0, _vue_shared.isFunction)(props.formatter) ? props.formatter(year, "year") : year;
					years.push({
						value: year,
						label
					});
				}
			}
			return years;
		});
		const handleYearChange = (year) => {
			emit("date-change", (0, dayjs.default)(new Date(year, monthValue.value - 1, 1)).locale(lang.value));
		};
		const handleMonthChange = (month) => {
			emit("date-change", (0, dayjs.default)(new Date(yearValue.value, month - 1, 1)).locale(lang.value));
		};
		const selectToday = () => {
			emit("date-change", "today");
		};
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, null, [
				(0, vue.createVNode)((0, vue.unref)(require_index$3.ElSelect), {
					"model-value": yearValue.value,
					size: "small",
					class: (0, vue.normalizeClass)((0, vue.unref)(nsSelect).e("year")),
					"validate-event": false,
					options: yearOptions.value,
					onChange: handleYearChange
				}, null, 8, [
					"model-value",
					"class",
					"options"
				]),
				(0, vue.createVNode)((0, vue.unref)(require_index$3.ElSelect), {
					"model-value": monthValue.value,
					size: "small",
					class: (0, vue.normalizeClass)((0, vue.unref)(nsSelect).e("month")),
					"validate-event": false,
					options: (0, vue.unref)(monthOptions),
					onChange: handleMonthChange
				}, null, 8, [
					"model-value",
					"class",
					"options"
				]),
				(0, vue.createVNode)((0, vue.unref)(require_index$2.ElButton), {
					size: "small",
					onClick: selectToday
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("el.datepicker.today")), 1)]),
					_: 1
				})
			], 64);
		};
	}
});

//#endregion
exports.default = select_controller_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=select-controller.vue_vue_type_script_setup_true_lang.js.map