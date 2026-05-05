import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { Loading } from "@element-plus/icons-vue";

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
const buttonProps = buildProps({
	size: useSizeProp,
	disabled: {
		type: Boolean,
		default: void 0
	},
	type: {
		type: String,
		values: buttonTypes,
		default: ""
	},
	icon: { type: iconPropType },
	nativeType: {
		type: String,
		values: buttonNativeTypes,
		default: "button"
	},
	loading: Boolean,
	loadingIcon: {
		type: iconPropType,
		default: () => Loading
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
		type: definePropType([String, Object]),
		default: "button"
	}
});
const buttonEmits = { click: (evt) => evt instanceof MouseEvent };

//#endregion
export { buttonEmits, buttonNativeTypes, buttonProps, buttonTypes };
//# sourceMappingURL=button.mjs.map