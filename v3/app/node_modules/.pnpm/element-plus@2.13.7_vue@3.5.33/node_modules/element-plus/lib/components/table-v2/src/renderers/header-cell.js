const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_constants = require('../constants.js');
const require_private = require('../private.js');
const require_utils = require('../utils.js');
const require_header_cell = require('../components/header-cell.js');
const require_sort_icon = require('../components/sort-icon.js');
let vue = require("vue");

//#region ../../packages/components/table-v2/src/renderers/header-cell.tsx
const HeaderCellRenderer = (props, { slots }) => {
	const { column, ns, t, style, onColumnSorted } = props;
	const cellStyle = require_utils.enforceUnit(style);
	if (column.placeholderSign === require_private.placeholderSign) return (0, vue.createVNode)("div", {
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
	const columnCellRenderer = require_utils.componentToSlot(headerCellRenderer);
	const Cell = columnCellRenderer ? columnCellRenderer(cellProps) : (0, vue.renderSlot)(slots, "default", cellProps, () => [(0, vue.createVNode)(require_header_cell.default, cellProps, null)]);
	/**
	* Render cell container and sort indicator
	*/
	const { sortBy, sortState, headerCellProps } = props;
	let sorting, sortOrder, ariaSort;
	if (sortState) {
		const order = sortState[column.key];
		sorting = Boolean(require_constants.oppositeOrderMap[order]);
		sortOrder = sorting ? order : require_constants.SortOrder.ASC;
	} else {
		sorting = column.key === sortBy.key;
		sortOrder = sorting ? sortBy.order : require_constants.SortOrder.ASC;
	}
	if (sortOrder === require_constants.SortOrder.ASC) ariaSort = "ascending";
	else if (sortOrder === require_constants.SortOrder.DESC) ariaSort = "descending";
	else ariaSort = void 0;
	const cellKls = [
		ns.e("header-cell"),
		require_utils.tryCall(headerClass, props, ""),
		column.align === require_constants.Alignment.CENTER && ns.is("align-center"),
		column.align === require_constants.Alignment.RIGHT && ns.is("align-right"),
		sortable && ns.is("sortable")
	];
	return (0, vue.createVNode)("div", (0, vue.mergeProps)({
		...require_utils.tryCall(headerCellProps, props),
		onClick: column.sortable ? onColumnSorted : void 0,
		ariaSort: sortable ? ariaSort : void 0,
		class: cellKls,
		style: cellStyle,
		["data-key"]: column.key
	}, { "role": "columnheader" }), [Cell, sortable && (0, vue.createVNode)(require_sort_icon.default, {
		"class": [ns.e("sort-icon"), sorting && ns.is("sorting")],
		"sortOrder": sortOrder,
		"ariaLabel": t("el.table.sortLabel", { column: column.title || "" })
	}, null)]);
};

//#endregion
exports.default = HeaderCellRenderer;
//# sourceMappingURL=header-cell.js.map