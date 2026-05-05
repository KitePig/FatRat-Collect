Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_index = require('../../../hooks/use-size/index.js');

//#region ../../packages/components/descriptions/src/description.ts
/**
* @deprecated Removed after 3.0.0, Use `DescriptionProps` instead.
*/
const descriptionProps = require_runtime.buildProps({
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
	size: require_index.useSizeProp,
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
exports.descriptionProps = descriptionProps;
//# sourceMappingURL=description.js.map