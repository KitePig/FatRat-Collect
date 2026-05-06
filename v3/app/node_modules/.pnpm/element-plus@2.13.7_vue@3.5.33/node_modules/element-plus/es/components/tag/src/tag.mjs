import { componentSizes } from "../../../constants/size.mjs";
import { buildProps } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/tag/src/tag.ts
/**
* @deprecated Removed after 3.0.0, Use `TagProps` instead.
*/
const tagProps = buildProps({
	type: {
		type: String,
		values: [
			"primary",
			"success",
			"info",
			"warning",
			"danger"
		],
		default: "primary"
	},
	closable: Boolean,
	disableTransitions: Boolean,
	hit: Boolean,
	color: String,
	size: {
		type: String,
		values: componentSizes
	},
	effect: {
		type: String,
		values: [
			"dark",
			"light",
			"plain"
		],
		default: "light"
	},
	round: Boolean
});
const tagEmits = {
	close: (evt) => evt instanceof MouseEvent,
	click: (evt) => evt instanceof MouseEvent
};

//#endregion
export { tagEmits, tagProps };
//# sourceMappingURL=tag.mjs.map