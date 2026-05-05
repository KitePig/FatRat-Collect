import { buildProps } from "../../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/pagination/src/components/pager.ts
const paginationPagerProps = buildProps({
	currentPage: {
		type: Number,
		default: 1
	},
	pageCount: {
		type: Number,
		required: true
	},
	pagerCount: {
		type: Number,
		default: 7
	},
	disabled: Boolean
});

//#endregion
export { paginationPagerProps };
//# sourceMappingURL=pager.mjs.map