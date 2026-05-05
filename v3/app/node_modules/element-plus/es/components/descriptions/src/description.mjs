import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";

//#region ../../packages/components/descriptions/src/description.ts
/**
* @deprecated Removed after 3.0.0, Use `DescriptionProps` instead.
*/
const descriptionProps = buildProps({
	border: Boolean,
	column: {
		type: Number,
		default: 3
	},
	direction: {
		type: String,
		values: ["horizontal", "vertical"],
		default: "horizontal"
	},
	size: useSizeProp,
	title: {
		type: String,
		default: ""
	},
	extra: {
		type: String,
		default: ""
	},
	labelWidth: { type: [String, Number] }
});

//#endregion
export { descriptionProps };
//# sourceMappingURL=description.mjs.map