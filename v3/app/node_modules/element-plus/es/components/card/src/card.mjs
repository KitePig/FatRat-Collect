import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/card/src/card.ts
/**
* @deprecated Removed after 3.0.0, Use `CardProps` instead.
*/
const cardProps = buildProps({
	header: {
		type: String,
		default: ""
	},
	footer: {
		type: String,
		default: ""
	},
	bodyStyle: {
		type: definePropType([
			String,
			Object,
			Array
		]),
		default: ""
	},
	headerClass: String,
	bodyClass: String,
	footerClass: String,
	shadow: {
		type: String,
		values: [
			"always",
			"hover",
			"never"
		],
		default: void 0
	}
});
const cardContextKey = Symbol("cardContextKey");

//#endregion
export { cardContextKey, cardProps };
//# sourceMappingURL=card.mjs.map