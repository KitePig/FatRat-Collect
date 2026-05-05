import { EVENT_CODE } from "../../../constants/aria.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { popperTriggerProps } from "../../popper/src/trigger.mjs";

//#region ../../packages/components/tooltip/src/trigger.ts
const useTooltipTriggerPropsDefaults = {
	trigger: "hover",
	triggerKeys: () => [
		EVENT_CODE.enter,
		EVENT_CODE.numpadEnter,
		EVENT_CODE.space
	]
};
/**
* @deprecated Removed after 3.0.0, Use `UseTooltipTriggerProps` instead.
*/
const useTooltipTriggerProps = buildProps({
	...popperTriggerProps,
	disabled: Boolean,
	trigger: {
		type: definePropType([String, Array]),
		default: "hover"
	},
	triggerKeys: {
		type: definePropType(Array),
		default: () => [
			EVENT_CODE.enter,
			EVENT_CODE.numpadEnter,
			EVENT_CODE.space
		]
	},
	focusOnTarget: Boolean
});

//#endregion
export { useTooltipTriggerProps, useTooltipTriggerPropsDefaults };
//# sourceMappingURL=trigger.mjs.map