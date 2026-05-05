const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_use_table = require('./use-table.js');
const require_tokens = require('./tokens.js');
const require_table = require('./table.js');
const require_main_table = require('./renderers/main-table.js');
const require_left_table = require('./renderers/left-table.js');
const require_right_table = require('./renderers/right-table.js');
const require_row = require('./renderers/row.js');
const require_cell = require('./renderers/cell.js');
const require_header = require('./renderers/header.js');
const require_header_cell = require('./renderers/header-cell.js');
const require_footer = require('./renderers/footer.js');
const require_empty = require('./renderers/empty.js');
const require_overlay = require('./renderers/overlay.js');
let vue = require("vue");

//#region ../../packages/components/table-v2/src/table-v2.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !(0, vue.isVNode)(s);
}
const TableV2 = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTableV2",
	props: require_table.tableV2Props,
	slots: Object,
	setup(props, { slots, expose }) {
		const ns = require_index$1.useNamespace("table-v2");
		const { t } = require_index.useLocale();
		const { columnsStyles, fixedColumnsOnLeft, fixedColumnsOnRight, mainColumns, mainTableHeight, fixedTableHeight, leftTableWidth, rightTableWidth, data, depthMap, expandedRowKeys, hasFixedColumns, mainTableRef, leftTableRef, rightTableRef, isDynamic, isResetting, isScrolling, bodyWidth, emptyStyle, rootStyle, footerHeight, showEmpty, scrollTo, scrollToLeft, scrollToTop, scrollToRow, getRowHeight, onColumnSorted, onRowHeightChange, onRowHovered, onRowExpanded, onRowsRendered, onScroll, onVerticalScroll } = require_use_table.useTable(props);
		expose({
			scrollTo,
			scrollToLeft,
			scrollToTop,
			scrollToRow
		});
		(0, vue.provide)(require_tokens.TableV2InjectionKey, {
			ns,
			isResetting,
			isScrolling
		});
		return () => {
			const { cache, cellProps, estimatedRowHeight, expandColumnKey, fixedData, headerHeight, headerClass, headerProps, headerCellProps, sortBy, sortState, rowHeight, rowClass, rowEventHandlers, rowKey, rowProps, scrollbarAlwaysOn, indentSize, iconSize, useIsScrolling, vScrollbarSize, width } = props;
			const _data = (0, vue.unref)(data);
			const mainTableProps = {
				cache,
				class: ns.e("main"),
				columns: (0, vue.unref)(mainColumns),
				data: _data,
				fixedData,
				estimatedRowHeight,
				bodyWidth: (0, vue.unref)(bodyWidth),
				headerHeight,
				headerWidth: (0, vue.unref)(bodyWidth),
				height: (0, vue.unref)(mainTableHeight),
				mainTableRef,
				rowKey,
				rowHeight,
				scrollbarAlwaysOn,
				scrollbarStartGap: 2,
				scrollbarEndGap: vScrollbarSize,
				useIsScrolling,
				width,
				getRowHeight,
				onRowsRendered,
				onScroll
			};
			const leftColumnsWidth = (0, vue.unref)(leftTableWidth);
			const _fixedTableHeight = (0, vue.unref)(fixedTableHeight);
			const leftTableProps = {
				cache,
				class: ns.e("left"),
				columns: (0, vue.unref)(fixedColumnsOnLeft),
				data: _data,
				fixedData,
				estimatedRowHeight,
				leftTableRef,
				rowHeight,
				bodyWidth: leftColumnsWidth,
				headerWidth: leftColumnsWidth,
				headerHeight,
				height: _fixedTableHeight,
				rowKey,
				scrollbarAlwaysOn,
				scrollbarStartGap: 2,
				scrollbarEndGap: vScrollbarSize,
				useIsScrolling,
				width: leftColumnsWidth,
				getRowHeight,
				onScroll: onVerticalScroll
			};
			const rightColumnsWidth = (0, vue.unref)(rightTableWidth);
			const rightTableProps = {
				cache,
				class: ns.e("right"),
				columns: (0, vue.unref)(fixedColumnsOnRight),
				data: _data,
				fixedData,
				estimatedRowHeight,
				rightTableRef,
				rowHeight,
				bodyWidth: rightColumnsWidth,
				headerWidth: rightColumnsWidth,
				headerHeight,
				height: _fixedTableHeight,
				rowKey,
				scrollbarAlwaysOn,
				scrollbarStartGap: 2,
				scrollbarEndGap: vScrollbarSize,
				width: rightColumnsWidth,
				style: `${ns.cssVarName("table-scrollbar-size")}: ${vScrollbarSize}px`,
				useIsScrolling,
				getRowHeight,
				onScroll: onVerticalScroll
			};
			const _columnsStyles = (0, vue.unref)(columnsStyles);
			const tableRowProps = {
				ns,
				depthMap: (0, vue.unref)(depthMap),
				columnsStyles: _columnsStyles,
				expandColumnKey,
				expandedRowKeys: (0, vue.unref)(expandedRowKeys),
				estimatedRowHeight,
				hasFixedColumns: (0, vue.unref)(hasFixedColumns),
				rowProps,
				rowClass,
				rowKey,
				rowEventHandlers,
				onRowHovered,
				onRowExpanded,
				onRowHeightChange
			};
			const tableCellProps = {
				cellProps,
				expandColumnKey,
				indentSize,
				iconSize,
				rowKey,
				expandedRowKeys: (0, vue.unref)(expandedRowKeys),
				ns,
				t
			};
			const tableHeaderProps = {
				ns,
				headerClass,
				headerProps,
				columnsStyles: _columnsStyles
			};
			const tableHeaderCellProps = {
				ns,
				t,
				sortBy,
				sortState,
				headerCellProps,
				onColumnSorted
			};
			const tableSlots = {
				row: (props) => (0, vue.createVNode)(require_row.default, (0, vue.mergeProps)(props, tableRowProps), {
					row: slots.row,
					cell: (props) => {
						let _slot;
						return slots.cell ? (0, vue.createVNode)(require_cell.default, (0, vue.mergeProps)(props, tableCellProps, { "style": _columnsStyles[props.column.key] }), _isSlot(_slot = slots.cell(props)) ? _slot : { default: () => [_slot] }) : (0, vue.createVNode)(require_cell.default, (0, vue.mergeProps)(props, tableCellProps, { "style": _columnsStyles[props.column.key] }), null);
					}
				}),
				header: (props) => (0, vue.createVNode)(require_header.default, (0, vue.mergeProps)(props, tableHeaderProps), {
					header: slots.header,
					cell: (props) => {
						let _slot2;
						return slots["header-cell"] ? (0, vue.createVNode)(require_header_cell.default, (0, vue.mergeProps)(props, tableHeaderCellProps, { "style": _columnsStyles[props.column.key] }), _isSlot(_slot2 = slots["header-cell"](props)) ? _slot2 : { default: () => [_slot2] }) : (0, vue.createVNode)(require_header_cell.default, (0, vue.mergeProps)(props, tableHeaderCellProps, { "style": _columnsStyles[props.column.key] }), null);
					}
				})
			};
			const rootKls = [
				props.class,
				ns.b(),
				ns.e("root"),
				ns.is("dynamic", (0, vue.unref)(isDynamic))
			];
			const footerProps = {
				class: ns.e("footer"),
				style: (0, vue.unref)(footerHeight)
			};
			return (0, vue.createVNode)("div", {
				"class": rootKls,
				"style": (0, vue.unref)(rootStyle)
			}, [
				(0, vue.createVNode)(require_main_table.default, mainTableProps, _isSlot(tableSlots) ? tableSlots : { default: () => [tableSlots] }),
				(0, vue.createVNode)(require_left_table.default, leftTableProps, _isSlot(tableSlots) ? tableSlots : { default: () => [tableSlots] }),
				(0, vue.createVNode)(require_right_table.default, rightTableProps, _isSlot(tableSlots) ? tableSlots : { default: () => [tableSlots] }),
				slots.footer && (0, vue.createVNode)(require_footer.default, footerProps, { default: slots.footer }),
				(0, vue.unref)(showEmpty) && (0, vue.createVNode)(require_empty.default, {
					"class": ns.e("empty"),
					"style": (0, vue.unref)(emptyStyle)
				}, { default: slots.empty }),
				slots.overlay && (0, vue.createVNode)(require_overlay.default, { "class": ns.e("overlay") }, { default: slots.overlay })
			]);
		};
	}
});

//#endregion
exports.default = TableV2;
//# sourceMappingURL=table-v2.js.map