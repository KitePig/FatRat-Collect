Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_common = require('./common.js');

//#region ../../packages/components/table-v2/src/header-row.ts
const tableV2HeaderRowProps = require_runtime.buildProps({
	class: String,
	columns: require_common.columns,
	columnsStyles: {
		type: require_runtime.definePropType(Object),
		required: true
	},
	headerIndex: Number,
	style: { type: require_runtime.definePropType(Object) }
});

//#endregion
exports.tableV2HeaderRowProps = tableV2HeaderRowProps;
//# sourceMappingURL=header-row.js.map