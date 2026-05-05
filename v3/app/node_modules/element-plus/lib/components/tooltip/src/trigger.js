Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_aria = require('../../../constants/aria.js');
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_trigger = require('../../popper/src/trigger.js');

//#region ../../packages/components/tooltip/src/trigger.ts
const useTooltipTriggerPropsDefaults = {
	trigger: "hover",
	triggerKeys: () => [
		require_aria.EVENT_CODE.enter,
		require_aria.EVENT_CODE.numpadEnter,
		require_aria.EVENT_CODE.space
	]
};
/**
* @deprecated Removed after 3.0.0, Use `UseTooltipTriggerProps` instead.
*/
const useTooltipTriggerProps = require_runtime.buildProps({
	...require_trigger.popperTriggerProps,
	disabled: Boolean,
	trigger: {
		type: require_runtime.definePropType([String, Array]),
		default: "hover"
	},
	triggerKeys: {
		type: require_runtime.definePropType(Array),
		default: () => [
			require_aria.EVENT_CODE.enter,
			require_aria.EVENT_CODE.numpadEnter,
			require_aria.EVENT_CODE.space
		]
	},
	focusOnTarget: Boolean
});

//#endregion
exports.useTooltipTriggerProps = useTooltipTriggerProps;
exports.useTooltipTriggerPropsDefaults = useTooltipTriggerPropsDefaults;
//# sourceMappingURL=trigger.js.map