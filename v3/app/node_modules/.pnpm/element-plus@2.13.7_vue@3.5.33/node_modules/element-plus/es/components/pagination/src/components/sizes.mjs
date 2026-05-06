import { componentSizes } from "../../../../constants/size.mjs";
import { buildProps, definePropType } from "../../../../utils/vue/props/runtime.mjs";
import { mutable } from "../../../../utils/typescript.mjs";

//#region ../../packages/components/pagination/src/components/sizes.ts
const paginationSizesProps = buildProps({
	pageSize: {
		type: Number,
		required: true
	},
	pageSizes: {
		type: definePropType(Array),
		default: () => mutable([
			10,
			20,
			30,
			40,
			50,
			100
		])
	},
	popperClass: { type: String },
	popperStyle: { type: definePropType([String, Object]) },
	disabled: Boolean,
	teleported: Boolean,
	size: {
		type: String,
		values: componentSizes
	},
	appendSizeTo: String
});

//#endregion
export { paginationSizesProps };
//# sourceMappingURL=sizes.mjs.map