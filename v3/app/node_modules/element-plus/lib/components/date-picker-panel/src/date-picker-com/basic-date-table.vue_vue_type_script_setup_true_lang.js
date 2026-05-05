const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_basic_date_table = require('../props/basic-date-table.js');
const require_use_basic_date_table = require('../composables/use-basic-date-table.js');
const require_basic_cell_render = require('./basic-cell-render.js');
let vue = require("vue");

//#region ../../packages/components/date-picker-panel/src/date-picker-com/basic-date-table.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = [
	"aria-current",
	"aria-selected",
	"tabindex",
	"aria-disabled"
];
var basic_date_table_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	__name: "basic-date-table",
	props: require_basic_date_table.basicDateTableProps,
	emits: require_basic_date_table.basicDateTableEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const { WEEKS, rows, tbodyRef, currentCellRef, focus, isCurrent, isWeekActive, isSelectedCell, handlePickDate, handleMouseUp, handleMouseDown, handleMouseMove, handleFocus } = require_use_basic_date_table.useBasicDateTable(props, __emit);
		const { tableLabel, tableKls, getCellClasses, getRowKls, weekHeaderClass, t } = require_use_basic_date_table.useBasicDateTableDOM(props, {
			isCurrent,
			isWeekActive
		});
		let isUnmounting = false;
		(0, vue.onBeforeUnmount)(() => {
			isUnmounting = true;
		});
		__expose({ focus });
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("table", {
				"aria-label": (0, vue.unref)(tableLabel),
				class: (0, vue.normalizeClass)((0, vue.unref)(tableKls)),
				cellspacing: "0",
				cellpadding: "0",
				role: "grid",
				onClick: _cache[1] || (_cache[1] = (...args) => (0, vue.unref)(handlePickDate) && (0, vue.unref)(handlePickDate)(...args)),
				onMousemove: _cache[2] || (_cache[2] = (...args) => (0, vue.unref)(handleMouseMove) && (0, vue.unref)(handleMouseMove)(...args)),
				onMousedown: _cache[3] || (_cache[3] = (...args) => (0, vue.unref)(handleMouseDown) && (0, vue.unref)(handleMouseDown)(...args)),
				onMouseup: _cache[4] || (_cache[4] = (...args) => (0, vue.unref)(handleMouseUp) && (0, vue.unref)(handleMouseUp)(...args))
			}, [(0, vue.createElementVNode)("tbody", {
				ref_key: "tbodyRef",
				ref: tbodyRef
			}, [(0, vue.createElementVNode)("tr", null, [_ctx.showWeekNumber ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("th", {
				key: 0,
				scope: "col",
				class: (0, vue.normalizeClass)((0, vue.unref)(weekHeaderClass))
			}, null, 2)) : (0, vue.createCommentVNode)("v-if", true), ((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(WEEKS), (week, key) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("th", {
					key,
					"aria-label": (0, vue.unref)(t)("el.datepicker.weeksFull." + week),
					scope: "col"
				}, (0, vue.toDisplayString)((0, vue.unref)(t)("el.datepicker.weeks." + week)), 9, _hoisted_2);
			}), 128))]), ((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(rows), (row, rowKey) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("tr", {
					key: rowKey,
					class: (0, vue.normalizeClass)((0, vue.unref)(getRowKls)(_ctx.showWeekNumber ? row[2] : row[1]))
				}, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(row, (cell, columnKey) => {
					return (0, vue.openBlock)(), (0, vue.createElementBlock)("td", {
						key: `${rowKey}.${columnKey}`,
						ref_for: true,
						ref: (el) => !(0, vue.unref)(isUnmounting) && (0, vue.unref)(isSelectedCell)(cell) && (currentCellRef.value = el),
						class: (0, vue.normalizeClass)((0, vue.unref)(getCellClasses)(cell)),
						"aria-current": cell.isCurrent ? "date" : void 0,
						"aria-selected": cell.isCurrent,
						tabindex: _ctx.disabled ? void 0 : (0, vue.unref)(isSelectedCell)(cell) ? 0 : -1,
						"aria-disabled": _ctx.disabled,
						onFocus: _cache[0] || (_cache[0] = (...args) => (0, vue.unref)(handleFocus) && (0, vue.unref)(handleFocus)(...args))
					}, [(0, vue.createVNode)((0, vue.unref)(require_basic_cell_render.default), { cell }, null, 8, ["cell"])], 42, _hoisted_3);
				}), 128))], 2);
			}), 128))], 512)], 42, _hoisted_1);
		};
	}
});

//#endregion
exports.default = basic_date_table_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=basic-date-table.vue_vue_type_script_setup_true_lang.js.map