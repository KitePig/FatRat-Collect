const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_style = require('../../../../utils/dom/style.js');
const require_arrays = require('../../../../utils/arrays.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../../hooks/use-namespace/index.js');
const require_utils = require('../../../time-picker/src/utils.js');
const require_utils$1 = require('../utils.js');
const require_basic_cell_render = require('./basic-cell-render.js');
const require_basic_year_table = require('../props/basic-year-table.js');
let vue = require("vue");
let dayjs = require("dayjs");
dayjs = require_runtime.__toESM(dayjs);

//#region ../../packages/components/date-picker-panel/src/date-picker-com/basic-year-table.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = [
	"aria-selected",
	"aria-label",
	"tabindex",
	"onKeydown"
];
var basic_year_table_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	__name: "basic-year-table",
	props: require_basic_year_table.basicYearTableProps,
	emits: [
		"changerange",
		"pick",
		"select"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const datesInYear = (year, lang) => {
			const firstDay = (0, dayjs.default)(String(year)).locale(lang).startOf("year");
			return require_utils.rangeArr(firstDay.endOf("year").dayOfYear()).map((n) => firstDay.add(n, "day").toDate());
		};
		const props = __props;
		const emit = __emit;
		const ns = require_index$1.useNamespace("year-table");
		const { t, lang } = require_index.useLocale();
		const tbodyRef = (0, vue.ref)();
		const currentCellRef = (0, vue.ref)();
		const startYear = (0, vue.computed)(() => {
			return Math.floor(props.date.year() / 10) * 10;
		});
		const tableRows = (0, vue.ref)([
			[],
			[],
			[]
		]);
		const lastRow = (0, vue.ref)();
		const lastColumn = (0, vue.ref)();
		const rows = (0, vue.computed)(() => {
			const rows = tableRows.value;
			const now = (0, dayjs.default)().locale(lang.value).startOf("year");
			for (let i = 0; i < 3; i++) {
				const row = rows[i];
				for (let j = 0; j < 4; j++) {
					if (i * 4 + j >= 10) break;
					let cell = row[j];
					if (!cell) cell = {
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
					const index = i * 4 + j + startYear.value;
					const calTime = (0, dayjs.default)().year(index);
					const calEndDate = props.rangeState.endDate || props.maxDate || props.rangeState.selecting && props.minDate || null;
					cell.inRange = !!(props.minDate && calTime.isSameOrAfter(props.minDate, "year") && calEndDate && calTime.isSameOrBefore(calEndDate, "year")) || !!(props.minDate && calTime.isSameOrBefore(props.minDate, "year") && calEndDate && calTime.isSameOrAfter(calEndDate, "year"));
					if (props.minDate?.isSameOrAfter(calEndDate)) {
						cell.start = !!(calEndDate && calTime.isSame(calEndDate, "year"));
						cell.end = !!(props.minDate && calTime.isSame(props.minDate, "year"));
					} else {
						cell.start = !!(props.minDate && calTime.isSame(props.minDate, "year"));
						cell.end = !!(calEndDate && calTime.isSame(calEndDate, "year"));
					}
					if (now.isSame(calTime)) cell.type = "today";
					cell.text = index;
					const cellDate = calTime.toDate();
					cell.disabled = props.disabledDate?.(cellDate) || false;
					cell.date = cellDate;
					cell.customClass = props.cellClassName?.(cellDate);
					cell.dayjs = calTime;
					cell.timestamp = calTime.valueOf();
					cell.isSelected = isSelectedCell(cell);
					row[j] = cell;
				}
			}
			return rows;
		});
		const focus = () => {
			currentCellRef.value?.focus();
		};
		const getCellKls = (cell) => {
			const kls = {};
			const today = (0, dayjs.default)().locale(lang.value);
			const year = cell.text;
			kls.disabled = props.disabled || (props.disabledDate ? datesInYear(year, lang.value).every(props.disabledDate) : false);
			kls.today = today.year() === year;
			kls.current = require_arrays.castArray(props.parsedValue).some((d) => d.year() === year);
			if (cell.customClass) kls[cell.customClass] = true;
			if (cell.inRange) {
				kls["in-range"] = true;
				if (cell.start) kls["start-date"] = true;
				if (cell.end) kls["end-date"] = true;
			}
			return kls;
		};
		const isSelectedCell = (cell) => {
			const year = cell.text;
			return require_arrays.castArray(props.date).some((date) => date.year() === year);
		};
		const handleYearTableClick = (event) => {
			if (props.disabled) return;
			const target = event.target?.closest("td");
			if (!target || !target.textContent || require_style.hasClass(target, "disabled")) return;
			const column = target.cellIndex;
			const selectedYear = target.parentNode.rowIndex * 4 + column + startYear.value;
			const newDate = (0, dayjs.default)().year(selectedYear);
			if (props.selectionMode === "range") if (!props.rangeState.selecting) {
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
			else if (props.selectionMode === "years") {
				if (event.type === "keydown") {
					emit("pick", require_arrays.castArray(props.parsedValue), false);
					return;
				}
				const vaildYear = require_utils$1.getValidDateOfYear(newDate.startOf("year"), lang.value, props.disabledDate);
				emit("pick", require_style.hasClass(target, "current") ? require_arrays.castArray(props.parsedValue).filter((d) => d?.year() !== selectedYear) : require_arrays.castArray(props.parsedValue).concat([vaildYear]));
			} else emit("pick", selectedYear);
		};
		const handleMouseMove = (event) => {
			if (!props.rangeState.selecting) return;
			const target = event.target?.closest("td");
			if (!target) return;
			const row = target.parentNode.rowIndex;
			const column = target.cellIndex;
			if (rows.value[row][column].disabled) return;
			if (row !== lastRow.value || column !== lastColumn.value) {
				lastRow.value = row;
				lastColumn.value = column;
				emit("changerange", {
					selecting: true,
					endDate: (0, dayjs.default)().year(startYear.value).add(row * 4 + column, "year")
				});
			}
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
				"aria-label": (0, vue.unref)(t)("el.datepicker.yearTablePrompt"),
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).b()),
				onClick: handleYearTableClick,
				onMousemove: handleMouseMove
			}, [(0, vue.createElementVNode)("tbody", {
				ref_key: "tbodyRef",
				ref: tbodyRef
			}, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(rows.value, (row, rowKey) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("tr", { key: rowKey }, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(row, (cell, cellKey) => {
					return (0, vue.openBlock)(), (0, vue.createElementBlock)("td", {
						key: `${rowKey}_${cellKey}`,
						ref_for: true,
						ref: (el) => cell.isSelected && (currentCellRef.value = el),
						class: (0, vue.normalizeClass)(["available", getCellKls(cell)]),
						"aria-selected": cell.isSelected,
						"aria-label": String(cell.text),
						tabindex: cell.isSelected ? 0 : -1,
						onKeydown: [(0, vue.withKeys)((0, vue.withModifiers)(handleYearTableClick, ["prevent", "stop"]), ["space"]), (0, vue.withKeys)((0, vue.withModifiers)(handleYearTableClick, ["prevent", "stop"]), ["enter"])]
					}, [(0, vue.createVNode)((0, vue.unref)(require_basic_cell_render.default), { cell }, null, 8, ["cell"])], 42, _hoisted_2);
				}), 128))]);
			}), 128))], 512)], 42, _hoisted_1);
		};
	}
});

//#endregion
exports.default = basic_year_table_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=basic-year-table.vue_vue_type_script_setup_true_lang.js.map