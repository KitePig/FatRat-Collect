Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../utils/vue/props/runtime.js');
const require_icon = require('../../../../utils/vue/icon.js');

//#region ../../packages/components/pagination/src/components/prev.ts
const paginationPrevProps = require_runtime.buildProps({
	disabled: Boolean,
	currentPage: {
		type: Number,
		default: 1
	},
	prevText: { type: String },
	prevIcon: { type: require_icon.iconPropType }
});
const paginationPrevEmits = { click: (evt) => evt instanceof MouseEvent };

//#endregion
exports.paginationPrevEmits = paginationPrevEmits;
exports.paginationPrevProps = paginationPrevProps;
//# sourceMappingURL=prev.js.map