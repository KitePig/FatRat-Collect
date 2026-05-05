Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_button = require('./src/button.js');
const require_constants = require('./src/constants.js');
const require_button$1 = require('./src/button2.js');
const require_button_group = require('./src/button-group2.js');

//#region ../../packages/components/button/index.ts
const ElButton = require_install.withInstall(require_button$1.default, { ButtonGroup: require_button_group.default });
const ElButtonGroup = require_install.withNoopInstall(require_button_group.default);

//#endregion
exports.ElButton = ElButton;
exports.default = ElButton;
exports.ElButtonGroup = ElButtonGroup;
exports.buttonEmits = require_button.buttonEmits;
exports.buttonGroupContextKey = require_constants.buttonGroupContextKey;
exports.buttonNativeTypes = require_button.buttonNativeTypes;
exports.buttonProps = require_button.buttonProps;
exports.buttonTypes = require_button.buttonTypes;
//# sourceMappingURL=index.js.map