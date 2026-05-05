Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-namespace/index.js');
const require_util = require('../util.js');
const require_tokens = require('../tokens.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/table/src/table-body/styles-helper.ts
function useStyles(props) {
	const parent = (0, vue.inject)(require_tokens.TABLE_INJECTION_KEY);
	const ns = require_index.useNamespace("table");
	const getRowStyle = (row, rowIndex) => {
		const rowStyle = parent?.props.rowStyle;
		if ((0, _vue_shared.isFunction)(rowStyle)) return rowStyle.call(null, {
			row,
			rowIndex
		});
		return rowStyle || null;
	};
	const getRowClass = (row, rowIndex, displayIndex) => {
		const classes = [ns.e("row")];
		if (parent?.props.highlightCurrentRow && row === props.store?.states.currentRow.value) classes.push("current-row");
		if (props.stripe && displayIndex % 2 === 1) classes.push(ns.em("row", "striped"));
		const rowClassName = parent?.props.rowClassName;
		if ((0, _vue_shared.isString)(rowClassName)) classes.push(rowClassName);
		else if ((0, _vue_shared.isFunction)(rowClassName)) classes.push(rowClassName.call(null, {
			row,
			rowIndex
		}));
		return classes;
	};
	const getCellStyle = (rowIndex, columnIndex, row, column) => {
		const cellStyle = parent?.props.cellStyle;
		let cellStyles = cellStyle ?? {};
		if ((0, _vue_shared.isFunction)(cellStyle)) cellStyles = cellStyle.call(null, {
			rowIndex,
			columnIndex,
			row,
			column
		});
		const fixedStyle = require_util.getFixedColumnOffset(columnIndex, props?.fixed, props.store);
		require_util.ensurePosition(fixedStyle, "left");
		require_util.ensurePosition(fixedStyle, "right");
		return Object.assign({}, cellStyles, fixedStyle);
	};
	const getCellClass = (rowIndex, columnIndex, row, column, offset) => {
		const fixedClasses = require_util.getFixedColumnsClass(ns.b(), columnIndex, props?.fixed, props.store, void 0, offset);
		const classes = [
			column.id,
			column.align,
			column.className,
			...fixedClasses
		];
		const cellClassName = parent?.props.cellClassName;
		if ((0, _vue_shared.isString)(cellClassName)) classes.push(cellClassName);
		else if ((0, _vue_shared.isFunction)(cellClassName)) classes.push(cellClassName.call(null, {
			rowIndex,
			columnIndex,
			row,
			column
		}));
		classes.push(ns.e("cell"));
		return classes.filter((className) => Boolean(className)).join(" ");
	};
	const getSpan = (row, column, rowIndex, columnIndex) => {
		let rowspan = 1;
		let colspan = 1;
		const fn = parent?.props.spanMethod;
		if ((0, _vue_shared.isFunction)(fn)) {
			const result = fn({
				row,
				column,
				rowIndex,
				columnIndex
			});
			if ((0, _vue_shared.isArray)(result)) {
				rowspan = result[0];
				colspan = result[1];
			} else if ((0, _vue_shared.isObject)(result)) {
				rowspan = result.rowspan;
				colspan = result.colspan;
			}
		}
		return {
			rowspan,
			colspan
		};
	};
	const getColspanRealWidth = (columns, colspan, index) => {
		if (colspan < 1) return columns[index].realWidth;
		const widthArr = columns.map(({ realWidth, width }) => realWidth || width).slice(index, index + colspan);
		return Number(widthArr.reduce((acc, width) => Number(acc) + Number(width), -1));
	};
	return {
		getRowStyle,
		getRowClass,
		getCellStyle,
		getCellClass,
		getSpan,
		getColspanRealWidth
	};
}

//#endregion
exports.default = useStyles;
//# sourceMappingURL=styles-helper.js.map