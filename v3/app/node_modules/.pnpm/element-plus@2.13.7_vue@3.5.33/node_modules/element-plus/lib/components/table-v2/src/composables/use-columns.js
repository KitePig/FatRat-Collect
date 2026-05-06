Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_constants = require('../constants.js');
const require_private = require('../private.js');
const require_utils = require('./utils.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/table-v2/src/composables/use-columns.ts
function useColumns(props, columns, fixed) {
	const _columns = (0, vue.computed)(() => (0, vue.unref)(columns).map((column, index) => ({
		...column,
		key: column.key ?? column.dataKey ?? index
	})));
	const visibleColumns = (0, vue.computed)(() => {
		return (0, vue.unref)(_columns).filter((column) => !column.hidden);
	});
	const fixedColumnsOnLeft = (0, vue.computed)(() => (0, vue.unref)(visibleColumns).filter((column) => column.fixed === "left" || column.fixed === true));
	const fixedColumnsOnRight = (0, vue.computed)(() => (0, vue.unref)(visibleColumns).filter((column) => column.fixed === "right"));
	const normalColumns = (0, vue.computed)(() => (0, vue.unref)(visibleColumns).filter((column) => !column.fixed));
	const mainColumns = (0, vue.computed)(() => {
		const ret = [];
		(0, vue.unref)(fixedColumnsOnLeft).forEach((column) => {
			ret.push({
				...column,
				placeholderSign: require_private.placeholderSign
			});
		});
		(0, vue.unref)(normalColumns).forEach((column) => {
			ret.push(column);
		});
		(0, vue.unref)(fixedColumnsOnRight).forEach((column) => {
			ret.push({
				...column,
				placeholderSign: require_private.placeholderSign
			});
		});
		return ret;
	});
	const hasFixedColumns = (0, vue.computed)(() => {
		return (0, vue.unref)(fixedColumnsOnLeft).length || (0, vue.unref)(fixedColumnsOnRight).length;
	});
	const columnsStyles = (0, vue.computed)(() => {
		return (0, vue.unref)(_columns).reduce((style, column) => {
			style[column.key] = require_utils.calcColumnStyle(column, (0, vue.unref)(fixed), props.fixed);
			return style;
		}, {});
	});
	const columnsTotalWidth = (0, vue.computed)(() => {
		return (0, vue.unref)(visibleColumns).reduce((width, column) => width + column.width, 0);
	});
	const getColumn = (key) => {
		return (0, vue.unref)(_columns).find((column) => column.key === key);
	};
	const getColumnStyle = (key) => {
		return (0, vue.unref)(columnsStyles)[key];
	};
	const updateColumnWidth = (column, width) => {
		column.width = width;
	};
	function onColumnSorted(e) {
		const { key } = e.currentTarget.dataset;
		if (!key) return;
		const { sortState, sortBy } = props;
		let order = require_constants.SortOrder.ASC;
		if ((0, _vue_shared.isObject)(sortState)) order = require_constants.oppositeOrderMap[sortState[key]];
		else order = require_constants.oppositeOrderMap[sortBy.order];
		props.onColumnSort?.({
			column: getColumn(key),
			key,
			order
		});
	}
	return {
		columns: _columns,
		columnsStyles,
		columnsTotalWidth,
		fixedColumnsOnLeft,
		fixedColumnsOnRight,
		hasFixedColumns,
		mainColumns,
		normalColumns,
		visibleColumns,
		getColumn,
		getColumnStyle,
		updateColumnWidth,
		onColumnSorted
	};
}

//#endregion
exports.useColumns = useColumns;
//# sourceMappingURL=use-columns.js.map