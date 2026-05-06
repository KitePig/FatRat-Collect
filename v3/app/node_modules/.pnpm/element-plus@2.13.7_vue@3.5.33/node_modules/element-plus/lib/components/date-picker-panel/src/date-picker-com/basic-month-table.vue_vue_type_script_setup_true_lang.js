const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_style = require('../../../../utils/dom/style.js');
const require_arrays = require('../../../../utils/arrays.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../../hooks/use-namespace/index.js');
const require_utils = require('../utils.js');
const require_basic_cell_render = require('./basic-cell-render.js');
const require_basic_month_table = require('../props/basic-month-table.js');
let vue = require("vue");
let dayjs = require("dayjs");
dayjs = require_runtime.__toESM(dayjs);

//#region ../../packages/components/date-picker-panel/src/date-picker-com/basic-month-table.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = [
	"aria-selected",
	"aria-label",
	"tabindex",
	"onKeydown"
];
var basic_month_table_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	__name: "basic-month-table",
	props: require_basic_month_table.basicMonthTableProps,
	emits: [
		"changerange",
		"pick",
		"select"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = require_index$1.useNamespace("month-table");
		const { t, lang } = require_index.useLocale();
		const tbodyRef = (0, vue.ref)();
		const currentCellRef = (0, vue.ref)();
		const months = (0, vue.ref)(props.date.locale("en").localeData().monthsShort().map((_) => _.toLowerCase()));
		const tableRows = (0, vue.ref)([
			[],
			[],
			[]
		]);
		const lastRow = (0, vue.ref)();
		const lastColumn = (0, vue.ref)();
		const rows = (0, vue.computed)(() => {
			const rows = tableRows.value;
			const now = (0, dayjs.default)().locale(lang.value).startOf("month");
			for (let i = 0; i < 3; i++) {
				const row = rows[i];
				for (let j = 0; j < 4; j++) {
					const cell = row[j] ||= {
						row: i,
						column: j,
						type: "normal",
						inRange: false,
						start: false,
						end: false,
						text: -1,
						disabled: false,
						isSelected: false,
						customClass: void 0,
						date: void 0,
						dayjs: void 0,
						isCurrent: void 0,
						selected: void 0,
						renderText: void 0,
						timestamp: void 0
					};
					cell.type = "normal";
					const index = i * 4 + j;
					const calTime = props.date.startOf("year").month(index);
					const calEndDate = props.rangeState.endDate || props.maxDate || props.rangeState.selecting && props.minDate || null;
					cell.inRange = !!(props.minDate && calTime.isSameOrAfter(props.minDate, "month") && calEndDate && calTime.isSameOrBefore(calEndDate, "month")) || !!(props.minDate && calTime.isSameOrBefore(props.minDate, "month") && calEndDate && calTime.isSameOrAfter(calEndDate, "month"));
					if (props.minDate?.isSameOrAfter(calEndDate)) {
						cell.start = !!(calEndDate && calTime.isSame(calEndDate, "month"));
						cell.end = props.minDate && calTime.isSame(props.minDate, "month");
					} else {
						cell.start = !!(props.minDate && calTime.isSame(props.minDate, "month"));
						cell.end = !!(calEndDate && calTime.isSame(calEndDate, "month"));
					}
					if (now.isSame(calTime)) cell.type = "today";
					const cellDate = calTime.toDate();
					cell.text = index;
					cell.disabled = props.disabledDate?.(cellDate) || false;
					cell.date = cellDate;
					cell.customClass = props.cellClassName?.(cellDate);
					cell.dayjs = calTime;
					cell.timestamp = calTime.valueOf();
					cell.isSelected = isSelectedCell(cell);
				}
			}
			return rows;
		});
		const focus = () => {
			currentCellRef.value?.focus();
		};
		const getCellStyle = (cell) => {
			const style = {};
			const year = props.date.year();
			const today = /* @__PURE__ */ new Date();
			const month = cell.text;
			style.disabled = props.disabled || (props.disabledDate ? require_utils.datesInMonth(props.date, year, month, lang.value).every(props.disabledDate) : false);
			style.current = require_arrays.castArray(props.parsedValue).some((date) => dayjs.default.isDayjs(date) && date.year() === year && date.month() === month);
			style.today = today.getFullYear() === year && today.getMonth() === month;
			if (cell.customClass) style[cell.customClass] = true;
			if (cell.inRange) {
				style["in-range"] = true;
				if (cell.start) style["start-date"] = true;
				if (cell.end) style["end-date"] = true;
			}
			return style;
		};
		const isSelectedCell = (cell) => {
			const year = props.date.year();
			const month = cell.text;
			return require_arrays.castArray(props.date).some((date) => date.year() === year && date.month() === month);
		};
		const handleMouseMove = (event) => {
			if (!props.rangeState.selecting) return;
			let target = event.target;
			if (target.tagName === "SPAN") target = target.parentNode?.parentNode;
			if (target.tagName === "DIV") target = target.parentNode;
			if (target.tagName !== "TD") return;
			const row = target.parentNode.rowIndex;
			const column = target.cellIndex;
			if (rows.value[row][column].disabled) return;
			if (row !== lastRow.value || column !== lastColumn.value) {
				lastRow.value = row;
				lastColumn.value = column;
				emit("changerange", {
					selecting: true,
					endDate: props.date.startOf("year").month(row * 4 + column)
				});
			}
		};
		const handleMonthTableClick = (event) => {
			if (props.disabled) return;
			const target = event.target?.closest("td");
			if (target?.tagName !== "TD") return;
			if (require_style.hasClass(target, "disabled")) return;
			const column = target.cellIndex;
			const month = target.parentNode.rowIndex * 4 + column;
			const newDate = props.date.startOf("year").month(month);
			if (props.selectionMode === "months") {
				if (event.type === "keydown") {
					emit("pick", require_arrays.castArray(props.parsedValue), false);
					return;
				}
				const newMonth = require_utils.getValidDateOfMonth(props.date, props.date.year(), month, lang.value, props.disabledDate);
				emit("pick", require_style.hasClass(target, "current") ? require_arrays.castArray(props.parsedValue).filter((d) => d?.year() !== newMonth.year() || d?.month() !== newMonth.month()) : require_arrays.castArray(props.parsedValue).concat([(0, dayjs.default)(newMonth)]));
			} else if (props.selectionMode === "range") if (!props.rangeState.selecting) {
				emit("pick", {
					minDate: newDate,
					maxDate: null
				});
				emit("select", true);
			} else {
				if (props.minDate && newDate >= props.minDate) emit("pick", {
					minDate: props.minDate,
					maxDate: newDate
				});
				else emit("pick", {
					minDate: newDate,
					maxDate: props.minDate
				});
				emit("select", false);
			}
			else emit("pick", month);
		};
		(0, vue.watch)(() => props.date, async () => {
			if (tbodyRef.value?.contains(document.activeElement)) {
				await (0, vue.nextTick)();
				currentCellRef.value?.focus();
			}
		});
		__expose({ focus });
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("table", {
				role: "grid",
				"aria-label": (0, vue.unref)(t)("el.datepicker.monthTablePrompt"),
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).b()),
				onClick: handleMonthTableClick,
				onMousemove: handleMouseMove
			}, [(0, vue.createElementVNode)("tbody", {
				ref_key: "tbodyRef",
				ref: tbodyRef
			}, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(rows.value, (row, key) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("tr", { key }, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(row, (cell, key_) => {
					return (0, vue.openBlock)(), (0, vue.createElementBlock)("td", {
						key: key_,
						ref_for: true,
						ref: (el) => cell.isSelected && (currentCellRef.value = el),
						class: (0, vue.normalizeClass)(getCellStyle(cell)),
						"aria-selected": !!cell.isSelected,
						"aria-label": (0, vue.unref)(t)(`el.datepicker.month${+cell.text + 1}`),
						tabindex: cell.isSelected ? 0 : -1,
						onKeydown: [(0, vue.withKeys)((0, vue.withModifiers)(handleMonthTableClick, ["prevent", "stop"]), ["space"]), (0, vue.withKeys)((0, vue.withModifiers)(handleMonthTableClick, ["prevent", "stop"]), ["enter"])]
					}, [(0, vue.createVNode)((0, vue.unref)(require_basic_cell_render.default), { cell: {
						...cell,
						renderText: (0, vue.unref)(t)("el.datepicker.months." + months.value[cell.text])
					} }, null, 8, ["cell"])], 42, _hoisted_2);
				}), 128))]);
			}), 128))], 512)], 42, _hoisted_1);
		};
	}
});

//#endregion
exports.default = basic_month_table_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=basic-month-table.vue_vue_type_script_setup_true_lang.js.map