Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_popper = require('./src/popper.js');
const require_constants = require('./src/constants.js');
const require_popper$1 = require('./src/popper2.js');
const require_arrow = require('./src/arrow2.js');
const require_trigger = require('./src/trigger.js');
const require_trigger$1 = require('./src/trigger2.js');
const require_arrow$1 = require('./src/arrow.js');
const require_content = require('./src/content.js');
const require_content$1 = require('./src/content2.js');

//#region ../../packages/components/popper/index.ts
const ElPopper = require_install.withInstall(require_popper$1.default);

//#endregion
exports.Effect = require_popper.Effect;
exports.ElPopper = ElPopper;
exports.default = ElPopper;
exports.ElPopperArrow = require_arrow.default;
exports.ElPopperContent = require_content$1.default;
exports.ElPopperTrigger = require_trigger$1.default;
exports.POPPER_CONTENT_INJECTION_KEY = require_constants.POPPER_CONTENT_INJECTION_KEY;
exports.POPPER_INJECTION_KEY = require_constants.POPPER_INJECTION_KEY;
exports.popperArrowProps = require_arrow$1.popperArrowProps;
exports.popperArrowPropsDefaults = require_arrow$1.popperArrowPropsDefaults;
exports.popperContentEmits = require_content.popperContentEmits;
exports.popperContentProps = require_content.popperContentProps;
exports.popperContentPropsDefaults = require_content.popperContentPropsDefaults;
exports.popperCoreConfigProps = require_content.popperCoreConfigProps;
exports.popperCoreConfigPropsDefaults = require_content.popperCoreConfigPropsDefaults;
exports.popperProps = require_popper.popperProps;
exports.popperTriggerProps = require_trigger.popperTriggerProps;
exports.roleTypes = require_popper.roleTypes;
exports.usePopperArrowProps = require_arrow$1.usePopperArrowProps;
exports.usePopperContentEmits = require_content.usePopperContentEmits;
exports.usePopperContentProps = require_content.usePopperContentProps;
exports.usePopperCoreConfigProps = require_content.usePopperCoreConfigProps;
exports.usePopperProps = require_popper.usePopperProps;
exports.usePopperTriggerProps = require_trigger.usePopperTriggerProps;
//# sourceMappingURL=index.js.map