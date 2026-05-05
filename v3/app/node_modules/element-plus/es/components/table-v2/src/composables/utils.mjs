//#region ../../packages/components/table-v2/src/composables/utils.ts
const calcColumnStyle = (column, fixedColumn, fixed) => {
	const flex = {
		flexGrow: 0,
		flexShrink: 0,
		...fixed ? {} : {
			flexGrow: column.flexGrow ?? 0,
			flexShrink: column.flexShrink ?? 1
		}
	};
	const style = {
		...column.style ?? {},
		...flex,
		flexBasis: "auto",
		width: column.width
	};
	if (!fixedColumn) {
		if (column.maxWidth) style.maxWidth = column.maxWidth;
		if (column.minWidth) style.minWidth = column.minWidth;
	}
	return style;
};

//#endregion
export { calcColumnStyle };
//# sourceMappingURL=utils.mjs.map