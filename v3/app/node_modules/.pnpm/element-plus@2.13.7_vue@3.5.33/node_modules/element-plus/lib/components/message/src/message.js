Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_typescript = require('../../../utils/typescript.js');
let _vueuse_core = require("@vueuse/core");

//#region ../../packages/components/message/src/message.ts
const messageTypes = [
	"primary",
	"success",
	"info",
	"warning",
	"error"
];
const messagePlacement = [
	"top",
	"top-left",
	"top-right",
	"bottom",
	"bottom-left",
	"bottom-right"
];
const MESSAGE_DEFAULT_PLACEMENT = "top";
const messageDefaults = require_typescript.mutable({
	customClass: "",
	dangerouslyUseHTMLString: false,
	duration: 3e3,
	icon: void 0,
	id: "",
	message: "",
	onClose: void 0,
	showClose: false,
	type: "info",
	plain: false,
	offset: 16,
	placement: void 0,
	zIndex: 0,
	grouping: false,
	repeatNum: 1,
	appendTo: _vueuse_core.isClient ? document.body : void 0
});
/**
* @deprecated Removed after 3.0.0, Use `MessageProps` instead.
*/
const messageProps = require_runtime$1.buildProps({
	customClass: {
		type: String,
		default: messageDefaults.customClass
	},
	dangerouslyUseHTMLString: {
		type: Boolean,
		default: messageDefaults.dangerouslyUseHTMLString
	},
	duration: {
		type: Number,
		default: messageDefaults.duration
	},
	icon: {
		type: require_icon.iconPropType,
		default: messageDefaults.icon
	},
	id: {
		type: String,
		default: messageDefaults.id
	},
	message: {
		type: require_runtime$1.definePropType([
			String,
			Object,
			Function
		]),
		default: messageDefaults.message
	},
	onClose: {
		type: require_runtime$1.definePropType(Function),
		default: messageDefaults.onClose
	},
	showClose: {
		type: Boolean,
		default: messageDefaults.showClose
	},
	type: {
		type: String,
		values: messageTypes,
		default: messageDefaults.type
	},
	plain: {
		type: Boolean,
		default: messageDefaults.plain
	},
	offset: {
		type: Number,
		default: messageDefaults.offset
	},
	placement: {
		type: String,
		values: messagePlacement,
		default: messageDefaults.placement
	},
	zIndex: {
		type: Number,
		default: messageDefaults.zIndex
	},
	grouping: {
		type: Boolean,
		default: messageDefaults.grouping
	},
	repeatNum: {
		type: Number,
		default: messageDefaults.repeatNum
	}
});
const messageEmits = { destroy: () => true };

//#endregion
exports.MESSAGE_DEFAULT_PLACEMENT = MESSAGE_DEFAULT_PLACEMENT;
exports.messageDefaults = messageDefaults;
exports.messageEmits = messageEmits;
exports.messagePlacement = messagePlacement;
exports.messageProps = messageProps;
exports.messageTypes = messageTypes;
//# sourceMappingURL=message.js.map