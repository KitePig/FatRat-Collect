Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../../utils/types.js');
const require_style = require('../../../../utils/dom/style.js');
const require_utils = require('../utils.js');
let vue = require("vue");

//#region ../../packages/components/table-v2/src/composables/use-styles.ts
const useStyles = (props, { columnsTotalWidth, rowsHeight, fixedColumnsOnLeft, fixedColumnsOnRight }) => {
	const bodyWidth = (0, vue.computed)(() => {
		const { fixed, width, vScrollbarSize } = props;
		const ret = width - vScrollbarSize;
		return fixed ? Math.max(Math.round((0, vue.unref)(columnsTotalWidth)), ret) : ret;
	});
	const mainTableHeight = (0, vue.computed)(() => {
		const { height = 0, maxHeight = 0, footerHeight, hScrollbarSize } = props;
		if (maxHeight > 0) {
			const _fixedRowsHeight = (0, vue.unref)(fixedRowsHeight);
			const _rowsHeight = (0, vue.unref)(rowsHeight);
			const total = (0, vue.unref)(headerHeight) + _fixedRowsHeight + _rowsHeight + hScrollbarSize;
			return Math.min(total, maxHeight - footerHeight);
		}
		return height - footerHeight;
	});
	const fixedTableHeight = (0, vue.computed)(() => {
		const { maxHeight } = props;
		const tableHeight = (0, vue.unref)(mainTableHeight);
		if (require_types.isNumber(maxHeight) && maxHeight > 0) return tableHeight;
		const totalHeight = (0, vue.unref)(rowsHeight) + (0, vue.unref)(headerHeight) + (0, vue.unref)(fixedRowsHeight);
		return Math.min(tableHeight, totalHeight);
	});
	const mapColumn = (column) => column.width;
	const leftTableWidth = (0, vue.computed)(() => require_utils.sum((0, vue.unref)(fixedColumnsOnLeft).map(mapColumn)));
	const rightTableWidth = (0, vue.computed)(() => require_utils.sum((0, vue.unref)(fixedColumnsOnRight).map(mapColumn)));
	const headerHeight = (0, vue.computed)(() => require_utils.sum(props.headerHeight));
	const fixedRowsHeight = (0, vue.computed)(() => {
		return (props.fixedData?.length || 0) * props.rowHeight;
	});
	const windowHeight = (0, vue.computed)(() => {
		return (0, vue.unref)(mainTableHeight) - (0, vue.unref)(headerHeight) - (0, vue.unref)(fixedRowsHeight);
	});
	const rootStyle = (0, vue.computed)(() => {
		const { style = {}, height, width } = props;
		return require_utils.enforceUnit({
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
		footerHeight: (0, vue.computed)(() => require_utils.enforceUnit({ height: props.footerHeight })),
		emptyStyle: (0, vue.computed)(() => ({
			top: require_style.addUnit((0, vue.unref)(headerHeight)),
			bottom: require_style.addUnit(props.footerHeight),
			width: require_style.addUnit(props.width)
		})),
		rootStyle,
		headerHeight
	};
};

//#endregion
exports.useStyles = useStyles;
//# sourceMappingURL=use-styles.js.map