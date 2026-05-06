Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_style = require('../../../../utils/dom/style.js');
const require_numbers = require('../../../../utils/numbers.js');
const require_util = require('../util.js');
const require_tokens = require('../tokens.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");

//#region ../../packages/components/table/src/table-body/events-helper.ts
function useEvents(props) {
	const parent = (0, vue.inject)(require_tokens.TABLE_INJECTION_KEY);
	const tooltipContent = (0, vue.ref)("");
	const tooltipTrigger = (0, vue.ref)((0, vue.h)("div"));
	const handleEvent = (event, row, name) => {
		const table = parent;
		const cell = require_util.getCell(event);
		let column = null;
		const namespace = table?.vnode.el?.dataset.prefix;
		if (cell) {
			column = require_util.getColumnByCell({ columns: props.store?.states.columns.value ?? [] }, cell, namespace);
			if (column) table?.emit(`cell-${name}`, row, column, cell, event);
		}
		table?.emit(`row-${name}`, row, column, event);
	};
	const handleDoubleClick = (event, row) => {
		handleEvent(event, row, "dblclick");
	};
	const handleClick = (event, row) => {
		props.store?.commit("setCurrentRow", row);
		handleEvent(event, row, "click");
	};
	const handleContextMenu = (event, row) => {
		handleEvent(event, row, "contextmenu");
	};
	const handleMouseEnter = (0, lodash_unified.debounce)((index) => {
		props.store?.commit("setHoverRow", index);
	}, 30);
	const handleMouseLeave = (0, lodash_unified.debounce)(() => {
		props.store?.commit("setHoverRow", null);
	}, 30);
	const getPadding = (el) => {
		const style = window.getComputedStyle(el, null);
		return {
			left: Number.parseInt(style.paddingLeft, 10) || 0,
			right: Number.parseInt(style.paddingRight, 10) || 0,
			top: Number.parseInt(style.paddingTop, 10) || 0,
			bottom: Number.parseInt(style.paddingBottom, 10) || 0
		};
	};
	const toggleRowClassByCell = (rowSpan, event, toggle) => {
		let node = (event?.target)?.parentNode;
		while (rowSpan > 1) {
			node = node?.nextSibling;
			if (!node || node.nodeName !== "TR") break;
			toggle(node, "hover-row hover-fixed-row");
			rowSpan--;
		}
	};
	const handleCellMouseEnter = (event, row, tooltipOptions) => {
		if (!parent) return;
		const table = parent;
		const cell = require_util.getCell(event);
		const namespace = table?.vnode.el?.dataset.prefix;
		let column = null;
		if (cell) {
			column = require_util.getColumnByCell({ columns: props.store?.states.columns.value ?? [] }, cell, namespace);
			if (!column) return;
			if (cell.rowSpan > 1) toggleRowClassByCell(cell.rowSpan, event, require_style.addClass);
			const hoverState = table.hoverState = {
				cell,
				column,
				row
			};
			table?.emit("cell-mouse-enter", hoverState.row, hoverState.column, hoverState.cell, event);
		}
		if (!tooltipOptions) {
			if (require_util.removePopper?.trigger === cell) require_util.removePopper?.();
			return;
		}
		const cellChild = event.target.querySelector(".cell");
		if (!(require_style.hasClass(cellChild, `${namespace}-tooltip`) && cellChild.childNodes.length && cellChild.textContent?.trim())) return;
		const range = document.createRange();
		range.setStart(cellChild, 0);
		range.setEnd(cellChild, cellChild.childNodes.length);
		/** detail: https://github.com/element-plus/element-plus/issues/10790
		*  What went wrong?
		*  UI > Browser > Zoom, In Blink/WebKit, getBoundingClientRect() sometimes returns inexact values, probably due to lost precision during internal calculations. In the example above:
		*    - Expected: 188
		*    - Actual: 188.00000762939453
		*/
		const { width: rangeWidth, height: rangeHeight } = range.getBoundingClientRect();
		const { width: cellChildWidth, height: cellChildHeight } = cellChild.getBoundingClientRect();
		const { top, left, right, bottom } = getPadding(cellChild);
		const horizontalPadding = left + right;
		const verticalPadding = top + bottom;
		if (require_numbers.isGreaterThan(rangeWidth + horizontalPadding, cellChildWidth) || require_numbers.isGreaterThan(rangeHeight + verticalPadding, cellChildHeight) || require_numbers.isGreaterThan(cellChild.scrollWidth, cellChildWidth)) require_util.createTablePopper(tooltipOptions, (cell?.innerText || cell?.textContent) ?? "", row, column, cell, table);
		else if (require_util.removePopper?.trigger === cell) require_util.removePopper?.();
	};
	const handleCellMouseLeave = (event) => {
		const cell = require_util.getCell(event);
		if (!cell) return;
		if (cell.rowSpan > 1) toggleRowClassByCell(cell.rowSpan, event, require_style.removeClass);
		const oldHoverState = parent?.hoverState;
		parent?.emit("cell-mouse-leave", oldHoverState?.row, oldHoverState?.column, oldHoverState?.cell, event);
	};
	return {
		handleDoubleClick,
		handleClick,
		handleContextMenu,
		handleMouseEnter,
		handleMouseLeave,
		handleCellMouseEnter,
		handleCellMouseLeave,
		tooltipContent,
		tooltipTrigger
	};
}

//#endregion
exports.default = useEvents;
//# sourceMappingURL=events-helper.js.map