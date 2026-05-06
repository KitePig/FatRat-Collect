Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_common = require('./common.js');

//#region ../../packages/components/table-v2/src/cell.ts
const tableV2CellProps = require_runtime.buildProps({
	class: String,
	cellData: { type: require_runtime.definePropType([
		String,
		Boolean,
		Number,
		Object
	]) },
	column: require_common.column,
	columnIndex: Number,
	style: { type: require_runtime.definePropType([
		String,
		Array,
		Object
	]) },
	rowData: { type: require_runtime.definePropType(Object) },
	rowIndex: Number
});

//#endregion
exports.tableV2CellProps = tableV2CellProps;
//# sourceMappingURL=cell.js.map