import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { classType, column } from "./common.mjs";

//#region ../../packages/components/table-v2/src/header-cell.ts
const tableV2HeaderCell = buildProps({
	class: classType,
	columnIndex: Number,
	column
});

//#endregion
export { tableV2HeaderCell };
//# sourceMappingURL=header-cell.mjs.map