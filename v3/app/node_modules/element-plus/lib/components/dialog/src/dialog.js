Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_teleport = require('../../teleport/src/teleport.js');
const require_dialog_content = require('./dialog-content.js');

//#region ../../packages/components/dialog/src/dialog.ts
/**
* @deprecated Removed after 3.0.0, Use `DialogProps` instead.
*/
const dialogProps = require_runtime.buildProps({
	...require_dialog_content.dialogContentProps,
	appendToBody: Boolean,
	appendTo: {
		type: require_teleport.teleportProps.to.type,
		default: "body"
	},
	beforeClose: { type: require_runtime.definePropType(Function) },
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
		type: require_runtime.definePropType([String, Object]),
		default: void 0
	}
});
const dialogEmits = {
	open: () => true,
	opened: () => true,
	close: () => true,
	closed: () => true,
	[require_event.UPDATE_MODEL_EVENT]: (value) => require_types.isBoolean(value),
	openAutoFocus: () => true,
	closeAutoFocus: () => true
};
const dialogContextKey = Symbol("dialogContextKey");
const dialogPropsDefaults = {
	...require_dialog_content.dialogContentPropsDefaults,
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
exports.dialogContextKey = dialogContextKey;
exports.dialogEmits = dialogEmits;
exports.dialogProps = dialogProps;
exports.dialogPropsDefaults = dialogPropsDefaults;
//# sourceMappingURL=dialog.js.map