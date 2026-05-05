Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_size = require('../../../../constants/size.js');
const require_runtime = require('../../../../utils/vue/props/runtime.js');
const require_typescript = require('../../../../utils/typescript.js');

//#region ../../packages/components/pagination/src/components/sizes.ts
const paginationSizesProps = require_runtime.buildProps({
	pageSize: {
		type: Number,
		required: true
	},
	pageSizes: {
		type: require_runtime.definePropType(Array),
		default: () => require_typescript.mutable([
			10,
			20,
			30,
			40,
			50,
			100
		])
	},
	popperClass: { type: String },
	popperStyle: { type: require_runtime.definePropType([String, Object]) },
	disabled: Boolean,
	teleported: Boolean,
	size: {
		type: String,
		values: require_size.componentSizes
	},
	appendSizeTo: String
});

//#endregion
exports.paginationSizesProps = paginationSizesProps;
//# sourceMappingURL=sizes.js.map