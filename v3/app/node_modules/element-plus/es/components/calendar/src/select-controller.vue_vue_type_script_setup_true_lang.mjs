import { isFunction } from "../../../utils/types.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElButton } from "../../button/index.mjs";
import { selectControllerEmits, selectControllerProps } from "./select-controller.mjs";
import { ElSelect } from "../../select/index.mjs";
import { Fragment, computed, createElementBlock, createTextVNode, createVNode, defineComponent, normalizeClass, openBlock, toDisplayString, unref, withCtx } from "vue";
import dayjs from "dayjs";

//#region ../../packages/components/calendar/src/select-controller.vue?vue&type=script&setup=true&lang.ts
var select_controller_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "SelectController",
	__name: "select-controller",
	props: selectControllerProps,
	emits: selectControllerEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const nsSelect = useNamespace("calendar-select");
		const { t, lang } = useLocale();
		const monthOptions = Array.from({ length: 12 }, (_, index) => {
			const actualMonth = index + 1;
			return {
				value: actualMonth,
				label: isFunction(props.formatter) ? props.formatter(actualMonth, "month") : actualMonth
			};
		});
		const yearValue = computed(() => props.date.year());
		const monthValue = computed(() => props.date.month() + 1);
		const yearOptions = computed(() => {
			const years = [];
			for (let i = -10; i < 10; i++) {
				const year = yearValue.value + i;
				if (year > 0) {
					const label = isFunction(props.formatter) ? props.formatter(year, "year") : year;
					years.push({
						value: year,
						label
					});
				}
			}
			return years;
		});
		const handleYearChange = (year) => {
			emit("date-change", dayjs(new Date(year, monthValue.value - 1, 1)).locale(lang.value));
		};
		const handleMonthChange = (month) => {
			emit("date-change", dayjs(new Date(yearValue.value, month - 1, 1)).locale(lang.value));
		};
		const selectToday = () => {
			emit("date-change", "today");
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [
				createVNode(unref(ElSelect), {
					"model-value": yearValue.value,
					size: "small",
					class: normalizeClass(unref(nsSelect).e("year")),
					"validate-event": false,
					options: yearOptions.value,
					onChange: handleYearChange
				}, null, 8, [
					"model-value",
					"class",
					"options"
				]),
				createVNode(unref(ElSelect), {
					"model-value": monthValue.value,
					size: "small",
					class: normalizeClass(unref(nsSelect).e("month")),
					"validate-event": false,
					options: unref(monthOptions),
					onChange: handleMonthChange
				}, null, 8, [
					"model-value",
					"class",
					"options"
				]),
				createVNode(unref(ElButton), {
					size: "small",
					onClick: selectToday
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("el.datepicker.today")), 1)]),
					_: 1
				})
			], 64);
		};
	}
});

//#endregion
export { select_controller_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=select-controller.vue_vue_type_script_setup_true_lang.mjs.map