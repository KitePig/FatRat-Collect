Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../utils/vue/props/runtime.js');
const require_icon = require('../../../../utils/vue/icon.js');

//#region ../../packages/components/pagination/src/components/next.ts
const paginationNextProps = require_runtime.buildProps({
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
	nextIcon: { type: require_icon.iconPropType }
});

//#endregion
exports.paginationNextProps = paginationNextProps;
//# sourceMappingURL=next.js.map