import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { column } from "./common.mjs";

//#region ../../packages/components/table-v2/src/cell.ts
const tableV2CellProps = buildProps({
	class: String,
	cellData: { type: definePropType([
		String,
		Boolean,
		Number,
		Object
	]) },
	column,
	columnIndex: Number,
	style: { type: definePropType([
		String,
		Array,
		Object
	]) },
	rowData: { type: definePropType(Object) },
	rowIndex: Number
});

//#endregion
export { tableV2CellProps };
//# sourceMappingURL=cell.mjs.map