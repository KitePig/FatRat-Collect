import { buildProps } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/empty/src/empty.ts
/**
* @deprecated Removed after 3.0.0, Use `EmptyProps` instead.
*/
const emptyProps = buildProps({
	image: {
		type: String,
		default: ""
	},
	imageSize: Number,
	description: {
		type: String,
		default: ""
	}
});

//#endregion
export { emptyProps };
//# sourceMappingURL=empty.mjs.map