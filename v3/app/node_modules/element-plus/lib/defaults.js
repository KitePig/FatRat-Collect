Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_component = require('./component.js');
const require_make_installer = require('./make-installer.js');
const require_plugin = require('./plugin.js');

//#region ../../packages/element-plus/defaults.ts
var defaults_default = require_make_installer.makeInstaller([...require_component.default, ...require_plugin.default]);

//#endregion
exports.default = defaults_default;
//# sourceMappingURL=defaults.js.map