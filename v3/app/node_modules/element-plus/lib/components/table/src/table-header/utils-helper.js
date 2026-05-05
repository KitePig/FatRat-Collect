Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_tokens = require('../tokens.js');
let vue = require("vue");

//#region ../../packages/components/table/src/table-header/utils-helper.ts
const getAllColumns = (columns) => {
	const result = [];
	columns.forEach((column) => {
		if (column.children) {
			result.push(column);
			result.push.apply(result, getAllColumns(column.children));
		} else result.push(column);
	});
	return result;
};
const convertToRows = (originColumns) => {
	let maxLevel = 1;
	const traverse = (column, parent) => {
		if (parent) {
			column.level = parent.level + 1;
			if (maxLevel < column.level) maxLevel = column.level;
		}
		if (column.children) {
			let colSpan = 0;
			column.children.forEach((subColumn) => {
				traverse(subColumn, column);
				colSpan += subColumn.colSpan;
			});
			column.colSpan = colSpan;
		} else column.colSpan = 1;
	};
	originColumns.forEach((column) => {
		column.level = 1;
		traverse(column, void 0);
	});
	const rows = [];
	for (let i = 0; i < maxLevel; i++) rows.push([]);
	getAllColumns(originColumns).forEach((column) => {
		if (!column.children) column.rowSpan = maxLevel - column.level + 1;
		else {
			column.rowSpan = 1;
			column.children.forEach((col) => col.isSubColumn = true);
		}
		rows[column.level - 1].push(column);
	});
	return rows;
};
function useUtils(props) {
	const parent = (0, vue.inject)(require_tokens.TABLE_INJECTION_KEY);
	const columnRows = (0, vue.computed)(() => {
		return convertToRows(props.store.states.originColumns.value);
	});
	const isGroup = (0, vue.computed)(() => {
		const result = columnRows.value.length > 1;
		if (result && parent) parent.state.isGroup.value = true;
		return result;
	});
	const toggleAllSelection = (event) => {
		event.stopPropagation();
		parent?.store.commit("toggleAllSelection");
	};
	return {
		isGroup,
		toggleAllSelection,
		columnRows
	};
}

//#endregion
exports.convertToRows = convertToRows;
exports.default = useUtils;
//# sourceMappingURL=utils-helper.js.map