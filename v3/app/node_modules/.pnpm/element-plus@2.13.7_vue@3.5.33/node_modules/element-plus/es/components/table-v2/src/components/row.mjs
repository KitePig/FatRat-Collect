import { isArray, isFunction, isNumber } from "../../../../utils/types.mjs";
import { placeholderSign } from "../private.mjs";
import { TableV2InjectionKey } from "../tokens.mjs";
import { tableV2RowProps } from "../row.mjs";
import { computed, createVNode, defineComponent, inject, mergeProps, nextTick, onMounted, ref, unref } from "vue";

//#region ../../packages/components/table-v2/src/components/row.tsx
const useTableRow = (props) => {
	const { isScrolling } = inject(TableV2InjectionKey);
	const measured = ref(false);
	const rowRef = ref();
	const measurable = computed(() => {
		return isNumber(props.estimatedRowHeight) && props.rowIndex >= 0;
	});
	const doMeasure = (isInit = false) => {
		const $rowRef = unref(rowRef);
		if (!$rowRef) return;
		const { columns, onRowHeightChange, rowKey, rowIndex, style } = props;
		const { height } = $rowRef.getBoundingClientRect();
		measured.value = true;
		nextTick(() => {
			if (isInit || height !== Number.parseInt(style.height)) {
				const firstColumn = columns[0];
				const isPlaceholder = firstColumn?.placeholderSign === placeholderSign;
				onRowHeightChange?.({
					rowKey,
					height,
					rowIndex
				}, firstColumn && !isPlaceholder && firstColumn.fixed);
			}
		});
	};
	const eventHandlers = computed(() => {
		const { rowData, rowIndex, rowKey, onRowHover } = props;
		const handlers = props.rowEventHandlers || {};
		const eventHandlers = {};
		Object.entries(handlers).forEach(([eventName, handler]) => {
			if (isFunction(handler)) eventHandlers[eventName] = (event) => {
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
	onMounted(() => {
		if (unref(measurable)) doMeasure(true);
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
const TableV2Row = /* @__PURE__ */ defineComponent({
	name: "ElTableV2TableRow",
	props: tableV2RowProps,
	setup(props, { expose, slots, attrs }) {
		const { eventHandlers, isScrolling, measurable, measured, rowRef, onExpand } = useTableRow(props);
		expose({ onExpand });
		return () => {
			const { columns, columnsStyles, expandColumnKey, depth, rowData, rowIndex, style } = props;
			let ColumnCells = columns.map((column, columnIndex) => {
				const expandable = isArray(rowData.children) && rowData.children.length > 0 && column.key === expandColumnKey;
				return slots.cell({
					column,
					columns,
					columnIndex,
					depth,
					style: columnsStyles[column.key],
					rowData,
					rowIndex,
					isScrolling: unref(isScrolling),
					expandIconProps: expandable ? {
						rowData,
						rowIndex,
						onExpand
					} : void 0
				});
			});
			if (slots.row) ColumnCells = slots.row({
				cells: ColumnCells.map((node) => {
					if (isArray(node) && node.length === 1) return node[0];
					return node;
				}),
				style,
				columns,
				depth,
				rowData,
				rowIndex,
				isScrolling: unref(isScrolling)
			});
			if (unref(measurable)) {
				const { height, ...exceptHeightStyle } = style || {};
				const _measured = unref(measured);
				return createVNode("div", mergeProps({
					"ref": rowRef,
					"class": props.class,
					"style": _measured ? style : exceptHeightStyle,
					"role": "row"
				}, attrs, unref(eventHandlers)), [ColumnCells]);
			}
			return createVNode("div", mergeProps(attrs, {
				"ref": rowRef,
				"class": props.class,
				"style": style,
				"role": "row"
			}, unref(eventHandlers)), [ColumnCells]);
		};
	}
});

//#endregion
export { TableV2Row as default };
//# sourceMappingURL=row.mjs.map