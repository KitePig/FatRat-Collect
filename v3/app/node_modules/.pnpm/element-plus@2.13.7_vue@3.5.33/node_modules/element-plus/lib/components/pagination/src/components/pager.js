Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../utils/vue/props/runtime.js');

//#region ../../packages/components/pagination/src/components/pager.ts
const paginationPagerProps = require_runtime.buildProps({
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
exports.paginationPagerProps = paginationPagerProps;
//# sourceMappingURL=pager.js.map