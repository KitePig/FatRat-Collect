Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_size = require('../../../constants/size.js');
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/tag/src/tag.ts
/**
* @deprecated Removed after 3.0.0, Use `TagProps` instead.
*/
const tagProps = require_runtime.buildProps({
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
		values: require_size.componentSizes
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
exports.tagEmits = tagEmits;
exports.tagProps = tagProps;
//# sourceMappingURL=tag.js.map