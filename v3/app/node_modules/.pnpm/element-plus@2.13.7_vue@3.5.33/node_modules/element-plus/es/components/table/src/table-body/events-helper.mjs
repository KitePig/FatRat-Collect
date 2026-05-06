import { addClass, hasClass, removeClass } from "../../../../utils/dom/style.mjs";
import { isGreaterThan } from "../../../../utils/numbers.mjs";
import { createTablePopper, getCell, getColumnByCell, removePopper } from "../util.mjs";
import { TABLE_INJECTION_KEY } from "../tokens.mjs";
import { debounce } from "lodash-unified";
import { h, inject, ref } from "vue";

//#region ../../packages/components/table/src/table-body/events-helper.ts
function useEvents(props) {
	const parent = inject(TABLE_INJECTION_KEY);
	const tooltipContent = ref("");
	const tooltipTrigger = ref(h("div"));
	const handleEvent = (event, row, name) => {
		const table = parent;
		const cell = getCell(event);
		let column = null;
		const namespace = table?.vnode.el?.dataset.prefix;
		if (cell) {
			column = getColumnByCell({ columns: props.store?.states.columns.value ?? [] }, cell, namespace);
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
	const handleMouseEnter = debounce((index) => {
		props.store?.commit("setHoverRow", index);
	}, 30);
	const handleMouseLeave = debounce(() => {
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
		const cell = getCell(event);
		const namespace = table?.vnode.el?.dataset.prefix;
		let column = null;
		if (cell) {
			column = getColumnByCell({ columns: props.store?.states.columns.value ?? [] }, cell, namespace);
			if (!column) return;
			if (cell.rowSpan > 1) toggleRowClassByCell(cell.rowSpan, event, addClass);
			const hoverState = table.hoverState = {
				cell,
				column,
				row
			};
			table?.emit("cell-mouse-enter", hoverState.row, hoverState.column, hoverState.cell, event);
		}
		if (!tooltipOptions) {
			if (removePopper?.trigger === cell) removePopper?.();
			return;
		}
		const cellChild = event.target.querySelector(".cell");
		if (!(hasClass(cellChild, `${namespace}-tooltip`) && cellChild.childNodes.length && cellChild.textContent?.trim())) return;
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
		if (isGreaterThan(rangeWidth + horizontalPadding, cellChildWidth) || isGreaterThan(rangeHeight + verticalPadding, cellChildHeight) || isGreaterThan(cellChild.scrollWidth, cellChildWidth)) createTablePopper(tooltipOptions, (cell?.innerText || cell?.textContent) ?? "", row, column, cell, table);
		else if (removePopper?.trigger === cell) removePopper?.();
	};
	const handleCellMouseLeave = (event) => {
		const cell = getCell(event);
		if (!cell) return;
		if (cell.rowSpan > 1) toggleRowClassByCell(cell.rowSpan, event, removeClass);
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
export { useEvents as default };
//# sourceMappingURL=events-helper.mjs.map