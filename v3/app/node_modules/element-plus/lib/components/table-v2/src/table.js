Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_props = require('../../virtual-list/src/props.js');
const require_common = require('./common.js');
const require_row = require('./row.js');
const require_header = require('./header.js');
const require_grid = require('./grid.js');

//#region ../../packages/components/table-v2/src/table.ts
const tableV2Props = require_runtime.buildProps({
	cache: require_grid.tableV2GridProps.cache,
	estimatedRowHeight: require_row.tableV2RowProps.estimatedRowHeight,
	rowKey: require_common.rowKey,
	headerClass: { type: require_runtime.definePropType([String, Function]) },
	headerProps: { type: require_runtime.definePropType([Object, Function]) },
	headerCellProps: { type: require_runtime.definePropType([Object, Function]) },
	headerHeight: require_header.tableV2HeaderProps.headerHeight,
	footerHeight: {
		type: Number,
		default: 0
	},
	rowClass: { type: require_runtime.definePropType([String, Function]) },
	rowProps: { type: require_runtime.definePropType([Object, Function]) },
	rowHeight: {
		type: Number,
		default: 50
	},
	cellProps: { type: require_runtime.definePropType([Object, Function]) },
	columns: require_common.columns,
	data: require_common.dataType,
	dataGetter: { type: require_runtime.definePropType(Function) },
	fixedData: require_common.fixedDataType,
	expandColumnKey: require_row.tableV2RowProps.expandColumnKey,
	expandedRowKeys: require_common.expandKeys,
	defaultExpandedRowKeys: require_common.expandKeys,
	class: require_common.classType,
	fixed: Boolean,
	style: { type: require_runtime.definePropType(Object) },
	width: require_common.requiredNumber,
	height: require_common.requiredNumber,
	maxHeight: Number,
	useIsScrolling: Boolean,
	indentSize: {
		type: Number,
		default: 12
	},
	iconSize: {
		type: Number,
		default: 12
	},
	hScrollbarSize: require_props.virtualizedGridProps.hScrollbarSize,
	vScrollbarSize: require_props.virtualizedGridProps.vScrollbarSize,
	scrollbarAlwaysOn: require_props.virtualizedScrollbarProps.alwaysOn,
	sortBy: {
		type: require_runtime.definePropType(Object),
		default: () => ({})
	},
	sortState: {
		type: require_runtime.definePropType(Object),
		default: void 0
	},
	onColumnSort: { type: require_runtime.definePropType(Function) },
	onExpandedRowsChange: { type: require_runtime.definePropType(Function) },
	onEndReached: { type: require_runtime.definePropType(Function) },
	onRowExpand: require_row.tableV2RowProps.onRowExpand,
	onScroll: require_grid.tableV2GridProps.onScroll,
	onRowsRendered: require_grid.tableV2GridProps.onRowsRendered,
	rowEventHandlers: require_row.tableV2RowProps.rowEventHandlers
});

//#endregion
exports.tableV2Props = tableV2Props;
//# sourceMappingURL=table.js.map