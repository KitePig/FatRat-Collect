import { definePropType } from "../../../utils/vue/props/runtime.mjs";
import { mutable } from "../../../utils/typescript.mjs";

//#region ../../packages/components/table-v2/src/common.ts
/**
* @Note even though we can use `string[] | string` as the type but for
* convenience here we only use `string` as the acceptable value here.
*/
const classType = String;
const columns = {
	type: definePropType(Array),
	required: true
};
const column = { type: definePropType(Object) };
const fixedDataType = { type: definePropType(Array) };
const dataType = {
	...fixedDataType,
	required: true
};
const expandColumnKey = String;
const expandKeys = {
	type: definePropType(Array),
	default: () => mutable([])
};
const requiredNumber = {
	type: Number,
	required: true
};
const rowKey = {
	type: definePropType([
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
const styleType = { type: definePropType(Object) };

//#endregion
export { classType, column, columns, dataType, expandColumnKey, expandKeys, fixedDataType, requiredNumber, rowKey, styleType };
//# sourceMappingURL=common.mjs.map