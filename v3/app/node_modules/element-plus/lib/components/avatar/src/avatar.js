Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_size = require('../../../constants/size.js');
const require_types = require('../../../utils/types.js');
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');

//#region ../../packages/components/avatar/src/avatar.ts
/**
* @deprecated Removed after 3.0.0, Use `AvatarProps` instead.
*/
const avatarProps = require_runtime.buildProps({
	size: {
		type: [Number, String],
		values: require_size.componentSizes,
		validator: (val) => require_types.isNumber(val)
	},
	shape: {
		type: String,
		values: ["circle", "square"]
	},
	icon: { type: require_icon.iconPropType },
	src: {
		type: String,
		default: ""
	},
	alt: String,
	srcSet: String,
	fit: {
		type: require_runtime.definePropType(String),
		default: "cover"
	}
});
const avatarEmits = { error: (evt) => evt instanceof Event };

//#endregion
exports.avatarEmits = avatarEmits;
exports.avatarProps = avatarProps;
//# sourceMappingURL=avatar.js.map