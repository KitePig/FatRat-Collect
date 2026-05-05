import { isFunction, isString } from "../../../../utils/types.mjs";
import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { ensurePosition, getFixedColumnOffset, getFixedColumnsClass } from "../util.mjs";
import { TABLE_INJECTION_KEY } from "../tokens.mjs";
import { inject } from "vue";

//#region ../../packages/components/table/src/table-header/style.helper.ts
function useStyle(props) {
	const parent = inject(TABLE_INJECTION_KEY);
	const ns = useNamespace("table");
	const getHeaderRowStyle = (rowIndex) => {
		const headerRowStyle = parent?.props.headerRowStyle;
		if (isFunction(headerRowStyle)) return headerRowStyle.call(null, { rowIndex });
		return headerRowStyle;
	};
	const getHeaderRowClass = (rowIndex) => {
		const classes = [];
		const headerRowClassName = parent?.props.headerRowClassName;
		if (isString(headerRowClassName)) classes.push(headerRowClassName);
		else if (isFunction(headerRowClassName)) classes.push(headerRowClassName.call(null, { rowIndex }));
		return classes.join(" ");
	};
	const getHeaderCellStyle = (rowIndex, columnIndex, row, column) => {
		let headerCellStyles = parent?.props.headerCellStyle ?? {};
		if (isFunction(headerCellStyles)) headerCellStyles = headerCellStyles.call(null, {
			rowIndex,
			columnIndex,
			row,
			column
		});
		const fixedStyle = getFixedColumnOffset(columnIndex, column.fixed, props.store, row);
		ensurePosition(fixedStyle, "left");
		ensurePosition(fixedStyle, "right");
		return Object.assign({}, headerCellStyles, fixedStyle);
	};
	const getHeaderCellClass = (rowIndex, columnIndex, row, column) => {
		const fixedClasses = getFixedColumnsClass(ns.b(), columnIndex, column.fixed, props.store, row);
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
		if (isString(headerCellClassName)) classes.push(headerCellClassName);
		else if (isFunction(headerCellClassName)) classes.push(headerCellClassName.call(null, {
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
export { useStyle as default };
//# sourceMappingURL=style.helper.mjs.map