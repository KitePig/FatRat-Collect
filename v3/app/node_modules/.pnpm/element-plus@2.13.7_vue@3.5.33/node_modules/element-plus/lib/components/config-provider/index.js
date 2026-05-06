Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_constants = require('./src/constants.js');
const require_use_global_config = require('./src/hooks/use-global-config.js');
const require_config_provider_props = require('./src/config-provider-props.js');
const require_config_provider = require('./src/config-provider.js');

//#region ../../packages/components/config-provider/index.ts
const ElConfigProvider = require_install.withInstall(require_config_provider.default);

//#endregion
exports.ElConfigProvider = ElConfigProvider;
exports.default = ElConfigProvider;
exports.configProviderContextKey = require_constants.configProviderContextKey;
exports.configProviderProps = require_config_provider_props.configProviderProps;
exports.messageConfig = require_config_provider.messageConfig;
exports.provideGlobalConfig = require_use_global_config.provideGlobalConfig;
exports.useGlobalComponentSettings = require_use_global_config.useGlobalComponentSettings;
exports.useGlobalConfig = require_use_global_config.useGlobalConfig;
//# sourceMappingURL=index.js.map