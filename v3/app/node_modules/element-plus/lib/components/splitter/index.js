Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_splitter = require('./src/splitter.js');
const require_splitter$1 = require('./src/splitter2.js');
const require_split_panel = require('./src/split-panel.js');
const require_split_panel$1 = require('./src/split-panel2.js');

//#region ../../packages/components/splitter/index.ts
const ElSplitter = require_install.withInstall(require_splitter$1.default, { SplitPanel: require_split_panel$1.default });
const ElSplitterPanel = require_install.withNoopInstall(require_split_panel$1.default);

//#endregion
exports.ElSplitter = ElSplitter;
exports.default = ElSplitter;
exports.ElSplitterPanel = ElSplitterPanel;
exports.splitterEmits = require_splitter.splitterEmits;
exports.splitterPanelEmits = require_split_panel.splitterPanelEmits;
exports.splitterPanelProps = require_split_panel.splitterPanelProps;
exports.splitterProps = require_splitter.splitterProps;
//# sourceMappingURL=index.js.map