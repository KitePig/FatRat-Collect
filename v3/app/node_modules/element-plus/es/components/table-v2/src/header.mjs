import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { columns } from "./common.mjs";

//#region ../../packages/components/table-v2/src/header.ts
const requiredNumberType = {
	type: Number,
	required: true
};
const tableV2HeaderProps = buildProps({
	class: String,
	columns,
	fixedHeaderData: { type: definePropType(Array) },
	headerData: {
		type: definePropType(Array),
		required: true
	},
	headerHeight: {
		type: definePropType([Number, Array]),
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
export { tableV2HeaderProps };
//# sourceMappingURL=header.mjs.map