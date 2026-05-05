import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { dateTableEmits, dateTableProps } from "./date-table.mjs";
import { useDateTable } from "./use-date-table.mjs";
import { Fragment, createCommentVNode, createElementBlock, createElementVNode, defineComponent, normalizeClass, openBlock, renderList, renderSlot, toDisplayString, unref } from "vue";

//#region ../../packages/components/calendar/src/date-table.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = { key: 0 };
const _hoisted_2 = ["onClick"];
var date_table_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "DateTable",
	__name: "date-table",
	props: dateTableProps,
	emits: dateTableEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const { isInRange, now, rows, weekDays, getFormattedDate, handlePickDay, getSlotData } = useDateTable(props, __emit);
		const nsTable = useNamespace("calendar-table");
		const nsDay = useNamespace("calendar-day");
		const getCellClass = ({ text, type }) => {
			const classes = [type];
			if (type === "current") {
				const date = getFormattedDate(text, type);
				if (date.isSame(props.selectedDay, "day")) classes.push(nsDay.is("selected"));
				if (date.isSame(now, "day")) classes.push(nsDay.is("today"));
			}
			return classes;
		};
		__expose({ getFormattedDate });
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("table", {
				class: normalizeClass([unref(nsTable).b(), unref(nsTable).is("range", unref(isInRange))]),
				cellspacing: "0",
				cellpadding: "0"
			}, [!__props.hideHeader ? (openBlock(), createElementBlock("thead", _hoisted_1, [createElementVNode("tr", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(weekDays), (day) => {
				return openBlock(), createElementBlock("th", {
					key: day,
					scope: "col"
				}, toDisplayString(day), 1);
			}), 128))])])) : createCommentVNode("v-if", true), createElementVNode("tbody", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(rows), (row, index) => {
				return openBlock(), createElementBlock("tr", {
					key: index,
					class: normalizeClass({
						[unref(nsTable).e("row")]: true,
						[unref(nsTable).em("row", "hide-border")]: index === 0 && __props.hideHeader
					})
				}, [(openBlock(true), createElementBlock(Fragment, null, renderList(row, (cell, key) => {
					return openBlock(), createElementBlock("td", {
						key,
						class: normalizeClass(getCellClass(cell)),
						onClick: ($event) => unref(handlePickDay)(cell)
					}, [createElementVNode("div", { class: normalizeClass(unref(nsDay).b()) }, [renderSlot(_ctx.$slots, "date-cell", { data: unref(getSlotData)(cell) }, () => [createElementVNode("span", null, toDisplayString(cell.text), 1)])], 2)], 10, _hoisted_2);
				}), 128))], 2);
			}), 128))])], 2);
		};
	}
});

//#endregion
export { date_table_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=date-table.vue_vue_type_script_setup_true_lang.mjs.map