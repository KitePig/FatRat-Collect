import { isNumber } from "../../../../utils/types.mjs";
import { addUnit } from "../../../../utils/dom/style.mjs";
import { enforceUnit, sum } from "../utils.mjs";
import { computed, unref } from "vue";

//#region ../../packages/components/table-v2/src/composables/use-styles.ts
const useStyles = (props, { columnsTotalWidth, rowsHeight, fixedColumnsOnLeft, fixedColumnsOnRight }) => {
	const bodyWidth = computed(() => {
		const { fixed, width, vScrollbarSize } = props;
		const ret = width - vScrollbarSize;
		return fixed ? Math.max(Math.round(unref(columnsTotalWidth)), ret) : ret;
	});
	const mainTableHeight = computed(() => {
		const { height = 0, maxHeight = 0, footerHeight, hScrollbarSize } = props;
		if (maxHeight > 0) {
			const _fixedRowsHeight = unref(fixedRowsHeight);
			const _rowsHeight = unref(rowsHeight);
			const total = unref(headerHeight) + _fixedRowsHeight + _rowsHeight + hScrollbarSize;
			return Math.min(total, maxHeight - footerHeight);
		}
		return height - footerHeight;
	});
	const fixedTableHeight = computed(() => {
		const { maxHeight } = props;
		const tableHeight = unref(mainTableHeight);
		if (isNumber(maxHeight) && maxHeight > 0) return tableHeight;
		const totalHeight = unref(rowsHeight) + unref(headerHeight) + unref(fixedRowsHeight);
		return Math.min(tableHeight, totalHeight);
	});
	const mapColumn = (column) => column.width;
	const leftTableWidth = computed(() => sum(unref(fixedColumnsOnLeft).map(mapColumn)));
	const rightTableWidth = computed(() => sum(unref(fixedColumnsOnRight).map(mapColumn)));
	const headerHeight = computed(() => sum(props.headerHeight));
	const fixedRowsHeight = computed(() => {
		return (props.fixedData?.length || 0) * props.rowHeight;
	});
	const windowHeight = computed(() => {
		return unref(mainTableHeight) - unref(headerHeight) - unref(fixedRowsHeight);
	});
	const rootStyle = computed(() => {
		const { style = {}, height, width } = props;
		return enforceUnit({
			...style,
			height,
			width
		});
	});
	return {
		bodyWidth,
		fixedTableHeight,
		mainTableHeight,
		leftTableWidth,
		rightTableWidth,
		windowHeight,
		footerHeight: computed(() => enforceUnit({ height: props.footerHeight })),
		emptyStyle: computed(() => ({
			top: addUnit(unref(headerHeight)),
			bottom: addUnit(props.footerHeight),
			width: addUnit(props.width)
		})),
		rootStyle,
		headerHeight
	};
};

//#endregion
export { useStyles };
//# sourceMappingURL=use-styles.mjs.map