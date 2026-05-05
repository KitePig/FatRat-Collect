Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../../utils/types.js');
const require_index = require('../../../../hooks/use-namespace/index.js');
const require_util = require('../util.js');
const require_tokens = require('../tokens.js');
const require_events_helper = require('./events-helper.js');
const require_styles_helper = require('./styles-helper.js');
const require_td_wrapper = require('./td-wrapper.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");

//#region ../../packages/components/table/src/table-body/render-helper.ts
function useRender(props) {
	const parent = (0, vue.inject)(require_tokens.TABLE_INJECTION_KEY);
	const ns = require_index.useNamespace("table");
	const { handleDoubleClick, handleClick, handleContextMenu, handleMouseEnter, handleMouseLeave, handleCellMouseEnter, handleCellMouseLeave, tooltipContent, tooltipTrigger } = require_events_helper.default(props);
	const { getRowStyle, getRowClass, getCellStyle, getCellClass, getSpan, getColspanRealWidth } = require_styles_helper.default(props);
	let displayIndex = -1;
	const firstDefaultColumnIndex = (0, vue.computed)(() => {
		return props.store?.states.columns.value.findIndex(({ type }) => type === "default");
	});
	const getKeyOfRow = (row, index) => {
		const rowKey = (parent?.props)?.rowKey;
		if (rowKey) return require_util.getRowIdentity(row, rowKey);
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
		return (0, vue.h)("tr", {
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
				if (require_types.isBoolean(treeRowData.expanded)) {
					data.treeNode.expanded = treeRowData.expanded;
					if ("loading" in treeRowData) data.treeNode.loading = treeRowData.loading;
					if ("noLazyChildren" in treeRowData) data.treeNode.noLazyChildren = treeRowData.noLazyChildren;
				}
			}
			const baseKey = `${getKeyOfRow(row, $index)},${cellIndex}`;
			const patchKey = columnData.columnKey || columnData.rawColumnKey || "";
			const mergedTooltipOptions = column.showOverflowTooltip && (0, lodash_unified.merge)({ effect: tooltipEffect }, tooltipOptions, column.showOverflowTooltip);
			return (0, vue.h)(require_td_wrapper.default, {
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
			if (parent.props.preserveExpandedContent || expanded) rows[0].push((0, vue.h)("tr", {
				key: `expanded-row__${tr.key}`,
				style: { display: expanded ? "" : "none" }
			}, [(0, vue.h)("td", {
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
			const key = require_util.getRowIdentity(row, rowKey.value);
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
				if (require_types.isBoolean(cur.lazy)) {
					if (treeRowData && require_types.isBoolean(cur.loaded) && cur.loaded) treeRowData.noLazyChildren = !(cur.children && cur.children.length);
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
						const childKey = require_util.getRowIdentity(node, rowKey.value);
						if (require_types.isPropAbsent(childKey)) throw new Error("For nested data item, row-key is required.");
						cur = { ...treeData.value[childKey] };
						if (cur) {
							innerTreeRowData.expanded = cur.expanded;
							cur.level = cur.level || innerTreeRowData.level;
							cur.display = !!(cur.expanded && innerTreeRowData.display);
							if (require_types.isBoolean(cur.lazy)) {
								if (require_types.isBoolean(cur.loaded) && cur.loaded) innerTreeRowData.noLazyChildren = !(cur.children && cur.children.length);
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
exports.default = useRender;
//# sourceMappingURL=render-helper.js.map