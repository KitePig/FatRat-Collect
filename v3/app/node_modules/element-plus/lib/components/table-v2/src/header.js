Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_common = require('./common.js');

//#region ../../packages/components/table-v2/src/header.ts
const requiredNumberType = {
	type: Number,
	required: true
};
const tableV2HeaderProps = require_runtime.buildProps({
	class: String,
	columns: require_common.columns,
	fixedHeaderData: { type: require_runtime.definePropType(Array) },
	headerData: {
		type: require_runtime.definePropType(Array),
		required: true
	},
	headerHeight: {
		type: require_runtime.definePropType([Number, Array]),
		default: 50
	},
	rowWidth: requiredNumberType,
	rowHeight: {
		type: Number,
		default: 50
	},
	height: requiredNumberType,
	width: requiredNumberType
});

//#endregion
exports.tableV2HeaderProps = tableV2HeaderProps;
//# sourceMappingURL=header.js.map