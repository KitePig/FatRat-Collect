import { Alignment, SortOrder, oppositeOrderMap } from "../constants.mjs";
import { placeholderSign } from "../private.mjs";
import { componentToSlot, enforceUnit, tryCall } from "../utils.mjs";
import HeaderCell from "../components/header-cell.mjs";
import SortIcon from "../components/sort-icon.mjs";
import { createVNode, mergeProps, renderSlot } from "vue";

//#region ../../packages/components/table-v2/src/renderers/header-cell.tsx
const HeaderCellRenderer = (props, { slots }) => {
	const { column, ns, t, style, onColumnSorted } = props;
	const cellStyle = enforceUnit(style);
	if (column.placeholderSign === placeholderSign) return createVNode("div", {
		"class": ns.em("header-row-cell", "placeholder"),
		"style": cellStyle
	}, null);
	const { headerCellRenderer, headerClass, sortable } = column;
	/**
	* render Cell children
	*/
	const cellProps = {
		...props,
		class: ns.e("header-cell-text")
	};
	const columnCellRenderer = componentToSlot(headerCellRenderer);
	const Cell = columnCellRenderer ? columnCellRenderer(cellProps) : renderSlot(slots, "default", cellProps, () => [createVNode(HeaderCell, cellProps, null)]);
	/**
	* Render cell container and sort indicator
	*/
	const { sortBy, sortState, headerCellProps } = props;
	let sorting, sortOrder, ariaSort;
	if (sortState) {
		const order = sortState[column.key];
		sorting = Boolean(oppositeOrderMap[order]);
		sortOrder = sorting ? order : SortOrder.ASC;
	} else {
		sorting = column.key === sortBy.key;
		sortOrder = sorting ? sortBy.order : SortOrder.ASC;
	}
	if (sortOrder === SortOrder.ASC) ariaSort = "ascending";
	else if (sortOrder === SortOrder.DESC) ariaSort = "descending";
	else ariaSort = void 0;
	const cellKls = [
		ns.e("header-cell"),
		tryCall(headerClass, props, ""),
		column.align === Alignment.CENTER && ns.is("align-center"),
		column.align === Alignment.RIGHT && ns.is("align-right"),
		sortable && ns.is("sortable")
	];
	return createVNode("div", mergeProps({
		...tryCall(headerCellProps, props),
		onClick: column.sortable ? onColumnSorted : void 0,
		ariaSort: sortable ? ariaSort : void 0,
		class: cellKls,
		style: cellStyle,
		["data-key"]: column.key
	}, { "role": "columnheader" }), [Cell, sortable && createVNode(SortIcon, {
		"class": [ns.e("sort-icon"), sorting && ns.is("sorting")],
		"sortOrder": sortOrder,
		"ariaLabel": t("el.table.sortLabel", { column: column.title || "" })
	}, null)]);
};

//#endregion
export { HeaderCellRenderer as default };
//# sourceMappingURL=header-cell.mjs.map