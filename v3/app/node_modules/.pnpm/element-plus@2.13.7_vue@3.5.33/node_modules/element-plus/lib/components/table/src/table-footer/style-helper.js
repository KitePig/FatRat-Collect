Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_index = require('../../../../hooks/use-namespace/index.js');
const require_util = require('../util.js');
const require_mapState_helper = require('./mapState-helper.js');

//#region ../../packages/components/table/src/table-footer/style-helper.ts
function useStyle(props) {
	const { columns } = require_mapState_helper.default();
	const ns = require_index.useNamespace("table");
	const getCellClasses = (columns, cellIndex) => {
		const column = columns[cellIndex];
		const classes = [
			ns.e("cell"),
			column.id,
			column.align,
			column.labelClassName,
			...require_util.getFixedColumnsClass(ns.b(), cellIndex, column.fixed, props.store)
		];
		if (column.className) classes.push(column.className);
		if (!column.children) classes.push(ns.is("leaf"));
		return classes;
	};
	const getCellStyles = (column, cellIndex) => {
		const fixedStyle = require_util.getFixedColumnOffset(cellIndex, column.fixed, props.store);
		require_util.ensurePosition(fixedStyle, "left");
		require_util.ensurePosition(fixedStyle, "right");
		return fixedStyle;
	};
	return {
		getCellClasses,
		getCellStyles,
		columns
	};
}

//#endregion
exports.default = useStyle;
//# sourceMappingURL=style-helper.js.map