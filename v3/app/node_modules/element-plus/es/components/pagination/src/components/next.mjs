import { buildProps } from "../../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../../utils/vue/icon.mjs";

//#region ../../packages/components/pagination/src/components/next.ts
const paginationNextProps = buildProps({
	disabled: Boolean,
	currentPage: {
		type: Number,
		default: 1
	},
	pageCount: {
		type: Number,
		default: 50
	},
	nextText: { type: String },
	nextIcon: { type: iconPropType }
});

//#endregion
export { paginationNextProps };
//# sourceMappingURL=next.mjs.map