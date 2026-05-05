import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { ensurePosition, getFixedColumnOffset, getFixedColumnsClass } from "../util.mjs";
import useMapState from "./mapState-helper.mjs";

//#region ../../packages/components/table/src/table-footer/style-helper.ts
function useStyle(props) {
	const { columns } = useMapState();
	const ns = useNamespace("table");
	const getCellClasses = (columns, cellIndex) => {
		const column = columns[cellIndex];
		const classes = [
			ns.e("cell"),
			column.id,
			column.align,
			column.labelClassName,
			...getFixedColumnsClass(ns.b(), cellIndex, column.fixed, props.store)
		];
		if (column.className) classes.push(column.className);
		if (!column.children) classes.push(ns.is("leaf"));
		return classes;
	};
	const getCellStyles = (column, cellIndex) => {
		const fixedStyle = getFixedColumnOffset(cellIndex, column.fixed, props.store);
		ensurePosition(fixedStyle, "left");
		ensurePosition(fixedStyle, "right");
		return fixedStyle;
	};
	return {
		getCellClasses,
		getCellStyles,
		columns
	};
}

//#endregion
export { useStyle as default };
//# sourceMappingURL=style-helper.mjs.map