import { hasClass } from "../../../../utils/dom/style.mjs";
import { castArray } from "../../../../utils/arrays.mjs";
import { useLocale } from "../../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { rangeArr } from "../../../time-picker/src/utils.mjs";
import { getValidDateOfYear } from "../utils.mjs";
import basic_cell_render_default from "./basic-cell-render.mjs";
import { basicYearTableProps } from "../props/basic-year-table.mjs";
import { Fragment, computed, createElementBlock, createElementVNode, createVNode, defineComponent, nextTick, normalizeClass, openBlock, ref, renderList, unref, watch, withKeys, withModifiers } from "vue";
import dayjs from "dayjs";

//#region ../../packages/components/date-picker-panel/src/date-picker-com/basic-year-table.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = [
	"aria-selected",
	"aria-label",
	"tabindex",
	"onKeydown"
];
var basic_year_table_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "basic-year-table",
	props: basicYearTableProps,
	emits: [
		"changerange",
		"pick",
		"select"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const datesInYear = (year, lang) => {
			const firstDay = dayjs(String(year)).locale(lang).startOf("year");
			return rangeArr(firstDay.endOf("year").dayOfYear()).map((n) => firstDay.add(n, "day").toDate());
		};
		const props = __props;
		const emit = __emit;
		const ns = useNamespace("year-table");
		const { t, lang } = useLocale();
		const tbodyRef = ref();
		const currentCellRef = ref();
		const startYear = computed(() => {
			return Math.floor(props.date.year() / 10) * 10;
		});
		const tableRows = ref([
			[],
			[],
			[]
		]);
		const lastRow = ref();
		const lastColumn = ref();
		const rows = computed(() => {
			const rows = tableRows.value;
			const now = dayjs().locale(lang.value).startOf("year");
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
					const calTime = dayjs().year(index);
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
			const today = dayjs().locale(lang.value);
			const year = cell.text;
			kls.disabled = props.disabled || (props.disabledDate ? datesInYear(year, lang.value).every(props.disabledDate) : false);
			kls.today = today.year() === year;
			kls.current = castArray(props.parsedValue).some((d) => d.year() === year);
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
			return castArray(props.date).some((date) => date.year() === year);
		};
		const handleYearTableClick = (event) => {
			if (props.disabled) return;
			const target = event.target?.closest("td");
			if (!target || !target.textContent || hasClass(target, "disabled")) return;
			const column = target.cellIndex;
			const selectedYear = target.parentNode.rowIndex * 4 + column + startYear.value;
			const newDate = dayjs().year(selectedYear);
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
					emit("pick", castArray(props.parsedValue), false);
					return;
				}
				const vaildYear = getValidDateOfYear(newDate.startOf("year"), lang.value, props.disabledDate);
				emit("pick", hasClass(target, "current") ? castArray(props.parsedValue).filter((d) => d?.year() !== selectedYear) : castArray(props.parsedValue).concat([vaildYear]));
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
					endDate: dayjs().year(startYear.value).add(row * 4 + column, "year")
				});
			}
		};
		watch(() => props.date, async () => {
			if (tbodyRef.value?.contains(document.activeElement)) {
				await nextTick();
				currentCellRef.value?.focus();
			}
		});
		__expose({ focus });
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("table", {
				role: "grid",
				"aria-label": unref(t)("el.datepicker.yearTablePrompt"),
				class: normalizeClass(unref(ns).b()),
				onClick: handleYearTableClick,
				onMousemove: handleMouseMove
			}, [createElementVNode("tbody", {
				ref_key: "tbodyRef",
				ref: tbodyRef
			}, [(openBlock(true), createElementBlock(Fragment, null, renderList(rows.value, (row, rowKey) => {
				return openBlock(), createElementBlock("tr", { key: rowKey }, [(openBlock(true), createElementBlock(Fragment, null, renderList(row, (cell, cellKey) => {
					return openBlock(), createElementBlock("td", {
						key: `${rowKey}_${cellKey}`,
						ref_for: true,
						ref: (el) => cell.isSelected && (currentCellRef.value = el),
						class: normalizeClass(["available", getCellKls(cell)]),
						"aria-selected": cell.isSelected,
						"aria-label": String(cell.text),
						tabindex: cell.isSelected ? 0 : -1,
						onKeydown: [withKeys(withModifiers(handleYearTableClick, ["prevent", "stop"]), ["space"]), withKeys(withModifiers(handleYearTableClick, ["prevent", "stop"]), ["enter"])]
					}, [createVNode(unref(basic_cell_render_default), { cell }, null, 8, ["cell"])], 42, _hoisted_2);
				}), 128))]);
			}), 128))], 512)], 42, _hoisted_1);
		};
	}
});

//#endregion
export { basic_year_table_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=basic-year-table.vue_vue_type_script_setup_true_lang.mjs.map