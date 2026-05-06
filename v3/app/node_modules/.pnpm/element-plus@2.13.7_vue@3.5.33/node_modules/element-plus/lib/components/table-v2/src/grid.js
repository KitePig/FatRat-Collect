Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_props = require('../../virtual-list/src/props.js');
const require_common = require('./common.js');
const require_row = require('./row.js');
const require_header = require('./header.js');

//#region ../../packages/components/table-v2/src/grid.ts
const tableV2GridProps = require_runtime.buildProps({
	columns: require_common.columns,
	data: require_common.dataType,
	fixedData: require_common.fixedDataType,
	estimatedRowHeight: require_row.tableV2RowProps.estimatedRowHeight,
	width: require_common.requiredNumber,
	height: require_common.requiredNumber,
	headerWidth: require_common.requiredNumber,
	headerHeight: require_header.tableV2HeaderProps.headerHeight,
	bodyWidth: require_common.requiredNumber,
	rowHeight: require_common.requiredNumber,
	cache: require_props.virtualizedListProps.cache,
	useIsScrolling: Boolean,
	scrollbarAlwaysOn: require_props.virtualizedGridProps.scrollbarAlwaysOn,
	scrollbarStartGap: require_props.virtualizedGridProps.scrollbarStartGap,
	scrollbarEndGap: require_props.virtualizedGridProps.scrollbarEndGap,
	class: require_common.classType,
	style: require_common.styleType,
	containerStyle: require_common.styleType,
	getRowHeight: {
		type: require_runtime.definePropType(Function),
		required: true
	},
	rowKey: require_row.tableV2RowProps.rowKey,
	onRowsRendered: { type: require_runtime.definePropType(Function) },
	onScroll: { type: require_runtime.definePropType(Function) }
});

//#endregion
exports.tableV2GridProps = tableV2GridProps;
//# sourceMappingURL=grid.js.map