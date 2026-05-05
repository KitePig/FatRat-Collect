import { definePropType } from "../../../utils/vue/props/runtime.mjs";
import { buttonProps } from "./button.mjs";

//#region ../../packages/components/button/src/button-group.ts
/**
* @deprecated Removed after 3.0.0, Use `ButtonGroupProps` instead.
*/
const buttonGroupProps = {
	size: buttonProps.size,
	type: buttonProps.type,
	direction: {
		type: definePropType(String),
		values: ["horizontal", "vertical"],
		default: "horizontal"
	}
};

//#endregion
export { buttonGroupProps };
//# sourceMappingURL=button-group.mjs.map