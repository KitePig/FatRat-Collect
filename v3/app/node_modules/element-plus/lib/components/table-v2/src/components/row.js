const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../../utils/types.js');
const require_private = require('../private.js');
const require_tokens = require('../tokens.js');
const require_row = require('../row.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/table-v2/src/components/row.tsx
const useTableRow = (props) => {
	const { isScrolling } = (0, vue.inject)(require_tokens.TableV2InjectionKey);
	const measured = (0, vue.ref)(false);
	const rowRef = (0, vue.ref)();
	const measurable = (0, vue.computed)(() => {
		return require_types.isNumber(props.estimatedRowHeight) && props.rowIndex >= 0;
	});
	const doMeasure = (isInit = false) => {
		const $rowRef = (0, vue.unref)(rowRef);
		if (!$rowRef) return;
		const { columns, onRowHeightChange, rowKey, rowIndex, style } = props;
		const { height } = $rowRef.getBoundingClientRect();
		measured.value = true;
		(0, vue.nextTick)(() => {
			if (isInit || height !== Number.parseInt(style.height)) {
				const firstColumn = columns[0];
				const isPlaceholder = firstColumn?.placeholderSign === require_private.placeholderSign;
				onRowHeightChange?.({
					rowKey,
					height,
					rowIndex
				}, firstColumn && !isPlaceholder && firstColumn.fixed);
			}
		});
	};
	const eventHandlers = (0, vue.computed)(() => {
		const { rowData, rowIndex, rowKey, onRowHover } = props;
		const handlers = props.rowEventHandlers || {};
		const eventHandlers = {};
		Object.entries(handlers).forEach(([eventName, handler]) => {
			if ((0, _vue_shared.isFunction)(handler)) eventHandlers[eventName] = (event) => {
				handler({
					event,
					rowData,
					rowIndex,
					rowKey
				});
			};
		});
		if (onRowHover) [{
			name: "onMouseleave",
			hovered: false
		}, {
			name: "onMouseenter",
			hovered: true
		}].forEach(({ name, hovered }) => {
			const existedHandler = eventHandlers[name];
			eventHandlers[name] = (event) => {
				onRowHover({
					event,
					hovered,
					rowData,
					rowIndex,
					rowKey
				});
				existedHandler?.(event);
			};
		});
		return eventHandlers;
	});
	const onExpand = (expanded) => {
		const { onRowExpand, rowData, rowIndex, rowKey } = props;
		onRowExpand?.({
			expanded,
			rowData,
			rowIndex,
			rowKey
		});
	};
	(0, vue.onMounted)(() => {
		if ((0, vue.unref)(measurable)) doMeasure(true);
	});
	return {
		isScrolling,
		measurable,
		measured,
		rowRef,
		eventHandlers,
		onExpand
	};
};
const TableV2Row = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTableV2TableRow",
	props: require_row.tableV2RowProps,
	setup(props, { expose, slots, attrs }) {
		const { eventHandlers, isScrolling, measurable, measured, rowRef, onExpand } = useTableRow(props);
		expose({ onExpand });
		return () => {
			const { columns, columnsStyles, expandColumnKey, depth, rowData, rowIndex, style } = props;
			let ColumnCells = columns.map((column, columnIndex) => {
				const expandable = (0, _vue_shared.isArray)(rowData.children) && rowData.children.length > 0 && column.key === expandColumnKey;
				return slots.cell({
					column,
					columns,
					columnIndex,
					depth,
					style: columnsStyles[column.key],
					rowData,
					rowIndex,
					isScrolling: (0, vue.unref)(isScrolling),
					expandIconProps: expandable ? {
						rowData,
						rowIndex,
						onExpand
					} : void 0
				});
			});
			if (slots.row) ColumnCells = slots.row({
				cells: ColumnCells.map((node) => {
					if ((0, _vue_shared.isArray)(node) && node.length === 1) return node[0];
					return node;
				}),
				style,
				columns,
				depth,
				rowData,
				rowIndex,
				isScrolling: (0, vue.unref)(isScrolling)
			});
			if ((0, vue.unref)(measurable)) {
				const { height, ...exceptHeightStyle } = style || {};
				const _measured = (0, vue.unref)(measured);
				return (0, vue.createVNode)("div", (0, vue.mergeProps)({
					"ref": rowRef,
					"class": props.class,
					"style": _measured ? style : exceptHeightStyle,
					"role": "row"
				}, attrs, (0, vue.unref)(eventHandlers)), [ColumnCells]);
			}
			return (0, vue.createVNode)("div", (0, vue.mergeProps)(attrs, {
				"ref": rowRef,
				"class": props.class,
				"style": style,
				"role": "row"
			}, (0, vue.unref)(eventHandlers)), [ColumnCells]);
		};
	}
});

//#endregion
exports.default = TableV2Row;
//# sourceMappingURL=row.js.map