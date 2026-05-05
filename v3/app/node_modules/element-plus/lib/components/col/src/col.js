Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_typescript = require('../../../utils/typescript.js');

//#region ../../packages/components/col/src/col.ts
/**
* @deprecated Removed after 3.0.0, Use `ColProps` instead.
*/
const colProps = require_runtime.buildProps({
	tag: {
		type: String,
		default: "div"
	},
	span: {
		type: Number,
		default: 24
	},
	offset: {
		type: Number,
		default: 0
	},
	pull: {
		type: Number,
		default: 0
	},
	push: {
		type: Number,
		default: 0
	},
	xs: {
		type: require_runtime.definePropType([Number, Object]),
		default: () => require_typescript.mutable({})
	},
	sm: {
		type: require_runtime.definePropType([Number, Object]),
		default: () => require_typescript.mutable({})
	},
	md: {
		type: require_runtime.definePropType([Number, Object]),
		default: () => require_typescript.mutable({})
	},
	lg: {
		type: require_runtime.definePropType([Number, Object]),
		default: () => require_typescript.mutable({})
	},
	xl: {
		type: require_runtime.definePropType([Number, Object]),
		default: () => require_typescript.mutable({})
	}
});

//#endregion
exports.colProps = colProps;
//# sourceMappingURL=col.js.map