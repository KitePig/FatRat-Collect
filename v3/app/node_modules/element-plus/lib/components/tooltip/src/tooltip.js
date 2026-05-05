Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_index = require('../../../hooks/use-model-toggle/index.js');
const require_popper = require('../../popper/src/popper.js');
const require_arrow = require('../../popper/src/arrow.js');
const require_content = require('./content.js');
const require_trigger = require('./trigger.js');

//#region ../../packages/components/tooltip/src/tooltip.ts
const { useModelToggleProps: useTooltipModelToggleProps, useModelToggleEmits: useTooltipModelToggleEmits, useModelToggle: useTooltipModelToggle } = require_index.createModelToggleComposable("visible");
/**
* @deprecated Removed after 3.0.0, Use `UseTooltipProps` instead.
*/
const useTooltipProps = require_runtime.buildProps({
	...require_popper.popperProps,
	...useTooltipModelToggleProps,
	...require_content.useTooltipContentProps,
	...require_trigger.useTooltipTriggerProps,
	...require_arrow.popperArrowProps,
	showArrow: {
		type: Boolean,
		default: true
	}
});
const tooltipEmits = [
	...useTooltipModelToggleEmits,
	"before-show",
	"before-hide",
	"show",
	"hide",
	"open",
	"close"
];

//#endregion
exports.tooltipEmits = tooltipEmits;
exports.useTooltipModelToggle = useTooltipModelToggle;
exports.useTooltipModelToggleEmits = useTooltipModelToggleEmits;
exports.useTooltipModelToggleProps = useTooltipModelToggleProps;
exports.useTooltipProps = useTooltipProps;
//# sourceMappingURL=tooltip.js.map