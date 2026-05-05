import { componentSizes } from "../../../constants/size.mjs";
import { isNumber } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";

//#region ../../packages/components/avatar/src/avatar.ts
/**
* @deprecated Removed after 3.0.0, Use `AvatarProps` instead.
*/
const avatarProps = buildProps({
	size: {
		type: [Number, String],
		values: componentSizes,
		validator: (val) => isNumber(val)
	},
	shape: {
		type: String,
		values: ["circle", "square"]
	},
	icon: { type: iconPropType },
	src: {
		type: String,
		default: ""
	},
	alt: String,
	srcSet: String,
	fit: {
		type: definePropType(String),
		default: "cover"
	}
});
const avatarEmits = { error: (evt) => evt instanceof Event };

//#endregion
export { avatarEmits, avatarProps };
//# sourceMappingURL=avatar.mjs.map