import { componentSizes } from "../../../constants/size.mjs";
import { isNumber } from "../../../utils/types.mjs";
import { definePropType } from "../../../utils/vue/props/runtime.mjs";
import { useTooltipContentProps } from "../../tooltip/src/content.mjs";
import { placements } from "@popperjs/core";

//#region ../../packages/components/avatar/src/avatar-group-props.ts
const avatarGroupProps = {
	size: {
		type: definePropType([Number, String]),
		values: componentSizes,
		validator: (val) => isNumber(val)
	},
	shape: {
		type: definePropType(String),
		values: ["circle", "square"]
	},
	collapseAvatars: Boolean,
	collapseAvatarsTooltip: Boolean,
	maxCollapseAvatars: {
		type: Number,
		default: 1
	},
	effect: {
		type: definePropType(String),
		default: "light"
	},
	placement: {
		type: definePropType(String),
		values: placements,
		default: "top"
	},
	popperClass: useTooltipContentProps.popperClass,
	popperStyle: useTooltipContentProps.popperStyle,
	collapseClass: String,
	collapseStyle: { type: definePropType([
		String,
		Array,
		Object
	]) }
};

//#endregion
export { avatarGroupProps };
//# sourceMappingURL=avatar-group-props.mjs.map