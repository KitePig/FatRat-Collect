Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_arrays = require('../../../../utils/arrays.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../../hooks/use-namespace/index.js');
const require_utils = require('../utils.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let dayjs = require("dayjs");
dayjs = require_runtime.__toESM(dayjs);
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/date-picker-panel/src/composables/use-basic-date-table.ts
const isNormalDay = (type = "") => {
	return ["normal", "today"].includes(type);
};
const useBasicDateTable = (props, emit) => {
	const { lang } = require_index.useLocale();
	const tbodyRef = (0, vue.ref)();
	const currentCellRef = (0, vue.ref)();
	const lastRow = (0, vue.ref)();
	const lastColumn = (0, vue.ref)();
	const tableRows = (0, vue.ref)([
		[],
		[],
		[],
		[],
		[],
		[]
	]);
	let focusWithClick = false;
	const firstDayOfWeek = props.date.$locale().weekStart || 7;
	const WEEKS_CONSTANT = props.date.locale("en").localeData().weekdaysShort().map((_) => _.toLowerCase());
	const offsetDay = (0, vue.computed)(() => {
		return firstDayOfWeek > 3 ? 7 - firstDayOfWeek : -firstDayOfWeek;
	});
	const startDate = (0, vue.computed)(() => {
		const startDayOfMonth = props.date.startOf("month");
		return startDayOfMonth.subtract(startDayOfMonth.day() || 7, "day");
	});
	const WEEKS = (0, vue.computed)(() => {
		return WEEKS_CONSTANT.concat(WEEKS_CONSTANT).slice(firstDayOfWeek, firstDayOfWeek + 7);
	});
	const hasCurrent = (0, vue.computed)(() => {
		return (0, lodash_unified.flatten)((0, vue.unref)(rows)).some((row) => {
			return row.isCurrent;
		});
	});
	const days = (0, vue.computed)(() => {
		const startOfMonth = props.date.startOf("month");
		return {
			startOfMonthDay: startOfMonth.day() || 7,
			dateCountOfMonth: startOfMonth.daysInMonth(),
			dateCountOfLastMonth: startOfMonth.subtract(1, "month").daysInMonth()
		};
	});
	const selectedDate = (0, vue.computed)(() => {
		return props.selectionMode === "dates" ? require_arrays.castArray(props.parsedValue) : [];
	});
	const setDateText = (cell, { count, rowIndex, columnIndex }) => {
		const { startOfMonthDay, dateCountOfMonth, dateCountOfLastMonth } = (0, vue.unref)(days);
		const offset = (0, vue.unref)(offsetDay);
		if (rowIndex >= 0 && rowIndex <= 1) {
			const numberOfDaysFromPreviousMonth = startOfMonthDay + offset < 0 ? 7 + startOfMonthDay + offset : startOfMonthDay + offset;
			if (columnIndex + rowIndex * 7 >= numberOfDaysFromPreviousMonth) {
				cell.text = count;
				return true;
			} else {
				cell.text = dateCountOfLastMonth - (numberOfDaysFromPreviousMonth - columnIndex % 7) + 1 + rowIndex * 7;
				cell.type = "prev-month";
			}
		} else {
			if (count <= dateCountOfMonth) cell.text = count;
			else {
				cell.text = count - dateCountOfMonth;
				cell.type = "next-month";
			}
			return true;
		}
		return false;
	};
	const setCellMetadata = (cell, { columnIndex, rowIndex }, count) => {
		const { disabledDate, cellClassName } = props;
		const _selectedDate = (0, vue.unref)(selectedDate);
		const shouldIncrement = setDateText(cell, {
			count,
			rowIndex,
			columnIndex
		});
		const cellDate = cell.dayjs.toDate();
		cell.selected = _selectedDate.find((d) => d.isSame(cell.dayjs, "day"));
		cell.isSelected = !!cell.selected;
		cell.isCurrent = isCurrent(cell);
		cell.disabled = disabledDate?.(cellDate);
		cell.customClass = cellClassName?.(cellDate);
		return shouldIncrement;
	};
	const setRowMetadata = (row) => {
		if (props.selectionMode === "week") {
			const [start, end] = props.showWeekNumber ? [1, 7] : [0, 6];
			const isActive = isWeekActive(row[start + 1]);
			row[start].inRange = isActive;
			row[start].start = isActive;
			row[end].inRange = isActive;
			row[end].end = isActive;
		}
	};
	const rows = (0, vue.computed)(() => {
		const { minDate, maxDate, rangeState, showWeekNumber } = props;
		const offset = (0, vue.unref)(offsetDay);
		const rows_ = (0, vue.unref)(tableRows);
		const dateUnit = "day";
		let count = 1;
		require_utils.buildPickerTable({
			row: 6,
			column: 7
		}, rows_, {
			startDate: minDate,
			columnIndexOffset: showWeekNumber ? 1 : 0,
			nextEndDate: rangeState.endDate || maxDate || rangeState.selecting && minDate || null,
			now: (0, dayjs.default)().locale((0, vue.unref)(lang)).startOf(dateUnit),
			unit: dateUnit,
			relativeDateGetter: (idx) => (0, vue.unref)(startDate).add(idx - offset, dateUnit),
			setCellMetadata: (...args) => {
				if (setCellMetadata(...args, count)) count += 1;
			},
			setRowMetadata
		});
		if (showWeekNumber) {
			for (let rowIndex = 0; rowIndex < 6; rowIndex++) if (rows_[rowIndex][1].dayjs) rows_[rowIndex][0] = {
				type: "week",
				text: rows_[rowIndex][1].dayjs.week()
			};
		}
		return rows_;
	});
	(0, vue.watch)(() => props.date, async () => {
		if ((0, vue.unref)(tbodyRef)?.contains(document.activeElement)) {
			await (0, vue.nextTick)();
			await focus();
		}
	});
	const focus = async () => (0, vue.unref)(currentCellRef)?.focus();
	const isCurrent = (cell) => {
		return props.selectionMode === "date" && isNormalDay(cell.type) && cellMatchesDate(cell, props.parsedValue);
	};
	const cellMatchesDate = (cell, date) => {
		if (!date) return false;
		return (0, dayjs.default)(date).locale((0, vue.unref)(lang)).isSame(props.date.date(Number(cell.text)), "day");
	};
	const getDateOfCell = (row, column) => {
		const startOfMonthDay = (0, vue.unref)(days).startOfMonthDay;
		const offset = (0, vue.unref)(offsetDay);
		const numberOfDaysFromPreviousMonth = startOfMonthDay + offset < 0 ? 7 + startOfMonthDay + offset : startOfMonthDay + offset;
		const offsetFromStart = row * 7 + (column - (props.showWeekNumber ? 1 : 0));
		return props.date.startOf("month").subtract(numberOfDaysFromPreviousMonth, "day").add(offsetFromStart, "day");
	};
	const handleMouseMove = (event) => {
		if (!props.rangeState.selecting) return;
		let target = event.target;
		if (target.tagName === "SPAN") target = target.parentNode?.parentNode;
		if (target.tagName === "DIV") target = target.parentNode;
		if (target.tagName !== "TD") return;
		const row = target.parentNode.rowIndex - 1;
		const column = target.cellIndex;
		if ((0, vue.unref)(rows)[row][column].disabled) return;
		if (row !== (0, vue.unref)(lastRow) || column !== (0, vue.unref)(lastColumn)) {
			lastRow.value = row;
			lastColumn.value = column;
			emit("changerange", {
				selecting: true,
				endDate: getDateOfCell(row, column)
			});
		}
	};
	const isSelectedCell = (cell) => {
		return !(0, vue.unref)(hasCurrent) && cell?.text === 1 && isNormalDay(cell.type) || cell.isCurrent;
	};
	const handleFocus = (event) => {
		if (focusWithClick || (0, vue.unref)(hasCurrent) || props.selectionMode !== "date") return;
		handlePickDate(event, true);
	};
	const handleMouseDown = (event) => {
		if (!event.target.closest("td")) return;
		focusWithClick = true;
	};
	const handleMouseUp = (event) => {
		if (!event.target.closest("td")) return;
		focusWithClick = false;
	};
	const handleRangePick = (newDate) => {
		if (!props.rangeState.selecting || !props.minDate) {
			emit("pick", {
				minDate: newDate,
				maxDate: null
			});
			emit("select", true);
		} else {
			if (newDate >= props.minDate) emit("pick", {
				minDate: props.minDate,
				maxDate: newDate
			});
			else emit("pick", {
				minDate: newDate,
				maxDate: props.minDate
			});
			emit("select", false);
		}
	};
	const handleWeekPick = (newDate) => {
		const weekNumber = newDate.week();
		const value = `${newDate.year()}w${weekNumber}`;
		emit("pick", {
			year: newDate.year(),
			week: weekNumber,
			value,
			date: newDate.startOf("week")
		});
	};
	const handleDatesPick = (newDate, selected) => {
		emit("pick", selected ? require_arrays.castArray(props.parsedValue).filter((d) => d?.valueOf() !== newDate.valueOf()) : require_arrays.castArray(props.parsedValue).concat([newDate]));
	};
	const handlePickDate = (event, isKeyboardMovement = false) => {
		if (props.disabled) return;
		const target = event.target.closest("td");
		if (!target) return;
		const row = target.parentNode.rowIndex - 1;
		const column = target.cellIndex;
		const cell = (0, vue.unref)(rows)[row][column];
		if (cell.disabled || cell.type === "week") return;
		const newDate = getDateOfCell(row, column);
		switch (props.selectionMode) {
			case "range":
				handleRangePick(newDate);
				break;
			case "date":
				emit("pick", newDate, isKeyboardMovement);
				break;
			case "week":
				handleWeekPick(newDate);
				break;
			case "dates":
				handleDatesPick(newDate, !!cell.selected);
				break;
			default: break;
		}
	};
	const isWeekActive = (cell) => {
		if (props.selectionMode !== "week") return false;
		let newDate = props.date.startOf("day");
		if (cell.type === "prev-month") newDate = newDate.subtract(1, "month");
		if (cell.type === "next-month") newDate = newDate.add(1, "month");
		newDate = newDate.date(Number.parseInt(cell.text, 10));
		if (props.parsedValue && !(0, _vue_shared.isArray)(props.parsedValue)) {
			const dayOffset = (props.parsedValue.day() - firstDayOfWeek + 7) % 7 - 1;
			return props.parsedValue.subtract(dayOffset, "day").isSame(newDate, "day");
		}
		return false;
	};
	return {
		WEEKS,
		rows,
		tbodyRef,
		currentCellRef,
		focus,
		isCurrent,
		isWeekActive,
		isSelectedCell,
		handlePickDate,
		handleMouseUp,
		handleMouseDown,
		handleMouseMove,
		handleFocus
	};
};
const useBasicDateTableDOM = (props, { isCurrent, isWeekActive }) => {
	const ns = require_index$1.useNamespace("date-table");
	const { t } = require_index.useLocale();
	const tableKls = (0, vue.computed)(() => [ns.b(), ns.is("week-mode", props.selectionMode === "week" && !props.disabled)]);
	const tableLabel = (0, vue.computed)(() => t("el.datepicker.dateTablePrompt"));
	const getCellClasses = (cell) => {
		const classes = [];
		if (isNormalDay(cell.type) && !cell.disabled) {
			classes.push("available");
			if (cell.type === "today") classes.push("today");
		} else classes.push(cell.type);
		if (isCurrent(cell)) classes.push("current");
		if (cell.inRange && (isNormalDay(cell.type) || props.selectionMode === "week")) {
			classes.push("in-range");
			if (cell.start) classes.push("start-date");
			if (cell.end) classes.push("end-date");
		}
		if (cell.disabled || props.disabled) classes.push("disabled");
		if (cell.selected) classes.push("selected");
		if (cell.customClass) classes.push(cell.customClass);
		return classes.join(" ");
	};
	const getRowKls = (cell) => [ns.e("row"), { current: isWeekActive(cell) }];
	return {
		tableKls,
		tableLabel,
		weekHeaderClass: ns.e("week-header"),
		getCellClasses,
		getRowKls,
		t
	};
};

//#endregion
exports.useBasicDateTable = useBasicDateTable;
exports.useBasicDateTableDOM = useBasicDateTableDOM;
//# sourceMappingURL=use-basic-date-table.js.map