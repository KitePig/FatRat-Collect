import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useTable } from "./use-table.mjs";
import { TableV2InjectionKey } from "./tokens.mjs";
import { tableV2Props } from "./table.mjs";
import MainTable from "./renderers/main-table.mjs";
import LeftTable from "./renderers/left-table.mjs";
import RightTable from "./renderers/right-table.mjs";
import RowRenderer from "./renderers/row.mjs";
import CellRenderer from "./renderers/cell.mjs";
import HeaderRenderer from "./renderers/header.mjs";
import HeaderCellRenderer from "./renderers/header-cell.mjs";
import Footer from "./renderers/footer.mjs";
import Footer$1 from "./renderers/empty.mjs";
import Overlay from "./renderers/overlay.mjs";
import { createVNode, defineComponent, isVNode, mergeProps, provide, unref } from "vue";

//#region ../../packages/components/table-v2/src/table-v2.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const TableV2 = /* @__PURE__ */ defineComponent({
	name: "ElTableV2",
	props: tableV2Props,
	slots: Object,
	setup(props, { slots, expose }) {
		const ns = useNamespace("table-v2");
		const { t } = useLocale();
		const { columnsStyles, fixedColumnsOnLeft, fixedColumnsOnRight, mainColumns, mainTableHeight, fixedTableHeight, leftTableWidth, rightTableWidth, data, depthMap, expandedRowKeys, hasFixedColumns, mainTableRef, leftTableRef, rightTableRef, isDynamic, isResetting, isScrolling, bodyWidth, emptyStyle, rootStyle, footerHeight, showEmpty, scrollTo, scrollToLeft, scrollToTop, scrollToRow, getRowHeight, onColumnSorted, onRowHeightChange, onRowHovered, onRowExpanded, onRowsRendered, onScroll, onVerticalScroll } = useTable(props);
		expose({
			scrollTo,
			scrollToLeft,
			scrollToTop,
			scrollToRow
		});
		provide(TableV2InjectionKey, {
			ns,
			isResetting,
			isScrolling
		});
		return () => {
			const { cache, cellProps, estimatedRowHeight, expandColumnKey, fixedData, headerHeight, headerClass, headerProps, headerCellProps, sortBy, sortState, rowHeight, rowClass, rowEventHandlers, rowKey, rowProps, scrollbarAlwaysOn, indentSize, iconSize, useIsScrolling, vScrollbarSize, width } = props;
			const _data = unref(data);
			const mainTableProps = {
				cache,
				class: ns.e("main"),
				columns: unref(mainColumns),
				data: _data,
				fixedData,
				estimatedRowHeight,
				bodyWidth: unref(bodyWidth),
				headerHeight,
				headerWidth: unref(bodyWidth),
				height: unref(mainTableHeight),
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
			const leftColumnsWidth = unref(leftTableWidth);
			const _fixedTableHeight = unref(fixedTableHeight);
			const leftTableProps = {
				cache,
				class: ns.e("left"),
				columns: unref(fixedColumnsOnLeft),
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
			const rightColumnsWidth = unref(rightTableWidth);
			const rightTableProps = {
				cache,
				class: ns.e("right"),
				columns: unref(fixedColumnsOnRight),
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
			const _columnsStyles = unref(columnsStyles);
			const tableRowProps = {
				ns,
				depthMap: unref(depthMap),
				columnsStyles: _columnsStyles,
				expandColumnKey,
				expandedRowKeys: unref(expandedRowKeys),
				estimatedRowHeight,
				hasFixedColumns: unref(hasFixedColumns),
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
				expandedRowKeys: unref(expandedRowKeys),
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
				row: (props) => createVNode(RowRenderer, mergeProps(props, tableRowProps), {
					row: slots.row,
					cell: (props) => {
						let _slot;
						return slots.cell ? createVNode(CellRenderer, mergeProps(props, tableCellProps, { "style": _columnsStyles[props.column.key] }), _isSlot(_slot = slots.cell(props)) ? _slot : { default: () => [_slot] }) : createVNode(CellRenderer, mergeProps(props, tableCellProps, { "style": _columnsStyles[props.column.key] }), null);
					}
				}),
				header: (props) => createVNode(HeaderRenderer, mergeProps(props, tableHeaderProps), {
					header: slots.header,
					cell: (props) => {
						let _slot2;
						return slots["header-cell"] ? createVNode(HeaderCellRenderer, mergeProps(props, tableHeaderCellProps, { "style": _columnsStyles[props.column.key] }), _isSlot(_slot2 = slots["header-cell"](props)) ? _slot2 : { default: () => [_slot2] }) : createVNode(HeaderCellRenderer, mergeProps(props, tableHeaderCellProps, { "style": _columnsStyles[props.column.key] }), null);
					}
				})
			};
			const rootKls = [
				props.class,
				ns.b(),
				ns.e("root"),
				ns.is("dynamic", unref(isDynamic))
			];
			const footerProps = {
				class: ns.e("footer"),
				style: unref(footerHeight)
			};
			return createVNode("div", {
				"class": rootKls,
				"style": unref(rootStyle)
			}, [
				createVNode(MainTable, mainTableProps, _isSlot(tableSlots) ? tableSlots : { default: () => [tableSlots] }),
				createVNode(LeftTable, leftTableProps, _isSlot(tableSlots) ? tableSlots : { default: () => [tableSlots] }),
				createVNode(RightTable, rightTableProps, _isSlot(tableSlots) ? tableSlots : { default: () => [tableSlots] }),
				slots.footer && createVNode(Footer, footerProps, { default: slots.footer }),
				unref(showEmpty) && createVNode(Footer$1, {
					"class": ns.e("empty"),
					"style": unref(emptyStyle)
				}, { default: slots.empty }),
				slots.overlay && createVNode(Overlay, { "class": ns.e("overlay") }, { default: slots.overlay })
			]);
		};
	}
});

//#endregion
export { TableV2 as default };
//# sourceMappingURL=table-v2.mjs.map