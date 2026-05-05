Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/card/src/card.ts
/**
* @deprecated Removed after 3.0.0, Use `CardProps` instead.
*/
const cardProps = require_runtime.buildProps({
	header: {
		type: String,
		default: ""
	},
	footer: {
		type: String,
		default: ""
	},
	bodyStyle: {
		type: require_runtime.definePropType([
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
exports.cardContextKey = cardContextKey;
exports.cardProps = cardProps;
//# sourceMappingURL=card.js.map