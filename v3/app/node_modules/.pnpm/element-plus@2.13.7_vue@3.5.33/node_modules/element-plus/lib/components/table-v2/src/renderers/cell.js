const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_constants = require('../constants.js');
const require_private = require('../private.js');
const require_utils = require('../utils.js');
const require_cell = require('../components/cell.js');
const require_expand_icon = require('../components/expand-icon.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/table-v2/src/renderers/cell.tsx
const CellRenderer = ({ columns, column, columnIndex, depth, expandIconProps, isScrolling, rowData, rowIndex, style, expandedRowKeys, ns, t, cellProps: _cellProps, expandColumnKey, indentSize, iconSize, rowKey }, { slots }) => {
	const cellStyle = require_utils.enforceUnit(style);
	if (column.placeholderSign === require_private.placeholderSign) return (0, vue.createVNode)("div", {
		"class": ns.em("row-cell", "placeholder"),
		"style": cellStyle
	}, null);
	const { cellRenderer, dataKey, dataGetter } = column;
	const cellData = (0, _vue_shared.isFunction)(dataGetter) ? dataGetter({
		columns,
		column,
		columnIndex,
		rowData,
		rowIndex
	}) : (0, lodash_unified.get)(rowData, dataKey ?? "");
	const extraCellProps = require_utils.tryCall(_cellProps, {
		cellData,
		columns,
		column,
		columnIndex,
		rowIndex,
		rowData
	});
	const cellProps = {
		class: ns.e("cell-text"),
		columns,
		column,
		columnIndex,
		cellData,
		isScrolling,
		rowData,
		rowIndex
	};
	const columnCellRenderer = require_utils.componentToSlot(cellRenderer);
	const Cell = columnCellRenderer ? columnCellRenderer(cellProps) : (0, vue.renderSlot)(slots, "default", cellProps, () => [(0, vue.createVNode)(require_cell.default, cellProps, null)]);
	const kls = [
		ns.e("row-cell"),
		column.class,
		column.align === require_constants.Alignment.CENTER && ns.is("align-center"),
		column.align === require_constants.Alignment.RIGHT && ns.is("align-right")
	];
	const expandable = rowIndex >= 0 && expandColumnKey && column.key === expandColumnKey;
	const expanded = rowIndex >= 0 && expandedRowKeys.includes(rowData[rowKey]);
	let IconOrPlaceholder;
	const iconStyle = `margin-inline-start: ${depth * indentSize}px;`;
	if (expandable) if ((0, _vue_shared.isObject)(expandIconProps)) IconOrPlaceholder = (0, vue.createVNode)(require_expand_icon.default, (0, vue.mergeProps)(expandIconProps, {
		"class": [ns.e("expand-icon"), ns.is("expanded", expanded)],
		"size": iconSize,
		"expanded": expanded,
		"ariaLabel": t(expanded ? "el.table.collapseRowLabel" : "el.table.expandRowLabel"),
		"style": iconStyle,
		"expandable": true
	}), null);
	else IconOrPlaceholder = (0, vue.createVNode)("div", { "style": [iconStyle, `width: ${iconSize}px; height: ${iconSize}px;`].join(" ") }, null);
	return (0, vue.createVNode)("div", (0, vue.mergeProps)({
		"class": kls,
		"style": cellStyle
	}, extraCellProps, { "role": "cell" }), [IconOrPlaceholder, Cell]);
};
CellRenderer.inheritAttrs = false;

//#endregion
exports.default = CellRenderer;
//# sourceMappingURL=cell.js.map