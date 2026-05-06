Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');

//#region ../../packages/components/dialog/src/dialog-content.ts
/**
* @deprecated Removed after 3.0.0, Use `DialogContentProps` instead.
*/
const dialogContentProps = require_runtime.buildProps({
	center: Boolean,
	alignCenter: {
		type: Boolean,
		default: void 0
	},
	closeIcon: { type: require_icon.iconPropType },
	draggable: {
		type: Boolean,
		default: void 0
	},
	overflow: {
		type: Boolean,
		default: void 0
	},
	fullscreen: Boolean,
	headerClass: String,
	bodyClass: String,
	footerClass: String,
	showClose: {
		type: Boolean,
		default: true
	},
	title: {
		type: String,
		default: ""
	},
	ariaLevel: {
		type: String,
		default: "2"
	}
});
const dialogContentEmits = { close: () => true };
const dialogContentPropsDefaults = {
	alignCenter: void 0,
	draggable: void 0,
	overflow: void 0,
	showClose: true,
	title: "",
	ariaLevel: "2"
};

//#endregion
exports.dialogContentEmits = dialogContentEmits;
exports.dialogContentProps = dialogContentProps;
exports.dialogContentPropsDefaults = dialogContentPropsDefaults;
//# sourceMappingURL=dialog-content.js.map