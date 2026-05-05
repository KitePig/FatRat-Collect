import { buildProps } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/scrollbar/src/bar.ts
/**
* @deprecated Removed after 3.0.0, Use `BarProps` instead.
*/
const barProps = buildProps({
	always: {
		type: Boolean,
		default: true
	},
	minSize: {
		type: Number,
		required: true
	}
});

//#endregion
export { barProps };
//# sourceMappingURL=bar.mjs.map