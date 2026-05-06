import { isString, isUndefined } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/anchor/src/anchor.ts
/**
* @deprecated Removed after 3.0.0, Use `AnchorProps` instead.
*/
const anchorProps = buildProps({
	container: { type: definePropType([String, Object]) },
	offset: {
		type: Number,
		default: 0
	},
	bound: {
		type: Number,
		default: 15
	},
	duration: {
		type: Number,
		default: 300
	},
	marker: {
		type: Boolean,
		default: true
	},
	type: {
		type: definePropType(String),
		default: "default"
	},
	direction: {
		type: definePropType(String),
		default: "vertical"
	},
	selectScrollTop: Boolean
});
const anchorEmits = {
	change: (href) => isString(href),
	click: (e, href) => e instanceof MouseEvent && (isString(href) || isUndefined(href))
};

//#endregion
export { anchorEmits, anchorProps };
//# sourceMappingURL=anchor.mjs.map