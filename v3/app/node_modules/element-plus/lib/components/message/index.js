Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_message = require('./src/message.js');
const require_method = require('./src/method.js');

//#region ../../packages/components/message/index.ts
const ElMessage = require_install.withInstallFunction(require_method.default, "$message");

//#endregion
exports.ElMessage = ElMessage;
exports.default = ElMessage;
exports.MESSAGE_DEFAULT_PLACEMENT = require_message.MESSAGE_DEFAULT_PLACEMENT;
exports.messageDefaults = require_message.messageDefaults;
exports.messageEmits = require_message.messageEmits;
exports.messagePlacement = require_message.messagePlacement;
exports.messageProps = require_message.messageProps;
exports.messageTypes = require_message.messageTypes;
//# sourceMappingURL=index.js.map