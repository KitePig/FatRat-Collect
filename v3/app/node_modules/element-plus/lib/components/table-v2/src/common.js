Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_typescript = require('../../../utils/typescript.js');

//#region ../../packages/components/table-v2/src/common.ts
/**
* @Note even though we can use `string[] | string` as the type but for
* convenience here we only use `string` as the acceptable value here.
*/
const classType = String;
const columns = {
	type: require_runtime.definePropType(Array),
	required: true
};
const column = { type: require_runtime.definePropType(Object) };
const fixedDataType = { type: require_runtime.definePropType(Array) };
const dataType = {
	...fixedDataType,
	required: true
};
const expandColumnKey = String;
const expandKeys = {
	type: require_runtime.definePropType(Array),
	default: () => require_typescript.mutable([])
};
const requiredNumber = {
	type: Number,
	required: true
};
const rowKey = {
	type: require_runtime.definePropType([
		String,
		Number,
		Symbol
	]),
	default: "id"
};
/**
* @note even though we can use `StyleValue` but that would be difficult for us to mapping them,
* so we only use `CSSProperties` as the acceptable value here.
*/
const styleType = { type: require_runtime.definePropType(Object) };

//#endregion
exports.classType = classType;
exports.column = column;
exports.columns = columns;
exports.dataType = dataType;
exports.expandColumnKey = expandColumnKey;
exports.expandKeys = expandKeys;
exports.fixedDataType = fixedDataType;
exports.requiredNumber = requiredNumber;
exports.rowKey = rowKey;
exports.styleType = styleType;
//# sourceMappingURL=common.js.map