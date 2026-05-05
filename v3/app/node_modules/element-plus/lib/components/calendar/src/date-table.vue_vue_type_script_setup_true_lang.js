const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_date_table = require('./date-table.js');
const require_use_date_table = require('./use-date-table.js');
let vue = require("vue");

//#region ../../packages/components/calendar/src/date-table.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = { key: 0 };
const _hoisted_2 = ["onClick"];
var date_table_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "DateTable",
	__name: "date-table",
	props: require_date_table.dateTableProps,
	emits: require_date_table.dateTableEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const { isInRange, now, rows, weekDays, getFormattedDate, handlePickDay, getSlotData } = require_use_date_table.useDateTable(props, __emit);
		const nsTable = require_index.useNamespace("calendar-table");
		const nsDay = require_index.useNamespace("calendar-day");
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
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("table", {
				class: (0, vue.normalizeClass)([(0, vue.unref)(nsTable).b(), (0, vue.unref)(nsTable).is("range", (0, vue.unref)(isInRange))]),
				cellspacing: "0",
				cellpadding: "0"
			}, [!__props.hideHeader ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("thead", _hoisted_1, [(0, vue.createElementVNode)("tr", null, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(weekDays), (day) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("th", {
					key: day,
					scope: "col"
				}, (0, vue.toDisplayString)(day), 1);
			}), 128))])])) : (0, vue.createCommentVNode)("v-if", true), (0, vue.createElementVNode)("tbody", null, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(rows), (row, index) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("tr", {
					key: index,
					class: (0, vue.normalizeClass)({
						[(0, vue.unref)(nsTable).e("row")]: true,
						[(0, vue.unref)(nsTable).em("row", "hide-border")]: index === 0 && __props.hideHeader
					})
				}, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(row, (cell, key) => {
					return (0, vue.openBlock)(), (0, vue.createElementBlock)("td", {
						key,
						class: (0, vue.normalizeClass)(getCellClass(cell)),
						onClick: ($event) => (0, vue.unref)(handlePickDay)(cell)
					}, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(nsDay).b()) }, [(0, vue.renderSlot)(_ctx.$slots, "date-cell", { data: (0, vue.unref)(getSlotData)(cell) }, () => [(0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(cell.text), 1)])], 2)], 10, _hoisted_2);
				}), 128))], 2);
			}), 128))])], 2);
		};
	}
});

//#endregion
exports.default = date_table_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=date-table.vue_vue_type_script_setup_true_lang.js.map