import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/divider/src/divider.ts
/**
* @deprecated Removed after 3.0.0, Use `DividerProps` instead.
*/
const dividerProps = buildProps({
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
		type: definePropType(String),
		default: "solid"
	}
});

//#endregion
export { dividerProps };
//# sourceMappingURL=divider.mjs.map