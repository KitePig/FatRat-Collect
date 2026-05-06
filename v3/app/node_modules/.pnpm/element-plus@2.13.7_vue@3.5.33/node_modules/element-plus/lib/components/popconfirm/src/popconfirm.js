Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_content = require('../../tooltip/src/content.js');
const require_trigger = require('../../tooltip/src/trigger.js');
const require_button = require('../../button/src/button.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");

//#region ../../packages/components/popconfirm/src/popconfirm.ts
/**
* @deprecated Removed after 3.0.0, Use `PopconfirmProps` instead.
*/
const popconfirmProps = require_runtime$1.buildProps({
	title: String,
	confirmButtonText: String,
	cancelButtonText: String,
	confirmButtonType: {
		type: String,
		values: require_button.buttonTypes,
		default: "primary"
	},
	cancelButtonType: {
		type: String,
		values: require_button.buttonTypes,
		default: "text"
	},
	icon: {
		type: require_icon.iconPropType,
		default: () => _element_plus_icons_vue.QuestionFilled
	},
	iconColor: {
		type: String,
		default: "#f90"
	},
	hideIcon: Boolean,
	hideAfter: {
		type: Number,
		default: 200
	},
	effect: {
		...require_content.useTooltipContentProps.effect,
		default: "light"
	},
	teleported: require_content.useTooltipContentProps.teleported,
	persistent: require_content.useTooltipContentProps.persistent,
	width: {
		type: [String, Number],
		default: 150
	},
	virtualTriggering: require_trigger.useTooltipTriggerProps.virtualTriggering,
	virtualRef: require_trigger.useTooltipTriggerProps.virtualRef
});
const popconfirmEmits = {
	confirm: (e) => e instanceof MouseEvent,
	cancel: (e) => e instanceof MouseEvent
};

//#endregion
exports.popconfirmEmits = popconfirmEmits;
exports.popconfirmProps = popconfirmProps;
//# sourceMappingURL=popconfirm.js.map