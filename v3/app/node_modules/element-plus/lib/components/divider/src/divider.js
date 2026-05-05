Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/divider/src/divider.ts
/**
* @deprecated Removed after 3.0.0, Use `DividerProps` instead.
*/
const dividerProps = require_runtime.buildProps({
	direction: {
		type: String,
		values: ["horizontal", "vertical"],
		default: "horizontal"
	},
	contentPosition: {
		type: String,
		values: [
			"left",
			"center",
			"right"
		],
		default: "center"
	},
	borderStyle: {
		type: require_runtime.definePropType(String),
		default: "solid"
	}
});

//#endregion
exports.dividerProps = dividerProps;
//# sourceMappingURL=divider.js.map