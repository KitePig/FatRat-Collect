import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { mutable } from "../../../utils/typescript.mjs";

//#region ../../packages/components/col/src/col.ts
/**
* @deprecated Removed after 3.0.0, Use `ColProps` instead.
*/
const colProps = buildProps({
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
		type: definePropType([Number, Object]),
		default: () => mutable({})
	},
	sm: {
		type: definePropType([Number, Object]),
		default: () => mutable({})
	},
	md: {
		type: definePropType([Number, Object]),
		default: () => mutable({})
	},
	lg: {
		type: definePropType([Number, Object]),
		default: () => mutable({})
	},
	xl: {
		type: definePropType([Number, Object]),
		default: () => mutable({})
	}
});

//#endregion
export { colProps };
//# sourceMappingURL=col.mjs.map