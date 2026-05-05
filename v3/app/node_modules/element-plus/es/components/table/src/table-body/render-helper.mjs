import { isBoolean, isPropAbsent } from "../../../../utils/types.mjs";
import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { getRowIdentity } from "../util.mjs";
import { TABLE_INJECTION_KEY } from "../tokens.mjs";
import useEvents from "./events-helper.mjs";
import useStyles from "./styles-helper.mjs";
import td_wrapper_default from "./td-wrapper.mjs";
import { merge } from "lodash-unified";
import { computed, h, inject } from "vue";

//#region ../../packages/components/table/src/table-body/render-helper.ts
function useRender(props) {
	const parent = inject(TABLE_INJECTION_KEY);
	const ns = useNamespace("table");
	const { handleDoubleClick, handleClick, handleContextMenu, handleMouseEnter, handleMouseLeave, handleCellMouseEnter, handleCellMouseLeave, tooltipContent, tooltipTrigger } = useEvents(props);
	const { getRowStyle, getRowClass, getCellStyle, getCellClass, getSpan, getColspanRealWidth } = useStyles(props);
	let displayIndex = -1;
	const firstDefaultColumnIndex = computed(() => {
		return props.store?.states.columns.value.findIndex(({ type }) => type === "default");
	});
	const getKeyOfRow = (row, index) => {
		const rowKey = (parent?.props)?.rowKey;
		if (rowKey) return getRowIdentity(row, rowKey);
		return index;
	};
	const rowRender = (row, $index, treeRowData, expanded = false) => {
		const { tooltipEffect, tooltipOptions, store } = props;
		const { indent, columns } = store.states;
		const rowClasses = [];
		let display = true;
		if (treeRowData) {
			rowClasses.push(ns.em("row", `level-${treeRowData.level}`));
			display = !!treeRowData.display;
		}
		if ($index === 0) displayIndex = -1;
		if (props.stripe && display) displayIndex++;
		rowClasses.push(...getRowClass(row, $index, displayIndex));
		return h("tr", {
			style: [display ? null : { display: "none" }, getRowStyle(row, $index)],
			class: rowClasses,
			key: getKeyOfRow(row, $index),
			onDblclick: ($event) => handleDoubleClick($event, row),
			onClick: ($event) => handleClick($event, row),
			onContextmenu: ($event) => handleContextMenu($event, row),
			onMouseenter: () => handleMouseEnter($index),
			onMouseleave: handleMouseLeave
		}, columns.value.map((column, cellIndex) => {
			const { rowspan, colspan } = getSpan(row, column, $index, cellIndex);
			if (!rowspan || !colspan) return null;
			const columnData = Object.assign({}, column);
			columnData.realWidth = getColspanRealWidth(columns.value, colspan, cellIndex);
			const data = {
				store,
				_self: props.context || parent,
				column: columnData,
				row,
				$index,
				cellIndex,
				expanded
			};
			if (cellIndex === firstDefaultColumnIndex.value && treeRowData) {
				data.treeNode = {
					indent: treeRowData.level && treeRowData.level * indent.value,
					level: treeRowData.level
				};
				if (isBoolean(treeRowData.expanded)) {
					data.treeNode.expanded = treeRowData.expanded;
					if ("loading" in treeRowData) data.treeNode.loading = treeRowData.loading;
					if ("noLazyChildren" in treeRowData) data.treeNode.noLazyChildren = treeRowData.noLazyChildren;
				}
			}
			const baseKey = `${getKeyOfRow(row, $index)},${cellIndex}`;
			const patchKey = columnData.columnKey || columnData.rawColumnKey || "";
			const mergedTooltipOptions = column.showOverflowTooltip && merge({ effect: tooltipEffect }, tooltipOptions, column.showOverflowTooltip);
			return h(td_wrapper_default, {
				style: getCellStyle($index, cellIndex, row, column),
				class: getCellClass($index, cellIndex, row, column, colspan - 1),
				key: `${patchKey}${baseKey}`,
				rowspan,
				colspan,
				onMouseenter: ($event) => handleCellMouseEnter($event, row, mergedTooltipOptions),
				onMouseleave: handleCellMouseLeave
			}, { default: () => cellChildren(cellIndex, column, data) });
		}));
	};
	const cellChildren = (_cellIndex, column, data) => {
		return column.renderCell(data);
	};
	const wrappedRowRender = (row, $index) => {
		const store = props.store;
		const { isRowExpanded, assertRowKey } = store;
		const { treeData, lazyTreeNodeMap, childrenColumnName, rowKey } = store.states;
		const columns = store.states.columns.value;
		if (columns.some(({ type }) => type === "expand")) {
			const expanded = isRowExpanded(row);
			const tr = rowRender(row, $index, void 0, expanded);
			const renderExpanded = parent?.renderExpanded;
			if (!renderExpanded) {
				console.error("[Element Error]renderExpanded is required.");
				return tr;
			}
			const rows = [[tr]];
			if (parent.props.preserveExpandedContent || expanded) rows[0].push(h("tr", {
				key: `expanded-row__${tr.key}`,
				style: { display: expanded ? "" : "none" }
			}, [h("td", {
				colspan: columns.length,
				class: `${ns.e("cell")} ${ns.e("expanded-cell")}`
			}, [renderExpanded({
				row,
				$index,
				store,
				expanded
			})])]));
			return rows;
		} else if (Object.keys(treeData.value).length) {
			assertRowKey();
			const key = getRowIdentity(row, rowKey.value);
			let cur = treeData.value[key];
			let treeRowData = null;
			if (cur) {
				treeRowData = {
					expanded: cur.expanded,
					level: cur.level,
					display: true,
					noLazyChildren: void 0,
					loading: void 0
				};
				if (isBoolean(cur.lazy)) {
					if (treeRowData && isBoolean(cur.loaded) && cur.loaded) treeRowData.noLazyChildren = !(cur.children && cur.children.length);
					treeRowData.loading = cur.loading;
				}
			}
			const tmp = [rowRender(row, $index, treeRowData ?? void 0)];
			if (cur) {
				let i = 0;
				const traverse = (children, parent) => {
					if (!(children && children.length && parent)) return;
					children.forEach((node) => {
						const innerTreeRowData = {
							display: parent.display && parent.expanded,
							level: parent.level + 1,
							expanded: false,
							noLazyChildren: false,
							loading: false
						};
						const childKey = getRowIdentity(node, rowKey.value);
						if (isPropAbsent(childKey)) throw new Error("For nested data item, row-key is required.");
						cur = { ...treeData.value[childKey] };
						if (cur) {
							innerTreeRowData.expanded = cur.expanded;
							cur.level = cur.level || innerTreeRowData.level;
							cur.display = !!(cur.expanded && innerTreeRowData.display);
							if (isBoolean(cur.lazy)) {
								if (isBoolean(cur.loaded) && cur.loaded) innerTreeRowData.noLazyChildren = !(cur.children && cur.children.length);
								innerTreeRowData.loading = cur.loading;
							}
						}
						i++;
						tmp.push(rowRender(node, $index + i, innerTreeRowData));
						if (cur) traverse(lazyTreeNodeMap.value[childKey] || node[childrenColumnName.value], cur);
					});
				};
				cur.display = true;
				traverse(lazyTreeNodeMap.value[key] || row[childrenColumnName.value], cur);
			}
			return tmp;
		} else return rowRender(row, $index, void 0);
	};
	return {
		wrappedRowRender,
		tooltipContent,
		tooltipTrigger
	};
}

//#endregion
export { useRender as default };
//# sourceMappingURL=render-helper.mjs.map