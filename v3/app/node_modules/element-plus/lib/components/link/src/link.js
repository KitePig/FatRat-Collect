Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');

//#region ../../packages/components/link/src/link.ts
/**
* @deprecated Removed after 3.0.0, Use `LinkProps` instead.
*/
const linkProps = require_runtime.buildProps({
	type: {
		type: String,
		values: [
			"primary",
			"success",
			"warning",
			"info",
			"danger",
			"default"
		],
		default: void 0
	},
	underline: {
		type: [Boolean, String],
		values: [
			true,
			false,
			"always",
			"never",
			"hover"
		],
		default: void 0
	},
	disabled: Boolean,
	href: {
		type: String,
		default: ""
	},
	target: {
		type: String,
		default: "_self"
	},
	icon: { type: require_icon.iconPropType }
});
const linkEmits = { click: (evt) => evt instanceof MouseEvent };

//#endregion
exports.linkEmits = linkEmits;
exports.linkProps = linkProps;
//# sourceMappingURL=link.js.map