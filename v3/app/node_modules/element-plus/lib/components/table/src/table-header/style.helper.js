Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-namespace/index.js');
const require_util = require('../util.js');
const require_tokens = require('../tokens.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/table/src/table-header/style.helper.ts
function useStyle(props) {
	const parent = (0, vue.inject)(require_tokens.TABLE_INJECTION_KEY);
	const ns = require_index.useNamespace("table");
	const getHeaderRowStyle = (rowIndex) => {
		const headerRowStyle = parent?.props.headerRowStyle;
		if ((0, _vue_shared.isFunction)(headerRowStyle)) return headerRowStyle.call(null, { rowIndex });
		return headerRowStyle;
	};
	const getHeaderRowClass = (rowIndex) => {
		const classes = [];
		const headerRowClassName = parent?.props.headerRowClassName;
		if ((0, _vue_shared.isString)(headerRowClassName)) classes.push(headerRowClassName);
		else if ((0, _vue_shared.isFunction)(headerRowClassName)) classes.push(headerRowClassName.call(null, { rowIndex }));
		return classes.join(" ");
	};
	const getHeaderCellStyle = (rowIndex, columnIndex, row, column) => {
		let headerCellStyles = parent?.props.headerCellStyle ?? {};
		if ((0, _vue_shared.isFunction)(headerCellStyles)) headerCellStyles = headerCellStyles.call(null, {
			rowIndex,
			columnIndex,
			row,
			column
		});
		const fixedStyle = require_util.getFixedColumnOffset(columnIndex, column.fixed, props.store, row);
		require_util.ensurePosition(fixedStyle, "left");
		require_util.ensurePosition(fixedStyle, "right");
		return Object.assign({}, headerCellStyles, fixedStyle);
	};
	const getHeaderCellClass = (rowIndex, columnIndex, row, column) => {
		const fixedClasses = require_util.getFixedColumnsClass(ns.b(), columnIndex, column.fixed, props.store, row);
		const classes = [
			column.id,
			column.order,
			column.headerAlign,
			column.className,
			column.labelClassName,
			...fixedClasses
		];
		if (!column.children) classes.push("is-leaf");
		if (column.sortable) classes.push("is-sortable");
		const headerCellClassName = parent?.props.headerCellClassName;
		if ((0, _vue_shared.isString)(headerCellClassName)) classes.push(headerCellClassName);
		else if ((0, _vue_shared.isFunction)(headerCellClassName)) classes.push(headerCellClassName.call(null, {
			rowIndex,
			columnIndex,
			row,
			column
		}));
		classes.push(ns.e("cell"));
		return classes.filter((className) => Boolean(className)).join(" ");
	};
	return {
		getHeaderRowStyle,
		getHeaderRowClass,
		getHeaderCellStyle,
		getHeaderCellClass
	};
}

//#endregion
exports.default = useStyle;
//# sourceMappingURL=style.helper.js.map