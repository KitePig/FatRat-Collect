Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_size = require('../../../constants/size.js');
const require_types = require('../../../utils/types.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_content = require('../../tooltip/src/content.js');
let _popperjs_core = require("@popperjs/core");

//#region ../../packages/components/avatar/src/avatar-group-props.ts
const avatarGroupProps = {
	size: {
		type: require_runtime$1.definePropType([Number, String]),
		values: require_size.componentSizes,
		validator: (val) => require_types.isNumber(val)
	},
	shape: {
		type: require_runtime$1.definePropType(String),
		values: ["circle", "square"]
	},
	collapseAvatars: Boolean,
	collapseAvatarsTooltip: Boolean,
	maxCollapseAvatars: {
		type: Number,
		default: 1
	},
	effect: {
		type: require_runtime$1.definePropType(String),
		default: "light"
	},
	placement: {
		type: require_runtime$1.definePropType(String),
		values: _popperjs_core.placements,
		default: "top"
	},
	popperClass: require_content.useTooltipContentProps.popperClass,
	popperStyle: require_content.useTooltipContentProps.popperStyle,
	collapseClass: String,
	collapseStyle: { type: require_runtime$1.definePropType([
		String,
		Array,
		Object
	]) }
};

//#endregion
exports.avatarGroupProps = avatarGroupProps;
//# sourceMappingURL=avatar-group-props.js.map