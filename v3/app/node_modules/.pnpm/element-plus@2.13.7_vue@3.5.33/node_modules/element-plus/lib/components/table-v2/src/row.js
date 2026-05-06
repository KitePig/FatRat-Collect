Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_props = require('../../virtual-list/src/props.js');
const require_common = require('./common.js');

//#region ../../packages/components/table-v2/src/row.ts
const tableV2RowProps = require_runtime.buildProps({
	class: String,
	columns: require_common.columns,
	columnsStyles: {
		type: require_runtime.definePropType(Object),
		required: true
	},
	depth: Number,
	expandColumnKey: require_common.expandColumnKey,
	estimatedRowHeight: {
		...require_props.virtualizedGridProps.estimatedRowHeight,
		default: void 0
	},
	isScrolling: Boolean,
	onRowExpand: { type: require_runtime.definePropType(Function) },
	onRowHover: { type: require_runtime.definePropType(Function) },
	onRowHeightChange: { type: require_runtime.definePropType(Function) },
	rowData: {
		type: require_runtime.definePropType(Object),
		required: true
	},
	rowEventHandlers: { type: require_runtime.definePropType(Object) },
	rowIndex: {
		type: Number,
		required: true
	},
	rowKey: require_common.rowKey,
	style: { type: require_runtime.definePropType(Object) }
});

//#endregion
exports.tableV2RowProps = tableV2RowProps;
//# sourceMappingURL=row.js.map