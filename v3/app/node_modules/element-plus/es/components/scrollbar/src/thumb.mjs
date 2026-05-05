import { buildProps } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/scrollbar/src/thumb.ts
/**
* @deprecated Removed after 3.0.0, Use `ThumbProps` instead.
*/
const thumbProps = buildProps({
	vertical: Boolean,
	size: String,
	move: Number,
	ratio: {
		type: Number,
		required: true
	},
	always: Boolean
});

//#endregion
export { thumbProps };
//# sourceMappingURL=thumb.mjs.map