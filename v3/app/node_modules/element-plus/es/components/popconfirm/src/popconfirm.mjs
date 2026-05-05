import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
import { useTooltipContentProps } from "../../tooltip/src/content.mjs";
import { useTooltipTriggerProps } from "../../tooltip/src/trigger.mjs";
import { buttonTypes } from "../../button/src/button.mjs";
import { QuestionFilled } from "@element-plus/icons-vue";

//#region ../../packages/components/popconfirm/src/popconfirm.ts
/**
* @deprecated Removed after 3.0.0, Use `PopconfirmProps` instead.
*/
const popconfirmProps = buildProps({
	title: String,
	confirmButtonText: String,
	cancelButtonText: String,
	confirmButtonType: {
		type: String,
		values: buttonTypes,
		default: "primary"
	},
	cancelButtonType: {
		type: String,
		values: buttonTypes,
		default: "text"
	},
	icon: {
		type: iconPropType,
		default: () => QuestionFilled
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
		...useTooltipContentProps.effect,
		default: "light"
	},
	teleported: useTooltipContentProps.teleported,
	persistent: useTooltipContentProps.persistent,
	width: {
		type: [String, Number],
		default: 150
	},
	virtualTriggering: useTooltipTriggerProps.virtualTriggering,
	virtualRef: useTooltipTriggerProps.virtualRef
});
const popconfirmEmits = {
	confirm: (e) => e instanceof MouseEvent,
	cancel: (e) => e instanceof MouseEvent
};

//#endregion
export { popconfirmEmits, popconfirmProps };
//# sourceMappingURL=popconfirm.mjs.map