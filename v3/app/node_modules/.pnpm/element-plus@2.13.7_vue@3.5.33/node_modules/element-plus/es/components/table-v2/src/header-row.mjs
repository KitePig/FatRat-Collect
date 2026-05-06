import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { columns } from "./common.mjs";

//#region ../../packages/components/table-v2/src/header-row.ts
const tableV2HeaderRowProps = buildProps({
	class: String,
	columns,
	columnsStyles: {
		type: definePropType(Object),
		required: true
	},
	headerIndex: Number,
	style: { type: definePropType(Object) }
});

//#endregion
export { tableV2HeaderRowProps };
//# sourceMappingURL=header-row.mjs.map