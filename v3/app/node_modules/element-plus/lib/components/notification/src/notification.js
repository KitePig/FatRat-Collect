Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");

//#region ../../packages/components/notification/src/notification.ts
const notificationTypes = [
	"primary",
	"success",
	"info",
	"warning",
	"error"
];
/**
* @deprecated Removed after 3.0.0, Use `NotificationProps` instead.
*/
const notificationProps = require_runtime$1.buildProps({
	customClass: {
		type: String,
		default: ""
	},
	dangerouslyUseHTMLString: Boolean,
	duration: {
		type: Number,
		default: 4500
	},
	icon: { type: require_icon.iconPropType },
	id: {
		type: String,
		default: ""
	},
	message: {
		type: require_runtime$1.definePropType([
			String,
			Object,
			Function
		]),
		default: ""
	},
	offset: {
		type: Number,
		default: 0
	},
	onClick: {
		type: require_runtime$1.definePropType(Function),
		default: () => void 0
	},
	onClose: {
		type: require_runtime$1.definePropType(Function),
		required: true
	},
	position: {
		type: String,
		values: [
			"top-right",
			"top-left",
			"bottom-right",
			"bottom-left"
		],
		default: "top-right"
	},
	showClose: {
		type: Boolean,
		default: true
	},
	title: {
		type: String,
		default: ""
	},
	type: {
		type: String,
		values: [...notificationTypes, ""],
		default: ""
	},
	zIndex: Number,
	closeIcon: {
		type: require_icon.iconPropType,
		default: _element_plus_icons_vue.Close
	}
});
const notificationEmits = { destroy: () => true };

//#endregion
exports.notificationEmits = notificationEmits;
exports.notificationProps = notificationProps;
exports.notificationTypes = notificationTypes;
//# sourceMappingURL=notification.js.map