Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_config = require('./src/config.js');
const require_types = require('./src/types.js');
const require_index = require('./src/index.js');

//#region ../../packages/components/cascader-panel/index.ts
const ElCascaderPanel = require_install.withInstall(require_index.default);

//#endregion
exports.CASCADER_PANEL_INJECTION_KEY = require_types.CASCADER_PANEL_INJECTION_KEY;
exports.CommonProps = require_config.CommonProps;
exports.DefaultProps = require_config.DefaultProps;
exports.ElCascaderPanel = ElCascaderPanel;
exports.default = ElCascaderPanel;
exports.cascaderPanelEmits = require_config.cascaderPanelEmits;
exports.cascaderPanelProps = require_config.cascaderPanelProps;
exports.useCascaderConfig = require_config.useCascaderConfig;
//# sourceMappingURL=index.js.map