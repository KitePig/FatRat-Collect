Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_content = require('./src/content.js');
const require_trigger = require('./src/trigger.js');
const require_tooltip = require('./src/tooltip.js');
const require_constants = require('./src/constants.js');
const require_tooltip$1 = require('./src/tooltip2.js');

//#region ../../packages/components/tooltip/index.ts
const ElTooltip = require_install.withInstall(require_tooltip$1.default);

//#endregion
exports.ElTooltip = ElTooltip;
exports.default = ElTooltip;
exports.TOOLTIP_INJECTION_KEY = require_constants.TOOLTIP_INJECTION_KEY;
exports.tooltipEmits = require_tooltip.tooltipEmits;
exports.useTooltipContentProps = require_content.useTooltipContentProps;
exports.useTooltipContentPropsDefaults = require_content.useTooltipContentPropsDefaults;
exports.useTooltipModelToggle = require_tooltip.useTooltipModelToggle;
exports.useTooltipModelToggleEmits = require_tooltip.useTooltipModelToggleEmits;
exports.useTooltipModelToggleProps = require_tooltip.useTooltipModelToggleProps;
exports.useTooltipProps = require_tooltip.useTooltipProps;
exports.useTooltipTriggerProps = require_trigger.useTooltipTriggerProps;
exports.useTooltipTriggerPropsDefaults = require_trigger.useTooltipTriggerPropsDefaults;
//# sourceMappingURL=index.js.map