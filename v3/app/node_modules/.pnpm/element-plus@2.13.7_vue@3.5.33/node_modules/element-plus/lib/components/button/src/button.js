Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_index = require('../../../hooks/use-size/index.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");

//#region ../../packages/components/button/src/button.ts
const buttonTypes = [
	"default",
	"primary",
	"success",
	"warning",
	"info",
	"danger",
	"text",
	""
];
const buttonNativeTypes = [
	"button",
	"submit",
	"reset"
];
/**
* @deprecated Removed after 3.0.0, Use `ButtonProps` instead.
*/
const buttonProps = require_runtime$1.buildProps({
	size: require_index.useSizeProp,
	disabled: {
		type: Boolean,
		default: void 0
	},
	type: {
		type: String,
		values: buttonTypes,
		default: ""
	},
	icon: { type: require_icon.iconPropType },
	nativeType: {
		type: String,
		values: buttonNativeTypes,
		default: "button"
	},
	loading: Boolean,
	loadingIcon: {
		type: require_icon.iconPropType,
		default: () => _element_plus_icons_vue.Loading
	},
	plain: {
		type: Boolean,
		default: void 0
	},
	text: {
		type: Boolean,
		default: void 0
	},
	link: Boolean,
	bg: Boolean,
	autofocus: Boolean,
	round: {
		type: Boolean,
		default: void 0
	},
	circle: Boolean,
	dashed: {
		type: Boolean,
		default: void 0
	},
	color: String,
	dark: Boolean,
	autoInsertSpace: {
		type: Boolean,
		default: void 0
	},
	tag: {
		type: require_runtime$1.definePropType([String, Object]),
		default: "button"
	}
});
const buttonEmits = { click: (evt) => evt instanceof MouseEvent };

//#endregion
exports.buttonEmits = buttonEmits;
exports.buttonNativeTypes = buttonNativeTypes;
exports.buttonProps = buttonProps;
exports.buttonTypes = buttonTypes;
//# sourceMappingURL=button.js.map