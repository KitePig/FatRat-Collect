import { UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isBoolean } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { teleportProps } from "../../teleport/src/teleport.mjs";
import { dialogContentProps, dialogContentPropsDefaults } from "./dialog-content.mjs";

//#region ../../packages/components/dialog/src/dialog.ts
/**
* @deprecated Removed after 3.0.0, Use `DialogProps` instead.
*/
const dialogProps = buildProps({
	...dialogContentProps,
	appendToBody: Boolean,
	appendTo: {
		type: teleportProps.to.type,
		default: "body"
	},
	beforeClose: { type: definePropType(Function) },
	destroyOnClose: Boolean,
	closeOnClickModal: {
		type: Boolean,
		default: true
	},
	closeOnPressEscape: {
		type: Boolean,
		default: true
	},
	lockScroll: {
		type: Boolean,
		default: true
	},
	modal: {
		type: Boolean,
		default: true
	},
	modalPenetrable: Boolean,
	openDelay: {
		type: Number,
		default: 0
	},
	closeDelay: {
		type: Number,
		default: 0
	},
	top: { type: String },
	modelValue: Boolean,
	modalClass: String,
	headerClass: String,
	bodyClass: String,
	footerClass: String,
	width: { type: [String, Number] },
	zIndex: { type: Number },
	trapFocus: Boolean,
	headerAriaLevel: {
		type: String,
		default: "2"
	},
	transition: {
		type: definePropType([String, Object]),
		default: void 0
	}
});
const dialogEmits = {
	open: () => true,
	opened: () => true,
	close: () => true,
	closed: () => true,
	[UPDATE_MODEL_EVENT]: (value) => isBoolean(value),
	openAutoFocus: () => true,
	closeAutoFocus: () => true
};
const dialogContextKey = Symbol("dialogContextKey");
const dialogPropsDefaults = {
	...dialogContentPropsDefaults,
	appendTo: "body",
	closeOnClickModal: true,
	closeOnPressEscape: true,
	lockScroll: true,
	modal: true,
	openDelay: 0,
	closeDelay: 0,
	headerAriaLevel: "2",
	transition: void 0
};

//#endregion
export { dialogContextKey, dialogEmits, dialogProps, dialogPropsDefaults };
//# sourceMappingURL=dialog.mjs.map